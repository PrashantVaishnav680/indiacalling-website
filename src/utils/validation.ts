export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryType: string;
  message: string;
  privacyConsent: boolean;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

export interface DemoRequestInput {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  industry: string;
  monthlyVolume: string;
  preferredLanguage: string;
  additionalRequirements?: string;
  privacyConsent: boolean;
}

export type DemoRequestErrors = Partial<Record<keyof DemoRequestInput, string>>;

export interface ValidationResult<T> {
  isValid: boolean;
  errors: T;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_REGEX = /^\+?[0-9\s\-()]{7,18}$/;

export function validateContactForm(
  input: ContactFormInput
): ValidationResult<ContactFormErrors> {
  const errors: ContactFormErrors = {};

  const trimmedName = input.name.trim();
  if (!trimmedName) {
    errors.name = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Please enter at least 2 characters for your name.';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Work email is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid work email address.';
  }

  const trimmedPhone = input.phone.trim();
  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (!trimmedPhone) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_DIGITS_REGEX.test(trimmedPhone) || digitCount < 10 || digitCount > 15) {
    errors.phone = 'Please enter a valid 10 to 15 digit phone number.';
  }

  const trimmedCompany = input.company.trim();
  if (!trimmedCompany) {
    errors.company = 'Company name is required.';
  }

  const trimmedEnquiryType = input.enquiryType?.trim() || '';
  if (!trimmedEnquiryType) {
    errors.enquiryType = 'Please select an enquiry type.';
  }

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please share your enquiry or question.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please enter at least 10 characters in your message.';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent = 'You must agree to the privacy policy to continue.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateDemoRequest(
  input: DemoRequestInput
): ValidationResult<DemoRequestErrors> {
  const errors: DemoRequestErrors = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Please enter at least 2 characters for your name.';
  }

  const trimmedEmail = input.workEmail.trim();
  if (!trimmedEmail) {
    errors.workEmail = 'Work email is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  const trimmedPhone = input.phoneNumber.trim();
  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (!trimmedPhone) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_DIGITS_REGEX.test(trimmedPhone) || digitCount < 10 || digitCount > 15) {
    errors.phoneNumber = 'Please enter a valid 10 to 15 digit phone number with country code.';
  }

  const trimmedCompany = input.companyName.trim();
  if (!trimmedCompany) {
    errors.companyName = 'Company name is required.';
  }

  const trimmedIndustry = input.industry.trim();
  if (!trimmedIndustry) {
    errors.industry = 'Please select your industry.';
  }

  const trimmedVolume = input.monthlyVolume.trim();
  if (!trimmedVolume) {
    errors.monthlyVolume = 'Please select your expected monthly calling volume.';
  }

  const trimmedLang = input.preferredLanguage.trim();
  if (!trimmedLang) {
    errors.preferredLanguage = 'Please select your preferred language.';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent = 'You must agree to the privacy consent to request a demo.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}


export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const rounded = Math.floor(seconds);
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function calculateAudioProgress(currentTime: number, duration: number): number {
  if (!Number.isFinite(currentTime) || !Number.isFinite(duration) || duration <= 0) {
    return 0;
  }
  const pct = (currentTime / duration) * 100;
  return Math.max(0, Math.min(100, Number(pct.toFixed(2))));
}
