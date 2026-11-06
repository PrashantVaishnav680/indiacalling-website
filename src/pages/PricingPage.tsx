import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, HelpCircle } from 'lucide-react';
import { PricingCards } from '../components/PricingCards';
import { FaqAccordion, FaqItem } from '../components/FaqAccordion';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createScaleInVariants,
} from '../utils/motion';

const PRICING_FAQS: FaqItem[] = [
  {
    question: 'How does IndiaCalling pricing work?',
    answer:
      'IndiaCalling operates on transparent usage pricing: Pay As You Go is charged at ₹6 per connected minute with prepaid wallet recharge and zero monthly fees or lock-in. For organizations with high call volumes and custom requirements, our Enterprise tier offers custom volume pricing with dedicated infrastructure and SLA guarantees.',
  },
  {
    question: 'Are there any hidden telecom fees or platform subscriptions?',
    answer:
      'No. Telephony and carrier infrastructure are fully included in the ₹6 per connected minute rate for Pay As You Go. There are zero monthly platform fees, zero setup fees, and no minimum commitments.',
  },
  {
    question: 'Can I bring my own telecom / SIP trunk (BYOC / BYOK)?',
    answer:
      'Yes. On the Enterprise tier, you can connect your existing carrier lines and SIP trunking providers (BYOC/BYOK) directly into our low-latency voice infrastructure.',
  },
  {
    question: 'What speech recognition and voice synthesis models are used?',
    answer:
      'Both plans include our proprietary Parrot STT tuned specifically for Indian English and regional accents, coupled with natural neural text-to-speech with authentic Indian cadence and fine-tuned LLMs.',
  },
];

const COMPARISON_ROWS = [
  {
    feature: 'Package Pricing',
    payg: '₹6 / connected min',
    enterprise: 'Custom Volume Pricing',
    highlightEnterprise: true,
  },
  {
    feature: 'Speech Recognition (STT)',
    payg: 'Proprietary Parrot STT (Indian speech)',
    enterprise: 'Advanced Multi-Dialect STT',
    highlightEnterprise: true,
  },
  {
    feature: 'Voice Synthesis (TTS)',
    payg: 'Natural TTS (Authentic accents)',
    enterprise: 'Custom Voice Cloning & Multi-speaker',
    highlightEnterprise: true,
  },
  {
    feature: 'LLM Intelligence',
    payg: 'Fine-tuned LLMs',
    enterprise: 'Custom Domain Fine-Tuned Models',
    highlightEnterprise: true,
  },
  {
    feature: 'Telephony Infrastructure',
    payg: 'Included Carrier & SIP Infrastructure',
    enterprise: 'Dedicated SIP Trunks (BYOC/BYOK)',
    highlightEnterprise: true,
  },
  {
    feature: 'Call Recordings & Transcripts',
    payg: 'check',
    enterprise: 'check',
    highlightEnterprise: false,
  },
  {
    feature: 'CRM & Analytics',
    payg: 'Free CRM & Webhook Access',
    enterprise: 'Bi-directional Enterprise CRM Connectors',
    highlightEnterprise: true,
  },
  {
    feature: 'On-Prem / VPC Deployment',
    payg: '—',
    enterprise: 'On-Premise & VPC Available',
    highlightEnterprise: true,
  },
  {
    feature: 'Forward Deployed Engineer (FDE)',
    payg: '—',
    enterprise: 'Dedicated FDE Support',
    highlightEnterprise: true,
  },
  {
    feature: 'Service Level Agreement (SLA)',
    payg: 'Standard Ticket & Community Support',
    enterprise: 'Enterprise SLA with 99.9% Uptime',
    highlightEnterprise: true,
  },
];

export const PricingPage: React.FC = () => {
  const shouldReduceMotion = usePrefersReducedMotion();

  const fadeUpHeader = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 22, 0.6),
    [shouldReduceMotion]
  );
  const scaleIn = React.useMemo(
    () => createScaleInVariants(shouldReduceMotion, 0.65, 0.08),
    [shouldReduceMotion]
  );

  return (
    <div className="flex flex-col w-full pb-24 bg-[#f9f9ff] text-[#141b2c]">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 text-center w-full">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-36 left-1/2 h-[420px] w-[680px] rounded-full bg-gradient-to-b from-[#0047c1]/10 via-[#155eef]/5 to-transparent blur-3xl animate-ambient-glow" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.05, ease: SMOOTH_EASE }
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold mb-6 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#027A48]" />
            <span>Official Transparent Pricing</span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.14, ease: SMOOTH_EASE }
            }
            className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#101828] tracking-tight max-w-4xl mx-auto mb-4 font-bold"
          >
            Simple, Transparent Pricing.
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.26, ease: SMOOTH_EASE }
            }
            className="text-base sm:text-lg text-[#475467] max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Choose the right AI calling plan for your business. Start on Pay As You Go with zero lock-in or scale to dedicated enterprise capacity.
          </motion.p>
        </div>
      </section>

      {/* 2. TWO PRICING PACKAGES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full mb-20">
        <PricingCards variant="pricing" />
      </section>

      {/* 3. COMPARE PLANS TABLE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full mb-24">
        <motion.div
          variants={fadeUpHeader}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="text-center mb-10"
        >
          <h2 className="font-headline-lg text-3xl text-[#101828] font-bold tracking-tight mb-3">
            Compare Plans
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Detailed capability comparison across Pay As You Go and Enterprise.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="bg-white rounded-2xl border border-[#E5EAF2] shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-[#E5EAF2] bg-[#F8FAFC]">
                <tr className="text-[#101828]">
                  <th className="py-5 px-6 text-sm font-semibold w-2/5">Features</th>
                  <th className="py-5 px-6 text-sm font-semibold w-3/10">
                    Pay As You Go (₹6/min)
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold w-3/10 text-[#155EEF]">
                    Enterprise Tier
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2] text-xs sm:text-sm text-[#101828]">
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-[#475467]">
                      {row.payg === 'check' ? (
                        <Check className="w-5 h-5 text-[#027A48]" />
                      ) : (
                        row.payg
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 ${
                        row.highlightEnterprise
                          ? 'font-semibold text-[#155EEF]'
                          : ''
                      }`}
                    >
                      {row.enterprise === 'check' ? (
                        <Check className="w-5 h-5 text-[#155EEF]" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full mb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="relative rounded-3xl bg-[#101828] p-10 md:p-14 overflow-hidden shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl space-y-3 z-10">
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Ready to Automate Your Calls?
            </h2>
            <p className="text-sm sm:text-base text-[#d2daf0] leading-relaxed">
              Deploy conversational AI phone agents that sound natural, speak English and Hindi, and integrate into your existing telecom setup.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full md:w-auto">
            <Link
              to="/book-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#155eef] text-white text-sm font-semibold shadow-md hover:bg-[#0047c1] hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95 cursor-pointer"
            >
              Book a Demo
            </Link>
            <Link
              to="/contact?plan=enterprise"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:-translate-y-0.5 text-sm font-semibold transition-all border border-white/20 cursor-pointer"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          variants={fadeUpHeader}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold mb-3">
            <HelpCircle className="w-4 h-4 text-[#155EEF]" />
            <span>Pricing &amp; Billing Questions</span>
          </div>
          <h2 className="font-headline-lg text-3xl text-[#101828] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <FaqAccordion items={PRICING_FAQS} />
      </section>
    </div>
  );
};
