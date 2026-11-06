import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SITE_ASSETS } from '../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080E22] text-[#98A2B3] pt-16 pb-12 px-6 lg:px-12 border-t border-[#1D2939]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14">
          {/* Column 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src={SITE_ASSETS.logoSvg}
                alt="IndiaCalling.ai Logo"
                className="w-9 h-9 rounded-xl shadow-xs shrink-0"
              />
              <span className="font-headline-sm text-[20px] font-bold tracking-tight text-white">
                IndiaCalling<span className="text-[#2E90FA]">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-[#98A2B3] max-w-sm leading-relaxed mb-4">
              AI-powered voice calling platform that helps businesses automate inbound and outbound customer conversations.
            </p>
            <a
              href="mailto:contact@indiacalling.ai"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#98A2B3] hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2E90FA]" />
              <span>contact@indiacalling.ai</span>
            </a>
          </div>

          {/* Column 2: PLATFORM */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-bold text-white tracking-widest uppercase mb-1">
              PLATFORM
            </span>
            <nav aria-label="Platform Links" className="flex flex-col gap-2.5">
              <Link to="/product" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Product Overview
              </Link>
              <Link to="/product#capabilities" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Capabilities
              </Link>
              <Link to="/product#how-it-works" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          {/* Column 3: SOLUTIONS */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-bold text-white tracking-widest uppercase mb-1">
              SOLUTIONS
            </span>
            <nav aria-label="Solutions Links" className="flex flex-col gap-2.5">
              <Link to="/industries" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                All Industries
              </Link>
              <Link to="/industries?sector=realestate" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Real Estate
              </Link>
              <Link to="/industries?sector=healthcare" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Healthcare
              </Link>
              <Link to="/industries?sector=finance" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Banking &amp; Finance
              </Link>
            </nav>
          </div>

          {/* Column 4: COMPANY */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-bold text-white tracking-widest uppercase mb-1">
              COMPANY
            </span>
            <nav aria-label="Company Links" className="flex flex-col gap-2.5">
              <Link to="/about" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/book-demo" className="text-sm text-[#98A2B3] hover:text-white transition-colors">
                Book a Demo
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1D2939]/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#98A2B3]">
          <p>© {new Date().getFullYear()} IndiaCalling.ai. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about#mission-vision" className="text-[#98A2B3] hover:text-white transition-colors">
              Mission &amp; Vision
            </Link>
            <Link to="/contact" className="text-[#98A2B3] hover:text-white transition-colors">
              Support &amp; Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
