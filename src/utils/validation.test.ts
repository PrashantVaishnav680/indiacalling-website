import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  validateDemoRequest,
  formatAudioTime,
  calculateAudioProgress,
} from './validation';
import { SITE_ASSETS, PRICING_CONFIG, VOICE_DEMO_TRACKS } from '../config/siteConfig';
import {
  WAVEFORM_BAR_COUNT,
  IDLE_WAVEFORM_BARS,
  calculateTimeDomainRms,
  computeSymmetricWaveformBars,
} from './audioWaveform';
import {
  createFadeUpVariants,
  createSlideHorizontalVariants,
  createScaleInVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from './motion';

test('formatAudioTime formats seconds accurately as m:ss', () => {
  assert.equal(formatAudioTime(0), '0:00');
  assert.equal(formatAudioTime(9), '0:09');
  assert.equal(formatAudioTime(41.4), '0:41');
  assert.equal(formatAudioTime(101.8), '1:41');
  assert.equal(formatAudioTime(-5), '0:00');
  assert.equal(formatAudioTime(Number.NaN), '0:00');
});

test('calculateAudioProgress clamps percentage between 0 and 100', () => {
  assert.equal(calculateAudioProgress(0, 41), 0);
  assert.equal(calculateAudioProgress(20.5, 41), 50);
  assert.equal(calculateAudioProgress(50, 41), 100);
  assert.equal(calculateAudioProgress(10, 0), 0);
});

test('validateContactForm checks general enquiry fields', () => {
  const invalid = validateContactForm({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: '',
    message: '',
    privacyConsent: false,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.enquiryType);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.privacyConsent);

  const valid = validateContactForm({
    name: 'Vikram Sharma',
    email: 'vikram@company.in',
    phone: '+91 98765 43210',
    company: 'Skyline Corp',
    enquiryType: 'Partnership',
    message: 'We want to discuss carrier integration.',
    privacyConsent: true,
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateDemoRequest validates all demo booking fields', () => {
  const invalid = validateDemoRequest({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    industry: '',
    monthlyVolume: '',
    preferredLanguage: '',
    additionalRequirements: '',
    privacyConsent: false,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.workEmail);
  assert.ok(invalid.errors.phoneNumber);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.industry);
  assert.ok(invalid.errors.monthlyVolume);
  assert.ok(invalid.errors.preferredLanguage);
  assert.ok(invalid.errors.privacyConsent);

  const valid = validateDemoRequest({
    fullName: 'Rohit Verma',
    workEmail: 'rohit@buildergroup.com',
    phoneNumber: '+91 98765 43210',
    companyName: 'Builder Group',
    industry: 'Real Estate',
    monthlyVolume: '10,000–50,000 calls',
    preferredLanguage: 'Both',
    additionalRequirements: 'SIP trunk and LeadSquared integration',
    privacyConsent: true,
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('official PRICING_CONFIG matches specifications', () => {
  assert.equal(Object.keys(PRICING_CONFIG).length, 2);
  assert.equal(PRICING_CONFIG.payAsYouGo.price, '₹6');
  assert.equal(PRICING_CONFIG.payAsYouGo.priceUnit, '/ connected minute');
  assert.equal(PRICING_CONFIG.payAsYouGo.popularBadge, 'Most Popular');
  assert.equal(PRICING_CONFIG.enterprise.name, 'Enterprise');
  assert.equal(PRICING_CONFIG.enterprise.fullPriceDisplay, 'Custom Volume Pricing');
});

test('VOICE_DEMO_TRACKS uses exact original audio files', () => {
  assert.equal(
    VOICE_DEMO_TRACKS.english.audioSrc,
    '/assets/aistudio/Generated_Audio_November_04__2026_-_11_09PM_48c4daa9.wav'
  );
  assert.equal(
    VOICE_DEMO_TRACKS.hindi.audioSrc,
    '/assets/aistudio/indiacalling-demo_1a014fcf.mp3'
  );
  assert.equal(SITE_ASSETS.logoSvg, '/assets/aistudio/indiacalling-logo_36ceb459.svg');
});

test('computeSymmetricWaveformBars reflects actual audio intensity and settles on silence', () => {
  assert.equal(IDLE_WAVEFORM_BARS.length, WAVEFORM_BAR_COUNT);

  const silentFreq = new Uint8Array(128).fill(0);
  const silentTime = new Uint8Array(128).fill(128);
  assert.equal(calculateTimeDomainRms(silentTime), 0);

  const silentBars = computeSymmetricWaveformBars(
    silentFreq,
    silentTime,
    new Array(WAVEFORM_BAR_COUNT).fill(0.12),
    WAVEFORM_BAR_COUNT,
    0
  );
  assert.equal(silentBars.length, WAVEFORM_BAR_COUNT);
  for (const h of silentBars) {
    assert.ok(h >= 0.1 && h <= 0.18, `Expected silent bar ${h} to be small and calm`);
  }

  const activeFreq = new Uint8Array(128).fill(190);
  const activeTime = new Uint8Array(128).map((_, idx) => (idx % 2 === 0 ? 210 : 46));
  const activeRms = calculateTimeDomainRms(activeTime);
  assert.ok(activeRms > 0.5);

  const activeBars = computeSymmetricWaveformBars(
    activeFreq,
    activeTime,
    silentBars,
    WAVEFORM_BAR_COUNT,
    0.2
  );
  assert.equal(activeBars.length, WAVEFORM_BAR_COUNT);

  const avgSilent = silentBars.reduce((a, b) => a + b, 0) / silentBars.length;
  const avgActive = activeBars.reduce((a, b) => a + b, 0) / activeBars.length;
  assert.ok(
    avgActive > avgSilent * 2.5,
    `Expected active voice bars (${avgActive}) to be significantly taller than silent bars (${avgSilent})`
  );

  assert.equal(silentBars[0], silentBars[WAVEFORM_BAR_COUNT - 1]);
  assert.equal(silentBars[17], silentBars[18]);
});

test('motion variant factories respect reduced-motion accessibility setting', () => {
  const normalFade = createFadeUpVariants(false, 24, 0.5);
  const reducedFade = createFadeUpVariants(true, 24, 0.5);
  assert.deepEqual(normalFade.hidden, { opacity: 0, y: 24 });
  assert.deepEqual(reducedFade.hidden, { opacity: 1, y: 0 });

  const normalSlide = createSlideHorizontalVariants(false, 'left', 28, 0.5);
  const reducedSlide = createSlideHorizontalVariants(true, 'left', 28, 0.5);
  assert.deepEqual(normalSlide.hidden, { opacity: 0, x: -28 });
  assert.deepEqual(reducedSlide.hidden, { opacity: 1, x: 0 });

  const normalScale = createScaleInVariants(false, 0.96, 16, 0.5);
  const reducedScale = createScaleInVariants(true, 0.96, 16, 0.5);
  assert.deepEqual(normalScale.hidden, { opacity: 0, scale: 0.96, y: 16 });
  assert.deepEqual(reducedScale.hidden, { opacity: 1, scale: 1, y: 0 });

  const staggerContainer = createStaggerContainerVariants(false, 0.08, 0.04);
  const staggerItem = createStaggerItemVariants(true, 18, 0.45);
  assert.ok(staggerContainer.visible);
  assert.deepEqual(staggerItem.hidden, { opacity: 1, y: 0 });
});
