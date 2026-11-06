/**
 * Pure audio-reactive waveform calculation utilities for Web Audio API visualization.
 * Computes 36 symmetrical, smooth vertical bar amplitudes from real AnalyserNode data.
 */

export const WAVEFORM_BAR_COUNT = 36;

/**
 * Clean, balanced symmetrical idle waveform profile (36 slim vertical bars).
 * Used when audio is not playing or has ended.
 */
export const IDLE_WAVEFORM_BARS: readonly number[] = [
  0.14, 0.16, 0.19, 0.22, 0.18, 0.25, 0.30, 0.24, 0.34,
  0.28, 0.38, 0.32, 0.42, 0.35, 0.46, 0.40, 0.50, 0.44,
  0.44, 0.50, 0.40, 0.46, 0.35, 0.42, 0.32, 0.38, 0.28,
  0.34, 0.24, 0.30, 0.25, 0.18, 0.22, 0.19, 0.16, 0.14,
];

/**
 * Static subtle voice activity indicator profile for the Hero conversation card
 * (which does not have an audio element attached).
 */
export const HERO_STATIC_VOICE_BARS: readonly number[] = [
  0.28, 0.42, 0.60, 0.48, 0.78, 0.92, 0.70, 0.84, 0.54, 0.66, 0.38, 0.26,
];

/**
 * Computes root-mean-square (RMS) normalized amplitude [0..1] from byte time-domain data.
 * In Web Audio API getByteTimeDomainData, 128 represents zero/silence.
 */
export function calculateTimeDomainRms(timeDomainData: Uint8Array): number {
  if (!timeDomainData || timeDomainData.length === 0) {
    return 0;
  }
  let sumSquares = 0;
  for (let i = 0; i < timeDomainData.length; i++) {
    const normalized = (timeDomainData[i] - 128) / 128;
    sumSquares += normalized * normalized;
  }
  return Math.min(1, Math.sqrt(sumSquares / timeDomainData.length));
}

/**
 * Computes 36 balanced, symmetrical bar heights [0.10 .. 0.95] from real Web Audio API
 * frequency and time-domain buffers.
 *
 * - Reflects actual voice intensity (via RMS + vocal frequency bins).
 * - Shrinks calmly when the audio signal is silent.
 * - Applies exponential smoothing against previous frame bars to prevent jitter.
 */
export function computeSymmetricWaveformBars(
  frequencyData: Uint8Array,
  timeDomainData: Uint8Array,
  previousBars: readonly number[] = IDLE_WAVEFORM_BARS,
  barCount: number = WAVEFORM_BAR_COUNT,
  smoothingFactor: number = 0.32
): number[] {
  const halfCount = Math.floor(barCount / 2);
  const rms = calculateTimeDomainRms(timeDomainData);

  // Check peak frequency energy in vocal range
  let maxFreq = 0;
  const usableBins = Math.min(frequencyData.length, 48);
  for (let i = 1; i < usableBins; i++) {
    if (frequencyData[i] > maxFreq) {
      maxFreq = frequencyData[i];
    }
  }

  // Silence detection: when audio is in a pause between words/sentences
  const isSilent = rms < 0.009 && maxFreq < 8;

  const nextBars = new Array<number>(barCount);
  const clampedSmoothing = Math.max(0, Math.min(0.85, smoothingFactor));

  for (let pairIdx = 0; pairIdx < halfCount; pairIdx++) {
    // pairIdx = 0 is at the center of the waveform; pairIdx = halfCount - 1 is at the outer edge
    const leftBarIndex = halfCount - 1 - pairIdx;
    const rightBarIndex = halfCount + pairIdx;

    // Spatial envelope so center bars naturally sit slightly taller than outer edges
    const normalizedDistFromCenter = pairIdx / Math.max(1, halfCount - 1);
    const centerEnvelope = 1 - normalizedDistFromCenter * 0.48;

    let targetLeft: number;
    let targetRight: number;

    if (isSilent) {
      // Calm, low-amplitude resting state during silent moments in the call
      const silentHeight = 0.10 + centerEnvelope * 0.06;
      targetLeft = silentHeight;
      targetRight = silentHeight;
    } else {
      // Map vocal frequency bins (skipping bin 0 DC offset)
      const binA = 1 + pairIdx * 2;
      const binB = Math.min(frequencyData.length - 1, binA + 1);
      const freqValA = (frequencyData[binA] ?? 0) / 255;
      const freqValB = (frequencyData[binB] ?? 0) / 255;
      const avgFreq = (freqValA + freqValB) * 0.5;

      // Sample time-domain wave displacement for organic left/right micro-variation
      const timeStep = Math.max(1, Math.floor(timeDomainData.length / barCount));
      const tdLeft =
        Math.abs(((timeDomainData[leftBarIndex * timeStep] ?? 128) - 128) / 128);
      const tdRight =
        Math.abs(((timeDomainData[rightBarIndex * timeStep] ?? 128) - 128) / 128);

      // Boost RMS into perceptual speech range
      const speechEnergy = Math.min(1, rms * 3.4);

      const rawLeft =
        0.12 +
        (avgFreq * 0.58 + speechEnergy * 0.32 + tdLeft * 0.18) * centerEnvelope;
      const rawRight =
        0.12 +
        (avgFreq * 0.58 + speechEnergy * 0.32 + tdRight * 0.18) * centerEnvelope;

      targetLeft = Math.max(0.10, Math.min(0.95, rawLeft));
      targetRight = Math.max(0.10, Math.min(0.95, rawRight));
    }

    const prevLeft = previousBars[leftBarIndex] ?? IDLE_WAVEFORM_BARS[leftBarIndex] ?? 0.16;
    const prevRight = previousBars[rightBarIndex] ?? IDLE_WAVEFORM_BARS[rightBarIndex] ?? 0.16;

    nextBars[leftBarIndex] = Number(
      (prevLeft * clampedSmoothing + targetLeft * (1 - clampedSmoothing)).toFixed(4)
    );
    nextBars[rightBarIndex] = Number(
      (prevRight * clampedSmoothing + targetRight * (1 - clampedSmoothing)).toFixed(4)
    );
  }

  return nextBars;
}
