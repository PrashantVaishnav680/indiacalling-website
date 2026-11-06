import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Transition } from 'motion/react';
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  PhoneCall,
  Clock,
  Users,
  Wallet,
  Zap,
  MessageSquare,
  BarChart3,
  Database,
  UserPlus,
  Sliders,
  FileUp,
  BadgeCheck,
  RefreshCw,
  ArrowUpRight,
  MessageCircle,
  Building2,
  Stethoscope,
  Landmark,
  GraduationCap,
  Calendar,
  Send,
} from 'lucide-react';
import { VoiceDemoPlayer } from '../components/VoiceDemoPlayer';
import { PricingCards } from '../components/PricingCards';
import { FaqAccordion, FaqItem } from '../components/FaqAccordion';
import { HERO_STATIC_VOICE_BARS } from '../utils/audioWaveform';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createSlideHorizontalVariants,
  createScaleInVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from '../utils/motion';

const HOME_FAQS: FaqItem[] = [
  {
    question: 'How natural does the AI voice sound in Hindi and Indian English?',
    answer:
      'Our voice agents are engineered specifically for Indian conversational nuances. The agent handles natural pauses, spontaneous interruptions, and switches smoothly between English and Hindi while maintaining clear, conversational cadence.',
  },
  {
    question:
      'Can IndiaCalling connect with our existing Salesforce, HubSpot, or LeadSquared CRM?',
    answer:
      'Yes. We support bi-directional connectors and webhooks for popular CRMs including Salesforce, HubSpot, Zoho, and LeadSquared. Call summaries, qualification statuses, and scheduled follow-ups sync automatically.',
  },
  {
    question:
      'What happens when a customer asks a complex question outside the script?',
    answer:
      'The voice agent follows guardrailed domain knowledge mapped to your business workflows. If a caller has a specialized request requiring human intervention, the agent schedules a callback with your senior consultant or transfers the call.',
  },
  {
    question: 'How quickly can we set up an automated calling workflow?',
    answer:
      'You can configure your voice agent script, upload or connect your lead list, and begin automated inbound and outbound calling workflows without complex hardware setup.',
  },
];

const MotionLink = motion.create(Link);
const HOVER_TRANSITION: Transition = { duration: 0.18, ease: 'easeOut' };

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onScrollToDemo }) => {
  const shouldReduceMotion = usePrefersReducedMotion();

  const viewportTier = React.useMemo<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  }, []);

  // Memoize explicitly scoped initial, animate, and transition objects per element
  // without parent `variants` so parent motion containers never override child animations.
  const heroMotion = React.useMemo(() => {
    const isMobile = viewportTier === 'mobile';
    const isTablet = viewportTier === 'tablet';

    const badgeY = isMobile ? 12 : 16;
    const headlineY = isMobile ? 22 : isTablet ? 26 : 30;
    const descY = isMobile ? 16 : isTablet ? 19 : 22;
    const ctaY = isMobile ? 14 : 18;
    const cardX = isMobile ? 0 : isTablet ? 36 : 55;
    const cardY = isMobile ? 32 : 0;
    const timeScale = isMobile ? 0.85 : isTablet ? 0.94 : 1;

    const instantTransition: Transition = { duration: 0 };

    return {
      glow: {
        initial: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({ duration: 1.2, ease: 'easeOut' } as Transition),
      },
      badge: {
        initial: shouldReduceMotion
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.96, y: badgeY },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.5 * timeScale,
              delay: 0.05 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      headline: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: headlineY },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.75 * timeScale,
              delay: 0.15 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      description: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: descY },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.65 * timeScale,
              delay: 0.35 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      ctaPrimary: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: ctaY },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.55 * timeScale,
              delay: 0.55 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      ctaSecondary: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: ctaY },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.55 * timeScale,
              delay: 0.68 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      capabilities: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.6 * timeScale,
              delay: 0.85 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      card: {
        initial: shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: cardX, y: cardY, scale: 0.97 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              type: 'spring',
              duration: 0.9 * timeScale,
              bounce: 0.12,
              delay: 0.2 * timeScale,
            } as Transition),
      },
      cardHeader: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.5 * timeScale,
              delay: 0.45 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      voiceBar: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.5 * timeScale,
              delay: 0.68 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      bubbleAi: {
        initial: shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: -16, y: 12 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.55 * timeScale,
              delay: 0.95 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      bubbleCustomer: {
        initial: shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: 16, y: 12 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.55 * timeScale,
              delay: 1.25 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
      leadPanel: {
        initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: shouldReduceMotion
          ? instantTransition
          : ({
              duration: 0.55 * timeScale,
              delay: 1.55 * timeScale,
              ease: SMOOTH_EASE,
            } as Transition),
      },
    };
  }, [shouldReduceMotion, viewportTier]);

  return (
    <section
      data-testid="hero-section"
      className="relative w-full overflow-hidden bg-[#f9f9ff] py-16 md:py-24"
    >
      {/* Background Ambient Glow: 1.2s smooth fade & scale-in + continuous 9s subtle drift */}
      <motion.div
        data-testid="hero-ambient-glow"
        initial={heroMotion.glow.initial}
        animate={heroMotion.glow.animate}
        transition={heroMotion.glow.transition}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[640px] w-[880px] rounded-full bg-gradient-to-b from-[#0047c1]/12 via-[#155eef]/6 to-transparent blur-3xl animate-ambient-glow" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge: Fade in, scale 0.96 -> 1, slight upward movement, 500ms */}
            <motion.div
              data-testid="hero-badge"
              initial={heroMotion.badge.initial}
              animate={heroMotion.badge.animate}
              transition={heroMotion.badge.transition}
              className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] px-3.5 py-1.5 text-xs font-semibold text-[#155EEF] shadow-2xs mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#027A48]" />
              <span>Real-Time AI Telephony Engine</span>
            </motion.div>

            {/* Headline: Opacity 0 -> 1, Y 30px -> 0, Duration 750ms, Delay 150ms */}
            <motion.h1
              data-testid="hero-headline"
              initial={heroMotion.headline.initial}
              animate={heroMotion.headline.animate}
              transition={heroMotion.headline.transition}
              className="font-headline-xl text-[40px] sm:text-[48px] md:text-[56px] leading-[1.08] tracking-tight font-bold text-[#101828] mb-6"
            >
              Your AI Sales Agent <br className="hidden sm:inline" />
              Never Sleeps.
            </motion.h1>

            {/* Description: Opacity 0 -> 1, Y 22px -> 0, Duration 650ms, Delay 350ms */}
            <motion.p
              data-testid="hero-description"
              initial={heroMotion.description.initial}
              animate={heroMotion.description.animate}
              transition={heroMotion.description.transition}
              className="text-base sm:text-lg text-[#434655] max-w-xl mb-8 leading-relaxed"
            >
              Automate outbound prospecting, instantly qualify incoming inquiries in native Indian languages, and book meetings directly into your CRM 24/7.
            </motion.p>

            {/* CTA Buttons: Staggered entrance (Y 18px -> 0, Duration 550ms) + isolated hover/press feedback */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.div
                data-testid="hero-cta-primary"
                initial={heroMotion.ctaPrimary.initial}
                animate={heroMotion.ctaPrimary.animate}
                transition={heroMotion.ctaPrimary.transition}
              >
                <MotionLink
                  to="/book-demo"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                          boxShadow: '0 8px 20px -4px rgba(21, 94, 239, 0.30)',
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.98 }}
                  transition={HOVER_TRANSITION}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm px-6 py-3.5 font-semibold shadow-sm transition-colors duration-150 cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </MotionLink>
              </motion.div>

              <motion.div
                data-testid="hero-cta-secondary"
                initial={heroMotion.ctaSecondary.initial}
                animate={heroMotion.ctaSecondary.animate}
                transition={heroMotion.ctaSecondary.transition}
              >
                <motion.button
                  type="button"
                  onClick={onScrollToDemo}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                          boxShadow: '0 6px 16px -4px rgba(16, 24, 40, 0.08)',
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.98 }}
                  transition={HOVER_TRANSITION}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#101828] text-sm px-6 py-3.5 font-semibold shadow-2xs transition-colors duration-150 cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 text-[#155EEF]" />
                  <span>Listen to Voice Demo</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Capability Highlights: Fade in + slight upward movement, Duration 600ms, Delay 850ms */}
            <motion.div
              data-testid="hero-capabilities"
              initial={heroMotion.capabilities.initial}
              animate={heroMotion.capabilities.animate}
              transition={heroMotion.capabilities.transition}
              className="w-full pt-6 border-t border-[#E5EAF2] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-[#434655]"
            >
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#027A48]" />
                <span>Instant Inbound &amp; Outbound Calling</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#027A48]" />
                <span>Low-Latency Voice Conversations</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#027A48]" />
                <span>English &amp; Hindi Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: AI Conversation Card (Opacity 0, X 55px, Scale 0.97 -> 1, 900ms Spring, Delay 200ms) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div
              data-testid="hero-conversation-card"
              initial={heroMotion.card.initial}
              animate={heroMotion.card.animate}
              transition={heroMotion.card.transition}
              className="w-full max-w-md"
            >
              <div className="w-full rounded-2xl bg-white border border-[#E5EAF2] shadow-2xl p-5 relative overflow-hidden">
                {/* 1. Card Header Bar with Animated Green Status Indicator */}
                <motion.div
                  data-testid="hero-card-header"
                  initial={heroMotion.cardHeader.initial}
                  animate={heroMotion.cardHeader.animate}
                  transition={heroMotion.cardHeader.transition}
                  className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5EAF2]"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#0047c1]/10 text-[#0047c1] font-bold text-sm">
                      RY
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#101828]">
                          Riya
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#0047c1]/10 text-[#0047c1] font-medium">
                          AI Property Agent
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-[#737687] font-mono">
                          ACTIVE CALL WORKFLOW
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[11px] font-semibold text-[#027A48] tracking-wide uppercase">
                    <span
                      data-testid="live-call-status-dot"
                      className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-status-pulse"
                    />
                    <span>Live Call</span>
                  </span>
                </motion.div>

                {/* 2. Static Voice Stream Indicator with Gentle Status Pulse */}
                <motion.div
                  data-testid="hero-voice-bar"
                  initial={heroMotion.voiceBar.initial}
                  animate={heroMotion.voiceBar.animate}
                  transition={heroMotion.voiceBar.transition}
                  className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3 mb-4 flex items-center justify-between gap-2 h-14"
                >
                  <div className="flex items-center gap-1.5 shrink-0 pr-1">
                    <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-status-pulse" />
                    <span className="text-[11px] text-[#344054] font-medium font-mono">
                      Voice Stream
                    </span>
                  </div>
                  <div
                    data-testid="hero-static-voice-indicator"
                    className="flex items-center justify-center gap-1 flex-1 h-8 overflow-hidden px-1"
                    aria-hidden="true"
                  >
                    {HERO_STATIC_VOICE_BARS.map((ratio, i) => (
                      <div
                        key={i}
                        style={{ height: `${Math.round(ratio * 100)}%` }}
                        className="w-1 bg-[#155EEF]/75 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-[#027A48] font-semibold bg-[#ECFDF3] border border-[#ABEFC6] px-2 py-0.5 rounded ml-2 shrink-0">
                    Active • 380ms
                  </span>
                </motion.div>

                {/* 3 & 4. Sequential AI and Customer Conversation Bubbles */}
                <div className="space-y-3 mb-4">
                  <motion.div
                    data-testid="hero-bubble-ai"
                    initial={heroMotion.bubbleAi.initial}
                    animate={heroMotion.bubbleAi.animate}
                    transition={heroMotion.bubbleAi.transition}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#155eef] text-white flex items-center justify-center text-[10px] shrink-0 font-bold mt-1">
                      AI
                    </div>
                    <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-2xl rounded-tl-sm p-3 text-xs text-[#101828]">
                      <p className="leading-relaxed">
                        “We have a few properties matching your requirements in Satellite and South Bopal. Would you be interested in a site visit this Saturday?”
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    data-testid="hero-bubble-customer"
                    initial={heroMotion.bubbleCustomer.initial}
                    animate={heroMotion.bubbleCustomer.animate}
                    transition={heroMotion.bubbleCustomer.transition}
                    className="flex items-start gap-2.5 justify-end pl-8"
                  >
                    <div className="bg-white border border-[#E5EAF2] rounded-2xl rounded-tr-sm p-3 text-xs text-[#101828]">
                      <p className="leading-relaxed">
                        “Yes, Saturday morning works for me.”
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#e0e8ff] text-[#141b2c] flex items-center justify-center text-[10px] shrink-0 font-bold mt-1">
                      MS
                    </div>
                  </motion.div>
                </div>

                {/* 5. Lead Intelligence Panel Reveals Last */}
                <motion.div
                  data-testid="hero-lead-panel"
                  initial={heroMotion.leadPanel.initial}
                  animate={heroMotion.leadPanel.animate}
                  transition={heroMotion.leadPanel.transition}
                  className="rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] p-3"
                >
                  <div className="text-[11px] font-semibold text-[#475467] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Extracted Lead Intelligence</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF3] border border-[#ABEFC6] px-2 py-1 text-[11px] font-semibold text-[#027A48]">
                      High Intent
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-white border border-[#E5EAF2] px-2 py-1 text-[11px] font-medium text-[#344054]">
                      Budget: ₹55L – ₹65L
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-white border border-[#E5EAF2] px-2 py-1 text-[11px] font-medium text-[#344054]">
                      Visit: Saturday Morning
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export const HomePage: React.FC = () => {
  const shouldReduceMotion = usePrefersReducedMotion();

  const scrollToDemo = React.useCallback(() => {
    const el = document.getElementById('live-demo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const fadeUpHeader = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 22, 0.6),
    [shouldReduceMotion]
  );
  const slideLeft = React.useMemo(
    () => createSlideHorizontalVariants(shouldReduceMotion, 'left', 28, 0.65, 0.05),
    [shouldReduceMotion]
  );
  const slideRight = React.useMemo(
    () => createSlideHorizontalVariants(shouldReduceMotion, 'right', 28, 0.65, 0.12),
    [shouldReduceMotion]
  );
  const scaleIn = React.useMemo(
    () => createScaleInVariants(shouldReduceMotion, 0.65, 0.08),
    [shouldReduceMotion]
  );
  const staggerContainer = React.useMemo(
    () => createStaggerContainerVariants(shouldReduceMotion, 0.09, 0.05),
    [shouldReduceMotion]
  );
  const staggerItem = React.useMemo(
    () => createStaggerItemVariants(shouldReduceMotion, 20, 0.55),
    [shouldReduceMotion]
  );

  return (
    <div className="flex flex-col w-full text-[#141b2c]">
      {/* 1. HERO SECTION */}
      <HeroSection onScrollToDemo={scrollToDemo} />

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section className="w-full py-20 bg-white border-y border-[#E5EAF2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
          >
            <span className="inline-flex items-center justify-center bg-[#E0EAFF] text-[#155EEF] font-semibold text-xs px-3.5 py-1.5 rounded-full mb-4">
              Problem &amp; Solution
            </span>
            <h2 className="font-headline-xl text-[34px] md:text-[44px] font-bold text-[#101828] tracking-tight leading-tight mb-3">
              The Problem &amp; Our{' '}
              <span className="text-[#155EEF] relative inline-block font-bold">
                Solution
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 6C28 2 72 2 99 6"
                    stroke="#155EEF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-base text-[#475467] leading-relaxed max-w-xl mx-auto mt-2">
              Hiring and outreach often take too much time and manpower.
              <br className="hidden sm:inline" /> IndiaCalling makes it simple with AI calling.
            </p>
          </motion.div>

          {/* Main Comparison Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Floating Arrow Between Cards (Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
              <svg
                className="w-16 h-16 drop-shadow-md text-[#2E90FA]"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M14 36C26 22 42 22 52 30"
                  stroke="#155EEF"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path d="M44 23L54 31L42 39" fill="#155EEF" />
              </svg>
            </div>

            {/* Left Card: The Problem */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="bg-[#FFF4F2] border border-[#FECDCA] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#F04438] text-white flex items-center justify-center font-bold text-sm">
                    !
                  </span>
                  <span className="font-headline-sm text-xl font-bold text-[#D92D20]">
                    The Problem
                  </span>
                </div>

                {/* Illustration Canvas */}
                <div className="relative w-full h-[260px] bg-gradient-to-b from-white/50 to-white/20 rounded-2xl p-4 flex items-center justify-between mb-8 overflow-hidden border border-[#FECDCA]/50">
                  <div className="relative w-1/2 h-full flex items-end justify-center">
                    <svg
                      viewBox="0 0 240 220"
                      className="w-full h-full max-h-[230px] object-contain"
                      fill="none"
                    >
                      <path
                        d="M28 175C28 160 38 145 42 120C45 145 52 165 48 180"
                        stroke="#98A2B3"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="#D0D5DD"
                      />
                      <ellipse
                        cx="32"
                        cy="145"
                        rx="16"
                        ry="26"
                        transform="rotate(-20 32 145)"
                        fill="#D0D5DD"
                        opacity="0.7"
                      />
                      <ellipse
                        cx="50"
                        cy="135"
                        rx="14"
                        ry="24"
                        transform="rotate(18 50 135)"
                        fill="#D0D5DD"
                        opacity="0.7"
                      />
                      <path d="M26 175H54L50 205H30L26 175Z" fill="#98A2B3" />
                      <rect
                        x="12"
                        y="182"
                        width="36"
                        height="22"
                        rx="2"
                        fill="#F2F4F7"
                        stroke="#D0D5DD"
                        strokeWidth="1.5"
                      />
                      <rect x="8" y="204" width="230" height="8" rx="3" fill="#E4BCA3" />
                      <path d="M122 170L158 170L164 204H114L122 170Z" fill="#475467" />
                      <rect x="126" y="174" width="28" height="20" rx="1" fill="#1D2939" />
                      <path
                        d="M82 175C82 150 96 142 116 142C136 142 148 150 148 175L150 204H78L82 175Z"
                        fill="#1E3A8A"
                      />
                      <circle cx="116" cy="112" r="24" fill="#F9B48E" />
                      <path
                        d="M94 105C94 85 106 75 124 75C138 75 146 84 144 98C138 94 130 92 122 93C114 94 106 97 100 106Z"
                        fill="#271C19"
                      />
                      <path
                        d="M108 106L116 110M124 110L130 106"
                        stroke="#331E14"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M116 126C119 123 123 123 126 125"
                        stroke="#331E14"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Manual Call Queue Column */}
                  <div className="w-1/2 flex flex-col gap-2.5 items-end justify-center pl-2">
                    <div className="w-full max-w-[175px] bg-white rounded-full p-1.5 pr-2.5 flex items-center justify-between shadow-2xs border border-[#F2F4F7]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#E4E7EC] flex items-center justify-center text-[#475467] text-xs font-bold">
                          1
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="w-12 h-1.5 bg-[#D0D5DD] rounded-full" />
                          <span className="w-8 h-1.5 bg-[#E4E7EC] rounded-full" />
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#12B76A] flex items-center justify-center text-white">
                        <PhoneCall className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="w-full max-w-[175px] bg-white rounded-full p-1.5 pr-2.5 flex items-center justify-between shadow-2xs border border-[#FECDCA]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#FEE4E2] flex items-center justify-center text-[#B42318] text-xs font-bold">
                          2
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="w-12 h-1.5 bg-[#FECDCA] rounded-full" />
                          <span className="w-8 h-1.5 bg-[#FEE4E2] rounded-full" />
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#F04438] flex items-center justify-center text-white text-[10px] font-bold">
                        ✕
                      </div>
                    </div>

                    <div className="w-full max-w-[175px] bg-white rounded-full p-1.5 pr-2.5 flex items-center justify-between shadow-2xs border border-[#F2F4F7]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#E4E7EC] flex items-center justify-center text-[#475467] text-xs font-bold">
                          3
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="w-12 h-1.5 bg-[#D0D5DD] rounded-full" />
                          <span className="w-8 h-1.5 bg-[#E4E7EC] rounded-full" />
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#12B76A] flex items-center justify-center text-white">
                        <PhoneCall className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-white/90 border border-[#FECDCA]/60 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center mb-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#344054] leading-tight">
                    Call every candidate manually
                  </span>
                </div>
                <div className="bg-white/90 border border-[#FECDCA]/60 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#344054] leading-tight">
                    Takes too much time
                  </span>
                </div>
                <div className="bg-white/90 border border-[#FECDCA]/60 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center mb-1.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#344054] leading-tight">
                    Hard to manage many conversations
                  </span>
                </div>
                <div className="bg-white/90 border border-[#FECDCA]/60 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center mb-1.5">
                    <Wallet className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#344054] leading-tight">
                    Higher operational cost
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Card: The Solution */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="bg-[#F0F6FF] border border-[#B2DDFF] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#155EEF] text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </span>
                  <span className="font-headline-sm text-xl font-bold text-[#155EEF]">
                    The Solution with IndiaCalling
                  </span>
                </div>

                {/* Solution Illustration Canvas */}
                <div className="relative w-full h-[260px] bg-gradient-to-b from-white/70 to-white/30 rounded-2xl p-4 flex items-center justify-between mb-8 overflow-hidden border border-[#B2DDFF]/60">
                  <div className="relative w-1/2 h-full flex items-end justify-center">
                    <svg
                      viewBox="0 0 240 220"
                      className="w-full h-full max-h-[230px] object-contain"
                      fill="none"
                    >
                      <circle cx="145" cy="110" r="56" fill="#D1E9FF" opacity="0.5" />
                      <path d="M28 152L96 152L108 195H16L28 152Z" fill="#175CD3" />
                      <rect x="34" y="156" width="56" height="34" rx="2" fill="#155EEF" />
                      <g fill="#FFFFFF">
                        <rect x="48" y="170" width="3" height="8" rx="1.5" />
                        <rect x="54" y="166" width="3" height="16" rx="1.5" />
                        <rect x="60" y="163" width="3" height="22" rx="1.5" />
                        <rect x="66" y="167" width="3" height="14" rx="1.5" />
                        <rect x="72" y="171" width="3" height="6" rx="1.5" />
                      </g>
                      <rect
                        x="116"
                        y="145"
                        width="62"
                        height="54"
                        rx="16"
                        fill="#FFFFFF"
                        stroke="#D0D5DD"
                        strokeWidth="2"
                      />
                      <rect
                        x="114"
                        y="68"
                        width="66"
                        height="56"
                        rx="22"
                        fill="#FFFFFF"
                        stroke="#D0D5DD"
                        strokeWidth="2.5"
                      />
                      <rect x="122" y="76" width="50" height="40" rx="14" fill="#101828" />
                      <ellipse cx="137" cy="92" rx="3.5" ry="4.5" fill="#53B1FD" />
                      <ellipse cx="157" cy="92" rx="3.5" ry="4.5" fill="#53B1FD" />
                      <path
                        d="M142 102C144 105 150 105 152 102"
                        stroke="#53B1FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M110 92C110 60 184 60 184 92"
                        stroke="#155EEF"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Concurrent Active Calls Column */}
                  <div className="relative w-1/2 h-full flex items-center justify-end pl-2">
                    <div className="flex flex-col gap-2.5 items-end justify-center z-10 w-full max-w-[175px]">
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className="w-full bg-white rounded-full p-1.5 pr-2.5 flex items-center justify-between shadow-2xs border border-[#B2DDFF]"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#D1E9FF] flex items-center justify-center text-[#155EEF] text-xs font-bold">
                              {num}
                            </div>
                            <span className="text-[11px] font-semibold text-[#027A48]">
                              Connected
                            </span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-[#12B76A] flex items-center justify-center text-white">
                            <PhoneCall className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-white/95 border border-[#B2DDFF]/70 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center mb-1.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1D2939] leading-tight">
                    AI calls multiple people
                  </span>
                </div>
                <div className="bg-white/95 border border-[#B2DDFF]/70 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1D2939] leading-tight">
                    Handles conversations
                  </span>
                </div>
                <div className="bg-white/95 border border-[#B2DDFF]/70 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center mb-1.5">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1D2939] leading-tight">
                    Reach more people in less time
                  </span>
                </div>
                <div className="bg-white/95 border border-[#B2DDFF]/70 rounded-xl p-3 flex flex-col items-center text-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center mb-1.5">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1D2939] leading-tight">
                    Lower cost &amp; effort
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. LIVE AI CALLING DEMO SECTION (Uses exact uploaded English WAV & Hindi MP3) */}
      <section className="w-full py-16 md:py-24 bg-white scroll-mt-20" id="live-demo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Audio Sandbox
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              Experience Real-Time Indian Voice AI
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2">
              Listen to actual recorded property qualification calls in English and Hindi.
            </p>
          </motion.div>

          <VoiceDemoPlayer initialLanguage="hindi" variant="home" />
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (6-step process) */}
      <section className="w-full py-16 md:py-24 bg-[#F7F9FC] border-y border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Workflow Architecture
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              How IndiaCalling Works
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2">
              From lead list ingestion to booked meetings in six automated steps.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                num: '01',
                title: 'Onboarding & Trunk Setup',
                desc: 'Connect your business telecom trunk or configure carrier lines with guided onboarding.',
                Icon: UserPlus,
              },
              {
                num: '02',
                title: 'Set Up AI Agent',
                desc: 'Customize conversation scripts, tone, qualification questions, and regional language preferences.',
                Icon: Sliders,
              },
              {
                num: '03',
                title: 'Add Your Leads',
                desc: 'Upload CSV lists, connect form webhooks, or enable live CRM lead synchronization.',
                Icon: FileUp,
              },
              {
                num: '04',
                title: 'AI Starts Calling',
                desc: 'Automated concurrent dialing engages prospects with natural cadence and interruption handling.',
                Icon: PhoneCall,
              },
              {
                num: '05',
                title: 'Qualifies Leads',
                desc: 'Assesses buyer budget, location preference, and timeline to identify high-intent prospects.',
                Icon: BadgeCheck,
              },
              {
                num: '06',
                title: 'Book & Sync',
                desc: 'Schedules site visits or follow-up calls and updates CRM deal stages automatically.',
                Icon: RefreshCw,
              },
            ].map(({ num, title, desc, Icon }) => (
              <motion.div
                key={num}
                variants={staggerItem}
                className="bg-white border border-[#E5EAF2] rounded-xl p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#155EEF] tabular-nums">
                    {num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#101828] mb-1.5">{title}</h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. UNIFIED TELEPHONY & PIPELINE INTELLIGENCE PREVIEW */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Telephony Console
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              Unified Telephony &amp; Pipeline Intelligence
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2">
              Structured visibility into every automated conversation and qualified prospect.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-5xl mx-auto bg-white border border-[#E5EAF2] rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">
                  Sample Pipeline Activity View
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF3] text-[11px] font-semibold text-[#027A48]">
                  CRM Sync Workflow
                </span>
              </div>
              <div className="text-xs text-[#475467] font-medium">
                Real-time Lead Qualification Log
              </div>
            </div>

            <div className="overflow-x-auto border border-[#E5EAF2] rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-[12px] font-semibold text-[#475467] tracking-wider uppercase">
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Requirement</th>
                    <th className="py-3 px-4">Stated Budget</th>
                    <th className="py-3 px-4">Call Status</th>
                    <th className="py-3 px-4">Next Step Triggered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F4F7] text-xs sm:text-sm text-[#101828] tabular-nums">
                  <tr className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 px-4 font-semibold flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#155EEF]/10 text-[#155EEF] font-bold text-xs flex items-center justify-center">
                        MS
                      </div>
                      <span>Mr. Sharma</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#344054]">
                      2BHK Apartment, Satellite / South Bopal
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#101828]">
                      ₹55L – ₹65L
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Qualified
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#475467] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#155EEF]" />
                      <span>Site Visit Scheduled (Saturday Morning)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 px-4 font-semibold flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#027A48] font-bold text-xs flex items-center justify-center">
                        SC
                      </div>
                      <span>Super Corridor Inquiry</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#344054]">
                      Investment + Residential Plot
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#101828]">
                      ₹4 Cr – ₹6 Cr
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Callback Scheduled
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#475467] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Follow-up Call (Monday 6:00 PM)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 px-4 font-semibold flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                        AD
                      </div>
                      <span>Ananya Deshmukh</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#344054]">
                      Commercial Office Space Inquiry
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#101828]">
                      ₹1.8 Cr
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Qualified
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#475467] flex items-center gap-1.5">
                      <Send className="w-4 h-4 text-[#027A48]" />
                      <span>Property Brochure Dispatched via WhatsApp</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FEATURES SECTION */}
      <section className="w-full py-16 md:py-24 bg-[#F7F9FC] border-y border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Platform Capabilities
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              Everything Your AI Sales Agent Can Do.
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2 leading-relaxed">
              From the first automated call to follow-ups and CRM synchronization, simplify your entire customer communication process.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Instant Outbound & Inbound Calling',
                desc: 'Automatically call multiple leads as soon as they submit an enquiry. Reach prospects faster without manual dialing.',
                tag: 'Instant Lead Response',
                Icon: ArrowUpRight,
              },
              {
                title: 'Intelligent Lead Qualification',
                desc: 'Understand customer requirements, identify objections, and qualify leads based on budget, urgency, and interest.',
                tag: 'Smarter Lead Qualification',
                Icon: BadgeCheck,
              },
              {
                title: 'Automated Follow-ups & WhatsApp',
                desc: 'Automatically send WhatsApp messages, share property details, and schedule follow-up calls.',
                tag: 'Automated Follow-ups',
                Icon: MessageCircle,
              },
              {
                title: 'Native Two-Way CRM Sync',
                desc: 'Connect with popular CRMs and automatically synchronize customer details, call summaries, and lead statuses.',
                tag: 'Seamless CRM Integration',
                Icon: RefreshCw,
              },
            ].map(({ title, desc, tag, Icon }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="bg-white border border-[#E5EAF2] rounded-2xl p-8 shadow-2xs flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] flex items-center justify-center text-[#155EEF] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#101828] mb-3">{title}</h3>
                  <p className="text-sm text-[#475467] leading-relaxed">{desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#F2F4F7]">
                  <span className="text-xs font-semibold text-[#155EEF]">
                    {tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. INDUSTRIES PREVIEW SECTION */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Targeted Vertical Applications
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              One AI. Multiple Industries.
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2 leading-relaxed">
              Automate customer conversations with AI solutions designed for your business needs.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                index: '01 • Real Estate',
                title: 'Property Qualification & Site Visits',
                desc: 'Pre-qualify buyers on budget and location before assigning senior brokers.',
                outcome: 'Automated Site Visit Scheduling',
                href: '/industries?sector=realestate#interactive-scenarios',
                Icon: Building2,
              },
              {
                index: '02 • Healthcare',
                title: 'Appointments & Follow-ups',
                desc: 'Automate patient consultation bookings, diagnostic reminders, and post-care check-ins.',
                outcome: 'Reduced Appointment No-Shows',
                href: '/industries?sector=healthcare#interactive-scenarios',
                Icon: Stethoscope,
              },
              {
                index: '03 • Banking & BFSI',
                title: 'Loans, Insurance & Reminders',
                desc: 'Qualify pre-approved loan candidates, verify documents, and handle polite payment reminders.',
                outcome: 'Structured Audit Trail',
                href: '/industries?sector=finance#interactive-scenarios',
                Icon: Landmark,
              },
              {
                index: '04 • Education',
                title: 'Admissions & Counseling',
                desc: 'Connect with applicants immediately after form submission, filter course interest, and book counseling calls.',
                outcome: 'Faster Applicant Response',
                href: '/industries#industry-matrix',
                Icon: GraduationCap,
              },
            ].map(({ index, title, desc, outcome, href, Icon }) => (
              <motion.div key={index} variants={staggerItem} className="flex">
                <Link
                  to={href}
                  className="group w-full bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-2xs flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F2F4F7] text-[#344054] group-hover:bg-[#155EEF] group-hover:text-white flex items-center justify-center transition-colors duration-200 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#155EEF] mb-1 block">
                      {index}
                    </span>
                    <h3 className="text-base font-bold text-[#101828] mb-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E5EAF2] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#027A48]">{outcome}</span>
                    <ArrowRight className="w-4 h-4 text-[#155EEF] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. PRICING & FAQ PREVIEW */}
      <section className="w-full py-16 md:py-24 bg-[#F7F9FC] border-y border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-[#0047c1] font-semibold uppercase tracking-wider">
              Transparent Investment
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#101828] mt-2">
              Predictable Pricing Built for Scale
            </h2>
            <p className="text-sm sm:text-base text-[#434655] mt-2">
              Two clear packages designed for growing sales teams and high-volume enterprises.
            </p>
          </motion.div>

          <div className="mb-20">
            <PricingCards variant="home" />
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUpHeader}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-bold text-[#101828]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] mt-1">
                Clear answers to your technical and operational questions.
              </p>
            </motion.div>
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="rounded-3xl bg-[#EFF6FF] border border-[#B2CCFF] p-8 md:p-14 text-center max-w-5xl mx-auto shadow-xs relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#B2CCFF] text-xs font-semibold text-[#155EEF] mb-6">
                Quick Guided Setup
              </span>
              <h2 className="font-headline-xl text-3xl md:text-[42px] leading-tight font-bold text-[#101828] mb-4">
                Ready to Transform Your Calling Process?
              </h2>
              <p className="text-base text-[#344054] mb-8 leading-relaxed">
                Let your AI sales agent handle customer conversations while your team focuses on closing qualified deals.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm px-7 py-3.5 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  Book a Demo
                </Link>
                <button
                  type="button"
                  onClick={scrollToDemo}
                  className="inline-flex items-center justify-center rounded-xl bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#101828] text-sm px-7 py-3.5 font-semibold shadow-2xs hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  Hear a Recorded Call
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
