import type { GalleryAssetKey } from './galleryAssets';

export interface ArenaSpec {
  id: string;
  name: string;
  route: string;
  accentColor: string;
  focus: string;
  artworkKey: GalleryAssetKey;
}

export interface ShadowBotPersona {
  elo: number;
  eloLabel: string;
  name: string;
  tier: string;
}

export interface ShadowBotTier {
  name: string;
  eloBand: string;
  behavior: string;
}

export interface ContestDaySchedule {
  day: string;
  label: string;
  detail: string;
  isMega?: boolean;
}

export interface NeuralEngineCluster {
  name: string;
  count: number;
  role: string;
}

export interface SecurityLayer {
  code: string;
  title: string;
  metric: string;
  detail: string;
}

export const ECOSYSTEM_METRICS = {
  totalRuntimeSeconds: 330,
  federatedPortals: 14,
  domainArenas: 5,
  neuralEngines: 42,
  worldCupQualifiers: 128,
  gazeGuardSeconds: 4.5,
  hackingPhaseHours: 6,
  dataLakeSyncHours: 24,
  blackholeFlags: 11,
  legalShieldPoints: 14,
  spinOffCount: 8,
};

export const DOMAIN_ARENAS: ArenaSpec[] = [
  {
    id: 'number-theory',
    name: 'Number Theory Arena',
    route: '/number-theory',
    accentColor: '#22D3EE',
    focus: 'Modular arithmetic, Diophantine equations, prime distributions, and quadratic reciprocity.',
    artworkKey: 'numberTheoryArena',
  },
  {
    id: 'algebra',
    name: 'Algebra Arena',
    route: '/algebra',
    accentColor: '#A78BFA',
    focus: 'Symmetric inequalities, functional equations, polynomials, and abstract algebraic structures.',
    artworkKey: 'algebraArena',
  },
  {
    id: 'geometry',
    name: 'Geometry Arena',
    route: '/geometry',
    accentColor: '#FBBF24',
    focus: 'Synthetic Euclidean proofs, projective harmonic bundles, inversion, and complex bash.',
    artworkKey: 'geometryArena',
  },
  {
    id: 'combinatorics',
    name: 'Combinatorics Arena',
    route: '/combinatorics',
    accentColor: '#34D399',
    focus: 'Graph theory, extremal invariants, combinatorial games, and bijective enumeration.',
    artworkKey: 'combinatoricsArena',
  },
  {
    id: 'mixed-olympiad',
    name: 'Mixed Olympiad Arena',
    route: '/mixed-olympiad',
    accentColor: '#FB7185',
    focus: 'Full-spectrum IMO, Putnam, and national team selection simulation.',
    artworkKey: 'mixedOlympiadArena',
  },
];

export const CANONICAL_SHADOW_BOTS: ShadowBotPersona[] = [
  { elo: 380, eloLabel: '380', name: 'Spark BOT', tier: 'Foundational' },
  { elo: 740, eloLabel: '740', name: 'Novice BOT', tier: 'Foundational' },
  { elo: 1080, eloLabel: '1080', name: 'Scout BOT', tier: 'Apprentice' },
  { elo: 1310, eloLabel: '1310', name: 'Tactician BOT', tier: 'Contender' },
  { elo: 1520, eloLabel: '1520', name: 'Striker BOT', tier: 'Contender' },
  { elo: 1715, eloLabel: '1715', name: 'Strategist BOT', tier: 'Specialist' },
  { elo: 1905, eloLabel: '1905', name: 'Vector BOT', tier: 'Candidate' },
  { elo: 2110, eloLabel: '2110', name: 'Sentinel BOT', tier: 'Master' },
  { elo: 2315, eloLabel: '2315', name: 'Overlord BOT', tier: 'Master' },
  { elo: 2560, eloLabel: '2560', name: 'Archon BOT', tier: 'Grandmaster' },
  { elo: 2885, eloLabel: '2885', name: 'Vanguard BOT', tier: 'Grandmaster' },
  { elo: 3140, eloLabel: '3140', name: 'Apex BOT (3000+)', tier: 'Singularity' },
];

export const SHADOW_BOT_GAUNTLET: ShadowBotTier[] = [
  {
    name: 'Cantor Calibration Unit',
    eloBand: '1100 – 1450 ELO',
    behavior: 'Benchmarks foundational algebraic fluency and response latency under clock pressure.',
  },
  {
    name: 'Euler Blitz Challenger',
    eloBand: '1500 – 1950 ELO',
    behavior: 'Simulates 60-second bullet blitz pressure with multi-lemma branching.',
  },
  {
    name: 'Gauss Grandmaster Shadow',
    eloBand: '2000 – 2600+ ELO',
    behavior: 'Audits Olympiad-level rigor and exposes subtle boundary-condition hacks.',
  },
];

export const SEVEN_DAY_CALENDAR: ContestDaySchedule[] = [
  { day: 'Mon', label: 'Mon NT', detail: 'Number Theory Rated Sprint' },
  { day: 'Tue', label: 'Tue Alg', detail: 'Algebra & Inequalities' },
  { day: 'Wed', label: 'Wed Geo', detail: 'Euclidean & Projective Geometry' },
  { day: 'Thu', label: 'Thu Comb', detail: 'Combinatorics & Graph Theory' },
  { day: 'Fri', label: 'Fri Mixed', detail: 'Mixed Olympiad Qualifier' },
  { day: 'Sat', label: 'Sat Special/BdMO Warm-Up', detail: 'National Warm-Up Invitational' },
  { day: 'Sun', label: 'Sun Mega Arena', detail: '100m · 10 Qs · T+3h', isMega: true },
];

export const WORLD_CUP_BRACKET_STAGES = [
  '128',
  '64',
  '32',
  '16',
  '8',
  '4',
  'World Champion',
];

export const NEURAL_CORE_CLUSTERS: NeuralEngineCluster[] = [
  {
    name: 'SymPy Deterministic Equivalence Verifiers',
    count: 14,
    role: 'Zero-hallucination symbolic proof validation and procedural Golden Repository synthesis.',
  },
  {
    name: 'Socratic Mentor Routing (Gemini Pro/Flash + Qwen-Math)',
    count: 16,
    role: 'Hint-only pedagogical guidance governed by dynamic TokenMeter rate-limiting.',
  },
  {
    name: 'Zero-PII Reasoning Trajectory Extractors',
    count: 12,
    role: 'Automated 24-hour JSONL compilation of verified human solve paths.',
  },
];

export const SECURITY_LAYERS: SecurityLayer[] = [
  {
    code: 'MODULE 7',
    title: 'Browser-Native Biometric Proctoring',
    metric: '4.5s Gaze Guard',
    detail: 'Client-side MediaPipe & TensorFlow.js inference with zero raw video uploaded.',
  },
  {
    code: 'QPRT-4',
    title: 'Quad-Phase Cyber Shield',
    metric: 'AES-256 Signal Vault',
    detail: '3-Axis Audio Trap, keystroke entropy telemetry, and sealed forensic audit logs.',
  },
  {
    code: 'ESCALATION',
    title: '11-Flag Blackhole Escalation',
    metric: '14-Point Legal & Youth Shield',
    detail: 'Automated anomaly quarantine paired with COPPA/GDPR-compliant appeals.',
  },
];

export const AI_ENGINE_MATRIX_NODES = [
  {
    count: '2',
    role: 'Public Mentors',
    engines: 'Arithmo Personal AI (#8) & Arithmo Guild AI (#9)',
    accentHex: '#00F0FF',
  },
  {
    count: '24',
    role: 'QPRT-4 Guardian Agents',
    engines: 'PlagioGuard · AxiomCheck · GridShield · PulseWatcher · ChronoVault · ProofGrader',
    accentHex: '#10B981',
  },
  {
    count: '12',
    role: 'Question-Forge Engines',
    engines: 'GoldenVault Miner (5×4 Schema v1.2) · TheoremFusion · AdversarialRedTeam AI · SymPyVeritas',
    accentHex: '#F38020',
  },
  {
    count: '1',
    role: 'Psychological Deterrence Agent',
    engines: 'Arithmo Alert AI (AES-256-GCM Soft-Pinch — e.g. SP-409 Gaze Drift)',
    accentHex: '#FBBF24',
  },
  {
    count: '1',
    role: 'Supreme Command Overlord',
    engines: 'Headquarters AI (#12 — 750+ Chief Arbiters & 1000+ Prime Sovereigns Only)',
    accentHex: '#8B5CF6',
  },
];

export const QPRT4_PHASES = [
  {
    phase: '1. Preventive',
    detail: 'PlagioGuard (>75% AoPS Block) & QuantumShuffler (2 Cold Reserves)',
    accentHex: '#00F0FF',
  },
  {
    phase: '2. Live Lockdown',
    detail: 'Mandatory Full-Screen & App/Tab Confinement (>1.2s Focus Loss = Auto-Submit), GridShield (30s ISP Outage Freeze) & PulseWatcher (30s Hot-Swap + 10m Bonus)',
    accentHex: '#F38020',
  },
  {
    phase: '3. Forensic',
    detail: 'MBTS Keystroke/LaTeX Entropy Clustering & 4-Signal Anti-Smurf Defense',
    accentHex: '#8B5CF6',
  },
  {
    phase: '4. Evolutionary',
    detail: '24h Zero-PII JSONL Cold Lake Archival',
    accentHex: '#10B981',
  },
];

export const LEGAL_SHIELD_ITEMS = [
  'BD Bank FX/PRC',
  'NBR e-TIN',
  'BD Cyber Act Zero-NID',
  'COPPA & GDPR-K Youth Privacy',
  'EU DSA',
  'Lemon Squeezy MoR',
];

export const HQ_LADDER_TIERS = [
  { tier: 1, points: 100, title: 'Core Sentinel', scope: 'Unlocks Free Plus' },
  { tier: 2, points: 300, title: 'Problem Architect', scope: 'Unlocks Free Pro' },
  { tier: 3, points: 500, title: 'Round Coordinator', scope: 'Unlocks Free Pro+' },
  { tier: 4, points: 750, title: 'Chief Arbiter', scope: 'Unlocks Free Singularity + Headquarters AI' },
  { tier: 5, points: 1000, title: 'Prime Sovereign (Top 3)', scope: 'All Unlimited' },
];

export const ROLLOUT_SPINOFFS: string[] = [
  'AI Reasoning Data Lab',
  'Formal Math & Code Verification Cloud',
  'Competitive Math E-Sports Media League',
  'Institutional EdTech SaaS (Academy Arena)',
  'Zero-Cheat Biometric Proctoring SaaS',
  'Quant & Deep-Tech Talent Network',
  'Personalized Socratic AI Mentor Cloud',
  'Global Olympiad Credentialing Authority',
];
