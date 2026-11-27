import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Crosshair, Link2, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  RadarSweepBadge,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { CANONICAL_SHADOW_BOTS } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

/**
 * ACT V (2:20 – 2:55) — Left-vs-Right Split-Screen Combat Arena
 * + Ascending 12-Silhouette Shadow Bot Cyber-Scanner.
 */
export function Act05_DuelAndShadowBots({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const isBeat1 = actTime < 12; // 2:20 - 2:32
  const blitzRemaining = Math.max(0, 60 - Math.floor(actTime * 5));

  const [manualBotIdx, setManualBotIdx] = useState<number | null>(null);
  const autoBotIdx = Math.min(
    CANONICAL_SHADOW_BOTS.length - 1,
    Math.max(0, Math.floor((actTime - 12) / 1.9))
  );
  const activeBotIdx = manualBotIdx ?? autoBotIdx;
  const activeBot = CANONICAL_SHADOW_BOTS[activeBotIdx];

  return (
    <section
      aria-label="Act 5: Split-Screen Combat Arena and 12 Shadow Bot Silhouettes"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        key={isBeat1 ? 'blitz-bg' : 'shadow-bg'}
        assetKey={isBeat1 ? 'bulletBlitzDuel' : 'shadowBotGauntlet'}
        opacity={0.58}
        scaleFrom={1.06}
        scaleTo={1.2}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(14,10,24,0.28)_0%,rgba(5,7,13,0.75)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {isBeat1 ? (
            <motion.div
              key="act5-beat1-split"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -16, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-3 sm:gap-5"
            >
              <h2 className="font-display text-[clamp(1.45rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="60-Second Bullet Blitz Combat Arena"
                  stagger={0.042}
                  highlightWords={['60-Second', 'Bullet', 'Blitz']}
                  highlightClassName="text-[#F38020] drop-shadow-[0_0_22px_rgba(243,128,32,0.5)]"
                />
              </h2>

              {/* Split-Screen Combat Layout with Ticking 60s Laser Divider */}
              <div className="relative grid w-full grid-cols-1 items-stretch gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
                {/* Left Wing: Human Challenger Pool */}
                <motion.div
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 135, damping: 19 }}
                >
                  <TactileTile
                    accentHex="#00F0FF"
                    className="flex h-full flex-col justify-between border-[#00F0FF]/45 bg-slate-950/70 p-3.5 text-left backdrop-blur-xl sm:p-5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tabular text-xs font-bold tracking-wider text-[#00F0FF] uppercase">
                          Side A · Human Pool
                        </span>
                        <Zap className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                      </div>
                      <h3 className="font-display mt-2 text-xl font-bold text-white sm:text-2xl">
                        <AnimatedCounter resetKey={`a5-b1-60-${seekNonce}`} target={60} suffix="s" /> Global Pool (±
                        <AnimatedCounter resetKey={`a5-b1-100-${seekNonce}`} target={100} suffix=" ELO" />)
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-200 sm:text-sm">
                        Sub-second matchmaking across{' '}
                        <AnimatedCounter resetKey={`a5-b1-5-${seekNonce}`} target={5} /> Olympiad arenas with{' '}
                        <AnimatedCounter
                          resetKey={`a5-b1-04-${seekNonce}`}
                          target={0.4}
                          decimals={1}
                          suffix="s"
                        />{' '}
                        edge lock.
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-black/50 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-200 sm:mt-4 sm:px-3 sm:py-2 sm:text-xs">
                      <Link2 className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]" aria-hidden="true" />
                      <span className="font-mono-tabular truncate">
                        <AnimatedCounter resetKey={`a5-b1-url-${seekNonce}`} target={5} suffix="-Min" /> Direct Rival URL ·{' '}
                        <AnimatedCounter resetKey={`a5-b1-0-${seekNonce}`} target={0} /> Quota Loss
                      </span>
                    </div>
                  </TactileTile>
                </motion.div>

                {/* Center Ticking 60s Laser Divider */}
                <div className="relative flex flex-row items-center justify-center gap-2.5 sm:flex-col sm:gap-3">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#F38020] to-[#00F0FF] sm:h-20 sm:w-0.5 sm:flex-none sm:bg-gradient-to-b" />
                  <div className="relative flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#F38020] bg-black/80 shadow-[0_0_32px_rgba(243,128,32,0.55)] sm:h-20 sm:w-20">
                    <span className="font-mono-tabular text-base font-extrabold text-[#F38020] sm:text-2xl">
                      {blitzRemaining}s
                    </span>
                    <span className="font-mono-tabular text-[8px] font-bold tracking-widest text-cyan-200 uppercase sm:text-[9px]">
                      VS
                    </span>
                  </div>
                  <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-rose-500 to-[#F38020] sm:h-20 sm:w-0.5 sm:flex-none sm:bg-gradient-to-b" />
                </div>

                {/* Right Wing: Stealth Mirror Bot */}
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 135, damping: 19 }}
                >
                  <TactileTile
                    accentHex="#F43F5E"
                    className="flex h-full flex-col justify-between border-rose-500/45 bg-slate-950/70 p-3.5 text-left backdrop-blur-xl sm:p-5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tabular text-xs font-bold tracking-wider text-rose-300 uppercase">
                          Side B · Zero-Wait Mirror
                        </span>
                        <ShieldCheck className="h-4 w-4 text-rose-400" aria-hidden="true" />
                      </div>
                      <h3 className="font-display mt-2 text-xl font-bold text-white sm:text-2xl">
                        Stealth ELO-Mirror Bot
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-200 sm:text-sm">
                        Silently deploys a calibrated opponent mirror so no queue ever stalls.
                      </p>
                    </div>

                    <div className="mt-4 rounded-lg border border-rose-400/35 bg-rose-950/45 px-3 py-2 text-xs font-semibold text-rose-200">
                      <span className="font-mono-tabular">
                        <AnimatedCounter
                          resetKey={`a5-b1-k-${seekNonce}`}
                          target={0.75}
                          decimals={2}
                          suffix="×"
                        />{' '}
                        K-Factor Anti-Inflation Guard
                      </span>
                    </div>
                  </TactileTile>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="act5-beat2-scanner"
              initial={{ opacity: 0, scale: 0.9, rotateY: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 19 }}
              className="flex w-full flex-col items-center gap-4"
            >
              <div className="flex flex-col items-center justify-between gap-3 sm:w-full sm:flex-row">
                <div className="flex items-center gap-3 text-left">
                  <RadarSweepBadge
                    colorHex={activeBot.elo >= 2800 ? '#F38020' : '#00F0FF'}
                    size={52}
                  />
                  <div>
                    <p className="font-mono-tabular text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase">
                      <AnimatedCounter resetKey={`a5-b2-12-${seekNonce}`} target={12} suffix="-Persona" /> Cyber-Scanner · {activeBot.tier}
                    </p>
                    <h3 className="font-display text-[clamp(1.45rem,3.3vw,2.5rem)] font-bold text-white">
                      <span className="text-[#F38020]">
                        <AnimatedCounter
                          resetKey={`a5-b2-elo-${activeBot.elo}-${seekNonce}`}
                          target={activeBot.elo}
                        />
                      </span>{' '}
                      · {activeBot.name}
                    </h3>
                  </div>
                </div>

                <TactileTile
                  accentHex="#F38020"
                  className="flex items-center gap-2.5 border-amber-400/45 bg-slate-950/75 px-4 py-2 text-xs font-bold text-amber-200 backdrop-blur-xl"
                >
                  <Crosshair className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                  <span className="font-mono-tabular">
                    Target{' '}
                    <AnimatedCounter
                      resetKey={`a5-b2-t-${activeBot.elo}-${seekNonce}`}
                      target={activeBot.elo}
                    />{' '}
                    / <AnimatedCounter resetKey={`a5-b2-max-${seekNonce}`} target={3140} /> ELO
                  </span>
                </TactileTile>
              </div>

              {/* Ascending 12 Shadow Bot Silhouette Skyline */}
              <div className="relative flex h-36 w-full items-end justify-between gap-0.5 px-0.5 pt-4 sm:h-52 sm:gap-2.5 sm:px-1 sm:pt-6">
                {CANONICAL_SHADOW_BOTS.map((bot, idx) => {
                  const isLocked = idx === activeBotIdx;
                  const heightPct = 28 + Math.round((bot.elo / 3140) * 72);
                  const barColor = bot.elo >= 2800 ? '#F38020' : '#00F0FF';
                  return (
                    <motion.button
                      key={bot.elo}
                      type="button"
                      onClick={() => setManualBotIdx(idx)}
                      whileHover={{ scale: 1.06, y: -4 }}
                      style={{ height: `${heightPct}%` }}
                      className={`group relative flex flex-1 flex-col items-center justify-end overflow-hidden rounded-t-lg border px-0.5 pb-1.5 text-center backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:px-1 sm:pb-2 ${
                        isLocked
                          ? 'border-[#F38020] bg-gradient-to-t from-[#F38020]/45 via-[#F38020]/20 to-white/15 shadow-[0_0_26px_rgba(243,128,32,0.55)]'
                          : 'border-white/15 bg-slate-950/65 hover:border-[#00F0FF] hover:shadow-[0_0_18px_rgba(0,240,255,0.4)]'
                      }`}
                    >
                      {/* Head silhouette crest */}
                      <span
                        style={{ backgroundColor: isLocked ? '#F38020' : barColor }}
                        className="mb-auto mt-1 h-2 w-2 rounded-full opacity-85 sm:mt-1.5 sm:h-2.5 sm:w-2.5"
                      />
                      <span className="font-mono-tabular text-[7px] font-bold tracking-tighter text-white sm:text-[11px] sm:tracking-normal">
                        <AnimatedCounter resetKey={`a5-b2-rail-${bot.elo}-${seekNonce}`} target={bot.elo} />
                      </span>
                      <span className="hidden truncate text-[9px] text-zinc-300 sm:block">
                        {bot.name.replace(' BOT', '').replace(' (3000+)', '')}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <TactileTile
                accentHex="#F38020"
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-amber-400/35 bg-slate-950/75 px-4 py-2 text-xs font-semibold text-amber-200 backdrop-blur-md sm:text-sm"
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-[#F38020]" aria-hidden="true" />
                  <span>Unrated Anti-Farming Guard (&lt; User ELO)</span>
                </span>
                <span className="hidden text-amber-500 sm:inline" aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  <AnimatedCounter resetKey={`a5-b2-24h-${seekNonce}`} target={24} suffix="h" />{' '}
                  <AnimatedCounter resetKey={`a5-b2-2m-${seekNonce}`} target={2} suffix="-Match" /> Pairwise Cap
                </span>
              </TactileTile>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
