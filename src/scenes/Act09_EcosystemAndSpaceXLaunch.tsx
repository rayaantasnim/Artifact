import { AnimatePresence, motion } from 'framer-motion';
import { Award, Building2, Flame, Rocket, ShieldCheck, Wallet } from 'lucide-react';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { HQ_LADDER_TIERS } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

const LAUNCH_MILESTONES = [
  { code: 'T-00:00', title: 'IGNITION', threshold: 0 },
  { code: 'T+04:00', title: 'MAX-Q TELEMETRY', threshold: 0.25 },
  { code: 'T+09:00', title: 'STAGE SEPARATION', threshold: 0.52 },
  { code: 'T+15:00', title: 'ORBITAL SINGULARITY', threshold: 0.78 },
];

const EXHAUST_SPARKS = [
  { dx: -14, delay: 0, size: 6.5 },
  { dx: 12, delay: 0.14, size: 5.5 },
  { dx: -6, delay: 0.28, size: 7.5 },
  { dx: 6, delay: 0.42, size: 6 },
  { dx: 0, delay: 0.18, size: 8.5 },
  { dx: -18, delay: 0.35, size: 4.5 },
  { dx: 17, delay: 0.22, size: 4.5 },
];

/**
 * Full-height SpaceX-style vertical & orbital rocket launch trajectory SVG
 * with blazing vibrant orange exhaust plume particles.
 */
function VerticalRocketTrajectorySVG({ progress }: { progress: number }) {
  const p = Math.max(0.05, Math.min(1, progress));
  // Steep vertical-to-orbital pitch curve
  const rocketX = 58 + Math.pow(p, 1.35) * 205;
  const rocketY = 305 - Math.pow(p, 0.78) * 265;

  return (
    <div className="relative flex h-[170px] w-full items-center justify-center sm:h-[260px] lg:h-[340px]">
      <svg viewBox="0 0 320 340" className="h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="spacexVertGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F38020" />
            <stop offset="55%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <radialGradient id="exhaustGlowVert" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7ED" stopOpacity="1" />
            <stop offset="45%" stopColor="#F38020" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#F38020" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Atmospheric Altitude Layers */}
        <line x1="20" y1="305" x2="300" y2="305" stroke="#1E3A5F" strokeWidth="1.2" />
        <line x1="20" y1="215" x2="300" y2="215" stroke="#1E3A5F" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="20" y1="125" x2="300" y2="125" stroke="#1E3A5F" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="20" y1="40" x2="300" y2="40" stroke="#00F0FF" strokeOpacity="0.4" strokeDasharray="6 4" strokeWidth="1.2" />

        <text x="22" y="32" fill="#00F0FF" fontSize="9.5" fontFamily="monospace" fontWeight="700">
          ORBITAL SINGULARITY · 420 KM
        </text>
        <text x="22" y="324" fill="#F38020" fontSize="9.5" fontFamily="monospace" fontWeight="700">
          PAD IGNITION · DEC 31, 2026
        </text>

        {/* Planned Vertical-to-Orbit Trajectory */}
        <path
          d="M 58 305 Q 64 95 263 40"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2.2"
          strokeDasharray="6 6"
        />

        {/* Active Burn Trail */}
        <motion.path
          d="M 58 305 Q 64 95 263 40"
          fill="none"
          stroke="url(#spacexVertGrad)"
          strokeWidth="3.8"
          strokeLinecap="round"
          initial={{ pathLength: 0.08 }}
          animate={{ pathLength: p }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        {/* Ascending Rocket Stage & Blazing Exhaust Plume */}
        <g transform={`translate(${rocketX}, ${rocketY})`}>
          {EXHAUST_SPARKS.map((spark, idx) => (
            <motion.circle
              key={idx}
              cx={spark.dx * 0.35}
              cy={12}
              r={spark.size}
              fill={idx % 2 === 0 ? '#F38020' : '#FBBF24'}
              animate={{
                cy: [10, 44 + idx * 4],
                cx: [spark.dx * 0.25, spark.dx * 1.2],
                opacity: [0.98, 0],
                scale: [1, 0.25],
              }}
              transition={{
                duration: 0.8,
                delay: spark.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}

          <circle cx="0" cy="12" r="22" fill="url(#exhaustGlowVert)" />
          <polygon points="0,-12 7,8 -7,8" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

/**
 * ACT IX (4:35 – 5:05) — Split-Screen Merit Treasury & 5-Tier Ladder
 * transitioning into SpaceX-Style Vertical Rocket Launch Trajectory.
 */
export function Act09_EcosystemAndSpaceXLaunch({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const isBeat1 = actTime < 10; // 4:35 - 4:45
  const launchProgress = isBeat1 ? 0 : Math.min(1, Math.max(0, (actTime - 10) / 20));
  const activeTierIdx = Math.min(HQ_LADDER_TIERS.length - 1, Math.floor(actTime / 2));

  return (
    <section
      aria-label="Act 9: Institutional Ecosystem, Merit Treasury and V4.0 Rocket Launch"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      {isBeat1 ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Left Half: Academy Arena 3D Ken Burns Backdrop */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <KenBurnsArtwork
              assetKey="academyArena"
              opacity={0.5}
              scaleFrom={1.04}
              scaleTo={1.18}
              durationSec={12}
              pointerOffset={pointerOffset}
              scrimClassName="bg-[radial-gradient(circle_at_30%_45%,rgba(0,240,255,0.16)_0%,rgba(5,7,13,0.58)_74%,rgba(4,6,11,0.9)_100%)]"
            />
          </div>

          {/* Right Half: Closed-Loop Wallet & Merit Treasury 3D Ken Burns Backdrop */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <KenBurnsArtwork
              assetKey="meritTreasury"
              opacity={0.5}
              scaleFrom={1.16}
              scaleTo={1.04}
              durationSec={12}
              pointerOffset={pointerOffset}
              scrimClassName="bg-[radial-gradient(circle_at_70%_45%,rgba(243,128,32,0.16)_0%,rgba(5,7,13,0.58)_74%,rgba(4,6,11,0.9)_100%)]"
            />
          </div>

          {/* Glowing Cyan / Orange Center Rim Seam & Ambient Vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-gradient-to-r from-cyan-400/10 via-amber-400/20 to-orange-500/10 blur-xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(4,6,11,0.72)_100%)]"
          />
        </div>
      ) : (
        <KenBurnsArtwork
          assetKey="singularityHorizon"
          opacity={0.62}
          scaleFrom={1.05}
          scaleTo={1.22}
          durationSec={Math.max(10, actDuration - 10)}
          pointerOffset={pointerOffset}
          scrimClassName="bg-[radial-gradient(circle_at_center,rgba(26,12,6,0.28)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.96)_100%)]"
        />
      )}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {isBeat1 ? (
            <motion.div
              key="act9-beat1-split"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-2 sm:gap-3.5"
            >
              <h2 className="font-display text-[clamp(1.35rem,3.6vw,2.9rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="Academy Arena, Closed-Loop Wallet & 5-Tier HQ Ladder"
                  stagger={0.038}
                  highlightWords={['Academy', 'Closed-Loop', '5-Tier', 'HQ']}
                  highlightClassName="text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.45)]"
                />
              </h2>

              {/* Split-Screen Merit Treasury Wings */}
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                <TactileTile accentHex="#00F0FF" className="border-[#00F0FF]/55 bg-slate-950/70 p-3 text-left shadow-[0_0_28px_rgba(0,240,255,0.2)] backdrop-blur-xl sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-[11px] font-bold text-[#00F0FF] uppercase sm:text-xs">
                      Arithmo Academy Arena
                    </span>
                    <Building2 className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                  </div>
                  <p className="font-display mt-1 text-base font-bold text-white sm:mt-1.5 sm:text-lg">
                    <AnimatedCounter target={2} suffix="-Handle" resetKey={`a9-b1-2h-${seekNonce}`} /> Institutional OS ·{' '}
                    <AnimatedCounter target={100} suffix="%" resetKey={`a9-b1-100g-${seekNonce}`} /> Auto-Graded
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-200 sm:mt-1 sm:text-xs">
                    Dedicated school &amp; coaching cohorts with unified ELO batch telemetry.
                  </p>
                </TactileTile>

                <TactileTile accentHex="#F38020" className="border-[#F38020]/55 bg-slate-950/70 p-3 text-left shadow-[0_0_28px_rgba(243,128,32,0.2)] backdrop-blur-xl sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-[11px] font-bold text-[#F38020] uppercase sm:text-xs">
                      Closed-Loop Wallet
                    </span>
                    <Wallet className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                  </div>
                  <p className="font-display mt-1 text-base font-bold text-white sm:mt-1.5 sm:text-lg">
                    <AnimatedCounter target={0} suffix="% Pay-to-Win" resetKey={`a9-b1-0p2w-${seekNonce}`} /> ·{' '}
                    <AnimatedCounter target={100} suffix="% Free ELO Unlocks" resetKey={`a9-b1-100elo-${seekNonce}`} />
                  </p>
                  <p className="mt-0.5 text-[11px] text-amber-100/95 sm:mt-1 sm:text-xs">
                    Lemon Squeezy · bKash · Nagad (+10% Wallet Bonus · 60s Cancellation Grace)
                  </p>
                </TactileTile>
              </div>

              <p className="font-mono-tabular text-[10px] font-bold tracking-[0.2em] text-cyan-200 uppercase sm:text-[11px]">
                5-Tier Monotonic HQ Ladder · Pure Merit Only (Zero Donations / Zero Money)
              </p>

              {/* 5-Tier Monotonic Staircase */}
              <div className="grid w-full grid-cols-2 items-stretch gap-1.5 sm:grid-cols-5 sm:gap-2.5">
                {HQ_LADDER_TIERS.map((node, idx) => {
                  const isLit = idx <= activeTierIdx;
                  return (
                    <motion.div
                      key={node.tier}
                      style={{ marginBottom: `${idx * 2}px` }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={idx === 4 ? 'col-span-2 sm:col-span-1' : undefined}
                    >
                      <TactileTile
                        accentHex={isLit ? '#F38020' : '#00F0FF'}
                        className={`flex h-full flex-col justify-between p-2 text-left backdrop-blur-xl sm:p-3 ${
                          isLit
                            ? 'border-[#F38020]/80 bg-amber-950/50 shadow-[0_0_22px_rgba(243,128,32,0.28)]'
                            : 'border-cyan-400/25 bg-slate-950/75'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono-tabular text-[10px] font-bold text-[#F38020] sm:text-[11px]">
                              T<AnimatedCounter target={node.tier} resetKey={`a9-b1-tier-${node.tier}-${seekNonce}`} /> · <AnimatedCounter target={node.points} suffix="+ HQ ELO" resetKey={`a9-b1-pts-${node.tier}-${seekNonce}`} />
                            </span>
                            <Award className="h-3 w-3 shrink-0 text-[#F38020] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                          </div>
                          <p className="mt-0.5 text-[11px] font-bold leading-tight text-white sm:text-xs">
                            {node.title}
                          </p>
                        </div>
                        <p className="mt-1 text-[10px] font-medium leading-tight text-cyan-200 sm:text-[11px]">
                          {node.scope}
                        </p>
                      </TactileTile>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="act9-beat2-spacex"
              initial={{ opacity: 0, scale: 0.88, rotateY: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="grid w-full grid-cols-1 items-center gap-2.5 lg:grid-cols-12 lg:gap-5"
            >
              {/* Left/Center: Full-Height Vertical Rocket Launch Trajectory */}
              <div className="lg:col-span-6">
                <VerticalRocketTrajectorySVG progress={launchProgress} />
              </div>

              {/* Right: SpaceX Mission Telemetry & Milestones (no outer wrapper box) */}
              <div className="flex flex-col items-center gap-2.5 text-left sm:gap-3.5 lg:col-span-6 lg:items-start">
                <div className="flex items-center gap-2 font-mono-tabular text-[11px] font-bold tracking-[0.2em] text-[#F38020] uppercase sm:text-xs sm:tracking-[0.22em]">
                  <Rocket className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                  <span>V4.0 Grand Singularity Launch</span>
                </div>

                <h2 className="font-display text-[clamp(1.45rem,3.6vw,2.9rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                  Dec 31, 2026 —{' '}
                  <span className="text-[#F38020]">Orbital Ignition</span>
                </h2>

                <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
                  <TactileTile accentHex="#00F0FF" className="bg-slate-950/70 p-2.5 backdrop-blur-xl sm:p-3.5">
                    <p className="font-mono-tabular text-[10px] text-zinc-400 uppercase">Apogee</p>
                    <p className="font-mono-tabular mt-0.5 text-base font-extrabold text-[#00F0FF] sm:text-xl">
                      <AnimatedCounter target={420} suffix=" km LEO" resetKey={`a9-b2-420-${seekNonce}`} />
                    </p>
                  </TactileTile>
                  <TactileTile accentHex="#F38020" className="bg-slate-950/70 p-2.5 backdrop-blur-xl sm:p-3.5">
                    <p className="font-mono-tabular text-[10px] text-zinc-400 uppercase">Velocity</p>
                    <p className="font-mono-tabular mt-0.5 text-base font-extrabold text-[#F38020] sm:text-xl">
                      <AnimatedCounter target={27600} suffix=" km/h" resetKey={`a9-b2-27600-${seekNonce}`} />
                    </p>
                  </TactileTile>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 sm:gap-2.5">
                  {LAUNCH_MILESTONES.map((ms) => {
                    const reached = launchProgress >= ms.threshold;
                    return (
                      <TactileTile
                        key={ms.code}
                        accentHex={reached ? '#F38020' : '#38BDF8'}
                        className={`p-2 backdrop-blur-xl sm:p-3 ${
                          reached ? 'border-[#F38020]/75 bg-[#F38020]/15' : 'bg-slate-950/60 opacity-65'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {reached ? (
                            <Flame className="h-3.5 w-3.5 shrink-0 text-[#F38020]" aria-hidden="true" />
                          ) : (
                            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
                          )}
                          <span className="font-mono-tabular text-[10px] font-bold text-amber-300 sm:text-[11px]">
                            {ms.code}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] font-bold text-white sm:text-xs">{ms.title}</p>
                      </TactileTile>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
