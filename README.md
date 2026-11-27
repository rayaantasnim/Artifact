<div align="center">
  <a href="https://rayaantasnim.github.io/Arithmo-Edge/">
    <img src="public/Assets/gallery/The%2014-Portal%20Federated%20Constellation.webp" alt="Arithmo Edge — Interactive 3D Theatrical Launch Film" width="100%" style="max-width: 1120px; border-radius: 20px;" />
  </a>

  <h1>Arithmo Edge · Theatrical Launch Film</h1>
  <p><strong>Powered by Olympiad Edge</strong></p>
  <p><em>The World's First Real-Time ELO-Rated Competitive Mathematics &amp; Olympiad Mega-Ecosystem.</em></p>

  <p>
    <img src="https://img.shields.io/badge/Runtime-5m%2030s%20%C2%B7%2010%20Acts-00F0FF?style=for-the-badge" alt="Runtime: 5m 30s · 10 Acts" />
    <img src="https://img.shields.io/badge/Engine-60fps%203D%20Canvas%20%2B%20Framer%20Motion-8B5CF6?style=for-the-badge" alt="60fps 3D Canvas + Framer Motion" />
    <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages%20Ready-F38020?style=for-the-badge" alt="GitHub Pages Ready" />
  </p>
</div>

---

## Ecosystem Quick Links

| Destination | Purpose | Link |
| :--- | :--- | :--- |
| **Main 14-Page Showcase** | Flagship ecosystem overview & interactive portal entry | [https://rayaantasnim.github.io/Arithmo-Edge/](https://rayaantasnim.github.io/Arithmo-Edge/) |
| **Page 14 · Visual Architecture Gallery** | Full 8K visual blueprint showcase of the Arithmo Edge stack | [https://rayaantasnim.github.io/Arithmo-Gallery/](https://rayaantasnim.github.io/Arithmo-Gallery/) |
| **GitHub Organization** | Federated open-ecosystem repositories & engineering hub | [https://github.com/Arithmo-Edge](https://github.com/Arithmo-Edge) |

---

## 10-Act Cinematic Storyboard Overview (0:00 – 5:30)

An interactive `330-second` (`5m 30s`) keynote film rendered at 60fps across `100vw × 100dvh` with real-time HTML5 3D hologram projection, synchronized Web Audio / MP3 scoring, scrubbable timeline navigation, and deterministic `0 → Target` metric roll-ups.

| Act | Timestamp | Chapter Title | Key Systems & Narrative Highlights |
| :--- | :--- | :--- | :--- |
| **Act 01** | `0:00 – 0:32` | **Philosophical Hook** | High-tension mystery contrasting Codeforces ELO and Chess.com e-sports against trapped 1990s PDFs and $500 gatekept math courses, culminating in *"The silence ends tonight."* |
| **Act 02** | `0:32 – 1:10` | **The Grand Awakening & Manifesto** | Obsidian Auditorium brand unveiling, core philosophy of pure mathematical merit, and sub-second competitive infrastructure manifesto. |
| **Act 03** | `1:10 – 1:45` | **14-Portal Federated Constellation** | Orbital visualization of the **14 Federated Portals** unified by a zero-dependency Vanilla JS `Arithmo-Core-SDK` (`engine.js`), Google OAuth SSO, and `@handle` routing. |
| **Act 04** | `1:45 – 2:20` | **5 Core Arenas & 60 ELO Tiers** | Specialized arenas for **Number Theory**, **Algebra**, **Geometry**, **Combinatorics**, and **Mixed Olympiad**, spanning **60 progressive ELO tiers**. |
| **Act 05** | `2:20 – 2:55` | **Bullet Blitz & 12 Shadow Bots** | Sub-second matchmaking, **60-second Bullet Blitz** 1v1 duels, Stealth Mirror Guard, and the **12-Shadow Bot Gauntlet** scaling from `380` to `3,140` Apex BOT. |
| **Act 06** | `2:55 – 3:30` | **7-Day Zero-Rest Contests & World Cup** | Continuous **7-Day Zero-Rest Contests**, General vs. Expert modes, Find the Flaw challenges, 2-minute SymPy rejudging, and the **Top 128 Annual World Cup**. |
| **Act 07** | `3:30 – 4:02` | **42-Engine Hybrid Olympiad AI Core** | Zero-hallucination `2 + 2 + 24 + 12 + 1 + 1` symbolic reactor combining **Google Gemini**, **Qwen-Math-72B**, isolated **Python/SymPy**, Zero-Copy Genome, and Fair `TokenMeter`. |
| **Act 08** | `4:02 – 4:35` | **QPRT-4 & 14-Point Legal Shield** | 4-phase **QPRT-4** contest resilience dome, optional **Module 7** client-side biometric proctoring, **11-Flag Blackhole** escalation, and the **14-Point Legal & Youth Privacy Shield**. |
| **Act 09** | `4:35 – 5:05` | **Ecosystem, Merit Treasury & V4.0 Rollout** | **Academy Arena**, Zero Pay-to-Win **Closed-Loop Wallet** (`Lemon Squeezy · bKash · Nagad`), **5-Tier Monotonic HQ Ladder** (`100` to `1,000+` HQ ELO), and the **Dec 16–31 SpaceX-grade V4.0 Launch**. |
| **Act 10** | `5:05 – 5:30` | **20-Year Holding Horizon & Grand Finale** | **8 Autonomous Deep-Tech Spin-Offs**, Founding Architects tribute, and post-film redirect portal to [Arithmo Edge](https://rayaantasnim.github.io/Arithmo-Edge/). |

---

## Modular Folder & Asset Structure

```text
.
├── public/
│   └── Assets/
│       ├── audio/
│       │   └── bgm.mp3                     # Optional custom soundtrack (falls back to AudioSynth)
│       ├── favicon/
│       │   └── favicon.ico                 # Site favicon
│       └── gallery/                        # 20 8K scene artworks (.webp / .jpg)
│           ├── The Obsidian Olympiad Auditorium.jpg
│           ├── The 14-Portal Federated Constellation.webp
│           ├── The 42-Engine Hybrid Neural Core.webp
│           └── ... (17 additional gallery artworks)
├── src/
│   ├── engine/
│   │   ├── CanvasEngine.tsx                # 60fps 3D hologram globe, starfield & laser grid
│   │   └── AudioSynth.ts                   # MP3 soundtrack loader + Web Audio synth fallback
│   ├── scenes/
│   │   ├── Act01_PhilosophyHook.tsx        # 0:00 – 0:32
│   │   ├── Act02_GrandAwakening.tsx        # 0:32 – 1:10
│   │   ├── Act03_FederatedConstellation.tsx# 1:10 – 1:45
│   │   ├── Act04_DomainArenas.tsx          # 1:45 – 2:20
│   │   ├── Act05_DuelAndShadowBots.tsx     # 2:20 – 2:55
│   │   ├── Act06_ContestsAndWorldCup.tsx   # 2:55 – 3:30
│   │   ├── Act07_HybridAICore42.tsx        # 3:30 – 4:02
│   │   ├── Act08_QPRT4AndLegalShield.tsx   # 4:02 – 4:35
│   │   ├── Act09_EcosystemAndSpaceXLaunch.tsx # 4:35 – 5:05
│   │   ├── Act10_GrandFinale.tsx           # 5:05 – 5:30
│   │   └── sceneTypes.ts                   # Shared SceneProps interface
│   ├── components/
│   │   ├── brand/
│   │   │   └── ArithmoLogoSVG.tsx          # Authentic vector brand crest
│   │   ├── hud/
│   │   │   ├── TopScrubber.tsx             # Timestamp-free interactive timeline bar
│   │   │   ├── CinemaNavbar.tsx            # Dynamic act-aware top navigation header
│   │   │   ├── BottomControl.tsx           # Play / Pause & audio unlock controls
│   │   │   └── EndRedirect.tsx             # Post-film 5:30 launch redirect overlay
│   │   └── ui/
│   │       └── MotionPrimitives.tsx        # GradualWordReveal, AnimatedCounter, TactileTile
│   ├── data/
│   │   ├── timeline.ts                     # 330s 10-Act timing & 3D color choreography
│   │   ├── ecosystemData.ts                # Canonical portals, bots, AI engines & HQ ladder
│   │   └── galleryAssets.ts                # Typed registry mapped to ./Assets/gallery/
│   ├── App.tsx                             # Master playback clock & scene director
│   ├── index.css                           # Tailwind CSS v4 theme & kinetic typography
│   └── main.tsx                            # React 19 entry point
├── index.html                              # Document metadata & relative asset links
├── package.json                            # Vite, React 19, TypeScript & Framer Motion scripts
└── vite.config.ts                          # Pre-configured with base: './' for GitHub Pages
```

### Local Media Asset Placement (`public/Assets/`)

All runtime media paths resolve relative to `./Assets/` so builds remain portable across root domains and GitHub Pages subpaths:

- **Favicon:** Place your site icon at `public/Assets/favicon/favicon.ico`.
- **8K Gallery Artworks:** Store all 20 scene artworks (`19 .webp` + `1 .jpg`) inside `public/Assets/gallery/` matching the keys in `src/data/galleryAssets.ts`.
- **Custom Background Music:** Drop an optional soundtrack file at `public/Assets/audio/bgm.mp3`. `AudioSynth.ts` automatically streams `bgm.mp3` when present and seamlessly falls back to its built-in Web Audio API ambient synthesizer and SFX bus if absent.

---

## Local Development & GitHub Pages Deployment

### Prerequisites
- **Node.js** `v18+` (recommended `v20+`) and `npm`

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server on http://localhost:3000
npm run dev

# 3. Type-check and lint the codebase
npm run lint

# 4. Build the production bundle into ./dist/
npm run build

# 5. Preview the production bundle locally
npm run preview
```

### Zero-Config GitHub Pages Deployment

`vite.config.ts` is pre-configured with `base: './'`, ensuring all JS bundles, CSS, gallery `.webp`/`.jpg` assets, favicons, and audio files resolve via relative URLs (`./Assets/...`). Publish the generated `dist/` directory directly to GitHub Pages (via `gh-pages` or a GitHub Actions workflow) with zero additional path configuration.

---

## Founding Architects & License

- **Core System Architecture:** **Rayaan Tasnim** (`@rayaantasnim`)
- **Chief Mathematical Architecture:** **Jalees Habib** (`@jaleeshabib`)

<div align="center">
  <sub>© Arithmo-Edge 2026 · Powered by Olympiad Edge. All Rights Reserved.</sub>
</div>
