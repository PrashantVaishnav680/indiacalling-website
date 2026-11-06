import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowDown,
  PhoneMissed,
  Mic,
  ArrowLeftRight,
  CheckCircle2,
  Flag,
  Eye,
  GitMerge,
  Ear,
  BarChart2,
  Zap,
  Database,
  Search,
  Brain,
  Gauge,
  RefreshCw,
  PhoneCall,
  Languages,
  Network,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
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

export const AboutPage: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fadeUpHeader = createFadeUpVariants(prefersReducedMotion, 22, 0.55);
  const slideLeft = createSlideHorizontalVariants(prefersReducedMotion, 'left', 26, 0.58);
  const slideRight = createSlideHorizontalVariants(prefersReducedMotion, 'right', 26, 0.58);
  const scaleIn = createScaleInVariants(prefersReducedMotion, 0.96, 18, 0.58);
  const staggerContainer = createStaggerContainerVariants(prefersReducedMotion, 0.08, 0.04);
  const staggerItem = createStaggerItemVariants(prefersReducedMotion, 20, 0.5);

  return (
    <div className="flex flex-col w-full text-[#141b2c]">
      {/* 1. ABOUT INDIACALLING (Hero Section) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f1f3ff]/70 to-[#f9f9ff] py-20 lg:py-28 border-b border-[#E5EAF2]">
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[#dbe1ff]/45 rounded-full blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: SMOOTH_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold shadow-2xs mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>About IndiaCalling.ai</span>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: SMOOTH_EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#101828] tracking-tight leading-tight font-extrabold mb-6"
            >
              AI-Powered Voice Infrastructure Built for{' '}
              <span className="text-[#155EEF]">Enterprise Precision</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: SMOOTH_EASE }}
              className="text-base sm:text-lg text-[#475467] max-w-3xl leading-relaxed"
            >
              IndiaCalling is an enterprise voice AI platform designed to automate and elevate business conversations. We bridge telecom engineering and conversational intelligence, solving traditional call center bottlenecks, missed connections, and rigid voice systems with real-time, context-aware voice agents.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: SMOOTH_EASE }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/book-demo"
                className="px-6 py-3 rounded-xl bg-[#155EEF] text-white text-sm font-semibold shadow-md shadow-[#155EEF]/15 hover:bg-[#0047c1] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Live Demo
              </Link>
              <a
                href="#mission-vision"
                className="px-6 py-3 rounded-xl bg-white text-[#101828] text-sm font-semibold shadow-2xs hover:bg-[#F8FAFC] transition-all flex items-center gap-2 border border-[#E5EAF2] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Learn Our Mission &amp; Vision</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* What IndiaCalling Aims to Solve: 3 Core Dimensions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
          >
            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              className="p-6 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#D92D20] flex items-center justify-center mb-4">
                  <PhoneMissed className="w-5 h-5" />
                </div>
                <h3 className="text-base text-[#101828] font-bold mb-2">
                  The Telecom Challenge
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Long wait queues, call abandonment, and rigid legacy IVR decision trees frustrate callers and lose valuable customer leads.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5EAF2] flex items-center gap-2 text-[#155EEF] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Call Ingestion</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              className="p-6 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] flex items-center justify-center mb-4">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-base text-[#101828] font-bold mb-2">
                  The Linguistic Challenge
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Diverse accents, rapid bilingual code-switching, and ambient cellular noise cause traditional speech recognition to fail.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5EAF2] flex items-center gap-2 text-[#155EEF] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Indic Acoustic Parsing</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              className="p-6 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center mb-4">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <h3 className="text-base text-[#101828] font-bold mb-2">
                  The Operational Challenge
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Manual disposition tagging and disconnected telephony silos delay CRM updates, pipeline attribution, and follow-up actions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5EAF2] flex items-center gap-2 text-[#027A48] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deterministic CRM Automation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. MISSION & 3. VISION (Dedicated Cards) */}
      <section
        className="w-full py-20 bg-white border-b border-[#E5EAF2] scroll-mt-20"
        id="mission-vision"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-[#155EEF] uppercase font-bold tracking-wider">
              Foundational Mandate
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight mt-2">
              Driven by Purpose, Guided by Precision
            </h2>
            <p className="text-sm sm:text-base text-[#475467] mt-3 leading-relaxed">
              Clear strategic commitments shaping how we design AI systems for business telephony.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#f9f9ff] border border-[#E5EAF2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] flex items-center justify-center text-[#155EEF] mb-6">
                  <Flag className="w-6 h-6" />
                </div>
                <span className="text-xs text-[#155EEF] font-bold uppercase tracking-widest block mb-2">
                  Our Mission
                </span>
                <h3 className="font-headline-md text-2xl text-[#101828] font-bold tracking-tight mb-4">
                  Making Business Communication More Efficient
                </h3>
                <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
                  To empower organizations by automating high-frequency conversational workflows through AI-powered voice technology—eliminating repetitive customer wait times, lowering operational overhead, and unlocking productive human focus.
                </p>
              </div>
              <div className="pt-8 flex flex-col gap-2.5 text-xs sm:text-sm text-[#475467]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0" />
                  <span>Prompt customer call resolution</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0" />
                  <span>Turnkey integration across enterprise telephony stacks</span>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#f9f9ff] border border-[#E5EAF2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] flex items-center justify-center text-[#027A48] mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs text-[#027A48] font-bold uppercase tracking-widest block mb-2">
                  Our Vision
                </span>
                <h3 className="font-headline-md text-2xl text-[#101828] font-bold tracking-tight mb-4">
                  Intelligent, Scalable &amp; Accessible Voice AI
                </h3>
                <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
                  To transform business customer operations through voice AI agents that listen, understand, and act with natural human nuance while maintaining machine dependability, elastic concurrency, and enterprise guardrails across every call.
                </p>
              </div>
              <div className="pt-8 flex flex-col gap-2.5 text-xs sm:text-sm text-[#475467]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0" />
                  <span>Multi-dialect acoustic intelligence at scale</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0" />
                  <span>Accessible voice automation for organizations of all sizes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY INDIACALLING */}
      <section className="w-full py-20 bg-[#f9f9ff] border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="text-xs text-[#155EEF] uppercase font-bold tracking-wider">
                The Architectural Advantage
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight mt-2">
                Why IndiaCalling
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#475467] max-w-md leading-relaxed">
              Engineered specifically for the real-time acoustic constraints, high concurrency demands, and deterministic requirements of modern enterprise business communication.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] flex items-center justify-center text-[#155EEF] mb-6">
                  <GitMerge className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-[#101828] font-bold mb-3">
                  Scalable Calling Automation
                </h3>
                <p className="text-sm text-[#475467] leading-relaxed">
                  Handle sudden surges in inbound customer inquiries or orchestrate scheduled outbound notification campaigns without latency spikes or staffing bottlenecks.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5EAF2] flex items-center justify-between">
                <span className="text-xs text-[#155EEF] font-semibold">
                  Elastic Concurrency
                </span>
                <Zap className="w-4 h-4 text-[#667085]" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] flex items-center justify-center text-[#155EEF] mb-6">
                  <Ear className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-[#101828] font-bold mb-3">
                  Natural Voice Interactions
                </h3>
                <p className="text-sm text-[#475467] leading-relaxed">
                  Lifelike conversational cadence, spontaneous interruption handling, natural pauses, and phonetically accurate accent modeling across multilingual dialogues.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5EAF2] flex items-center justify-between">
                <span className="text-xs text-[#155EEF] font-semibold">
                  Acoustic Naturalness
                </span>
                <Mic className="w-4 h-4 text-[#667085]" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#B2CCFF] flex items-center justify-center text-[#155EEF] mb-6">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-[#101828] font-bold mb-3">
                  Measurable Business Efficiency
                </h3>
                <p className="text-sm text-[#475467] leading-relaxed">
                  Transform spoken interactions into real-time CRM updates, qualification indicators, structured transcripts, and instant follow-up triggers for sales and support teams.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5EAF2] flex items-center justify-between">
                <span className="text-xs text-[#155EEF] font-semibold">
                  Direct CRM Sync
                </span>
                <Database className="w-4 h-4 text-[#667085]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. OUR APPROACH TO AI */}
      <section className="w-full py-20 bg-white border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs text-[#155EEF] uppercase font-bold tracking-wider">
              Engineering Methodology
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight mt-2">
              Our Approach to AI
            </h2>
            <p className="text-sm sm:text-base text-[#475467] mt-3 leading-relaxed">
              We build purposeful conversational AI centered on useful business interactions, bounded enterprise safety guardrails, and deterministic telephony execution.
            </p>
          </motion.div>

          {/* 4 Lifecycle Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                num: '01',
                title: 'Communication Mapping',
                desc: 'We review real business conversations to identify common caller needs, key customer questions, and clear conversation outcomes.',
                footer: 'Domain Grounding',
                Icon: Search,
              },
              {
                num: '02',
                title: 'Guardrailed Reasoning',
                desc: 'Pre-defined rules keep AI responses accurate, helpful, and securely aligned with your enterprise policies on every call.',
                footer: 'Deterministic Safety',
                Icon: Brain,
              },
              {
                num: '03',
                title: 'Low-Latency Delivery',
                desc: 'Voice agents listen and respond promptly without awkward pauses, creating natural and engaging two-way conversations.',
                footer: 'Instant Natural Delivery',
                Icon: Gauge,
              },
              {
                num: '04',
                title: 'Feedback Optimization',
                desc: 'Every call provides valuable learning insights, helping the system continuously improve clarity, customer satisfaction, and call resolutions.',
                footer: 'Continuous Refinement',
                Icon: RefreshCw,
              },
            ].map(({ num, title, desc, footer, Icon }) => (
              <motion.div
                key={num}
                variants={staggerItem}
                whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                className="p-6 rounded-2xl bg-[#f9f9ff] border border-[#E5EAF2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-sm font-bold flex items-center justify-center">
                      {num}
                    </span>
                    <Icon className="w-5 h-5 text-[#667085]" />
                  </div>
                  <h3 className="text-base text-[#101828] mb-2 font-bold">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5EAF2] text-xs text-[#155EEF] font-semibold">
                  {footer}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Acoustic Pipeline Breakdown Diagram */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="p-6 sm:p-8 rounded-2xl bg-[#f9f9ff] border border-[#E5EAF2] shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5EAF2]">
              <div className="flex items-center gap-3">
                <h3 className="text-base text-[#101828] font-bold">
                  Real-Time Audio &amp; Workflow Pipeline
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold self-start md:self-auto">
                Connected End-to-End Execution
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 relative">
              {[
                {
                  num: '1',
                  title: 'Audio Ingestion',
                  desc: 'Connects smoothly with standard business phone lines to capture clear caller audio.',
                  Icon: PhoneCall,
                  accent: false,
                },
                {
                  num: '2',
                  title: 'Voice & Dialect Recognition',
                  desc: 'Accurately understands spoken words, varied regional accents, and everyday bilingual phrasing.',
                  Icon: Languages,
                  accent: false,
                },
                {
                  num: '3',
                  title: 'Business Rules & CRM Logic',
                  desc: 'Identifies caller intent, retrieves customer records, and applies your exact business policies in real time.',
                  Icon: Network,
                  accent: false,
                },
                {
                  num: '4',
                  title: 'Natural Voice Response',
                  desc: 'Speaks back with warm, human-like pacing and pleasant cadence, logging summary details into your CRM.',
                  Icon: Mic,
                  accent: true,
                },
              ].map((step, idx) => (
                <div
                  key={step.num}
                  className="p-5 rounded-xl bg-white border border-[#E5EAF2] flex flex-col justify-between relative shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                          step.accent
                            ? 'bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48]'
                            : 'bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <step.Icon
                        className={`w-5 h-5 ${
                          step.accent ? 'text-[#027A48]' : 'text-[#667085]'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-[#101828] font-bold block mb-1.5">
                      {step.title}
                    </span>
                    <p className="text-xs text-[#475467] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E5EAF2] items-center justify-center text-[#667085] shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="rounded-3xl bg-[#155EEF] p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden flex flex-col items-center"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-xs">
              Next-Generation Voice Operations
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-5xl text-white max-w-3xl tracking-tight leading-tight font-bold mb-6">
              Ready to Modernize Your Voice Workflows?
            </h2>
            <p className="text-base sm:text-lg text-[#e7eaff] max-w-xl leading-relaxed mb-10">
              Explore how IndiaCalling transforms high-volume call queues into intelligent, dependable customer interactions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link
                to="/product"
                className="px-8 py-3.5 rounded-xl bg-white text-[#155EEF] text-sm font-semibold shadow-md hover:bg-[#F8FAFC] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Product
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-[#0047c1] text-white text-sm font-semibold shadow-2xs hover:bg-white/20 transition-all border border-white/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
