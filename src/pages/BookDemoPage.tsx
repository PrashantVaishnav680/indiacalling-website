import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Volume2,
  Terminal,
} from 'lucide-react';
import { VoiceDemoPlayer } from '../components/VoiceDemoPlayer';
import {
  DemoRequestInput,
  DemoRequestErrors,
  validateDemoRequest,
} from '../utils/validation';
import {
  submitDemoBookingRequest,
  DemoBookingResponse,
} from '../services/contactService';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createSlideHorizontalVariants,
} from '../utils/motion';

const INDUSTRY_OPTIONS = [
  'Real Estate',
  'Healthcare',
  'Banking & Finance (BFSI)',
  'Education',
  'E-commerce & Retail',
  'Travel & Hospitality',
  'Logistics & Supply Chain',
  'Other Enterprise Sector',
];

const INDUSTRY_QUERY_MAP: Record<string, string> = {
  realestate: 'Real Estate',
  'real estate': 'Real Estate',
  healthcare: 'Healthcare',
  finance: 'Banking & Finance (BFSI)',
  bfsi: 'Banking & Finance (BFSI)',
  'banking & finance (bfsi)': 'Banking & Finance (BFSI)',
  education: 'Education',
  ecommerce: 'E-commerce & Retail',
  'e-commerce & retail': 'E-commerce & Retail',
  travel: 'Travel & Hospitality',
  'travel & hospitality': 'Travel & Hospitality',
  logistics: 'Logistics & Supply Chain',
  'logistics & supply chain': 'Logistics & Supply Chain',
};

const MONTHLY_VOLUME_OPTIONS = [
  'Below 1,000 calls',
  '1,000–10,000 calls',
  '10,000–50,000 calls',
  '50,000+ calls',
  'Not sure yet',
];

const PREFERRED_LANGUAGE_OPTIONS = ['Hindi', 'English', 'Both'];

export const BookDemoPage: React.FC = () => {
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUpHeader = createFadeUpVariants(prefersReducedMotion, 20, 0.52);
  const slideLeft = createSlideHorizontalVariants(prefersReducedMotion, 'left', 24, 0.56);
  const slideRight = createSlideHorizontalVariants(prefersReducedMotion, 'right', 24, 0.56);

  const [formData, setFormData] = useState<DemoRequestInput>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    industry: '',
    monthlyVolume: '',
    preferredLanguage: 'Both',
    additionalRequirements: '',
    privacyConsent: false,
  });

  useEffect(() => {
    const rawIndustry = (searchParams.get('industry') || '').trim();
    if (!rawIndustry) return;
    const mapped =
      INDUSTRY_QUERY_MAP[rawIndustry.toLowerCase()] ||
      INDUSTRY_OPTIONS.find(
        (opt) => opt.toLowerCase() === rawIndustry.toLowerCase()
      );
    if (mapped) {
      setFormData((prev) => ({
        ...prev,
        industry: prev.industry || mapped,
      }));
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<DemoRequestErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<DemoBookingResponse | null>(null);

  const handleFieldChange = (
    field: keyof DemoRequestInput,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateDemoRequest(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitDemoBookingRequest(formData);
      setSubmissionResult(response);
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while validating your demo request.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setSubmitError(null);
    setErrors({});
    setFormData({
      fullName: '',
      workEmail: '',
      phoneNumber: '',
      companyName: '',
      industry: '',
      monthlyVolume: '',
      preferredLanguage: 'Both',
      additionalRequirements: '',
      privacyConsent: false,
    });
  };

  return (
    <div className="flex flex-col w-full bg-[#f9f9ff] text-[#141b2c] pb-24">
      {/* SECTION 1: HERO */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden bg-gradient-to-b from-[#f1f3ff]/70 to-[#f9f9ff] border-b border-[#E5EAF2]">
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[240px] bg-[#dbe1ff]/50 rounded-full blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: SMOOTH_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold mb-6 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Voice AI Architecture Walkthrough</span>
          </motion.div>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.06, ease: SMOOTH_EASE }}
            className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#101828] font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-5"
          >
            See IndiaCalling.ai in Action
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.12, ease: SMOOTH_EASE }}
            className="text-base sm:text-lg text-[#434655] max-w-2xl mx-auto leading-relaxed"
          >
            Experience how intelligent voice AI agents transform business conversations and automate customer interactions.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: VOICE DEMONSTRATION */}
      <section className="w-full py-16 bg-white border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={fadeUpHeader}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F4F7] text-[#475467] text-xs font-semibold mb-3">
              <Volume2 className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>Recorded Call Samples</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight">
              Listen to Real AI Conversations
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] mt-2">
              Hindi selected by default, followed by English. Switch languages anytime to compare dialect cadences.
            </p>
          </motion.div>

          {/* Voice Demo Player: Hindi default / first, English second */}
          <VoiceDemoPlayer initialLanguage="hindi" variant="home" />
        </div>
      </section>

      {/* SECTION 3: BOOK YOUR DEMO FORM */}
      <section className="w-full py-16 md:py-20" id="request-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Demo Request Form */}
            <motion.div
              ref={formCardRef}
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="lg:col-span-7 bg-white border border-[#E5EAF2] rounded-3xl p-6 sm:p-10 shadow-md scroll-mt-24"
            >
              <AnimatePresence mode="wait">
                {submissionResult ? (
                  <motion.div
                    key="demo-success"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.32, ease: SMOOTH_EASE }}
                    className="space-y-6 py-2"
                    data-testid="demo-success-state"
                    role="status"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#155EEF] text-xs font-mono font-semibold mb-2">
                        Request ID: {submissionResult.referenceId}
                      </span>
                      <h2 className="text-2xl font-bold text-[#101828]">
                        Demo Request Staged &amp; Received
                      </h2>
                      <p className="text-sm text-[#475467] mt-2 leading-relaxed">
                        Thank you, <strong>{submissionResult.payload.fullName}</strong>. Our solutions team will contact you at{' '}
                        <strong>{submissionResult.payload.workEmail}</strong> to coordinate a live, customized walkthrough for{' '}
                        <strong>{submissionResult.payload.companyName}</strong>.
                      </p>
                    </div>

                    {/* Summary of Request */}
                    <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-5 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                        <span className="text-[#475467]">Industry:</span>
                        <span className="font-semibold text-[#101828]">
                          {submissionResult.payload.industry}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                        <span className="text-[#475467]">Calling Volume:</span>
                        <span className="font-semibold text-[#101828]">
                          {submissionResult.payload.monthlyVolume}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                        <span className="text-[#475467]">Preferred Language:</span>
                        <span className="font-semibold text-[#101828]">
                          {submissionResult.payload.preferredLanguage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475467]">Phone Number:</span>
                        <span className="font-semibold text-[#101828] font-mono">
                          {submissionResult.payload.phoneNumber}
                        </span>
                      </div>
                    </div>

                    {/* Honest Coordination Notice */}
                    <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#B2DDFF] text-xs text-[#101828] space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-[#155EEF]">
                        <Terminal className="w-4 h-4" />
                        <span>Next Steps &amp; Backend Service Notice</span>
                      </div>
                      <p className="text-[#344054] leading-relaxed">
                        Our solutions engineers review your calling volume and requirements before the call. A team member will reach out directly to schedule a live call test to your phone. Staged for future connection to{' '}
                        <code className="bg-white px-1.5 py-0.5 rounded border border-[#B2DDFF] font-mono text-[11px] text-[#155EEF]">
                          POST /api/demos
                        </code>
                        .
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm font-semibold transition-colors cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="demo-form"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                    data-testid="demo-booking-form"
                  >
                    <div className="border-b border-[#E5EAF2] pb-4 mb-2">
                      <h2 className="text-2xl font-bold text-[#101828] tracking-tight">
                        Let's Build Your AI Calling Experience
                      </h2>
                      <p className="text-xs sm:text-sm text-[#475467] mt-1.5 leading-relaxed">
                        Tell us about your business and our team will help you explore the right voice AI solution.
                      </p>
                    </div>

                    {(submitError || Object.keys(errors).length > 0) && (
                      <div
                        role="alert"
                        data-testid="demo-error-banner"
                        className="p-4 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs sm:text-sm flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#D92D20]" />
                        <div>
                          <span className="font-semibold block">
                            Please review the highlighted fields
                          </span>
                          <span>
                            {submitError ||
                              'Complete all required fields and accept the privacy consent to request your demo.'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="demo-name"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Full Name <span className="text-[#D92D20]">*</span>
                        </label>
                        <input
                          id="demo-name"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleFieldChange('fullName', e.target.value)
                          }
                          placeholder="e.g., Rohit Verma"
                          aria-invalid={Boolean(errors.fullName)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                            errors.fullName
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div>
                        <label
                          htmlFor="demo-email"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Work Email <span className="text-[#D92D20]">*</span>
                        </label>
                        <input
                          id="demo-email"
                          name="workEmail"
                          type="email"
                          value={formData.workEmail}
                          onChange={(e) =>
                            handleFieldChange('workEmail', e.target.value)
                          }
                          placeholder="rohit@enterprise.com"
                          aria-invalid={Boolean(errors.workEmail)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                            errors.workEmail
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        />
                        {errors.workEmail && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.workEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone Number with country code */}
                      <div>
                        <label
                          htmlFor="demo-phone"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Phone Number with Country Code{' '}
                          <span className="text-[#D92D20]">*</span>
                        </label>
                        <input
                          id="demo-phone"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleFieldChange('phoneNumber', e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          aria-invalid={Boolean(errors.phoneNumber)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                            errors.phoneNumber
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label
                          htmlFor="demo-company"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Company Name <span className="text-[#D92D20]">*</span>
                        </label>
                        <input
                          id="demo-company"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleFieldChange('companyName', e.target.value)
                          }
                          placeholder="e.g., Skyline Real Estate"
                          aria-invalid={Boolean(errors.companyName)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                            errors.companyName
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        />
                        {errors.companyName && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Industry Dropdown */}
                      <div>
                        <label
                          htmlFor="demo-industry"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Industry <span className="text-[#D92D20]">*</span>
                        </label>
                        <select
                          id="demo-industry"
                          name="industry"
                          value={formData.industry}
                          onChange={(e) =>
                            handleFieldChange('industry', e.target.value)
                          }
                          aria-invalid={Boolean(errors.industry)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] bg-white focus:outline-none transition-all ${
                            errors.industry
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        >
                          <option value="">Select your industry</option>
                          {INDUSTRY_OPTIONS.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                        {errors.industry && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.industry}
                          </p>
                        )}
                      </div>

                      {/* Expected Monthly Calling Volume */}
                      <div>
                        <label
                          htmlFor="demo-volume"
                          className="block text-xs font-semibold text-[#344054] mb-1.5"
                        >
                          Expected Monthly Calling Volume{' '}
                          <span className="text-[#D92D20]">*</span>
                        </label>
                        <select
                          id="demo-volume"
                          name="monthlyVolume"
                          value={formData.monthlyVolume}
                          onChange={(e) =>
                            handleFieldChange('monthlyVolume', e.target.value)
                          }
                          aria-invalid={Boolean(errors.monthlyVolume)}
                          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] bg-white focus:outline-none transition-all ${
                            errors.monthlyVolume
                              ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                              : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                          }`}
                        >
                          <option value="">Select expected volume</option>
                          {MONTHLY_VOLUME_OPTIONS.map((vol) => (
                            <option key={vol} value={vol}>
                              {vol}
                            </option>
                          ))}
                        </select>
                        {errors.monthlyVolume && (
                          <p className="text-xs text-[#D92D20] mt-1">
                            {errors.monthlyVolume}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Language */}
                    <div>
                      <label
                        htmlFor="demo-language"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Preferred Demo Language{' '}
                        <span className="text-[#D92D20]">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {PREFERRED_LANGUAGE_OPTIONS.map((lang) => {
                          const isChecked = formData.preferredLanguage === lang;
                          return (
                            <button
                              key={lang}
                              type="button"
                              onClick={() =>
                                handleFieldChange('preferredLanguage', lang)
                              }
                              className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                                isChecked
                                  ? 'bg-[#155EEF] border-[#155EEF] text-white shadow-2xs'
                                  : 'bg-white border-[#E5EAF2] text-[#344054] hover:bg-[#F8FAFC]'
                              }`}
                            >
                              {lang}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Additional Requirements (Optional) */}
                    <div>
                      <label
                        htmlFor="demo-requirements"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Additional Requirements{' '}
                        <span className="text-[#98A2B3] font-normal">
                          (Optional)
                        </span>
                      </label>
                      <textarea
                        id="demo-requirements"
                        name="additionalRequirements"
                        rows={3}
                        value={formData.additionalRequirements}
                        onChange={(e) =>
                          handleFieldChange(
                            'additionalRequirements',
                            e.target.value
                          )
                        }
                        placeholder="Share specific telephony setups (e.g. SIP trunking, Salesforce CRM, outbound campaigns, custom voice cloning)..."
                        className="w-full p-3.5 rounded-lg border border-[#E5EAF2] text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12 transition-all"
                      />
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div>
                      <label
                        htmlFor="demo-consent"
                        className="flex items-start gap-3 cursor-pointer select-none"
                      >
                        <input
                          id="demo-consent"
                          name="privacyConsent"
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) =>
                            handleFieldChange('privacyConsent', e.target.checked)
                          }
                          aria-invalid={Boolean(errors.privacyConsent)}
                          className="mt-0.5 w-4 h-4 rounded border-[#D0D5DD] text-[#155EEF] focus:ring-[#155EEF]"
                        />
                        <span className="text-xs text-[#475467] leading-relaxed">
                          I agree to IndiaCalling.ai processing my information to schedule a tailored voice AI demonstration.{' '}
                          <span className="text-[#D92D20]">*</span>
                        </span>
                      </label>
                      {errors.privacyConsent && (
                        <p className="text-xs text-[#D92D20] mt-1">
                          {errors.privacyConsent}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] disabled:opacity-60 text-white text-sm font-semibold py-3.5 px-6 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span>
                          {isSubmitting
                            ? 'Validating & Preparing...'
                            : 'Request a Demo'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right 5 Columns: What to Expect During the Demo */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-white border border-[#E5EAF2] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
                    Demo Experience
                  </span>
                  <h3 className="text-xl font-bold text-[#101828] mt-1">
                    What to Expect in Your Session
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] mt-1.5 leading-relaxed">
                    We tailor every demonstration directly to your existing customer workflows and telephony setup.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828]">
                        Live Inbound / Outbound Call
                      </h4>
                      <p className="text-xs text-[#475467] leading-relaxed mt-0.5">
                        Experience our Indian English and Hindi voice agent dialing directly to your mobile phone.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828]">
                        Workflow &amp; Intent Scripting
                      </h4>
                      <p className="text-xs text-[#475467] leading-relaxed mt-0.5">
                        Map your specific qualification rules, appointment slots, and escalation triggers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828]">
                        SIP Trunk &amp; CRM Integration
                      </h4>
                      <p className="text-xs text-[#475467] leading-relaxed mt-0.5">
                        Review carrier line connectivity, low-latency setup, and webhook delivery to your database.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & SLA Guarantee */}
              <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#101828]">
                  <ShieldCheck className="w-4 h-4 text-[#027A48]" />
                  <span>Enterprise Security &amp; Compliance</span>
                </div>
                <p className="text-xs text-[#475467] leading-relaxed">
                  All call audio streams and transcripts are processed through encrypted telecommunications channels adhering to Indian data protection and telecom standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
