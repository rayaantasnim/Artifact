export type GalleryAssetKey =
  | 'obsidianAuditorium'
  | 'federatedConstellation'
  | 'subSecondVelocity'
  | 'mathematicalGenome'
  | 'numberTheoryArena'
  | 'algebraArena'
  | 'geometryArena'
  | 'combinatoricsArena'
  | 'mixedOlympiadArena'
  | 'bulletBlitzDuel'
  | 'neuralCore'
  | 'infiniteArchive'
  | 'shadowBotGauntlet'
  | 'cyberShield'
  | 'blackholeEscalation'
  | 'youthPrivacyShield'
  | 'academyArena'
  | 'meritTreasury'
  | 'worldCupCrown'
  | 'singularityHorizon';

export interface GalleryAsset {
  key: GalleryAssetKey;
  title: string;
  primaryPath: string;
  fallbackPaths: string[];
}

function buildSmartCandidates(
  primaryFile: string,
  aliases: string[] = []
): { primaryPath: string; fallbackPaths: string[] } {
  const baseName = primaryFile.replace(/\.(webp|jpg|jpeg|png)$/i, '');
  const primaryPath = `./Assets/gallery/${encodeURIComponent(primaryFile)}`;

  const candidates = [
    `./Assets/gallery/${encodeURIComponent(`${baseName}.webp`)}`,
    `./Assets/gallery/${encodeURIComponent(`${baseName}.jpg`)}`,
    `./Assets/gallery/${encodeURIComponent(`${baseName}.png`)}`,
  ];

  for (const aliasBase of aliases) {
    candidates.push(
      `./Assets/gallery/${encodeURIComponent(`${aliasBase}.png`)}`,
      `./Assets/gallery/${encodeURIComponent(`${aliasBase}.jpg`)}`,
      `./Assets/gallery/${encodeURIComponent(`${aliasBase}.webp`)}`
    );
  }

  return {
    primaryPath,
    fallbackPaths: Array.from(new Set(candidates)).filter((p) => p !== primaryPath),
  };
}

export const GALLERY_ASSETS: Record<GalleryAssetKey, GalleryAsset> = {
  obsidianAuditorium: {
    key: 'obsidianAuditorium',
    title: 'The Obsidian Olympiad Auditorium',
    ...buildSmartCandidates('The Obsidian Olympiad Auditorium.jpg', ['01-obsidian-auditorium']),
  },
  federatedConstellation: {
    key: 'federatedConstellation',
    title: 'The 14-Portal Federated Constellation',
    ...buildSmartCandidates('The 14-Portal Federated Constellation.webp', ['02-federated-constellation']),
  },
  subSecondVelocity: {
    key: 'subSecondVelocity',
    title: 'Sub-Second Edge Velocity',
    ...buildSmartCandidates('Sub-Second Edge Velocity.webp', ['03-sub-second-velocity']),
  },
  mathematicalGenome: {
    key: 'mathematicalGenome',
    title: 'Zero-Copy Mathematical Genome',
    ...buildSmartCandidates('Zero-Copy Mathematical Genome.webp', ['04-mathematical-genome']),
  },
  numberTheoryArena: {
    key: 'numberTheoryArena',
    title: 'Number Theory Arena',
    ...buildSmartCandidates('Number Theory Arena.webp', ['05-number-theory-arena']),
  },
  algebraArena: {
    key: 'algebraArena',
    title: 'Algebra Arena',
    ...buildSmartCandidates('Algebra Arena.webp', ['06-algebra-arena']),
  },
  geometryArena: {
    key: 'geometryArena',
    title: 'Geometry Arena',
    ...buildSmartCandidates('Geometry Arena.webp', ['07-geometry-arena']),
  },
  combinatoricsArena: {
    key: 'combinatoricsArena',
    title: 'Combinatorics Arena',
    ...buildSmartCandidates('Combinatorics Arena.webp', ['08-combinatorics-arena']),
  },
  mixedOlympiadArena: {
    key: 'mixedOlympiadArena',
    title: 'Mixed Olympiad Arena',
    ...buildSmartCandidates('Mixed Olympiad Arena.webp', ['09-mixed-olympiad-arena']),
  },
  bulletBlitzDuel: {
    key: 'bulletBlitzDuel',
    title: 'The 60-Second Bullet Blitz Duel',
    ...buildSmartCandidates('The 60-Second Bullet Blitz Duel.webp', ['10-bullet-blitz-duel']),
  },
  neuralCore: {
    key: 'neuralCore',
    title: 'The 42-Engine Hybrid Neural Core',
    ...buildSmartCandidates('The 42-Engine Hybrid Neural Core.webp', [
      '14-42-engine-neural-core',
      '11-neural-core',
    ]),
  },
  infiniteArchive: {
    key: 'infiniteArchive',
    title: 'Arithmo Database — The Infinite Archive',
    ...buildSmartCandidates('Arithmo Database — The Infinite Archive.webp', [
      '13-arithmo-database',
      '12-infinite-archive',
    ]),
  },
  shadowBotGauntlet: {
    key: 'shadowBotGauntlet',
    title: 'Shadow Bot Gauntlet',
    ...buildSmartCandidates('Shadow Bot Gauntlet.webp', [
      '11-shadow-bot-gauntlet',
      '13-shadow-bot-gauntlet',
    ]),
  },
  cyberShield: {
    key: 'cyberShield',
    title: 'QPRT-4 Quad-Phase Cyber Shield',
    ...buildSmartCandidates('QPRT-4 Quad-Phase Cyber Shield.webp', [
      '15-qprt4-cyber-shield',
      '14-qprt-cyber-shield',
    ]),
  },
  blackholeEscalation: {
    key: 'blackholeEscalation',
    title: '11-Flag Blackhole Escalation',
    ...buildSmartCandidates('11-Flag Blackhole Escalation.webp', [
      '16-11-flag-blackhole',
      '15-blackhole-escalation',
    ]),
  },
  youthPrivacyShield: {
    key: 'youthPrivacyShield',
    title: '14-Point Legal & Youth Privacy Shield',
    ...buildSmartCandidates('14-Point Legal & Youth Privacy Shield.webp', [
      '17-14-point-legal-shield',
      '16-youth-privacy-shield',
    ]),
  },
  academyArena: {
    key: 'academyArena',
    title: 'Arithmo Academy Arena',
    ...buildSmartCandidates('Arithmo Academy Arena.webp', ['18-academy-arena', '17-academy-arena']),
  },
  meritTreasury: {
    key: 'meritTreasury',
    title: 'Closed-Loop Arithmo Wallet & Merit Treasury',
    ...buildSmartCandidates('Closed-Loop Arithmo Wallet & Merit Treasury.webp', [
      '19-closed-loop-wallet',
      '18-merit-treasury',
    ]),
  },
  worldCupCrown: {
    key: 'worldCupCrown',
    title: 'Top 128 Annual World Cup Crown',
    ...buildSmartCandidates('Top 128 Annual World Cup Crown.webp', [
      '12-world-cup-crown',
      '19-world-cup-crown',
    ]),
  },
  singularityHorizon: {
    key: 'singularityHorizon',
    title: 'Grand Singularity & 8 Spin-Off Horizon',
    ...buildSmartCandidates('Grand Singularity & 8 Spin-Off Horizon.webp', [
      '20-grand-singularity-horizon',
      '20-singularity-horizon',
    ]),
  },
};

export const GALLERY_ASSET_LIST: GalleryAsset[] = Object.values(GALLERY_ASSETS);
