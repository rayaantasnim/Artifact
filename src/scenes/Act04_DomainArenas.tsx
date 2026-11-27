import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { DOMAIN_ARENAS } from '../data/ecosystemData';
import { GALLERY_ASSETS } from '../data/galleryAssets';
import type { SceneProps } from './sceneTypes';

/**
 * Huge Glowing 0 -> 3,200+ ELO Speedometer Arc SVG
 */
function EloSpeedometerArc({
  accentHex,
  progressRatio,
  resetKey,
}: {
  accentHex: string;
  progressRatio: number;
  resetKey: string;
}) {
  const clamped = Math.max(0.15, Math.min(1, progressRatio));
  const radius = 84;
  const circumference = Math.PI * radius; // semicircle arc
  const dashOffset = circumference * (1 - clamped);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg viewBox="0 0 210 118" className="h-24 w-44 overflow-visible sm:h-28 sm:w-52" aria-hidden="true">
        <path
          d="M 21 102 A 84 84 0 0 1 189 102"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          d="M 21 102 A 84 84 0 0 1 189 102"
          fill="none"
          stroke={accentHex}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ type: 'spring', stiffness: 110, damping: 18 }}
          style={{ filter: `drop-shadow(0 0 14px ${accentHex})` }}
        />
      </svg>

      <div className="-mt-12 text-center">
        <p
          style={{ color: accentHex }}
          className="font-mono-tabular text-[clamp(1.45rem,3vw,2.2rem)] font-extrabold leading-none"
        >
          <AnimatedCounter resetKey={resetKey} target={3200} suffix="+" />
        </p>
        <p className="mt-1 font-mono-tabular text-[10px] font-semibold tracking-[0.2em] text-zinc-300 uppercase">
          Singularity ELO Ceiling
        </p>
      </div>
    </div>
  );
}

/**
 * ACT IV (1:45 – 2:20) — Five Domain ELO Arenas.
 * Dynamic 5-Card 3D Perspective Carousel with matching 05–09 artworks and ELO speedometer arc.
 */
export function Act04_DomainArenas({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const [manualArenaIdx, setManualArenaIdx] = useState<number | null>(null);
  const autoArenaIdx = Math.floor(actTime / 6.8) % DOMAIN_ARENAS.length;
  const activeIdx = manualArenaIdx ?? autoArenaIdx;
  const activeArena = DOMAIN_ARENAS[activeIdx];

  return (
    <section
      aria-label="Act 4: Five Domain ELO Arenas"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      {/* Active Arena Full-Bleed Artwork Backdrop */}
      <KenBurnsArtwork
        key={activeArena.id}
        assetKey={activeArena.artworkKey}
        opacity={0.55}
        scaleFrom={1.04}
        scaleTo={1.18}
        durationSec={Math.max(8, actDuration / 3)}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(6,10,24,0.28)_0%,rgba(5,7,13,0.75)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2.5 text-center sm:gap-4">
        <div>
          <p
            style={{ color: activeArena.accentColor }}
            className="font-mono-tabular text-xs font-bold tracking-[0.22em] uppercase"
          >
            Act IV · <AnimatedCounter resetKey={`a4-5-${seekNonce}`} target={5} /> Isolated ELO Domains ·{' '}
            <AnimatedCounter resetKey={`a4-60h-${seekNonce}`} target={60} suffix=" Rank Tiers" />
          </p>
          <h2 className="font-display mt-1 text-[clamp(1.65rem,3.9vw,3.15rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
            <GradualWordReveal
              text="Five Domain ELO Arenas"
              stagger={0.045}
              highlightWords={['Five', 'Domain', 'ELO']}
              highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.5)]"
            />
          </h2>
        </div>

        {/* 5-Card 3D Perspective Carousel */}
        <div className="relative flex h-[196px] w-full max-w-5xl items-center justify-center sm:h-[250px]">
          {DOMAIN_ARENAS.map((arena, idx) => {
            // Circular signed distance in [-2, -1, 0, 1, 2]
            let offset = idx - activeIdx;
            if (offset > 2) offset -= DOMAIN_ARENAS.length;
            if (offset < -2) offset += DOMAIN_ARENAS.length;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            const asset = GALLERY_ASSETS[arena.artworkKey];

            return (
              <motion.button
                key={arena.id}
                type="button"
                onClick={() => setManualArenaIdx(idx)}
                animate={{
                  x: offset * 170,
                  scale: isCenter ? 1.06 : absOffset === 1 ? 0.84 : 0.68,
                  rotateY: offset * -22,
                  opacity: isCenter ? 1 : absOffset === 1 ? 0.78 : 0.45,
                  zIndex: 10 - absOffset * 3,
                }}
                whileHover={{ scale: isCenter ? 1.09 : 0.9, y: -4 }}
                transition={{ type: 'spring', stiffness: 165, damping: 20 }}
                style={{
                  borderColor: isCenter ? arena.accentColor : 'rgba(255,255,255,0.2)',
                  boxShadow: isCenter
                    ? `0 24px 64px rgba(0,0,0,0.85), 0 0 38px ${arena.accentColor}66`
                    : '0 12px 32px rgba(0,0,0,0.6)',
                  transformStyle: 'preserve-3d',
                }}
                className="group absolute flex h-[184px] w-[216px] flex-col justify-end overflow-hidden rounded-2xl border bg-slate-950/85 p-3.5 text-left backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:h-[250px] sm:w-[300px] sm:p-4"
              >
                <img
                  src={asset.primaryPath}
                  alt={arena.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const next = asset.fallbackPaths.find((p) => !img.src.endsWith(p.replace('./', '')));
                    if (next) img.src = next;
                  }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-600 ease-out group-hover:translate-x-[360%]"
                />

                <div className="relative z-10">
                  <span
                    style={{ color: arena.accentColor }}
                    className="font-mono-tabular text-[10px] font-bold tracking-wider uppercase"
                  >
                    {arena.route}
                  </span>
                  <h3 className="font-display mt-0.5 text-base font-bold text-white sm:text-lg">
                    {arena.name}
                  </h3>
                  {isCenter && (
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-zinc-200 sm:text-xs">
                      {arena.focus}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Speedometer + Isolated Core Counters */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <EloSpeedometerArc
            accentHex={activeArena.accentColor}
            progressRatio={0.65 + (activeIdx + 1) * 0.07}
            resetKey={`a4-speedo-${activeIdx}-${seekNonce}`}
          />

          <div className="flex items-center gap-3">
            <TactileTile accentHex={activeArena.accentColor} className="px-4 py-2.5 text-center">
              <p className="font-mono-tabular text-lg font-extrabold text-white">
                <AnimatedCounter resetKey={`a4-tiers-${activeIdx}-${seekNonce}`} target={60} />
              </p>
              <p className="text-[11px] text-zinc-300">Rank Tiers</p>
            </TactileTile>
            <TactileTile accentHex={activeArena.accentColor} className="px-4 py-2.5 text-center">
              <p className="font-mono-tabular text-lg font-extrabold text-[#F38020]">
                <AnimatedCounter resetKey={`a4-elos-${activeIdx}-${seekNonce}`} target={10} />
              </p>
              <p className="text-[11px] text-zinc-300">Isolated Core ELOs</p>
            </TactileTile>
          </div>
        </div>
      </div>
    </section>
  );
}
