export type DemoLanguage = 'english' | 'hindi';

export interface TranscriptTurn {
  speaker: 'agent' | 'customer';
  speakerLabel: string;
  timestamp: string;
  startTimeSec: number;
  text: string;
}

export interface VoiceDemoTrack {
  id: DemoLanguage;
  label: string;
  badge: string;
  audioSrc: string;
  mimeType: string;
  agentName: string;
  agentInitials: string;
  campaignName: string;
  defaultDurationFormatted: string;
  defaultDurationSeconds: number;
  transcript: TranscriptTurn[];
  metadata: {
    contact: string;
    qualificationStatus: string;
    intent: string;
    budget: string;
    actionTrigger: string;
    languageTag: string;
  };
}

export const SITE_ASSETS = {
  logoSvg: '/assets/aistudio/indiacalling-logo_36ceb459.svg',
  audioEnglishWav: '/assets/aistudio/Generated_Audio_November_04__2026_-_11_09PM_48c4daa9.wav',
  audioHindiMp3: '/assets/aistudio/indiacalling-demo_1a014fcf.mp3',
} as const;

/**
 * Official Pricing Configuration
 * Source: https://www.indiacalling.ai/pricing
 */
export const PRICING_CONFIG = {
  payAsYouGo: {
    id: 'pay-as-you-go',
    badge: 'Pay As You Go',
    tierType: 'Self-Serve',
    popularBadge: 'Most Popular',
    isPopular: true,
    lockInLabel: 'No lock-in',
    name: 'Pay As You Go',
    price: '₹6',
    priceUnit: '/ connected minute',
    description: 'Zero commitment. No monthly fee or lock-in.',
    ctaLabel: 'Start Calling',
    ctaHref: '/book-demo',
    features: [
      'Proprietary STT (Parrot, tuned for Indian speech)',
      'Natural TTS with authentic Indian accents',
      'Fine-tuned LLMs',
      'Telephony and carrier infrastructure included',
      'Basic analytics',
      'Call recordings and transcripts',
      'Free CRM',
    ],
    billingBullets: [
      'Prepaid wallet recharge.',
      'Charge ₹6 per connected minute.',
      'No monthly commitment.',
      'No hidden telecom charges.',
    ],
  },
  enterprise: {
    id: 'enterprise',
    badge: 'Enterprise',
    tierType: 'High-Volume Dedicated',
    popularBadge: 'Custom Volume Scale',
    isPopular: false,
    name: 'Enterprise',
    price: 'Custom',
    priceUnit: 'Volume Pricing',
    fullPriceDisplay: 'Custom Volume Pricing',
    description: 'Built for organizations with high call volumes and custom requirements.',
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact?plan=enterprise',
    features: [
      'Everything in Pay as you go',
      'On-prem deployment options',
      'Forward Deployed Engineer (FDE) support',
      'Custom LLM fine-tuning and voice cloning',
      'Dedicated telephony trunking (BYOC/BYOK)',
      'Enterprise SLA with 99.9% uptime guarantee',
    ],
    billingBullets: [
      'High-volume committed tier.',
      'Volume-discounted rates.',
      'Dedicated telecom trunking (BYOC/BYOK).',
      'Custom SLA & enterprise invoicing.',
    ],
  },
} as const;

export const VOICE_DEMO_TRACKS: Record<DemoLanguage, VoiceDemoTrack> = {
  english: {
    id: 'english',
    label: 'English Demo',
    badge: 'English (en-IN)',
    audioSrc: SITE_ASSETS.audioEnglishWav,
    mimeType: 'audio/wav',
    agentName: 'ABC Properties — AI Voice Agent',
    agentInitials: 'AI',
    campaignName: 'Residential Property Qualification • Ahmedabad (en-IN)',
    defaultDurationFormatted: '0:41',
    defaultDurationSeconds: 41,
    transcript: [
      {
        speaker: 'agent',
        speakerLabel: 'AI Voice Agent',
        timestamp: '0:00',
        startTimeSec: 0,
        text: '“Hello, am I speaking with Mr. Sharma? Hi sir, I’m calling from ABC Properties. You recently inquired about residential properties in Ahmedabad. Are you still looking?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Mr. Sharma (Caller)',
        timestamp: '0:11',
        startTimeSec: 11,
        text: '“Yes, I’m looking for a 2BHK apartment for my family.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Voice Agent',
        timestamp: '0:16',
        startTimeSec: 16,
        text: '“Certainly. Which location do you prefer and what’s your budget?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Mr. Sharma (Caller)',
        timestamp: '0:19',
        startTimeSec: 19,
        text: '“Satellite or South Bopal. My budget is around 55 to 65 lakh.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Voice Agent',
        timestamp: '0:25',
        startTimeSec: 25,
        text: '“That’s great! We have a few properties matching your requirements. Would you be interested in a site visit this Saturday?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Mr. Sharma (Caller)',
        timestamp: '0:31',
        startTimeSec: 31,
        text: '“Yes, Saturday morning works for me.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Voice Agent',
        timestamp: '0:34',
        startTimeSec: 34,
        text: '“Perfect. I’ll arrange a callback from our property consultant to confirm the visit. Have a wonderful day!”',
      },
    ],
    metadata: {
      contact: 'Mr. Sharma',
      qualificationStatus: 'Qualified Buyer',
      intent: '2BHK Apartment • Satellite / South Bopal',
      budget: '₹55 Lakh – ₹65 Lakh',
      actionTrigger: 'Saturday Morning Site Visit Scheduled',
      languageTag: 'English (WAV)',
    },
  },
  hindi: {
    id: 'hindi',
    label: 'Hindi Demo',
    badge: 'Hindi (hi-IN)',
    audioSrc: SITE_ASSETS.audioHindiMp3,
    mimeType: 'audio/mpeg',
    agentName: 'Riya — AI Property Specialist',
    agentInitials: 'RY',
    campaignName: 'Real Estate Investment & Plot Inquiry • Super Corridor (hi-IN)',
    defaultDurationFormatted: '1:41',
    defaultDurationSeconds: 101,
    transcript: [
      {
        speaker: 'agent',
        speakerLabel: 'AI Agent (Riya)',
        timestamp: '0:00',
        startTimeSec: 0,
        text: '“Namaste sir, main Riya bol rahi hoon. Aapne property inquiry ki thi, kya main do minute le sakti hoon? Sir investment ke liye dekh rahe hain ya ghar banana chahte hain?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Prospect (Caller)',
        timestamp: '0:16',
        startTimeSec: 16,
        text: '“Abhi toh filhal main investment ke purpose se hi dekh raha hoon, par meri do inquiry hai — ek investment purpose ke liye aur ghar banane ke liye bhi.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Agent (Riya)',
        timestamp: '0:24',
        startTimeSec: 24,
        text: '“Achha sir, dono options explore karna chahte hain, toh budget roughly kya socha hai?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Prospect (Caller)',
        timestamp: '0:30',
        startTimeSec: 30,
        text: '“Mera budget approximately 4 se 6 crore ke beech mein hai, dono ke liye.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Agent (Riya)',
        timestamp: '0:53',
        startTimeSec: 53,
        text: '“Dekhiye sir, Super Corridor mein abhi jo growth hai, yeh really strong investment opportunity hai. Zameen phone pe nahi, ground pe samajh aati hai. Saturday subah 10 baje theek rahega ya Sunday shaam ko?”',
      },
      {
        speaker: 'customer',
        speakerLabel: 'Prospect (Caller)',
        timestamp: '1:12',
        startTimeSec: 72,
        text: '“Monday ko nahi kar sakte? Mere Saturday already appointments hain. Ek kaam kariye, aap Monday ko evening mein call kar lijiye.”',
      },
      {
        speaker: 'agent',
        speakerLabel: 'AI Agent (Riya)',
        timestamp: '1:28',
        startTimeSec: 88,
        text: '“Theek hai sir, Monday evening 6 baje pe call karti hoon. Dhanyavaad, apna khayal rakhiyega.”',
      },
    ],
    metadata: {
      contact: 'Property Inquiry Lead',
      qualificationStatus: 'High-Intent Investor',
      intent: 'Investment + Home Plot • Super Corridor',
      budget: '₹4 Cr – ₹6 Cr',
      actionTrigger: 'Monday 6:00 PM Callback Locked',
      languageTag: 'Hindi (MP3)',
    },
  },
};
