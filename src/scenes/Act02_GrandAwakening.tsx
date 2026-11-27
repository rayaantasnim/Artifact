import { AnimatePresence, motion } from 'framer-motion';
import { ArithmoLogoSVG } from '../components/brand/ArithmoLogoSVG';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  RadarSweepBadge,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import type { SceneProps } from './sceneTypes';

type Act2BeatId = 'beat5-reveal' | 'beat6-ecosystem' | 'beat7-sympy' | 'beat8-monument';

function getAct2Beat(actTime: number): Act2BeatId {
  if (actTime < 10) return 'beat5-reveal';
  if (actTime < 20) return 'beat6-ecosystem';
  if (actTime < 29) return 'beat7-sympy';
  return 'beat8-monument';
}

/**
 * Orbiting Golden & Cyan Rings surrounding the Act 2 floating logo reveal (no box).
 */
function OrbitingGoldenRingsSVG() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 640 640" className="h-[min(92vw,620px)] w-[min(92vw,620px)] overflow-visible opacity-75">
        <defs>
          <linearGradient id="goldOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F38020" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '320px 320px' }}
        >
          <ellipse
            cx="320"
            cy="320"
            rx="275"
            ry="110"
            transform="rotate(-22 320 320)"
            fill="none"
            stroke="url(#goldOrbitGrad)"
            strokeWidth="1.8"
            strokeDasharray="16 10"
          />
          <circle cx="574" cy="218" r="5" fill="#FBBF24" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '320px 320px' }}
        >
          <ellipse
            cx="320"
            cy="320"
            rx="235"
            ry="96"
            transform="rotate(28 320 320)"
            fill="none"
            stroke="#F38020"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <circle cx="114" cy="210" r="4.5" fill="#00F0FF" />
        </motion.g>

        <motion.circle
          cx="320"
          cy="320"
          r="158"
          fill="none"
          stroke="#FBBF24"
          strokeOpacity="0.32"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '320px 320px' }}
        />
      </svg>
    </div>
  );
}

/**
 * ACT II (0:32 – 1:10) — The Grand Awakening & Manifesto.
 * Zero static rectangle boxes: floating 3D logo with orbiting golden rings and full-bleed sweeping typography.
 */
export function Act02_GrandAwakening({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const beatId = getAct2Beat(actTime);

  const showMidBeat5 = actTime >= 4.2 && actTime < 10;
  const showMidBeat6 = actTime >= 14.5 && actTime < 20;
  const showMidBeat7 = actTime >= 24.0 && actTime < 29;
  const showMidBeat8 = actTime >= 33.5;

  return (
    <section
      aria-label="Act 2: The Grand Awakening and Manifesto"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        assetKey="obsidianAuditorium"
        opacity={beatId === 'beat5-reveal' ? 0.64 : 0.54}
        scaleFrom={1.24}
        scaleTo={1.04}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(10,18,38,0.22)_0%,rgba(5,7,13,0.72)_72%,rgba(4,6,11,0.94)_100%)]"
      />

      {/* Opening shockwave flare */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.98, scale: 0.25 }}
        animate={{ opacity: 0, scale: 2.3 }}
        transition={{ duration: 1.35, ease: 'easeOut' }}
        className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,250,240,0.9)_0%,rgba(243,128,32,0.55)_32%,transparent_66%)]"
      />

      {beatId === 'beat5-reveal' && <OrbitingGoldenRingsSVG />}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {beatId === 'beat5-reveal' && (
            <motion.div
              key="beat5-reveal"
              initial={{ opacity: 0, scale: 1.38, rotateX: 14, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.86, y: -26, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArithmoLogoSVG size={166} enableLightSweep className="sm:scale-110" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -40, letterSpacing: '0.16em' }}
                animate={{ opacity: 1, x: 0, letterSpacing: '-0.03em' }}
                transition={{ delay: 0.22, type: 'spring', stiffness: 125, damping: 19 }}
                className="font-display mt-5 text-[clamp(2.8rem,7vw,5.8rem)] font-bold leading-none text-white drop-shadow-[0_14px_45px_rgba(243,128,32,0.45)]"
              >
                Arithmo{' '}
                <span className="text-[#F38020] drop-shadow-[0_0_26px_rgba(243,128,32,0.7)]">
                  Edge
                </span>
              </motion.h1>

              <motion.p
                initial={false}
                animate={
                  showMidBeat5
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 14, scale: 0.94 }
                }
                transition={{ type: 'spring', stiffness: 135, damping: 20 }}
                className="mt-4 text-[clamp(0.9rem,1.65vw,1.2rem)] font-semibold tracking-[0.26em] text-cyan-200 uppercase drop-shadow-[0_0_16px_rgba(0,240,255,0.45)]"
              >
                Powered by Olympiad Edge
              </motion.p>
            </motion.div>
          )}

          {beatId === 'beat6-ecosystem' && (
            <motion.div
              key="beat6-ecosystem"
              initial={{ opacity: 0, x: 90, rotateY: -18, filter: 'blur(12px)' }}
              animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -90, rotateY: 16, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 130, damping: 19 }}
              className="flex w-full flex-col items-center gap-7"
            >
              {/* Full-bleed sweeping typography without a bounding rectangle */}
              <h2 className="font-display max-w-5xl text-[clamp(1.85rem,4.6vw,3.85rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="The World's First Real-Time ELO-Rated Competitive Mathematics & Olympiad Mega-Ecosystem."
                  stagger={0.036}
                  highlightWords={['Real-Time', 'ELO-Rated', 'Mega-Ecosystem']}
                  highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.5)]"
                />
              </h2>

              <motion.div
                initial={false}
                animate={
                  showMidBeat6
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.92 }
                }
                transition={{ type: 'spring', stiffness: 135, damping: 19 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-7"
              >
                <TactileTile accentHex="#00F0FF" className="border-cyan-400/45 bg-slate-950/60 px-6 py-4 backdrop-blur-xl">
                  <p className="font-mono-tabular text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-[#00F0FF]">
                    <AnimatedCounter key={`a2-b6-14-${showMidBeat6}-${seekNonce}`} target={14} />
                  </p>
                  <p className="font-mono-tabular text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                    Federated Portals
                  </p>
                </TactileTile>

                <TactileTile accentHex="#F38020" className="border-[#F38020]/45 bg-slate-950/60 px-6 py-4 backdrop-blur-xl">
                  <p className="font-mono-tabular text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-[#F38020]">
                    <AnimatedCounter key={`a2-b6-5-${showMidBeat6}-${seekNonce}`} target={5} />
                  </p>
                  <p className="font-mono-tabular text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                    Domain ELO Arenas
                  </p>
                </TactileTile>

                <TactileTile accentHex="#A78BFA" className="border-violet-400/45 bg-slate-950/60 px-6 py-4 backdrop-blur-xl">
                  <p className="font-mono-tabular text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-violet-300">
                    <AnimatedCounter key={`a2-b6-42-${showMidBeat6}-${seekNonce}`} target={42} />
                  </p>
                  <p className="font-mono-tabular text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                    Hybrid Neural Engines
                  </p>
                </TactileTile>
              </motion.div>
            </motion.div>
          )}

          {beatId === 'beat7-sympy' && (
            <motion.div
              key="beat7-sympy"
              initial={{ opacity: 0, rotateX: -14, scale: 0.88, filter: 'blur(10px)' }}
              animate={{ opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, rotateY: 14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 130, damping: 19 }}
              className="flex w-full flex-col items-center gap-6"
            >
              {/* Opposing kinetic wing lines with zero box clutter */}
              <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-6 sm:grid-cols-2">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 130, damping: 18 }}
                  className="flex flex-col items-center border-l-4 border-[#00F0FF] pl-5 text-left sm:items-start"
                >
                  <div className="flex items-center gap-2.5">
                    <RadarSweepBadge colorHex="#00F0FF" size={34} />
                    <span className="font-mono-tabular text-xs font-bold tracking-widest text-[#00F0FF] uppercase">
                      Edge Matchmaking
                    </span>
                  </div>
                  <h3 className="font-display mt-2 text-[clamp(1.6rem,3.3vw,2.7rem)] font-bold leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                    <GradualWordReveal
                      text="Sub-Second Global Matchmaking"
                      stagger={0.045}
                      align="left"
                      highlightWords={['Sub-Second', 'Global']}
                      highlightClassName="text-[#00F0FF]"
                    />
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.12, type: 'spring', stiffness: 130, damping: 18 }}
                  className="flex flex-col items-center border-l-4 border-emerald-400 pl-5 text-left sm:items-start"
                >
                  <div className="flex items-center gap-2.5">
                    <RadarSweepBadge colorHex="#10B981" size={34} />
                    <span className="font-mono-tabular text-xs font-bold tracking-widest text-emerald-300 uppercase">
                      Arithmo Forge
                    </span>
                  </div>
                  <h3 className="font-display mt-2 text-[clamp(1.6rem,3.3vw,2.7rem)] font-bold leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                    <GradualWordReveal
                      text="Deterministic SymPy Proof Verification"
                      stagger={0.042}
                      align="left"
                      highlightWords={['Deterministic', 'SymPy']}
                      highlightClassName="text-emerald-300"
                    />
                  </h3>
                </motion.div>
              </div>

              <motion.div
                initial={false}
                animate={
                  showMidBeat7
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 18, scale: 0.94 }
                }
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <TactileTile accentHex="#10B981" className="px-4 py-2.5 text-xs font-bold text-emerald-200 sm:text-sm">
                  <AnimatedCounter
                    key={`a2-b7-100-${showMidBeat7}-${seekNonce}`}
                    target={100}
                    suffix="% Deterministic Check"
                  />
                </TactileTile>
                <TactileTile accentHex="#00F0FF" className="px-4 py-2.5 text-xs font-bold text-cyan-200 sm:text-sm">
                  <AnimatedCounter
                    key={`a2-b7-50-${showMidBeat7}-${seekNonce}`}
                    target={50}
                    suffix="ms Edge Calibration"
                  />
                </TactileTile>
                <TactileTile accentHex="#F38020" className="px-4 py-2.5 text-xs font-bold text-amber-200 sm:text-sm">
                  <AnimatedCounter
                    key={`a2-b7-6-${showMidBeat7}-${seekNonce}`}
                    target={6}
                    suffix="h Peer Hacking"
                  />
                </TactileTile>
              </motion.div>
            </motion.div>
          )}

          {beatId === 'beat8-monument' && (
            <motion.div
              key="beat8-monument"
              initial={{ opacity: 0, scale: 0.84, rotateX: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 19 }}
              className="flex w-full max-w-5xl flex-col items-center gap-5"
            >
              <TactileTile
                accentHex="#F38020"
                className="border-[#F38020]/55 bg-[#F38020]/20 px-5 py-2 font-mono-tabular text-xs font-bold tracking-[0.22em] text-amber-200 uppercase sm:text-sm"
              >
                <AnimatedCounter
                  key={`a2-b8-0-${seekNonce}`}
                  target={0}
                  suffix=" PAY-TO-WIN GUARANTEE"
                />
              </TactileTile>

              <h2 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="Skill is Earned, Never Bought."
                  stagger={0.055}
                  highlightWords={['Earned', 'Never', 'Bought']}
                  highlightClassName="text-[#F38020] drop-shadow-[0_0_26px_rgba(243,128,32,0.6)]"
                />
              </h2>

              <motion.div
                initial={false}
                animate={
                  showMidBeat8
                    ? { opacity: 1, scaleX: 1 }
                    : { opacity: 0.3, scaleX: 0.35 }
                }
                transition={{ type: 'spring', stiffness: 130, damping: 20 }}
                className="h-1 w-64 rounded-full bg-gradient-to-r from-transparent via-[#F38020] to-transparent shadow-[0_0_20px_#F38020]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
