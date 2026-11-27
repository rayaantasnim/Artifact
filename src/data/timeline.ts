import type { GalleryAssetKey } from './galleryAssets';

export const TOTAL_FILM_DURATION = 330; // 5 minutes 30 seconds

export interface ActVisualTheme {
  primaryHex: string;
  secondaryHex: string;
  gridHex: string;
  warpIntensity: number; // 0.3 to 2.5
  rotationSpeed: number;
}

export interface TimelineAct {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  startSec: number;
  endSec: number;
  hideBrand: boolean;
  artworkKey: GalleryAssetKey;
  theme: ActVisualTheme;
}

export const TIMELINE_ACTS: TimelineAct[] = [
  {
    id: 1,
    code: 'ACT I',
    title: 'The Philosophical Mystery',
    subtitle: 'Before Competitive Mathematics Was Rewritten',
    startSec: 0,
    endSec: 32,
    hideBrand: true,
    artworkKey: 'mathematicalGenome',
    theme: {
      primaryHex: '#38BDF8',
      secondaryHex: '#1B365D',
      gridHex: '#1E3A5F',
      warpIntensity: 0.9,
      rotationSpeed: 0.65,
    },
  },
  {
    id: 2,
    code: 'ACT II',
    title: 'The Grand Awakening & Manifesto',
    subtitle: 'The Architecture of Pure Intellect',
    startSec: 32,
    endSec: 70,
    hideBrand: false,
    artworkKey: 'obsidianAuditorium',
    theme: {
      primaryHex: '#F38020',
      secondaryHex: '#1B365D',
      gridHex: '#2B4C7E',
      warpIntensity: 1.65,
      rotationSpeed: 0.78,
    },
  },
  {
    id: 3,
    code: 'ACT III',
    title: 'The 14-Portal Federated Constellation',
    subtitle: 'Zero-Dependency Vanilla JS Spine & SSO Sync',
    startSec: 70,
    endSec: 105,
    hideBrand: false,
    artworkKey: 'federatedConstellation',
    theme: {
      primaryHex: '#38BDF8',
      secondaryHex: '#0EA5E9',
      gridHex: '#0C4A6E',
      warpIntensity: 0.9,
      rotationSpeed: 0.55,
    },
  },
  {
    id: 4,
    code: 'ACT IV',
    title: 'Five Domain ELO Arenas',
    subtitle: 'Number Theory · Algebra · Geometry · Combinatorics · Mixed Olympiad',
    startSec: 105,
    endSec: 140,
    hideBrand: false,
    artworkKey: 'numberTheoryArena',
    theme: {
      primaryHex: '#22D3EE',
      secondaryHex: '#A78BFA',
      gridHex: '#164E63',
      warpIntensity: 0.85,
      rotationSpeed: 0.65,
    },
  },
  {
    id: 5,
    code: 'ACT V',
    title: 'Sub-Second Matchmaking & 12 Shadow Bot Gauntlet',
    subtitle: '60s Bullet Blitz Duels · Stealth Mirror Guard · 380 to 3140 Apex BOT',
    startSec: 140,
    endSec: 175,
    hideBrand: false,
    artworkKey: 'bulletBlitzDuel',
    theme: {
      primaryHex: '#F59E0B',
      secondaryHex: '#EF4444',
      gridHex: '#78350F',
      warpIntensity: 1.75,
      rotationSpeed: 1.15,
    },
  },
  {
    id: 6,
    code: 'ACT VI',
    title: '7-Day Contest Engine, Find the Flaw & World Cup',
    subtitle: 'General vs Expert Modes · 2-Min SymPy Rejudge · Top 128 Crown',
    startSec: 175,
    endSec: 210,
    hideBrand: false,
    artworkKey: 'worldCupCrown',
    theme: {
      primaryHex: '#FBBF24',
      secondaryHex: '#38BDF8',
      gridHex: '#713F12',
      warpIntensity: 1.25,
      rotationSpeed: 0.75,
    },
  },
  {
    id: 7,
    code: 'ACT VII',
    title: 'The 42-Engine Hybrid Olympiad AI Core',
    subtitle: 'Gemini + Qwen-Math-72B + SymPy · Zero-Copy Genome · Fair TokenMeter',
    startSec: 210,
    endSec: 242,
    hideBrand: false,
    artworkKey: 'neuralCore',
    theme: {
      primaryHex: '#00F0FF',
      secondaryHex: '#F38020',
      gridHex: '#0C4A6E',
      warpIntensity: 1.45,
      rotationSpeed: 0.78,
    },
  },
  {
    id: 8,
    code: 'ACT VIII',
    title: 'QPRT-4 Resilience, 11-Flag Blackhole & 14-Point Legal Shield',
    subtitle: '4-Phase Integrity Dome · Optional Module 7 · Youth Privacy Compliance',
    startSec: 242,
    endSec: 275,
    hideBrand: false,
    artworkKey: 'cyberShield',
    theme: {
      primaryHex: '#14B8A6',
      secondaryHex: '#F43F5E',
      gridHex: '#134E4A',
      warpIntensity: 1.35,
      rotationSpeed: 0.7,
    },
  },
  {
    id: 9,
    code: 'ACT IX',
    title: 'Institutional Ecosystem, Merit Treasury & V4.0 Launch',
    subtitle: 'Academy Arena · Closed-Loop Wallet · 5-Tier HQ Ladder · Dec 31, 2026 Ignition',
    startSec: 275,
    endSec: 305,
    hideBrand: false,
    artworkKey: 'academyArena',
    theme: {
      primaryHex: '#FBBF24',
      secondaryHex: '#F38020',
      gridHex: '#713F12',
      warpIntensity: 1.55,
      rotationSpeed: 0.9,
    },
  },
  {
    id: 10,
    code: 'ACT X',
    title: 'The 20-Year Holding Horizon',
    subtitle: 'Eight Autonomous Deep-Tech Spin-Offs & The Grand Singularity',
    startSec: 305,
    endSec: 330,
    hideBrand: false,
    artworkKey: 'singularityHorizon',
    theme: {
      primaryHex: '#F38020',
      secondaryHex: '#38BDF8',
      gridHex: '#1B365D',
      warpIntensity: 1.4,
      rotationSpeed: 0.55,
    },
  },
];

export function getActAtTime(seconds: number): TimelineAct {
  const clamped = Math.max(0, Math.min(seconds, TOTAL_FILM_DURATION - 0.001));
  for (const act of TIMELINE_ACTS) {
    if (clamped >= act.startSec && clamped < act.endSec) {
      return act;
    }
  }
  return TIMELINE_ACTS[TIMELINE_ACTS.length - 1];
}
