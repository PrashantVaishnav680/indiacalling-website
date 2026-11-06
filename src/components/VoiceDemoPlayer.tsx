import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, CalendarCheck, AlertCircle } from 'lucide-react';
import {
  DemoLanguage,
  VOICE_DEMO_TRACKS,
} from '../config/siteConfig';
import {
  formatAudioTime,
  calculateAudioProgress,
} from '../utils/validation';
import {
  WAVEFORM_BAR_COUNT,
  IDLE_WAVEFORM_BARS,
  calculateTimeDomainRms,
  computeSymmetricWaveformBars,
} from '../utils/audioWaveform';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
} from '../utils/motion';

interface VoiceDemoPlayerProps {
  initialLanguage?: DemoLanguage;
  variant?: 'home' | 'product';
}

interface AudioGraphNodes {
  context: AudioContext;
  analyser: AnalyserNode;
  source: MediaElementAudioSourceNode;
  freqData: Uint8Array<ArrayBuffer>;
  timeData: Uint8Array<ArrayBuffer>;
}

// WeakMap ensures we never call createMediaElementSource twice on the same HTMLAudioElement
// or instantiate redundant AudioContexts across re-renders.
const audioElementGraphMap = new WeakMap<HTMLAudioElement, AudioGraphNodes>();

export const VoiceDemoPlayer: React.FC<VoiceDemoPlayerProps> = ({
  initialLanguage = 'hindi',
  variant = 'home',
}) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [selectedLang, setSelectedLang] = useState<DemoLanguage>(initialLanguage);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(
    VOICE_DEMO_TRACKS[initialLanguage].defaultDurationSeconds
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const turnButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const previousBarsRef = useRef<number[]>([...IDLE_WAVEFORM_BARS]);
  const isInitialMountRef = useRef(true);
  const userInitiatedPlayRef = useRef(false);

  const activeTrack = VOICE_DEMO_TRACKS[selectedLang];
  const effectiveDuration =
    duration > 0 ? duration : activeTrack.defaultDurationSeconds;
  const progressPercent = calculateAudioProgress(currentTime, effectiveDuration);

  // Apply bar heights and brand colors directly to DOM nodes without triggering React re-renders
  const applyBarsToDom = useCallback(
    (heights: readonly number[], currentProgressPct: number, activePlayback: boolean, rmsLevel: number = 0) => {
      for (let i = 0; i < WAVEFORM_BAR_COUNT; i++) {
        const barEl = barRefs.current[i];
        if (!barEl) continue;
        const hRatio = heights[i] ?? IDLE_WAVEFORM_BARS[i] ?? 0.2;
        const heightPct = Math.round(Math.max(10, Math.min(95, hRatio * 100)));
        barEl.style.height = `${heightPct}%`;

        const barPositionPct = ((i + 0.5) / WAVEFORM_BAR_COUNT) * 100;
        const isPlayed = currentProgressPct >= barPositionPct;

        if (activePlayback) {
          if (isPlayed) {
            barEl.style.backgroundColor = '#155EEF';
          } else if (hRatio > 0.34) {
            barEl.style.backgroundColor = '#3B82F6';
          } else {
            barEl.style.backgroundColor = '#93C5FD';
          }
        } else {
          barEl.style.backgroundColor = isPlayed ? '#155EEF' : '#CBD5E1';
        }
      }

      if (waveformContainerRef.current) {
        waveformContainerRef.current.setAttribute(
          'data-visualizer-state',
          activePlayback ? 'active' : 'idle'
        );
        waveformContainerRef.current.setAttribute('data-rms', rmsLevel.toFixed(4));
      }
    },
    []
  );

  const stopVisualization = useCallback(
    (resetToIdle: boolean, currentProgressPct: number) => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (resetToIdle) {
        previousBarsRef.current = [...IDLE_WAVEFORM_BARS];
        applyBarsToDom(IDLE_WAVEFORM_BARS, currentProgressPct, false, 0);
      } else {
        // Keep a clean static waveform at current heights when paused
        applyBarsToDom(previousBarsRef.current, currentProgressPct, false, 0);
      }
    },
    [applyBarsToDom]
  );

  // Initialize or retrieve Web Audio API graph for the current <audio> element
  const ensureAudioGraph = useCallback(async (): Promise<AudioGraphNodes | null> => {
    const audioEl = audioRef.current;
    if (!audioEl || typeof window === 'undefined') return null;

    try {
      let graph = audioElementGraphMap.get(audioEl);
      if (!graph) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;

        const context = new AudioCtx();
        const analyser = context.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.72;

        const source = context.createMediaElementSource(audioEl);
        source.connect(analyser);
        analyser.connect(context.destination);

        const bufferLength = analyser.frequencyBinCount;
        const freqData = new Uint8Array(new ArrayBuffer(bufferLength));
        const timeData = new Uint8Array(new ArrayBuffer(bufferLength));

        graph = { context, analyser, source, freqData, timeData };
        audioElementGraphMap.set(audioEl, graph);
      }

      if (graph.context.state === 'suspended') {
        await graph.context.resume();
      }
      return graph;
    } catch (err) {
      console.warn('Web Audio API initialization fallback:', err);
      return null;
    }
  }, []);

  const startVisualization = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const renderFrame = () => {
      const audioEl = audioRef.current;
      if (!audioEl || audioEl.paused || audioEl.ended) {
        rafIdRef.current = null;
        return;
      }

      const graph = audioElementGraphMap.get(audioEl);
      const dur =
        Number.isFinite(audioEl.duration) && audioEl.duration > 0
          ? audioEl.duration
          : activeTrack.defaultDurationSeconds;
      const pct = calculateAudioProgress(audioEl.currentTime, dur);

      if (graph) {
        graph.analyser.getByteFrequencyData(graph.freqData);
        graph.analyser.getByteTimeDomainData(graph.timeData);

        const rms = calculateTimeDomainRms(graph.timeData);
        const smoothing = shouldReduceMotion ? 0.75 : 0.30;
        const nextBars = computeSymmetricWaveformBars(
          graph.freqData,
          graph.timeData,
          previousBarsRef.current,
          WAVEFORM_BAR_COUNT,
          smoothing
        );
        previousBarsRef.current = nextBars;
        applyBarsToDom(nextBars, pct, true, rms);
      }

      rafIdRef.current = requestAnimationFrame(renderFrame);
    };

    rafIdRef.current = requestAnimationFrame(renderFrame);
  }, [activeTrack.defaultDurationSeconds, applyBarsToDom, shouldReduceMotion]);

  // Switch language track cleanly & reset visualizer to idle for the newly selected recording
  const handleSelectLanguage = (lang: DemoLanguage) => {
    if (lang === selectedLang) return;
    userInitiatedPlayRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      try {
        audioRef.current.currentTime = 0;
      } catch {
        // Ignore if media metadata is not yet loaded
      }
    }
    stopVisualization(true, 0);
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioError(null);
    setDuration(VOICE_DEMO_TRACKS[lang].defaultDurationSeconds);
    setSelectedLang(lang);
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  // Reset waveform bars on language switch without aborting initial browser preload
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      stopVisualization(true, 0);
      return;
    }
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.load();
    }
    stopVisualization(true, 0);
  }, [selectedLang, stopVisualization]);

  // Keep static bar progress colors synchronized when user seeks while paused
  useEffect(() => {
    if (!isPlaying) {
      applyBarsToDom(previousBarsRef.current, progressPercent, false, 0);
    }
  }, [progressPercent, isPlaying, applyBarsToDom]);

  // Clean up animation frames and pause audio on component unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      userInitiatedPlayRef.current = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (audioEl) {
        audioEl.pause();
        const graph = audioElementGraphMap.get(audioEl);
        if (graph && graph.context.state === 'running') {
          graph.context.suspend().catch(() => {});
        }
      }
    };
  }, []);

  const togglePlayPause = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    setAudioError(null);

    if (isPlaying) {
      userInitiatedPlayRef.current = false;
      audioEl.pause();
      stopVisualization(false, progressPercent);
      setIsPlaying(false);
    } else {
      try {
        userInitiatedPlayRef.current = true;
        setIsLoadingAudio(true);
        await ensureAudioGraph();
        if (audioEl.error) {
          audioEl.load();
        }
        await audioEl.play();
        setIsPlaying(true);
        startVisualization();
      } catch (err) {
        console.error('Audio playback failed:', err);
        setAudioError('Unable to start audio playback. Please click Play again.');
        setIsPlaying(false);
        stopVisualization(false, progressPercent);
      } finally {
        setIsLoadingAudio(false);
      }
    }
  };

  const handleRestart = () => {
    const audioEl = audioRef.current;
    setAudioError(null);
    setCurrentTime(0);
    if (audioEl) {
      try {
        audioEl.currentTime = 0;
      } catch {
        // Ignore if metadata not loaded yet
      }
    }
    if (!isPlaying) {
      stopVisualization(true, 0);
    }
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleToggleMute = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const nextMuted = !isMuted;
    audioEl.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioEl = audioRef.current;
    const newTime = Number(e.target.value);
    setAudioError(null);
    setCurrentTime(newTime);
    if (audioEl && Number.isFinite(newTime)) {
      try {
        audioEl.currentTime = newTime;
      } catch {
        // Ignore if metadata not loaded yet
      }
    }
  };

  // Determine which transcript turn is currently active based on currentTime
  const activeTurnIndex = (() => {
    let idx = 0;
    for (let i = 0; i < activeTrack.transcript.length; i++) {
      if (currentTime >= activeTrack.transcript[i].startTimeSec) {
        idx = i;
      }
    }
    return idx;
  })();

  // Smoothly keep the active transcript turn visible inside the transcript scroll box during playback
  useEffect(() => {
    if (!isPlaying) return;
    const container = transcriptContainerRef.current;
    const activeBtn = turnButtonRefs.current[activeTurnIndex];
    if (!container || !activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const offsetTopWithinContainer =
      btnRect.top - containerRect.top + container.scrollTop;
    const targetScrollTop = Math.max(
      0,
      offsetTopWithinContainer - container.clientHeight / 2 + btnRect.height / 2
    );

    container.scrollTo({
      top: targetScrollTop,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, [activeTurnIndex, isPlaying, shouldReduceMotion]);

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 22, scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={DEFAULT_VIEWPORT}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.65, ease: SMOOTH_EASE }
      }
      className="w-full"
      data-testid="voice-demo-player"
    >
      {/* Hidden Native HTML5 Audio Element bound directly to uploaded files */}
      <audio
        ref={audioRef}
        src={activeTrack.audioSrc}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const loadedDur = e.currentTarget.duration;
          if (Number.isFinite(loadedDur) && loadedDur > 0) {
            setDuration(loadedDur);
          }
          setAudioError(null);
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onPlay={() => {
          setAudioError(null);
          setIsPlaying(true);
          startVisualization();
        }}
        onPause={(e) => {
          setIsPlaying(false);
          if (!e.currentTarget.ended) {
            const pct = calculateAudioProgress(
              e.currentTarget.currentTime,
              effectiveDuration
            );
            stopVisualization(false, pct);
          }
        }}
        onEnded={(e) => {
          userInitiatedPlayRef.current = false;
          try {
            e.currentTarget.currentTime = 0;
          } catch {
            // Ignore seek reset error
          }
          setIsPlaying(false);
          setCurrentTime(0);
          stopVisualization(true, 0);
        }}
        onError={() => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          stopVisualization(true, 0);
          // Only surface an error banner if the user actively attempted to play the audio
          if (userInitiatedPlayRef.current) {
            setAudioError('Could not load the recorded audio file.');
          }
        }}
      />

      {/* Language Selection Tabs: Hindi First, English Second */}
      <div
        role="tablist"
        aria-label="Select Voice Demo Language"
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
      >
        {(['hindi', 'english'] as DemoLanguage[]).map((langKey) => {
          const track = VOICE_DEMO_TRACKS[langKey];
          const isSelected = selectedLang === langKey;
          return (
            <button
              key={langKey}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectLanguage(langKey)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 cursor-pointer border active:scale-[0.98] ${
                isSelected
                  ? 'bg-[#155EEF] border-[#155EEF] text-white shadow-sm'
                  : 'bg-white border-[#CBD5E1] text-[#101828] hover:bg-[#EFF6FF] hover:border-[#155EEF]/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-[#98A2B3]'
                }`}
              />
              <span>{track.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F2F4F7] text-[#344054]'
                }`}
              >
                {track.defaultDurationFormatted}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Audio Player Card matching Stitch Design */}
      <div
        className={`max-w-5xl mx-auto rounded-2xl p-6 md:p-8 border ${
          variant === 'product'
            ? 'bg-[#f9f9ff] border-[#c3c6d8]/40 shadow-xl'
            : 'bg-white border-[#E5EAF2] shadow-md'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Audio Controls & Waveform (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-[#E5EAF2] pb-6 lg:pb-0 lg:pr-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#B2DDFF] text-[#155EEF] text-[11px] font-bold uppercase tracking-wider">
                  {isPlaying ? 'Playing Recorded Call' : 'Recorded Call Sample'}
                </span>
                <span className="text-xs font-mono text-[#475467]">
                  {activeTrack.metadata.languageTag}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`agent-info-${selectedLang}`}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: SMOOTH_EASE }
                  }
                  className="flex items-center gap-3.5 mb-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#155EEF]/10 border border-[#155EEF]/20 flex items-center justify-center text-[#155EEF] font-bold text-base shrink-0">
                    {activeTrack.agentInitials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#101828]">
                      {activeTrack.agentName}
                    </h3>
                    <p className="text-xs text-[#475467] mt-0.5">
                      {activeTrack.campaignName}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Real Web Audio API Audio-Reactive Waveform Visualizer (36 Slim Symmetrical Bars) */}
              <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#475467] mb-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isPlaying ? 'bg-[#12B76A]' : 'bg-[#98A2B3]'
                      }`}
                    />
                    <span>VOICE STREAM SIGNAL</span>
                  </span>
                  <span className="text-[#155EEF] font-semibold tabular-nums">
                    {Math.round(progressPercent)}% PLAYED
                  </span>
                </div>
                <div
                  ref={waveformContainerRef}
                  data-testid="audio-reactive-waveform"
                  data-visualizer-state={isPlaying ? 'active' : 'idle'}
                  data-rms="0.0000"
                  className="flex items-center justify-between gap-[3px] sm:gap-1 h-20 w-full px-1"
                  aria-hidden="true"
                >
                  {IDLE_WAVEFORM_BARS.map((initialRatio, idx) => (
                    <span
                      key={idx}
                      ref={(el) => {
                        barRefs.current[idx] = el;
                      }}
                      style={{
                        height: `${Math.round(initialRatio * 100)}%`,
                        backgroundColor: '#CBD5E1',
                      }}
                      className="flex-1 min-w-[2px] max-w-[5px] rounded-full transition-[height,background-color] duration-75 ease-out"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Play/Pause, Seek Scrub Bar, Time & Volume Controls */}
            <div className="space-y-3">
              {audioError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 text-xs text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA] rounded-lg px-3 py-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{audioError}</span>
                </div>
              )}

              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={togglePlayPause}
                  disabled={isLoadingAudio}
                  aria-label={
                    isPlaying
                      ? `Pause ${activeTrack.label}`
                      : `Play ${activeTrack.label}`
                  }
                  className="w-12 h-12 rounded-full bg-[#155EEF] hover:bg-[#0047c1] disabled:opacity-60 text-white flex items-center justify-center shadow-sm shrink-0 transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <div className="flex-1 flex flex-col">
                  <label htmlFor={`audio-seek-${variant}`} className="sr-only">
                    Seek audio position
                  </label>
                  <input
                    id={`audio-seek-${variant}`}
                    type="range"
                    min={0}
                    max={effectiveDuration}
                    step={0.1}
                    value={Math.min(currentTime, effectiveDuration)}
                    onChange={handleSeekChange}
                    aria-label="Audio progress bar"
                    className="w-full h-2 bg-[#E5EAF2] rounded-lg appearance-none cursor-pointer accent-[#155EEF]"
                  />
                  <div className="flex justify-between items-center text-xs text-[#475467] font-mono tabular-nums mt-1.5">
                    <span data-testid="audio-current-time">
                      {formatAudioTime(currentTime)}
                    </span>
                    <span data-testid="audio-total-duration">
                      {formatAudioTime(effectiveDuration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Restart audio from beginning"
                    className="p-2 rounded-lg text-[#475467] hover:text-[#101828] hover:bg-[#F2F4F7] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    className="p-2 rounded-lg text-[#475467] hover:text-[#101828] hover:bg-[#F2F4F7] transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-[#D92D20]" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Live Synchronized Transcript (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-[#475467] uppercase tracking-wider">
                Recorded Call Transcript
              </span>
              <span className="text-[11px] font-mono text-[#155EEF] font-medium shrink-0 whitespace-nowrap">
                Click any turn to jump
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`transcript-${selectedLang}`}
                ref={transcriptContainerRef}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.24, ease: SMOOTH_EASE }
                }
                className="space-y-2.5 max-h-72 overflow-y-auto pr-1.5"
              >
                {activeTrack.transcript.map((turn, index) => {
                  const isCurrentTurn = index === activeTurnIndex;
                  return (
                    <button
                      key={index}
                      ref={(el) => {
                        turnButtonRefs.current[index] = el;
                      }}
                      type="button"
                      onClick={() => {
                        setAudioError(null);
                        setCurrentTime(turn.startTimeSec);
                        if (audioRef.current) {
                          try {
                            audioRef.current.currentTime = turn.startTimeSec;
                          } catch {
                            // Ignore if metadata is not yet loaded
                          }
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        isCurrentTurn
                          ? 'bg-[#EFF6FF] border-[#155EEF]/40 shadow-2xs'
                          : turn.speaker === 'agent'
                          ? 'bg-[#F8FAFC] border-[#E5EAF2] hover:border-[#B2DDFF]'
                          : 'bg-white border-[#E5EAF2] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <div className="flex justify-between items-center font-semibold mb-1">
                        <span
                          className={
                            turn.speaker === 'agent'
                              ? 'text-[#155EEF]'
                              : 'text-[#344054]'
                          }
                        >
                          {turn.speakerLabel}
                        </span>
                        <span className="font-mono tabular-nums text-[#475467]">
                          {turn.timestamp}
                        </span>
                      </div>
                      <p className="text-[#101828] leading-relaxed">{turn.text}</p>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 3: Extracted Call Metadata (3 cols) */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`metadata-${selectedLang}`}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: SMOOTH_EASE }
              }
              className="lg:col-span-3 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5EAF2]">
                  <span className="text-xs font-semibold text-[#344054] uppercase tracking-wide">
                    Extracted Intelligence
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] text-[#475467] font-medium block">
                      Caller / Prospect
                    </span>
                    <p className="text-xs font-semibold text-[#101828] mt-0.5">
                      {activeTrack.metadata.contact}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#475467] font-medium block">
                      Qualification Status
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#027A48] bg-[#ECFDF3] border border-[#ABEFC6] px-2 py-0.5 rounded">
                        {activeTrack.metadata.qualificationStatus}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#475467] font-medium block">
                      Requirement &amp; Location
                    </span>
                    <p className="text-xs text-[#344054] font-medium mt-0.5">
                      {activeTrack.metadata.intent}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#475467] font-medium block">
                      Stated Budget
                    </span>
                    <p className="text-xs font-mono font-semibold text-[#101828] mt-0.5">
                      {activeTrack.metadata.budget}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#475467] font-medium block">
                      Automated Next Step
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#155EEF] bg-[#EFF6FF] border border-[#D1E9FF] px-2.5 py-1 rounded-md mt-1">
                      <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{activeTrack.metadata.actionTrigger}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5EAF2] text-[11px] text-[#475467] flex items-center justify-between">
                <span>Audio Source:</span>
                <strong className="font-mono text-[#101828]">
                  {activeTrack.metadata.languageTag}
                </strong>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
