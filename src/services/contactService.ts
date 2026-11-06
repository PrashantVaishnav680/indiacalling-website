import {
  ContactFormInput,
  validateContactForm,
  DemoRequestInput,
  validateDemoRequest,
} from '../utils/validation';

export interface GeneralContactResponse {
  ok: boolean;
  mode: 'frontend-staged';
  referenceId: string;
  submittedAt: string;
  integrationNote: string;
  payload: ContactFormInput;
}

export interface DemoBookingResponse {
  ok: boolean;
  mode: 'frontend-staged';
  referenceId: string;
  submittedAt: string;
  integrationNote: string;
  payload: DemoRequestInput;
}

/**
 * Clean service layer for General Business Inquiries (/contact).
 *
 * BACKEND INTEGRATION POINT:
 * When ready, connect to your Express backend:
 * ```ts
 * const response = await fetch('/api/inquiries', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(sanitizedPayload),
 * });
 * ```
 */
export async function submitGeneralContactInquiry(
  input: ContactFormInput
): Promise<GeneralContactResponse> {
  const validation = validateContactForm(input);
  if (!validation.isValid) {
    const firstError =
      Object.values(validation.errors)[0] || 'Please fix the highlighted form fields.';
    throw new Error(firstError);
  }

  const sanitizedPayload: ContactFormInput = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    company: input.company.trim(),
    enquiryType: input.enquiryType.trim(),
    message: input.message.trim(),
    privacyConsent: Boolean(input.privacyConsent),
  };

  // Simulate realistic client-side processing delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // TODO [BACKEND_INTEGRATION_POINT]: Forward `sanitizedPayload` to POST /api/inquiries
  return {
    ok: true,
    mode: 'frontend-staged',
    referenceId: `IC-GEN-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    integrationNote:
      'Validated on frontend via submitGeneralContactInquiry(). Staged for future POST /api/inquiries integration.',
    payload: sanitizedPayload,
  };
}

/**
 * Dedicated service layer for Book a Demo Requests (/book-demo).
 *
 * BACKEND INTEGRATION POINT:
 * When ready, connect to your Express backend:
 * ```ts
 * const response = await fetch('/api/demos', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(sanitizedPayload),
 * });
 * ```
 */
export async function submitDemoBookingRequest(
  input: DemoRequestInput
): Promise<DemoBookingResponse> {
  const validation = validateDemoRequest(input);
  if (!validation.isValid) {
    const firstError =
      Object.values(validation.errors)[0] || 'Please fix the highlighted form fields.';
    throw new Error(firstError);
  }

  const sanitizedPayload: DemoRequestInput = {
    fullName: input.fullName.trim(),
    workEmail: input.workEmail.trim(),
    phoneNumber: input.phoneNumber.trim(),
    companyName: input.companyName.trim(),
    industry: input.industry.trim(),
    monthlyVolume: input.monthlyVolume.trim(),
    preferredLanguage: input.preferredLanguage.trim(),
    additionalRequirements: input.additionalRequirements?.trim() || 'None provided',
    privacyConsent: Boolean(input.privacyConsent),
  };

  // Simulate realistic client-side processing delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // TODO [BACKEND_INTEGRATION_POINT]: Forward `sanitizedPayload` to POST /api/demos
  return {
    ok: true,
    mode: 'frontend-staged',
    referenceId: `IC-DEMO-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    integrationNote:
      'Validated on frontend via submitDemoBookingRequest(). Our team will follow up directly to schedule your live session. Staged for future POST /api/demos integration.',
    payload: sanitizedPayload,
  };
}

