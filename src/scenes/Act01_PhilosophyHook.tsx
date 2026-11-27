import { AnimatePresence, motion } from 'framer-motion';
import {
  AnimatedCounter,
  CyberHudPanel,
  EloLaserMeter,
  GradualWordReveal,
  KenBurnsArtwork,
  RadarSweepBadge,
  ShatterBurstOverlay,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import type { SceneProps } from './sceneTypes';

type Act1BeatId = 'beat-codeforces' | 'beat-chess' | 'beat-pdfs' | 'beat-silence';

function getAct1Beat(actTime: number): Act1BeatId {
  if (actTime < 7) return 'beat-codeforces';
  if (actTime < 14) return 'beat-chess';
  if (actTime < 23) return 'beat-pdfs';
  return 'beat-silence';
}

/**
 * ACT I (0:00 – 0:32) — High-Tension Mystery.
 * STRICT RULE: Zero brand name, zero logo, zero top navbar.
 */
export function Act01_PhilosophyHook({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const beatId = getAct1Beat(actTime);
  const showMidBeat1 = actTime >= 3.4 && actTime < 7;
  const showMidBeat2 = actTime >= 10.4 && actTime < 14;
  const showMidBeat3 = actTime >= 18.2 && actTime < 23;
  const showMidBeat4 = actTime >= 27.2;

  return (
    <section
      aria-label="Act 1: The Philosophical Mystery"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-16 pb-20 sm:px-10 md:pt-20 md:pb-24"
    >
      <KenBurnsArtwork
        assetKey="mathematicalGenome"
        opacity={beatId === 'beat-pdfs' ? 0.45 : 0.56}
        scaleFrom={1.04}
        scaleTo={1.24}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName={
          beatId === 'beat-pdfs'
            ? 'bg-[radial-gradient(circle_at_center,rgba(80,10,24,0.34)_0%,rgba(5,7,13,0.78)_70%,rgba(4,6,11,0.96)_100%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(5,12,28,0.25)_0%,rgba(5,7,13,0.74)_70%,rgba(4,6,11,0.95)_100%)]'
        }
      />

      {beatId === 'beat-pdfs' && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.16, 0.42, 0.16] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.32),transparent_68%)]"
          />
          <ShatterBurstOverlay active={showMidBeat3} colorHex="#F43F5E" />
        </>
      )}

      {beatId === 'beat-silence' && (
        <>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.2, scale: 0.6 }}
            animate={{
              opacity: showMidBeat4 ? 0.72 : 0.4,
              scale: showMidBeat4 ? 1.45 : 0.95,
            }}
            transition={{ duration: 2.5, ease: 'easeIn' }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,240,255,0.18)_44%,rgba(243,128,32,0.2)_64%,transparent_82%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial from-[#06080D]/80 via-[#06080D]/40 to-transparent"
          />
        </>
      )}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {beatId === 'beat-codeforces' && (
            <motion.div
              key="beat-codeforces"
              initial={{ opacity: 0, scale: 1.38, z: 220, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -24, filter: 'blur(12px)' }}
              transition={{ type: 'spring', stiffness: 135, damping: 18 }}
              className="flex w-full max-w-5xl flex-col items-center gap-6"
            >
              <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.7rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_10px_32px_rgba(0,0,0,0.85)]">
                <GradualWordReveal
                  text="Competitive coding evolved with real-time ELO on Codeforces."
                  stagger={0.045}
                  highlightWords={['real-time', 'ELO', 'Codeforces']}
                  highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.45)]"
                />
              </h1>

              <motion.div
                initial={false}
                animate={
                  showMidBeat1
                    ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, scale: 0.9, filter: 'blur(8px)' }
                }
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                className="w-full max-w-xl"
              >
                <CyberHudPanel accentHex="#00F0FF" className="px-5 py-4">
                  <EloLaserMeter
                    label="Live Competitive Telemetry · Instant Verdicts"
                    valueText={
                      <AnimatedCounter
                        key={`a1-b1-${showMidBeat1}-${seekNonce}`}
                        target={3500}
                        suffix="+ ELO"
                      />
                    }
                    fillRatio={0.86}
                    accentHex="#00F0FF"
                  />
                </CyberHudPanel>
              </motion.div>
            </motion.div>
          )}

          {beatId === 'beat-chess' && (
            <motion.div
              key="beat-chess"
              initial={{ opacity: 0, rotateY: 52, scale: 0.82, filter: 'blur(12px)' }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, rotateX: -20, scale: 1.14, filter: 'blur(12px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full max-w-5xl flex-col items-center gap-5"
            >
              <CyberHudPanel accentHex="#00F0FF" className="w-full px-5 py-7 sm:px-10 sm:py-10">
                <div className="flex flex-col items-center gap-4">
                  <RadarSweepBadge colorHex="#00F0FF" size={52} />

                  <h1 className="font-display text-[clamp(2.05rem,5.2vw,4.5rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_10px_32px_rgba(0,0,0,0.85)]">
                    <GradualWordReveal
                      text="Chess.com turned strategy into global e-sports."
                      stagger={0.046}
                      highlightWords={['Chess.com', 'global', 'e-sports']}
                      highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.45)]"
                    />
                  </h1>

                  <motion.div
                    initial={false}
                    animate={
                      showMidBeat2
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 16, scale: 0.94 }
                    }
                    transition={{ type: 'spring', stiffness: 145, damping: 20 }}
                    className="mt-2 w-full max-w-lg border-t border-cyan-400/25 pt-4"
                  >
                    <EloLaserMeter
                      label="Instant 1v1 Pairing · Bullet Clocks"
                      valueText={
                        <AnimatedCounter
                          key={`a1-b2-${showMidBeat2}-${seekNonce}`}
                          target={60}
                          suffix="s BLITZ"
                        />
                      }
                      fillRatio={0.94}
                      accentHex="#00F0FF"
                    />
                  </motion.div>
                </div>
              </CyberHudPanel>
            </motion.div>
          )}

          {beatId === 'beat-pdfs' && (
            <motion.div
              key="beat-pdfs"
              initial={{ opacity: 0, scale: 0.85, rotateX: 18, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.28, filter: 'blur(14px)' }}
              transition={{ type: 'spring', stiffness: 130, damping: 18 }}
              className="relative flex w-full max-w-5xl flex-col items-center gap-5"
            >
              <CyberHudPanel
                accentHex="#F43F5E"
                className="w-full border-rose-500/45 bg-rose-950/35 px-5 py-7 sm:px-10 sm:py-10"
              >
                <motion.div
                  animate={
                    showMidBeat3
                      ? { opacity: 0.35, scale: 1.18, letterSpacing: '0.32em' }
                      : { opacity: 0.78, scale: 1, letterSpacing: '0.18em' }
                  }
                  transition={{ type: 'spring', stiffness: 115, damping: 18 }}
                  className="font-mono-tabular mb-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-rose-300 sm:text-sm"
                >
                  <span>∫ f(x)dx</span>
                  <span aria-hidden="true">·</span>
                  <span>xⁿ + yⁿ = zⁿ</span>
                  <span aria-hidden="true">·</span>
                  <span>∀ ε &gt; 0</span>
                </motion.div>

                <h1 className="font-display text-[clamp(1.65rem,4vw,3.4rem)] font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
                  <GradualWordReveal
                    text="So why is pure Olympiad Math still trapped in 1990s PDFs and $500 gatekept courses?"
                    stagger={0.036}
                    highlightWords={['trapped', '1990s', 'PDFs', '$500', 'gatekept']}
                    highlightClassName="text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.45)]"
                  />
                </h1>

                <motion.div
                  initial={false}
                  animate={
                    showMidBeat3
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 18, scale: 0.92 }
                  }
                  transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                  className="mt-5 grid grid-cols-1 gap-2.5 border-t border-rose-400/25 pt-4 sm:grid-cols-3"
                >
                  <TactileTile accentHex="#F43F5E" className="px-3 py-2 text-xs font-semibold text-rose-200">
                    <AnimatedCounter
                      key={`a1-b3-pdf-${showMidBeat3}-${seekNonce}`}
                      target={1990}
                      suffix="s Static PDFs"
                    />
                  </TactileTile>
                  <TactileTile accentHex="#F43F5E" className="px-3 py-2 text-xs font-semibold text-rose-200">
                    <AnimatedCounter
                      key={`a1-b3-fee-${showMidBeat3}-${seekNonce}`}
                      prefix="$"
                      target={500}
                      suffix=" Gatekept Courses"
                    />
                  </TactileTile>
                  <TactileTile accentHex="#F43F5E" className="px-3 py-2 text-xs font-semibold text-rose-200">
                    <AnimatedCounter
                      key={`a1-b3-elo-${showMidBeat3}-${seekNonce}`}
                      target={0}
                      suffix=" Real-Time ELO"
                    />
                  </TactileTile>
                </motion.div>
              </CyberHudPanel>
            </motion.div>
          )}

          {beatId === 'beat-silence' && (
            <motion.div
              key="beat-silence"
              initial={{ opacity: 0, scale: 0.72, filter: 'blur(16px)' }}
              animate={{
                opacity: 1,
                scale: showMidBeat4 ? 1.09 : 1,
                filter: 'blur(0px)',
              }}
              exit={{ opacity: 0, scale: 1.58, filter: 'blur(20px)' }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-4"
            >
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: showMidBeat4 ? [0.85, 1.55] : [0.7, 1.1],
                  opacity: showMidBeat4 ? [0.75, 0.15] : [0.38, 0.68],
                }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
                className="pointer-events-none absolute h-64 w-64 rounded-full border-2 border-[#00F0FF]/45 shadow-[0_0_90px_rgba(0,240,255,0.35)] sm:h-80 sm:w-80"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-14 bg-radial from-[#06080D]/80 via-[#06080D]/40 to-transparent"
              />

              <h1 className="font-display relative z-10 text-[clamp(2.4rem,6.4vw,5.25rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]">
                <GradualWordReveal
                  text="The silence ends tonight."
                  stagger={0.065}
                  highlightWords={['ends', 'tonight']}
                  highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.85)]"
                />
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
