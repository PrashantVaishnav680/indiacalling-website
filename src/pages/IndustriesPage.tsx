import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  GitBranch,
  Check,
  Calendar,
  PhoneCall,
  Bell,
  User,
  MessageSquare,
  BookOpen,
  CheckCircle2,
  CreditCard,
  Headphones,
  Package,
  Truck,
  Tag,
  Building2,
  Stethoscope,
  Landmark,
  Clock,
  Zap,
  Sliders,
  Users,
  ShieldCheck,
  Send,
  RefreshCw,
} from 'lucide-react';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  SOFT_SPRING,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createScaleInVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from '../utils/motion';

type ScenarioId = 'realestate' | 'healthcare' | 'finance';

export const IndustriesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('realestate');
  const shouldReduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sector = searchParams.get('sector');
    if (sector === 'realestate' || sector === 'healthcare' || sector === 'finance') {
      setActiveScenario(sector);
    }
  }, [searchParams]);

  const selectScenarioAndScroll = (scenario: ScenarioId) => {
    setActiveScenario(scenario);
    const el = document.getElementById('interactive-scenarios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeUpHeader = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 22, 0.6),
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
      <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#f9f9ff]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[540px] w-[780px] rounded-full bg-gradient-to-b from-[#0047c1]/10 via-[#155eef]/5 to-transparent blur-3xl animate-ambient-glow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.05, ease: SMOOTH_EASE }
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#027A48]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Tailored Vertical Telephony
                </span>
              </motion.div>

              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.7, delay: 0.14, ease: SMOOTH_EASE }
                }
                className="font-display text-4xl sm:text-5xl lg:text-[54px] text-[#101828] tracking-tight font-bold leading-tight"
              >
                AI Calling Solutions Built for{' '}
                <span className="text-[#155eef]">Every Industry</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.65, delay: 0.28, ease: SMOOTH_EASE }
                }
                className="text-base sm:text-lg text-[#434655] max-w-2xl leading-relaxed"
              >
                From real estate site visit bookings to banking payment reminders and patient appointment coordination, IndiaCalling delivers industry-focused voice agents that handle sector-specific customer conversations.
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, delay: 0.42, ease: SMOOTH_EASE }
                }
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#industry-matrix"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#155eef] text-white text-sm font-semibold shadow-md hover:bg-[#0047c1] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Explore Solutions</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#interactive-scenarios"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#101828] text-sm font-semibold shadow-2xs hover:bg-[#EFF6FF] hover:-translate-y-0.5 transition-all border border-[#E5EAF2] cursor-pointer"
                >
                  <GitBranch className="w-4 h-4 text-[#155EEF]" />
                  <span>Live Flow Simulators</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Visual AI Calling Workflow Illustration (5 cols) */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 40, scale: 0.97 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', duration: 0.85, bounce: 0.12, delay: 0.2 }
              }
              className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md bg-white border border-[#E5EAF2] rounded-2xl shadow-xl p-5 sm:p-6 relative">
                {/* Workflow Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E5EAF2]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] animate-status-pulse" />
                    <span className="text-xs font-bold text-[#101828] uppercase tracking-wider">
                      Autonomous Calling Pipeline
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#155EEF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#D1E9FF]">
                    Sub-350ms RT
                  </span>
                </div>

                {/* 4-Stage Connected Workflow Cards */}
                <div className="space-y-3 relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#E5EAF2] -z-0" />

                  {/* Stage 1: Lead Event Trigger */}
                  <div className="relative z-10 flex items-start gap-3 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#D1E9FF] text-[#155EEF] flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#101828]">Lead Ingestion</span>
                        <span className="text-[10px] font-mono text-[#027A48] bg-[#ECFDF3] px-1.5 py-0.2 rounded">
                          0.1s
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475467] mt-0.5">
                        Inbound form webhook or outbound batch call trigger.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2: Carrier SIP & Indic STT */}
                  <div className="relative z-10 flex items-start gap-3 bg-[#EFF8FF] border border-[#B2DDFF] rounded-xl p-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-[#155EEF] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#101828]">
                          Bilingual Speech Engine
                        </span>
                        <span className="text-[10px] font-mono text-[#155EEF] font-semibold">
                          Parrot STT
                        </span>
                      </div>
                      <p className="text-[11px] text-[#344054] mt-0.5">
                        Low-latency Indian English &amp; Hindi recognition.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3: LLM Intent & Slot Filling */}
                  <div className="relative z-10 flex items-start gap-3 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#D1E9FF] text-[#155EEF] flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#101828]">
                          Domain Qualification
                        </span>
                        <span className="text-[10px] font-mono text-[#475467]">
                          Extract Intent
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475467] mt-0.5">
                        Filters budget, preferred location, timeline, and objections.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4: Automated Action Handshake */}
                  <div className="relative z-10 flex items-start gap-3 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#101828]">
                          CRM Sync &amp; WhatsApp
                        </span>
                        <span className="text-[10px] font-mono text-[#027A48] font-semibold">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475467] mt-0.5">
                        Slots booked meeting and dispatches confirmation via API.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALIZED TELECOM WORKFLOWS (6 Industry Cards with Stitch Isometric SVGs) */}
      <section className="w-full bg-[#F8FAFC] py-20 border-y border-[#E5EAF2] scroll-mt-20" id="industry-matrix">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-[#155EEF] tracking-wider uppercase">
              INDUSTRY-SPECIFIC SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#101828] tracking-tight mt-2 font-display">
              Specialized Telecom Workflows
            </h2>
            <p className="text-[#475467] text-sm md:text-base leading-relaxed mt-3 max-w-xl mx-auto">
              Ready-to-use AI calling workflows built for different industries, tailored to their unique customer conversations and business goals.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {/* CARD 1: Real Estate */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    Real Estate
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <path d="M48 65L74 52V104L48 112V65Z" fill="#3B82F6" />
                    <path d="M74 52L96 62V108L74 104V52Z" fill="#60A5FA" />
                    <path d="M48 65L70 55L96 62L74 72L48 65Z" fill="#93C5FD" />
                    <rect fill="#EFF6FF" height="6" opacity="0.8" rx="1" width="4" x="54" y="70" />
                    <rect fill="#EFF6FF" height="6" opacity="0.8" rx="1" width="4" x="62" y="66" />
                    <rect fill="#EFF6FF" height="6" opacity="0.8" rx="1" width="4" x="54" y="80" />
                    <rect fill="#EFF6FF" height="6" opacity="0.8" rx="1" width="4" x="62" y="76" />
                    <path d="M88 38L122 22V100L88 110V38Z" fill="#2563EB" />
                    <path d="M122 22L152 34V102L122 100V22Z" fill="#60A5FA" />
                    <path d="M88 38L118 26L152 34L122 46L88 38Z" fill="#BFDBFE" />
                    <g fill="#EFF6FF">
                      <rect height="7" opacity="0.9" rx="1" width="5" x="94" y="44" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="103" y="40" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="112" y="36" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="94" y="56" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="103" y="52" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="112" y="48" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="94" y="68" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="103" y="64" />
                      <rect height="7" opacity="0.9" rx="1" width="5" x="112" y="60" />
                    </g>
                    <path d="M142 66L164 58V96L142 101V66Z" fill="#93C5FD" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  Real Estate Telephony
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Convert property inquiries into qualified leads and site visits.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#155EEF]" />
                    <span>Lead Qualification</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#155EEF]" />
                    <span>Site Visit Scheduling</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <PhoneCall className="w-4 h-4 text-[#155EEF]" />
                    <span>Automated Follow-ups</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => selectScenarioAndScroll('realestate')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] cursor-pointer"
                >
                  <span>Explore Real Estate</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* CARD 2: Healthcare */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    Healthcare
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <ellipse cx="70" cy="106" fill="#86EFAC" rx="9" ry="6" />
                    <ellipse cx="130" cy="106" fill="#86EFAC" rx="9" ry="6" />
                    <path d="M60 56H140V106H60V56Z" fill="#F8FAFC" />
                    <rect fill="#60A5FA" height="40" rx="3" width="28" x="52" y="66" />
                    <rect fill="#60A5FA" height="40" rx="3" width="28" x="120" y="66" />
                    <rect
                      fill="#FFFFFF"
                      height="54"
                      rx="4"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      width="48"
                      x="76"
                      y="52"
                    />
                    <rect fill="#93C5FD" height="9" rx="1" width="10" x="82" y="70" />
                    <rect fill="#93C5FD" height="9" rx="1" width="10" x="108" y="70" />
                    <path d="M94 92H106V106H94V92Z" fill="#3B82F6" />
                    <rect
                      fill="#EF4444"
                      height="20"
                      rx="4"
                      stroke="#DC2626"
                      strokeWidth="1"
                      width="20"
                      x="90"
                      y="36"
                    />
                    <path
                      d="M100 40V52M94 46H106"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  Healthcare Telephony
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Handle patient inquiries and appointments with AI.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#155EEF]" />
                    <span>Appointment Booking</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Bell className="w-4 h-4 text-[#155EEF]" />
                    <span>Reminder &amp; Follow-ups</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <User className="w-4 h-4 text-[#155EEF]" />
                    <span>Patient Information</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => selectScenarioAndScroll('healthcare')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] cursor-pointer"
                >
                  <span>Explore Healthcare</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* CARD 3: Education */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    Education
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <rect fill="#2563EB" height="12" rx="2" width="68" x="66" y="93" />
                    <rect fill="#F8FAFC" height="8" rx="1" width="62" x="69" y="95" />
                    <rect fill="#F59E0B" height="12" rx="2" width="60" x="70" y="81" />
                    <rect fill="#FEF3C7" height="8" rx="1" width="54" x="73" y="83" />
                    <path d="M84 56C84 56 86 70 100 70C114 70 116 56 116 56H84Z" fill="#1E3A8A" />
                    <path d="M100 36L142 52L100 68L58 52L100 36Z" fill="#2563EB" />
                    <circle cx="100" cy="52" fill="#F59E0B" r="3.5" />
                    <path
                      d="M100 52C116 52 138 56 140 68"
                      fill="none"
                      stroke="#F59E0B"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  Education Telephony
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Manage admission inquiries and application follow-ups.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <MessageSquare className="w-4 h-4 text-[#155EEF]" />
                    <span>Admission Enquiries</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <BookOpen className="w-4 h-4 text-[#155EEF]" />
                    <span>Course Information</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#155EEF]" />
                    <span>Application Status</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <Link
                  to="/contact?industry=Education"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99]"
                >
                  <span>Explore Education</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* CARD 4: Banking & Finance */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    Banking &amp; Finance
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <rect fill="#60A5FA" height="5" rx="1.5" width="96" x="52" y="100" />
                    <rect fill="#93C5FD" height="4" rx="1" width="88" x="56" y="96" />
                    <rect fill="#3B82F6" height="30" rx="1" width="10" x="66" y="62" />
                    <rect fill="#3B82F6" height="30" rx="1" width="10" x="85" y="62" />
                    <rect fill="#3B82F6" height="30" rx="1" width="10" x="105" y="62" />
                    <rect fill="#3B82F6" height="30" rx="1" width="10" x="124" y="62" />
                    <rect fill="#60A5FA" height="6" rx="1" width="84" x="58" y="55" />
                    <path d="M100 34L144 54H56L100 34Z" fill="#2563EB" />
                    <circle cx="100" cy="47" fill="#FFFFFF" r="3.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  Banking &amp; Finance
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Automate customer support, reminders, and verification calls.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <CreditCard className="w-4 h-4 text-[#155EEF]" />
                    <span>Customer Verification</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Bell className="w-4 h-4 text-[#155EEF]" />
                    <span>Payment Reminders</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Headphones className="w-4 h-4 text-[#155EEF]" />
                    <span>Enquiry Handling</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => selectScenarioAndScroll('finance')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] cursor-pointer"
                >
                  <span>Explore Banking</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* CARD 5: E-commerce & Retail */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    E-commerce
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <path
                      d="M58 48H68L80 88H126L134 58H72"
                      fill="none"
                      stroke="#2563EB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                    <circle cx="86" cy="98" fill="#1E3A8A" r="4.5" />
                    <circle cx="120" cy="98" fill="#1E3A8A" r="4.5" />
                    <rect fill="#F59E0B" height="18" rx="2" width="18" x="88" y="60" />
                    <rect fill="#D97706" height="20" rx="2" width="22" x="124" y="74" />
                    <rect fill="#F59E0B" height="17" rx="2" width="18" x="136" y="80" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  E-commerce &amp; Retail
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Handle order enquiries, delivery updates, and customer support.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Package className="w-4 h-4 text-[#155EEF]" />
                    <span>Order Enquiries</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Truck className="w-4 h-4 text-[#155EEF]" />
                    <span>Delivery Updates</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Headphones className="w-4 h-4 text-[#155EEF]" />
                    <span>Customer Support</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <Link
                  to="/contact?industry=E-commerce"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99]"
                >
                  <span>Explore E-commerce</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* CARD 6: Travel & Hospitality */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#155EEF] font-semibold text-xs border border-[#B2CCFF]/60">
                    Travel &amp; Hospitality
                  </span>
                </div>
                <div className="h-36 w-full flex items-center justify-center my-1">
                  <svg className="w-48 h-32" fill="none" viewBox="0 0 200 130">
                    <ellipse cx="100" cy="112" fill="#E0EDFF" opacity="0.7" rx="72" ry="12" />
                    <g transform="translate(48, 48) rotate(-15)">
                      <path d="M42 22L20 40L28 42L52 24Z" fill="#60A5FA" />
                      <path
                        d="M10 20C10 20 22 16 75 16C82 16 88 19 88 21C88 23 82 26 75 26C22 26 10 22 10 20Z"
                        fill="#EFF6FF"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                      />
                      <path d="M12 19L2 8L10 8L22 18Z" fill="#2563EB" />
                    </g>
                    <rect fill="#F59E0B" height="38" rx="5" width="28" x="136" y="66" />
                    <path
                      d="M145 66V60H155V66"
                      fill="none"
                      stroke="#78350F"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101828] font-display mt-2">
                  Travel &amp; Hospitality
                </h3>
                <p className="text-[#475467] text-xs md:text-sm mt-1.5 leading-relaxed">
                  Automate booking enquiries and reservation assistance.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#155EEF]" />
                    <span>Booking Enquiries</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Tag className="w-4 h-4 text-[#155EEF]" />
                    <span>Reservation Assistance</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#344054] text-xs md:text-sm font-medium">
                    <Headphones className="w-4 h-4 text-[#155EEF]" />
                    <span>Travel Support</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-2">
                <Link
                  to="/contact?industry=Travel"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99]"
                >
                  <span>Explore Hospitality</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. INTERACTIVE TELEPHONY WORKFLOWS (3-Tab Simulator) */}
      <section className="w-full py-20 bg-[#f9f9ff] scroll-mt-20" id="interactive-scenarios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-12 space-y-3"
          >
            <span className="text-xs text-[#155EEF] font-semibold uppercase tracking-wider">
              End-to-End Execution
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold">
              Interactive Telephony Workflows
            </h2>
            <p className="text-sm sm:text-base text-[#475467]">
              Explore how our AI triggers calls, conducts natural voice dialogues, collects customer intent, and performs CRM handoffs.
            </p>
          </motion.div>

          {/* Tab Controller */}
          <div
            role="tablist"
            aria-label="Industry Workflow Scenarios"
            className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#EFF6FF] border border-[#D1E9FF] rounded-xl max-w-xl mx-auto mb-12"
          >
            {(
              [
                { id: 'realestate', label: 'Real Estate', Icon: Building2 },
                { id: 'healthcare', label: 'Healthcare', Icon: Stethoscope },
                { id: 'finance', label: 'BFSI', Icon: Landmark },
              ] as const
            ).map(({ id, label, Icon }) => {
              const isSelected = activeScenario === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveScenario(id)}
                  className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'text-[#155EEF]'
                      : 'text-[#475467] hover:text-[#101828]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="industry-scenario-tab"
                      transition={shouldReduceMotion ? { duration: 0 } : SOFT_SPRING}
                      className="absolute inset-0 rounded-lg bg-white shadow-xs"
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {/* Scenario 1: Real Estate */}
            {activeScenario === 'realestate' && (
              <motion.div
                key="scenario-realestate"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: SMOOTH_EASE }
                }
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                data-testid="scenario-panel-realestate"
              >
                <div className="lg:col-span-7 bg-white rounded-xl p-8 shadow-2xs border border-[#E5EAF2] space-y-6">
                  <div className="flex items-center justify-between pb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-8 -mt-8 p-6 rounded-t-xl">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#155EEF] tracking-wider">
                        Workflow Sequence
                      </span>
                      <h3 className="text-lg text-[#101828] font-bold">
                        Site-Visit Booking Protocol
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs font-semibold">
                      Real Estate Pipeline
                    </span>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: '1',
                        title: 'Web Lead Trigger Received',
                        tag: 'Webhook',
                        desc: 'Prospect submits an inquiry form for a residential project on your website or property portal.',
                      },
                      {
                        step: '2',
                        title: 'Automated Outbound Call Initiated',
                        tag: 'Instant Dial',
                        desc: 'Voice agent dials the prospect and introduces the property project in English or Hindi.',
                      },
                      {
                        step: '3',
                        title: 'Conversational Budget & Unit Qualification',
                        tag: 'Natural Dialogue',
                        desc: 'Agent verifies requirement for 2BHK/3BHK or investment plot, preferred area, and budget range.',
                      },
                      {
                        step: '4',
                        title: 'Weekend Site-Visit Slot Confirmed',
                        tag: 'Calendar / CRM',
                        desc: 'Locks in a Saturday or Sunday site visit slot or schedules a senior consultant callback.',
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-[#155EEF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-[#101828] font-bold">
                              {item.title}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#155EEF] text-[11px] font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#475467] mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-2xs border border-[#E5EAF2]">
                    <div className="flex items-center justify-between pb-4 mb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-6 -mt-6 p-4 rounded-t-xl">
                      <span className="text-xs font-bold text-[#101828]">
                        Real Estate Conversation Excerpt
                      </span>
                      <span className="text-[11px] text-[#475467] font-mono">
                        Residential Inquiry
                      </span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Agent:
                        </span>
                        “Which location do you prefer and what’s your budget?”
                      </div>
                      <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-lg p-3">
                        <span className="text-[11px] text-[#344054] font-bold block mb-1">
                          Prospect:
                        </span>
                        “Satellite or South Bopal. My budget is around 55 to 65 lakh.”
                      </div>
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Agent:
                        </span>
                        “That’s great! We have a few properties matching your requirements. Would you be interested in a site visit this Saturday?”
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-2xs border border-[#E5EAF2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-[#027A48]" />
                      <div>
                        <span className="text-sm text-[#101828] font-semibold block">
                          CRM Record Updated
                        </span>
                        <span className="text-xs text-[#475467]">
                          Status: Site Visit Confirmed — High Intent
                        </span>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-[#027A48]" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Scenario 2: Healthcare */}
            {activeScenario === 'healthcare' && (
              <motion.div
                key="scenario-healthcare"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: SMOOTH_EASE }
                }
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                data-testid="scenario-panel-healthcare"
              >
                <div className="lg:col-span-7 bg-white rounded-xl p-8 shadow-2xs border border-[#E5EAF2] space-y-6">
                  <div className="flex items-center justify-between pb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-8 -mt-8 p-6 rounded-t-xl">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#027A48] tracking-wider">
                        Clinical Workflow
                      </span>
                      <h3 className="text-lg text-[#101828] font-bold">
                        Diagnostic &amp; Appointment Reminders
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs font-semibold">
                      Multilingual Care
                    </span>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: '1',
                        title: 'Appointment Schedule Trigger',
                        tag: 'Hospital System',
                        desc: 'Patient is scheduled for a morning diagnostic test or specialist consultation.',
                      },
                      {
                        step: '2',
                        title: 'AI Reminder Call in Preferred Language',
                        tag: 'Hindi / English',
                        desc: 'Voice agent reaches the patient with polite, clear appointment confirmation.',
                      },
                      {
                        step: '3',
                        title: 'Pre-Visit Preparation Instructions',
                        tag: 'Patient Guidance',
                        desc: 'Shares preparation instructions (such as fasting guidelines or bringing prior reports).',
                      },
                      {
                        step: '4',
                        title: 'Doctor Schedule Updated',
                        tag: 'Confirmed Slot',
                        desc: 'Marks the appointment slot as confirmed or assists with rescheduling if needed.',
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-[#155EEF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-[#101828] font-bold">
                              {item.title}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#155EEF] text-[11px] font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#475467] mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-2xs border border-[#E5EAF2]">
                    <div className="flex items-center justify-between pb-4 mb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-6 -mt-6 p-4 rounded-t-xl">
                      <span className="text-xs font-bold text-[#101828]">
                        Patient Reminder Dialogue
                      </span>
                      <span className="text-[11px] text-[#475467] font-mono">
                        Healthcare Desk
                      </span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Agent:
                        </span>
                        “Pranam Ramesh ji, kal subah 8 baje aapka blood test aur ultrasound scheduled hai. Kya aap confirm kar rahe hain?”
                      </div>
                      <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-lg p-3">
                        <span className="text-[11px] text-[#344054] font-bold block mb-1">
                          Patient:
                        </span>
                        “Haan, bilkul aaunga. Subah paani pi sakte hain?”
                      </div>
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Agent:
                        </span>
                        “Test se pehle fasting zaroori hai, thoda sa saada paani le sakte hain. Main appointment pass WhatsApp par bhej rahi hoon.”
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-2xs border border-[#E5EAF2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#027A48]" />
                      <div>
                        <span className="text-sm text-[#101828] font-semibold block">
                          Patient Privacy Guardrails
                        </span>
                        <span className="text-xs text-[#475467]">
                          Structured appointment confirmation &amp; audit log
                        </span>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-[#027A48]" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Scenario 3: BFSI */}
            {activeScenario === 'finance' && (
              <motion.div
                key="scenario-finance"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: SMOOTH_EASE }
                }
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                data-testid="scenario-panel-finance"
              >
                <div className="lg:col-span-7 bg-white rounded-xl p-8 shadow-2xs border border-[#E5EAF2] space-y-6">
                  <div className="flex items-center justify-between pb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-8 -mt-8 p-6 rounded-t-xl">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#155EEF] tracking-wider">
                        BFSI Reminders &amp; Verification
                      </span>
                      <h3 className="text-lg text-[#101828] font-bold">
                        Courteous EMI Reminder &amp; Inquiry Workflow
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs font-semibold">
                      Policy Guardrailed
                    </span>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: '1',
                        title: 'Account Reminder Trigger',
                        tag: 'Scheduled Event',
                        desc: 'Upcoming or pending installment reminder is queued for customer outreach.',
                      },
                      {
                        step: '2',
                        title: 'Courteous Outbound Voice Call',
                        tag: 'Respectful Tone',
                        desc: 'AI initiates the call during standard business hours using a polite, helpful tone.',
                      },
                      {
                        step: '3',
                        title: 'Query Resolution & Payment Link Dispatch',
                        tag: 'Dynamic Logic',
                        desc: 'If the customer requests a direct payment link, the agent dispatches it via SMS/WhatsApp.',
                      },
                      {
                        step: '4',
                        title: 'Disposition Logged in Core System',
                        tag: 'Instant Sync',
                        desc: 'Call summary and customer commitment timestamp are logged automatically.',
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-[#155EEF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-[#101828] font-bold">
                              {item.title}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#155EEF] text-[11px] font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#475467] mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-2xs border border-[#E5EAF2]">
                    <div className="flex items-center justify-between pb-4 mb-4 bg-[#F8FAFC] border-b border-[#E5EAF2] -mx-6 -mt-6 p-4 rounded-t-xl">
                      <span className="text-xs font-bold text-[#101828]">
                        Payment Reminder Dialogue
                      </span>
                      <span className="text-[11px] text-[#475467] font-mono">
                        Financial Services
                      </span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Assistant:
                        </span>
                        “Hello Ananya, I’m calling regarding your monthly installment reminder. Would you like me to share a direct payment link on your registered WhatsApp?”
                      </div>
                      <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-lg p-3">
                        <span className="text-[11px] text-[#344054] font-bold block mb-1">
                          Customer:
                        </span>
                        “Yes please, my netbanking had an OTP issue earlier. Send me the link.”
                      </div>
                      <div className="bg-[#EFF6FF] border border-[#D1E9FF] rounded-lg p-3">
                        <span className="text-[11px] text-[#155EEF] font-bold block mb-1">
                          AI Assistant:
                        </span>
                        “Certainly! I have sent the official payment link to your registered number. Thank you for your time.”
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-2xs border border-[#E5EAF2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5 text-[#027A48]" />
                      <div>
                        <span className="text-sm text-[#101828] font-semibold block">
                          Payment Link Dispatched
                        </span>
                        <span className="text-xs text-[#475467]">
                          Disposition logged in CRM
                        </span>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-[#027A48]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. INDUSTRY BENEFITS PILLARS */}
      <section className="w-full py-20 bg-white border-t border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-2xl mb-16 space-y-2"
          >
            <span className="text-xs text-[#155EEF] font-semibold uppercase tracking-wider">
              The Operational Edge
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold">
              Why Enterprises Choose IndiaCalling
            </h2>
            <p className="text-sm sm:text-base text-[#475467]">
              Built for high-throughput Indian telecom networks, regional language understanding, and dependable workflow execution.
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
                tag: 'Always On',
                title: '24/7 Availability',
                desc: 'Never miss an after-hours high-intent lead or late-night inquiry. Your voice operation responds round the clock.',
                Icon: Clock,
              },
              {
                tag: 'Prompt Action',
                title: 'Faster Response',
                desc: 'Eliminate hold times. Inbound calls are answered immediately and web lead forms are called back promptly.',
                Icon: Zap,
              },
              {
                tag: 'Efficiency Boost',
                title: 'Reduced Manual Workload',
                desc: 'Automate repetitive screening, qualification, and confirmation calls so your team can focus on closing.',
                Icon: Sliders,
              },
              {
                tag: 'Elastic Concurrency',
                title: 'Scalable Calling',
                desc: 'Scale simultaneous outbound or inbound voice conversations during peak campaigns without staffing bottlenecks.',
                Icon: Users,
              },
            ].map(({ tag, title, desc, Icon }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5EAF2] shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#155EEF]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#EFF6FF] text-[#155EEF] text-[11px] font-semibold mb-2">
                    {tag}
                  </span>
                  <h3 className="text-lg text-[#101828] font-bold">{title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CONVERSION CTA BANNER */}
      <section className="w-full py-16 bg-[#f9f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="relative overflow-hidden rounded-3xl bg-[#101828] text-[#edf0ff] p-10 md:p-16 shadow-xl"
          >
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#b4c5ff] text-xs uppercase font-semibold tracking-wider">
                Ready for Production Dialing
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Find Out How IndiaCalling Transforms Your Industry
              </h2>
              <p className="text-base text-[#d2daf0] max-w-2xl leading-relaxed">
                Schedule a tailored walkthrough with our team to explore how AI voice calling fits your industry workflow.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#155eef] text-white text-sm font-semibold shadow-md hover:bg-[#0047c1] hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <PhoneCall className="w-4 h-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                >
                  <span>View Pricing Plans</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
