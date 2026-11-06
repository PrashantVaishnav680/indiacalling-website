import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, Building2, Zap } from 'lucide-react';
import { PRICING_CONFIG } from '../config/siteConfig';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
} from '../utils/motion';

interface PricingCardsProps {
  variant?: 'home' | 'pricing';
}

export const PricingCards: React.FC<PricingCardsProps> = () => {
  const { payAsYouGo, enterprise } = PRICING_CONFIG;
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
      {/* Package 1: Pay As You Go (Most Popular) */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 24, scale: 0.985 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.6, delay: 0.05, ease: SMOOTH_EASE }
        }
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        className="bg-white border-2 border-[#155EEF] rounded-3xl p-7 sm:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden pt-10"
      >
        {/* Most Popular Badge */}
        <div className="absolute top-0 right-0 bg-[#155EEF] text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-xs tracking-wide flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{payAsYouGo.popularBadge}</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              {payAsYouGo.badge}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F2F4F7] text-[#475467] text-xs font-semibold">
              {payAsYouGo.lockInLabel}
            </span>
          </div>

          <h3 className="font-headline-sm text-2xl font-bold text-[#101828] mb-2 tracking-tight">
            {payAsYouGo.name}
          </h3>
          <p className="text-sm text-[#475467] leading-relaxed mb-6">
            {payAsYouGo.description}
          </p>

          {/* Prominent Official Price: ₹6 / connected minute */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D1E9FF] mb-6">
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span
                className="font-headline-xl text-4xl sm:text-5xl font-extrabold text-[#101828] tracking-tight tabular-nums"
                data-testid="official-price-payg"
              >
                {payAsYouGo.price}
              </span>
              <span className="text-base sm:text-lg font-semibold text-[#475467]">
                {payAsYouGo.priceUnit}
              </span>
            </div>
            <p className="text-xs text-[#027A48] font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Prepaid wallet recharge • No monthly fee or lock-in</span>
            </p>
          </div>

          {/* Billing Rules */}
          <div className="bg-[#EFF8FF] border border-[#B2DDFF]/60 rounded-xl p-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF] block mb-2">
              Billing Terms
            </span>
            <ul className="space-y-1.5 text-xs text-[#344054]">
              {payAsYouGo.billingBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-[#E5EAF2]"></div>
            <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#475467]">
              Included Capabilities
            </span>
          </div>

          <ul className="space-y-3 text-sm text-[#344054]">
            {payAsYouGo.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span className="leading-snug font-medium text-[#101828]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4 relative z-10">
          <Link
            to={payAsYouGo.ctaHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm py-3.5 px-6 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
          >
            <span>{payAsYouGo.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Package 2: Enterprise Tier */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 24, scale: 0.985 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.6, delay: 0.16, ease: SMOOTH_EASE }
        }
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        className="bg-white border border-[#E5EAF2] hover:border-[#CBD5E1] rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F4F7] border border-[#E5EAF2] text-xs font-bold text-[#344054] uppercase tracking-wider">
              {enterprise.badge}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#155EEF] text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>High-Volume Scale</span>
            </span>
          </div>

          <h3 className="font-headline-sm text-2xl font-bold text-[#101828] mb-2 tracking-tight">
            {enterprise.name}
          </h3>
          <p className="text-sm text-[#475467] leading-relaxed mb-6">
            {enterprise.description}
          </p>

          {/* Prominent Price: Custom Volume Pricing */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2] mb-6">
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span
                className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight"
                data-testid="official-price-enterprise"
              >
                {enterprise.price}
              </span>
              <span className="text-base sm:text-lg font-semibold text-[#475467]">
                {enterprise.priceUnit}
              </span>
            </div>
            <p className="text-xs text-[#475467] font-medium">
              Committed high-volume tiers &amp; dedicated carrier SIP trunking
            </p>
          </div>

          {/* Enterprise Terms */}
          <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344054] block mb-2">
              Enterprise Terms
            </span>
            <ul className="space-y-1.5 text-xs text-[#475467]">
              {enterprise.billingBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0047c1] shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-[#E5EAF2]"></div>
            <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#475467]">
              Enterprise Capabilities
            </span>
          </div>

          <ul className="space-y-3 text-sm text-[#344054]">
            {enterprise.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span className="leading-snug font-medium text-[#101828]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4">
          <Link
            to={enterprise.ctaHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-[#155EEF] hover:bg-[#EFF6FF] text-[#155EEF] text-sm py-3.5 px-6 font-semibold shadow-2xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
          >
            <span>{enterprise.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
