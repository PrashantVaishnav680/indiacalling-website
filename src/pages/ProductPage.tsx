import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  PhoneCall,
  PhoneMissed,
  Clock,
  Repeat,
  Mic,
  ArrowLeftRight,
  BadgeCheck,
  Calendar,
  Database,
  BarChart2,
  MessageSquare,
  LogIn,
  CloudUpload,
  HelpCircle,
  CalendarCheck,
  FileText,
  Gauge,
  Check,
} from 'lucide-react';
import { VoiceDemoPlayer } from '../components/VoiceDemoPlayer';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createScaleInVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from '../utils/motion';

export const ProductPage: React.FC = () => {
  const shouldReduceMotion = usePrefersReducedMotion();

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
      <section className="relative w-full overflow-hidden py-16 lg:py-24 bg-[#f9f9ff]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[540px] w-[780px] rounded-full bg-gradient-to-b from-[#0047c1]/10 via-[#155eef]/5 to-transparent blur-3xl animate-ambient-glow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Actions */}
            <div className="lg:col-span-6 space-y-6">
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
                  Autonomous Voice Intelligence
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
                className="font-display text-4xl sm:text-5xl lg:text-[54px] text-[#101828] font-extrabold tracking-tight leading-[1.08]"
              >
                Autonomous AI Voice Agents That Speak{' '}
                <span className="text-[#155eef]">Like Humans</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.65, delay: 0.28, ease: SMOOTH_EASE }
                }
                className="text-base sm:text-lg text-[#434655] max-w-xl leading-relaxed"
              >
                IndiaCalling enables businesses to automate inbound and outbound phone calls with human-like conversational voice agents, natural regional nuances, and immediate CRM synchronization.
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
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#155eef] text-white text-sm font-semibold shadow-md hover:bg-[#0047c1] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#141b2c] text-sm font-semibold shadow-2xs hover:bg-[#EFF6FF] hover:-translate-y-0.5 transition-all duration-200 border border-[#E5EAF2]"
                >
                  <span>Explore Features</span>
                </a>
              </motion.div>

              {/* Voice Specs */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, delay: 0.56, ease: SMOOTH_EASE }
                }
                className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5EAF2]"
              >
                <div>
                  <div className="text-lg font-bold text-[#101828]">Real-Time</div>
                  <div className="text-xs text-[#475467]">Conversational Flow</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#101828]">Multilingual</div>
                  <div className="text-xs text-[#475467]">English &amp; Hindi</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#027A48]">Automated</div>
                  <div className="text-xs text-[#475467]">CRM Synchronization</div>
                </div>
              </motion.div>
            </div>

            {/* Right: Calling Interface Illustration */}
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
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl bg-white shadow-2xl p-6 border border-[#E5EAF2]">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#155eef]/10 text-[#155eef] font-semibold">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#101828] flex items-center gap-2">
                        Active Inbound &amp; Outbound Voice Engine
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-status-pulse" />
                          LIVE
                        </span>
                      </div>
                      <div className="text-xs text-[#475467] font-mono">
                        Autonomous Agent • Indian English &amp; Hindi
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#027A48] font-mono font-semibold">
                      Natural Cadence
                    </div>
                  </div>
                </div>

                {/* Spectrum Activity */}
                <div className="my-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF2] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#475467]">
                    <span className="font-medium">Real-Time Voice Streaming</span>
                    <span className="font-mono text-[11px] text-[#027A48] font-semibold">
                      High Fidelity • Interruption Aware
                    </span>
                  </div>
                  <div className="h-10 flex items-center justify-between gap-1 px-1">
                    {[24, 55, 80, 42, 70, 90, 50, 82, 38, 86, 46, 72].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1.5 bg-[#155eef] rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Calling Interface Bubble Stream */}
                <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF2]">
                  <div className="flex flex-col items-end">
                    <div className="bg-white border border-[#E5EAF2] text-[#101828] p-3 rounded-2xl rounded-br-none shadow-2xs max-w-[88%] text-xs">
                      <span className="font-semibold text-[#155EEF] block text-[11px] mb-1">
                        Customer
                      </span>
                      Hi, I filled an inquiry form earlier today regarding residential properties in Ahmedabad.
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="bg-[#EFF6FF] border border-[#D1E9FF] text-[#101828] p-3 rounded-2xl rounded-bl-none shadow-2xs max-w-[90%] text-xs">
                      <span className="font-semibold text-[#155EEF] block text-[11px] mb-1">
                        IndiaCalling AI Voice Agent
                      </span>
                      Certainly! Which location do you prefer and what is your approximate budget so I can share matching options and schedule a site visit?
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5EAF2] flex items-center justify-between text-xs">
                  <span className="text-[#475467] font-medium">
                    Call State: Connected &amp; Qualifying
                  </span>
                  <span className="text-[#155EEF] font-semibold">
                    CRM Webhook: Ready
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT DEMONSTRATION (Wired to Real Uploaded Audio Files) */}
      <section className="py-20 bg-white border-y border-[#E5EAF2] scroll-mt-20" id="product-demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-3xl mx-auto text-center space-y-4 mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
              Product Demonstration
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight">
              Experience How AI Voice Agents Interact in Real Time
            </h2>
            <p className="text-base text-[#475467] leading-relaxed">
              Observe natural conversation flow, intent qualification, and appointment scheduling using our recorded English and Hindi call demos.
            </p>
          </motion.div>

          <VoiceDemoPlayer initialLanguage="hindi" variant="product" />
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section className="py-20 bg-[#f9f9ff] scroll-mt-20" id="the-problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
              The Problem
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight">
              Manual Calling Bottlenecks Restrict Enterprise Growth
            </h2>
            <p className="text-base text-[#475467] leading-relaxed">
              Traditional call operations are constrained by human bandwidth, leading to lost customer intent, slow response times, and inconsistent qualification.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={staggerItem}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FEF3F2] text-[#D92D20] flex items-center justify-center mb-6">
                <PhoneMissed className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-[#101828] font-bold mb-3">
                Missed Calls &amp; Long Queues
              </h3>
              <p className="text-sm text-[#475467] leading-relaxed">
                Inbound callers abandon calls during peak volume, while after-hours prospects slip through without immediate answering availability.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-[#101828] font-bold mb-3">
                Delayed Follow-ups
              </h3>
              <p className="text-sm text-[#475467] leading-relaxed">
                Hours or days pass between form fills and first contact attempts. Response delays directly lower lead qualification and buyer interest.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="p-8 rounded-2xl bg-white border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F2F4F7] text-[#344054] flex items-center justify-center mb-6">
                <Repeat className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-[#101828] font-bold mb-3">
                Repetitive Tasks &amp; Fatigue
              </h3>
              <p className="text-sm text-[#475467] leading-relaxed">
                Representatives spend hours repeating identical introductory pitches and basic screening questions rather than closing high-value deals.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CORE PRODUCT CAPABILITIES */}
      <section className="py-24 bg-white scroll-mt-20" id="capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
                Core Product Capabilities
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight mt-1">
                Built for Complete Call Lifecycle Automation
              </h2>
            </div>
            <p className="text-sm text-[#475467] max-w-md">
              Explore the seven foundational capabilities that power resilient, compliant, and natural voice workflows for enterprise teams.
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
                title: 'AI Voice Conversations',
                desc: 'Human-grade speech synthesis with natural cadence, regional inflection, and intelligent pause handling for effortless dialogue.',
                footer: 'Natural speech synthesis',
                Icon: Mic,
              },
              {
                title: 'Inbound & Outbound Calling',
                desc: 'Receive incoming customer calls round the clock or trigger outbound campaigns immediately upon web lead generation.',
                footer: 'Automated bidirectional dialer',
                Icon: ArrowLeftRight,
              },
              {
                title: 'Lead Qualification',
                desc: 'Dynamically collect budget, intent, location preference, and requirement parameters to filter high-intent prospects accurately.',
                footer: 'Rule-based & semantic scoring',
                Icon: BadgeCheck,
              },
              {
                title: 'Appointment Scheduling',
                desc: 'Check calendar availability in real time and schedule appointments, site visits, or advisor callbacks during the live call.',
                footer: 'Calendar integration',
                Icon: Calendar,
              },
              {
                title: 'CRM Integration',
                desc: 'Write verified customer details, custom field tags, and transcripts into Salesforce, HubSpot, LeadSquared, or Zoho.',
                footer: 'Two-way record synchronization',
                Icon: Database,
              },
              {
                title: 'Call Analytics & Insights',
                desc: 'Monitor call completion rates, conversation outcomes, and qualification statuses on operational dashboards.',
                footer: 'Objective telemetry & reporting',
                Icon: BarChart2,
              },
            ].map(({ title, desc, footer, Icon }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] hover:border-[#155eef]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#155eef] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg text-[#101828] font-bold mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E5EAF2] text-xs text-[#155EEF] font-semibold">
                  {footer}
                </div>
              </motion.div>
            ))}

            {/* 7th Capability (Full width spanned) */}
            <motion.div
              variants={staggerItem}
              className="md:col-span-2 lg:col-span-3 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg text-[#101828] font-bold mb-1">
                    Automated Follow-ups
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] max-w-2xl">
                    Trigger automated WhatsApp messages, SMS summaries, calendar invite links, or callback confirmations immediately upon call completion.
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold shrink-0">
                WhatsApp &amp; SMS Triggers
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. HOW THE SYSTEM WORKS */}
      <section className="py-24 bg-[#f9f9ff] scroll-mt-20" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
              Workflow Visualization
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight">
              From Lead Ingestion to Completed Call
            </h2>
            <p className="text-sm sm:text-base text-[#475467]">
              A clean, automated four-stage process that powers reliable conversations from first touch to CRM resolution.
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
                step: '1',
                title: 'Lead Received',
                desc: 'A new inquiry arrives via web forms, CRM webhooks, API triggers, or an inbound customer phone call.',
                meta: 'Webhook / Inbound Dial',
                Icon: LogIn,
              },
              {
                step: '2',
                title: 'Agent Initiates Call',
                desc: 'The autonomous voice engine dials promptly, connects via telecom SIP trunks, and introduces the call.',
                meta: 'Automated Call Connect',
                Icon: PhoneCall,
              },
              {
                step: '3',
                title: 'Interactive Dialogue',
                desc: 'The agent conducts a natural conversation, qualifies requirements, answers questions, and books appointments.',
                meta: 'Dynamic Conversational Flow',
                Icon: MessageSquare,
              },
              {
                step: '4',
                title: 'Sync & Dispatch',
                desc: 'Full call transcript, extracted tags, and appointment dates are written to CRM, followed by instant messaging follow-ups.',
                meta: 'CRM Update + WhatsApp Confirmation',
                Icon: CloudUpload,
              },
            ].map(({ step, title, desc, meta, Icon }) => (
              <motion.div
                key={step}
                variants={staggerItem}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E5EAF2] hover:border-[#155EEF] hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#155eef] text-white font-bold flex items-center justify-center text-base">
                      {step}
                    </span>
                    <Icon className="w-5 h-5 text-[#155EEF]" />
                  </div>
                  <h3 className="text-lg text-[#101828] font-bold mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5EAF2] text-[11px] text-[#475467] font-mono">
                  {meta}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. REAL ESTATE USE CASE */}
      <section className="py-24 bg-white scroll-mt-20" id="use-case">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-3xl mx-auto text-center space-y-3 mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold">
              Representative Industry Scenario
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight">
              Real Estate: Property Inquiries &amp; Site Visit Scheduling
            </h2>
            <p className="text-sm sm:text-base text-[#475467]">
              See how IndiaCalling handles a high-intent real estate workflow. The platform adapts equally to healthcare, financial services, education, and e-commerce.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <motion.div
              variants={staggerItem}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#155eef]/10 text-[#155eef] flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#101828] mb-2">
                1. Instant Inquiry Response
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                When a buyer expresses interest on a property listing, the agent dials to confirm interest in residential units or investment plots and verifies location preferences.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#155eef]/10 text-[#155eef] flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#101828] mb-2">
                2. Site Visit Scheduling
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                The voice agent checks relationship manager availability, proposes weekend site visit slots or weekday follow-up calls, and locks in confirmed times.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#155eef]/10 text-[#155eef] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#101828] mb-2">
                3. CRM Update &amp; Brochure Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                Budget expectations and scheduled visit timestamps are added to the CRM lead card, while location pins and brochures are dispatched via WhatsApp.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. PERFORMANCE AND ANALYTICS */}
      <section className="py-24 bg-[#f9f9ff] scroll-mt-20" id="analytics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
                Monitoring &amp; Observability
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#101828] font-bold tracking-tight mt-1">
                Performance and Analytics for Voice Operations
              </h2>
            </div>
            <p className="text-sm text-[#475467] max-w-md">
              Gain direct visibility into operational calling volume, completion ratios, conversation outcomes, and qualification markers.
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
                title: 'Call Volume & Status',
                desc: 'Track active concurrent streams, total calls placed, connected calls, and pickup completion across daily campaigns.',
                metrics: 'Placed · Connected · Abandoned',
                Icon: PhoneCall,
              },
              {
                title: 'Outcome Qualification',
                desc: 'Evaluate qualified vs unqualified prospect ratios according to your defined parameters (budget, timeline, authority).',
                metrics: 'Qualified · Follow-up · Disqualified',
                Icon: BadgeCheck,
              },
              {
                title: 'Response Latency Health',
                desc: 'Observe speech-to-text, reasoning, and text-to-speech round-trip performance to maintain natural cadence.',
                metrics: 'STT · Inference · TTS Health',
                Icon: Gauge,
              },
              {
                title: 'Transcripts & Recordings',
                desc: 'Review searchable conversation transcripts, audio playback files, and timestamped caller inquiry logs.',
                metrics: 'Full Transcripts · Audio Archive',
                Icon: FileText,
              },
            ].map(({ title, desc, metrics, Icon }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-6 rounded-2xl bg-white border border-[#E5EAF2] shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[#155eef] mb-3">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-[#101828] mb-2">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5EAF2] text-[11px] text-[#475467] font-medium">
                  {metrics}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="relative overflow-hidden rounded-3xl bg-[#101828] text-[#edf0ff] p-10 sm:p-16 shadow-xl"
          >
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                Autonomous Enterprise Telephony
              </div>
              <h2 className="font-headline-xl text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Automate Your Business Phone Calls?
              </h2>
              <p className="text-base text-[#d2daf0] max-w-xl leading-relaxed">
                Deploy intelligent, human-like voice agents on IndiaCalling to handle inbound support, qualify leads, and scale calls without operational bottlenecks.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#155eef] text-white text-sm font-semibold shadow-lg hover:bg-[#0047c1] hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#product-demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#80fab9]" />
                  <span>Listen to Demo</span>
                </a>
              </div>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#d2daf0]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#80fab9]" /> Fast Integration
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#80fab9]" /> English &amp; Hindi Support
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#80fab9]" /> CRM Webhook Sync
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
