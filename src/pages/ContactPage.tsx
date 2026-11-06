import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Terminal,
  Sparkles,
} from 'lucide-react';
import {
  ContactFormInput,
  ContactFormErrors,
  validateContactForm,
} from '../utils/validation';
import {
  submitGeneralContactInquiry,
  GeneralContactResponse,
} from '../services/contactService';
import {
  DEFAULT_VIEWPORT,
  SMOOTH_EASE,
  usePrefersReducedMotion,
  createFadeUpVariants,
  createSlideHorizontalVariants,
} from '../utils/motion';

const ENQUIRY_TYPE_OPTIONS = [
  'General Enquiry',
  'Partnership',
  'Support',
  'Other',
];

const PLAN_CONTEXT_MAP: Record<string, { label: string; defaultMessage: string }> = {
  payg: {
    label: 'Pay As You Go Plan (₹6 / connected minute)',
    defaultMessage:
      'Hello IndiaCalling team, we would like to get started with the Pay As You Go plan (₹6/connected minute) and learn more about onboarding our voice workflows.',
  },
  enterprise: {
    label: 'Enterprise Custom Volume Plan',
    defaultMessage:
      'Hello IndiaCalling team, we are interested in Enterprise custom volume pricing, dedicated SIP trunking (BYOC/BYOK), and custom LLM/voice deployment options.',
  },
};

export const ContactPage: React.FC = () => {
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUpHeader = createFadeUpVariants(prefersReducedMotion, 20, 0.52);
  const slideLeft = createSlideHorizontalVariants(prefersReducedMotion, 'left', 24, 0.56);
  const slideRight = createSlideHorizontalVariants(prefersReducedMotion, 'right', 24, 0.56);

  const planParam = (searchParams.get('plan') || '').toLowerCase();
  const industryParam = searchParams.get('industry') || '';
  const selectedPlanContext = PLAN_CONTEXT_MAP[planParam];

  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: 'General Enquiry',
    message: '',
    privacyConsent: false,
  });

  useEffect(() => {
    if (selectedPlanContext) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: planParam === 'enterprise' ? 'Partnership' : 'General Enquiry',
        message: prev.message || selectedPlanContext.defaultMessage,
      }));
    } else if (industryParam) {
      setFormData((prev) => ({
        ...prev,
        message:
          prev.message ||
          `Hello IndiaCalling team, we are exploring AI voice calling automation for our ${industryParam} operations.`,
      }));
    }
  }, [planParam, industryParam, selectedPlanContext]);

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<GeneralContactResponse | null>(null);

  const handleFieldChange = (
    field: keyof ContactFormInput,
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

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitGeneralContactInquiry(formData);
      setSubmissionResult(response);
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while validating your request.'
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
      name: '',
      email: '',
      phone: '',
      company: '',
      enquiryType: 'General Enquiry',
      message: '',
      privacyConsent: false,
    });
  };

  return (
    <div className="flex flex-col w-full bg-[#f9f9ff] text-[#141b2c] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          variants={fadeUpHeader}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#B2CCFF] text-[#155EEF] text-xs font-semibold mb-4 shadow-2xs">
            <span>Corporate &amp; General Enquiries</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#101828] font-extrabold tracking-tight leading-tight mb-4">
            Contact IndiaCalling.ai
          </h1>
          <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
            Have a question about our voice AI infrastructure, carrier partnerships, or general corporate inquiries? Share your details and our team will get back to you promptly.
          </p>
          {selectedPlanContext && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Selected Plan Context: {selectedPlanContext.label}</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: General Contact Form (7 cols) */}
          <motion.div
            ref={formCardRef}
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="lg:col-span-7 bg-white border border-[#E5EAF2] rounded-2xl p-6 sm:p-10 shadow-md scroll-mt-24"
          >
            <AnimatePresence mode="wait">
              {submissionResult ? (
                <motion.div
                  key="contact-success"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: SMOOTH_EASE }}
                  className="space-y-6 py-2"
                  data-testid="contact-success-state"
                  role="status"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#155EEF] text-xs font-mono font-semibold mb-2">
                      Ref: {submissionResult.referenceId}
                    </span>
                    <h2 className="text-2xl font-bold text-[#101828]">
                      Enquiry Validated &amp; Staged (Frontend Only)
                    </h2>
                    <p className="text-sm text-[#475467] mt-2 leading-relaxed">
                      Thank you, <strong>{submissionResult.payload.name}</strong>. Your enquiry for{' '}
                      <strong>{submissionResult.payload.company}</strong> has passed client-side validation.
                    </p>
                  </div>

                  {/* Staged Details Summary */}
                  <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-5 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                      <span className="text-[#475467]">Enquiry Type:</span>
                      <span className="font-semibold text-[#101828]">
                        {submissionResult.payload.enquiryType}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                      <span className="text-[#475467]">Work Email:</span>
                      <span className="font-semibold text-[#101828]">
                        {submissionResult.payload.email}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5EAF2] pb-2">
                      <span className="text-[#475467]">Phone Number:</span>
                      <span className="font-semibold text-[#101828] font-mono">
                        {submissionResult.payload.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#475467]">Company:</span>
                      <span className="font-semibold text-[#101828]">
                        {submissionResult.payload.company}
                      </span>
                    </div>
                  </div>

                  {/* Explicit Frontend-Only Integration Notice */}
                  <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#B2DDFF] text-xs text-[#101828] space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#155EEF]">
                      <Terminal className="w-4 h-4" />
                      <span>Frontend Service Notice</span>
                    </div>
                    <p className="text-[#344054] leading-relaxed">
                      This submission is currently staged on the frontend only. No live external CRM or database has been contacted. The service is pre-configured for future connection to{' '}
                      <code className="bg-white px-1.5 py-0.5 rounded border border-[#B2DDFF] font-mono text-[11px] text-[#155EEF]">
                        POST /api/inquiries
                      </code>
                      .
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#0047c1] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <Link
                      to="/book-demo"
                      className="px-5 py-2.5 rounded-xl bg-white border border-[#E5EAF2] hover:bg-[#F8FAFC] text-[#101828] text-sm font-semibold transition-colors"
                    >
                      Book a Live Demo Instead
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                  data-testid="contact-form"
                >
                  <div className="border-b border-[#E5EAF2] pb-4 mb-2">
                    <h2 className="text-xl font-bold text-[#101828]">
                      Send a General Message
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475467] mt-1">
                      Fields marked with <span className="text-[#D92D20]">*</span> are required.
                    </p>
                  </div>

                  {(submitError || Object.keys(errors).length > 0) && (
                    <div
                      role="alert"
                      data-testid="contact-error-banner"
                      className="p-4 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs sm:text-sm flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#D92D20]" />
                      <div>
                        <span className="font-semibold block">
                          Please review the highlighted fields
                        </span>
                        <span>
                          {submitError ||
                            'Complete all required fields and accept the privacy consent to proceed.'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Full Name <span className="text-[#D92D20]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        placeholder="e.g., Vikram Sharma"
                        aria-invalid={Boolean(errors.name)}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                          errors.name
                            ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                            : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-[#D92D20] mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Work Email <span className="text-[#D92D20]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="vikram@company.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                          errors.email
                            ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                            : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#D92D20] mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Phone Number <span className="text-[#D92D20]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        aria-invalid={Boolean(errors.phone)}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                            : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#D92D20] mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-[#344054] mb-1.5"
                      >
                        Company Name <span className="text-[#D92D20]">*</span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        placeholder="e.g., ABC Enterprise"
                        aria-invalid={Boolean(errors.company)}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                          errors.company
                            ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                            : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                        }`}
                      />
                      {errors.company && (
                        <p className="text-xs text-[#D92D20] mt-1">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div>
                    <label
                      htmlFor="contact-enquiry-type"
                      className="block text-xs font-semibold text-[#344054] mb-1.5"
                    >
                      Enquiry Type <span className="text-[#D92D20]">*</span>
                    </label>
                    <select
                      id="contact-enquiry-type"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={(e) =>
                        handleFieldChange('enquiryType', e.target.value)
                      }
                      aria-invalid={Boolean(errors.enquiryType)}
                      className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#101828] bg-white focus:outline-none transition-all ${
                        errors.enquiryType
                          ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                          : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                      }`}
                    >
                      {ENQUIRY_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p className="text-xs text-[#D92D20] mt-1">
                        {errors.enquiryType}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#344054] mb-1.5"
                    >
                      Your Message <span className="text-[#D92D20]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        handleFieldChange('message', e.target.value)
                      }
                      placeholder="Tell us about your enquiry or partnership interest..."
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full p-3.5 rounded-lg border text-sm text-[#101828] placeholder-[#98A2B3] bg-white focus:outline-none transition-all ${
                        errors.message
                          ? 'border-[#FDA29B] ring-2 ring-[#F04438]/15'
                          : 'border-[#E5EAF2] focus:border-[#155EEF] focus:ring-3 focus:ring-[#155EEF]/12'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-[#D92D20] mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div>
                    <label
                      htmlFor="contact-consent"
                      className="flex items-start gap-3 cursor-pointer select-none"
                    >
                      <input
                        id="contact-consent"
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
                        I agree to IndiaCalling.ai processing my contact details to respond to my enquiry.{' '}
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
                          ? 'Validating Enquiry...'
                          : 'Submit Enquiry'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Business Contact Info & Demo Callout (5 cols) */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="lg:col-span-5 space-y-6"
          >
            {/* Dedicated Book a Demo Callout */}
            <div className="bg-[#EFF8FF] border border-[#B2DDFF] rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#155EEF] text-white text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Looking for a Live Demo?</span>
              </div>
              <h3 className="text-lg font-bold text-[#101828] mb-2">
                Experience Real Voice AI in Action
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed mb-4">
                Want to listen to real conversation samples, explore Hindi &amp; English models, and schedule a customized architecture walkthrough?
              </p>
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:text-[#0047c1] group"
              >
                <span>Visit Dedicated Book a Demo Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Direct Contact Channels Card */}
            <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
                  Direct Communication
                </span>
                <h3 className="text-xl font-bold text-[#101828] mt-1">
                  Business &amp; Technical Support
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] mt-1.5 leading-relaxed">
                  Connect directly with our engineering and partnership team for immediate assistance.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#344054]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#475467] block">General Enquiries</span>
                    <a
                      href="mailto:contact@indiacalling.ai"
                      className="font-semibold text-[#101828] hover:text-[#155EEF] transition-colors"
                    >
                      contact@indiacalling.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#475467] block">Business Hours</span>
                    <span className="font-semibold text-[#101828]">
                      Monday – Saturday • 9:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#155EEF] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#475467] block">Enterprise Infrastructure</span>
                    <span className="font-semibold text-[#101828]">
                      Tier-3 Cloud Telephony Datacenters in Mumbai &amp; Hyderabad
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
