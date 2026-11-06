# IndiaCalling.ai — Standalone Website

Complete, responsive frontend website for **IndiaCalling.ai** built with React, Vite, TypeScript, Tailwind CSS, React Router, Framer Motion (`motion`), and Lucide React.

**Zero external API keys or cloud services required** — all pages, animations, Web Audio API voice demos (Hindi MP3 & English WAV), interactive workflows, and form validations run 100% locally in your browser.

---

## Quick Start (Local Machine)

### 1. Prerequisites
- **Node.js** `v18+` (recommended `v20+`) and `npm`

### 2. Install Dependencies
Open a terminal in the project root folder and run:
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
To generate a static production bundle in the `dist/` folder:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```text
indiacalling-ai/
├── index.html                  # HTML entry point & SEO metadata
├── package.json                # Standalone dependencies (React, Vite, Tailwind, Motion, Lucide)
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
├── public/
│   └── assets/
│       └── aistudio/
│           ├── indiacalling-logo_36ceb459.svg
│           ├── indiacalling-demo_1a014fcf.mp3
│           └── Generated_Audio_November_04__2026_-_11_09PM_48c4daa9.wav
└── src/
    ├── main.tsx                # React DOM root
    ├── App.tsx                 # React Router layout & routes
    ├── index.css               # Tailwind v4 styles & keyframe animations
    ├── config/
    │   └── siteConfig.ts       # Audio tracks, transcripts, pricing & asset paths
    ├── components/
    │   ├── Navbar.tsx          # Responsive sticky header
    │   ├── Footer.tsx          # Site footer
    │   └── VoiceDemoPlayer.tsx # Real-time Web Audio API waveform & synced transcript player
    ├── pages/
    │   ├── HomePage.tsx        # Hero animations, problem/solution, audio demo, pricing preview
    │   ├── ProductPage.tsx     # Capabilities, architecture & real estate workflows
    │   ├── IndustriesPage.tsx  # Vertical solutions & interactive telephony workflow simulator
    │   ├── PricingPage.tsx     # Pay As You Go (₹6/min) & Enterprise comparison + FAQs
    │   ├── AboutPage.tsx       # Company mission, vision & security principles
    │   └── ContactPage.tsx     # Book a Demo & Contact tabs with validation
    ├── services/
    │   └── contactService.ts   # Frontend lead staging service (localStorage)
    └── utils/
        ├── audioWaveform.ts    # Symmetric Web Audio API frequency/time-domain bar computation
        ├── validation.ts       # Form validation & audio formatting helpers
        └── validation.test.ts  # Unit test suite (run via `npm test`)
```
