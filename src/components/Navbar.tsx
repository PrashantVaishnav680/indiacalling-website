import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SITE_ASSETS } from '../config/siteConfig';
import { SMOOTH_EASE, SOFT_SPRING, usePrefersReducedMotion } from '../utils/motion';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'Industries', path: '/industries' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5EAF2] shadow-[0_1px_8px_rgba(16,24,40,0.04)]">
      <div className="h-[76px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0 focus:outline-none"
          aria-label="IndiaCalling.ai Home"
        >
          <img
            src={SITE_ASSETS.logoSvg}
            alt="IndiaCalling.ai Logo"
            className="w-10 h-10 rounded-xl shadow-xs shrink-0 transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[19px] font-bold text-[#101828] tracking-tight leading-none">
              IndiaCalling<span className="text-[#155EEF]">.ai</span>
            </span>
            <span className="text-[10px] font-semibold text-[#475467] uppercase tracking-wider leading-none mt-1">
              Voice AI Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-[#F8FAFC] border border-[#E5EAF2] p-1.5 rounded-full"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#155EEF] font-semibold'
                    : 'font-medium text-[#475467] hover:text-[#101828]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={shouldReduceMotion ? { duration: 0 } : SOFT_SPRING}
                      className="absolute inset-0 rounded-full bg-white shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Prominent Book a Demo CTA & Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/book-demo"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-[#344054] hover:bg-[#F2F4F7] border border-[#E5EAF2] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            initial={
              shouldReduceMotion
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: 'auto' }}
            exit={
              shouldReduceMotion
                ? { opacity: 0, height: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.24, ease: SMOOTH_EASE }
            }
            className="md:hidden bg-white border-b border-[#E5EAF2] overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-3 pb-6">
              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#EFF6FF] text-[#155EEF]'
                          : 'text-[#344054] hover:bg-[#F8FAFC] hover:text-[#101828]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                <div className="pt-3 mt-2 border-t border-[#E5EAF2]">
                  <Link
                    to="/book-demo"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Book a Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
