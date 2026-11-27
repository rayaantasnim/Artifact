import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Globe2, Orbit, Sparkles } from 'lucide-react';
import { ArithmoLogoSVG } from '../components/brand/ArithmoLogoSVG';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { ROLLOUT_SPINOFFS } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

/**
 * Radiating 8-Beam Orbital Horizon SVG
 */
function OrbitalHorizonBeamsSVG() {
  const angles = [18, 62, 118, 162, 198, 242, 298, 342];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden opacity-55"
    >
      <svg viewBox="0 0 640 640" className="h-[min(92vw,640px)] w-[min(92vw,640px)] overflow-visible">
        <circle cx="320" cy="320" r="230" fill="none" stroke="#00F0FF" strokeOpacity="0.25" strokeDasharray="8 8" />
        <circle cx="320" cy="320" r="145" fill="none" stroke="#F38020" strokeOpacity="0.32" />
        {angles.map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 320 + Math.cos(rad) * 285;
          const y2 = 320 + Math.sin(rad) * 285;
          const color = idx % 2 === 0 ? '#F38020' : '#00F0FF';
          return (
            <motion.line
              key={deg}
              x1="320"
              y1="320"
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.6"
              animate={{ opacity: [0.25, 0.95, 0.25] }}
              transition={{ duration: 2.8, delay: idx * 0.22, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * ACT X (5:05 – 5:30) — Radiating 8-Beam Orbital Horizon ($0 VC Debt)
 * & Floating Metallic Architect Plates for Rayaan Tasnim & Jalees Habib.
 */
export function Act10_GrandFinale({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const isBeat1 = actTime < 12; // 5:05 - 5:17

  return (
    <section
      aria-label="Act 10: The 20-Year Holding Horizon and Founding Architects Finale"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        key={isBeat1 ? 'singularity-bg' : 'auditorium-finale-bg'}
        assetKey={isBeat1 ? 'singularityHorizon' : 'obsidianAuditorium'}
        opacity={isBeat1 ? 0.58 : 0.64}
        scaleFrom={isBeat1 ? 1.04 : 1.18}
        scaleTo={isBeat1 ? 1.18 : 1.03}
        durationSec={Math.max(12, actDuration / 2)}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(5,10,22,0.26)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      {isBeat1 && <OrbitalHorizonBeamsSVG />}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {isBeat1 ? (
            <motion.div
              key="act10-beat1-orbital"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono-tabular text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase">
                  <Orbit className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                  <span>
                    <AnimatedCounter target={20} suffix="-Year" resetKey={`a10-b1-20y-${seekNonce}`} /> Olympiad Edge Holding Group
                  </span>
                </span>

                <TactileTile
                  accentHex="#10B981"
                  className="border-emerald-400/55 bg-emerald-950/50 px-3.5 py-1 font-mono-tabular text-xs font-bold text-emerald-200 backdrop-blur-xl"
                >
                  <AnimatedCounter prefix="$" target={0} suffix=" VC DEBT" resetKey={`a10-b1-0vc-${seekNonce}`} />
                </TactileTile>
              </div>

              <h2 className="font-display text-[clamp(1.65rem,3.8vw,3.1rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="Eight Autonomous Deep-Tech Spin-Off Ventures"
                  stagger={0.04}
                  highlightWords={['Eight', 'Autonomous', 'Deep-Tech', 'Spin-Off']}
                  highlightClassName="text-[#F38020] drop-shadow-[0_0_22px_rgba(243,128,32,0.5)]"
                />
              </h2>

              {/* Floating Flanking Spatial Arcs (no single wrapper box) */}
              <div className="grid w-full grid-cols-2 gap-2 text-left sm:grid-cols-4 sm:gap-3.5">
                {ROLLOUT_SPINOFFS.map((title, idx) => (
                  <TactileTile
                    key={title}
                    accentHex={idx % 2 === 0 ? '#00F0FF' : '#F38020'}
                    className="bg-slate-950/70 p-2.5 backdrop-blur-xl sm:p-3.5"
                  >
                    <span
                      className={`font-mono-tabular text-[11px] font-extrabold sm:text-xs ${
                        idx % 2 === 0 ? 'text-[#00F0FF]' : 'text-[#F38020]'
                      }`}
                    >
                      0<AnimatedCounter target={idx + 1} durationMs={650} resetKey={`a10-b1-spinoff-${idx}-${seekNonce}`} />
                    </span>
                    <p className="mt-0.5 text-[11px] font-semibold leading-snug text-white sm:mt-1 sm:text-sm">
                      {title}
                    </p>
                  </TactileTile>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="act10-beat2-architects"
              initial={{ opacity: 0, scale: 0.88, rotateY: 12, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 120, damping: 19 }}
              className="flex w-full max-w-4xl flex-col items-center gap-3 sm:gap-5"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="scale-90 sm:scale-100"
              >
                <ArithmoLogoSVG size={116} enableLightSweep />
              </motion.div>

              <div className="flex flex-col items-center">
                <h2 className="font-display text-[clamp(2.1rem,5.8vw,4.6rem)] font-bold leading-none tracking-tight text-white drop-shadow-[0_14px_40px_rgba(243,128,32,0.5)]">
                  Arithmo <span className="text-[#F38020]">Edge</span>
                </h2>
                <p className="mt-2 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#00F0FF] uppercase sm:mt-3 sm:text-sm sm:tracking-[0.22em]">
                  <Sparkles className="h-3.5 w-3.5 text-[#F38020]" aria-hidden="true" />
                  <span>Inspiring the Younger Generations</span>
                </p>
                <p className="mt-1 font-mono-tabular text-[10px] tracking-[0.2em] text-zinc-300 uppercase sm:text-[11px] sm:tracking-[0.22em]">
                  Powered by Olympiad Edge
                </p>
              </div>

              {/* Floating Metallic Architect Plates */}
              <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
                <TactileTile
                  accentHex="#F38020"
                  className="border-amber-400/50 bg-gradient-to-br from-slate-900/85 via-slate-950/90 to-amber-950/40 px-4 py-3.5 text-left backdrop-blur-xl sm:px-6 sm:py-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[10px] font-bold text-[#F38020] uppercase sm:text-[11px]">
                      Founder &amp; Core System Architect
                    </span>
                    <Crown className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-1 text-lg font-bold text-white sm:mt-1.5 sm:text-2xl">
                    Rayaan Tasnim
                  </h3>
                  <p className="font-mono-tabular mt-0.5 text-xs font-semibold text-[#00F0FF] sm:mt-1">
                    @rayaantasnim
                  </p>
                </TactileTile>

                <TactileTile
                  accentHex="#00F0FF"
                  className="border-cyan-400/50 bg-gradient-to-br from-slate-900/85 via-slate-950/90 to-cyan-950/40 px-4 py-3.5 text-left backdrop-blur-xl sm:px-6 sm:py-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[10px] font-bold text-[#00F0FF] uppercase sm:text-[11px]">
                      Co-Founder &amp; Chief Mathematical Architect
                    </span>
                    <Globe2 className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-1 text-lg font-bold text-white sm:mt-1.5 sm:text-2xl">
                    Jalees Habib
                  </h3>
                  <p className="font-mono-tabular mt-0.5 text-xs font-semibold text-[#F38020] sm:mt-1">
                    @jaleeshabib
                  </p>
                </TactileTile>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
