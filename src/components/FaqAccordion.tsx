import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SMOOTH_EASE, usePrefersReducedMotion } from '../utils/motion';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = usePrefersReducedMotion();

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={item.question}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.45, delay: idx * 0.06, ease: SMOOTH_EASE }
            }
            className={`bg-white border rounded-xl overflow-hidden transition-colors duration-200 ${
              isOpen
                ? 'border-[#155EEF]/35 shadow-sm'
                : 'border-[#E5EAF2] shadow-2xs hover:border-[#CBD5E1]'
            }`}
          >
            <button
              type="button"
              onClick={() => handleToggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base font-semibold text-[#101828]">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.25, ease: SMOOTH_EASE }
                }
                className="shrink-0 flex items-center justify-center"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isOpen ? 'text-[#155EEF]' : 'text-[#475467]'
                  }`}
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="faq-answer"
                  initial={
                    shouldReduceMotion
                      ? { height: 'auto', opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { height: 0, opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.26, ease: SMOOTH_EASE }
                  }
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 text-sm text-[#475467] leading-relaxed border-t border-[#F2F4F7]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
