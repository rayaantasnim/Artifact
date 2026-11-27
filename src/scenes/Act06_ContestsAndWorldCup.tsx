import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Crown, ScanSearch, ShieldCheck, Terminal, Touchpad } from 'lucide-react';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { SEVEN_DAY_CALENDAR, WORLD_CUP_BRACKET_STAGES } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

type Act6Beat = 'orbitalClock' | 'worldcup';

function getAct6Beat(actTime: number): Act6Beat {
  if (actTime < 21) return 'orbitalClock';
  return 'worldcup';
}

/**
 * Glowing 7-Day Circular Orbital Clock Dial SVG
 */
function SevenDayOrbitalClockSVG({ activeDayIdx }: { activeDayIdx: number }) {
  const cx = 190;
  const cy = 190;
  const radius = 132;
  const handAngle = ((activeDayIdx / 7) * 360 - 90) * (Math.PI / 180);
  const hx = cx + Math.cos(handAngle) * (radius - 26);
  const hy = cy + Math.sin(handAngle) * (radius - 26);

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 380 380" className="h-[164px] w-[164px] overflow-visible sm:h-[245px] sm:w-[245px] lg:h-[310px] lg:w-[310px]" aria-hidden="true">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#00F0FF" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx={cx} cy={cy} r="76" fill="none" stroke="#F38020" strokeOpacity="0.3" strokeWidth="1.5" />

        {/* Clock Sweep Hand */}
        <motion.line
          x1={cx}
          y1={cy}
          animate={{ x2: hx, y2: hy }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          stroke="#FBBF24"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="32" fill="#071122" stroke="#00F0FF" strokeWidth="2" />
        <text x={cx} y={cy - 3} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800" fontFamily="monospace">
          7-DAY
        </text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill="#00F0FF" fontSize="9" fontWeight="700" fontFamily="monospace">
          ORBIT
        </text>

        {SEVEN_DAY_CALENDAR.map((item, idx) => {
          const angle = (idx / 7) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + Math.cos(angle) * radius;
          const ny = cy + Math.sin(angle) * radius;
          const isActive = idx === activeDayIdx;
          const color = item.isMega ? '#FBBF24' : '#00F0FF';

          return (
            <g key={item.day}>
              <circle
                cx={nx}
                cy={ny}
                r={isActive ? 22 : 16}
                fill={isActive ? (item.isMega ? '#78350F' : '#083344') : '#060D1A'}
                stroke={color}
                strokeWidth={isActive ? 2.8 : 1.5}
              />
              <text
                x={nx}
                y={ny + 4}
                textAnchor="middle"
                fill={isActive ? '#FFFFFF' : color}
                fontSize={isActive ? '10.5' : '9.5'}
                fontWeight="800"
                fontFamily="monospace"
              >
                {item.day.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * ACT VI (2:55 – 3:30) — 7-Day Circular Orbital Clock & Top 128 Golden Tournament Pyramid.
 */
export function Act06_ContestsAndWorldCup({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const beat = getAct6Beat(actTime);
  const activeDayIdx = Math.min(6, Math.floor(actTime / 2.8));
  const showFlawMode = actTime >= 10 && actTime < 21;
  const activeBracketStage = Math.min(
    WORLD_CUP_BRACKET_STAGES.length - 1,
    Math.max(0, Math.floor((actTime - 21) / 1.9))
  );

  const activeDay = SEVEN_DAY_CALENDAR[activeDayIdx];

  return (
    <section
      aria-label="Act 6: 7-Day Orbital Contest Clock and Top 128 World Cup Pyramid"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      {beat === 'worldcup' ? (
        <KenBurnsArtwork
          assetKey="worldCupCrown"
          opacity={0.6}
          scaleFrom={1.12}
          scaleTo={1.03}
          durationSec={14}
          pointerOffset={pointerOffset}
          scrimClassName="bg-[radial-gradient(circle_at_center,rgba(28,18,6,0.28)_0%,rgba(5,7,13,0.75)_72%,rgba(4,6,11,0.96)_100%)]"
        />
      ) : (
        <KenBurnsArtwork
          assetKey={showFlawMode ? 'infiniteArchive' : 'subSecondVelocity'}
          opacity={0.54}
          scaleFrom={1.04}
          scaleTo={1.18}
          durationSec={actDuration}
          pointerOffset={pointerOffset}
          scrimClassName="bg-[radial-gradient(circle_at_center,rgba(5,10,22,0.3)_0%,rgba(5,7,13,0.76)_74%,rgba(4,6,11,0.96)_100%)]"
        />
      )}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {beat === 'orbitalClock' && (
            <motion.div
              key="act6-beat1-orbital"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-2.5 sm:gap-4"
            >
              <div className="flex items-center gap-2 font-mono-tabular text-[11px] font-bold tracking-[0.18em] text-[#00F0FF] uppercase sm:text-xs sm:tracking-[0.2em]">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  <AnimatedCounter target={7} suffix="-Day" resetKey={`a6-b1-7day-${seekNonce}`} /> Zero-Rest Orbital Contest Engine
                </span>
              </div>

              <div className="grid w-full grid-cols-1 items-center gap-2.5 lg:grid-cols-12 lg:gap-4">
                {/* Left Wing: General vs Expert */}
                <div className="grid grid-cols-2 gap-2 lg:col-span-4 lg:grid-cols-1 lg:gap-3">
                  <TactileTile accentHex="#00F0FF" className="p-2.5 text-left backdrop-blur-xl sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-[10px] font-bold text-[#00F0FF] uppercase sm:text-xs">
                        General Mode
                      </span>
                      <Touchpad className="h-3.5 w-3.5 text-[#00F0FF] sm:h-4 sm:w-4" aria-hidden="true" />
                    </div>
                    <p className="font-display mt-1 text-xs font-bold text-white sm:text-base">
                      Touch Numpad · Results T+<AnimatedCounter target={30} suffix="m" resetKey={`a6-b1-30m-${seekNonce}`} />
                    </p>
                  </TactileTile>

                  <TactileTile accentHex="#F38020" className="p-2.5 text-left backdrop-blur-xl sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-[10px] font-bold text-[#F38020] uppercase sm:text-xs">
                        Expert Mode
                      </span>
                      <Terminal className="h-3.5 w-3.5 text-[#F38020] sm:h-4 sm:w-4" aria-hidden="true" />
                    </div>
                    <p className="font-display mt-1 text-xs font-bold text-white sm:text-base">
                      <AnimatedCounter target={3} suffix="-Col" resetKey={`a6-b1-3col-${seekNonce}`} /> GeoGebra + LaTeX · T+<AnimatedCounter target={7} suffix="h" resetKey={`a6-b1-7h-${seekNonce}`} />
                    </p>
                  </TactileTile>
                </div>

                {/* Center: 7-Day Orbital Clock Dial */}
                <div className="flex flex-col items-center lg:col-span-4">
                  <SevenDayOrbitalClockSVG activeDayIdx={activeDayIdx} />
                  <p className="font-mono-tabular mt-1 text-[11px] font-bold text-amber-300 sm:text-xs">
                    {activeDay.label} — {activeDay.detail}
                  </p>
                </div>

                {/* Right Wing: Find the Flaw + SymPy Rejudge */}
                <div className="grid grid-cols-2 gap-2 lg:col-span-4 lg:grid-cols-1 lg:gap-3">
                  <TactileTile accentHex="#10B981" className="p-2.5 text-left backdrop-blur-xl sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-[10px] font-bold text-emerald-300 uppercase sm:text-xs">
                        Find the Flaw
                      </span>
                      <ScanSearch className="h-3.5 w-3.5 text-emerald-300 sm:h-4 sm:w-4" aria-hidden="true" />
                    </div>
                    <p className="font-display mt-1 text-xs font-bold text-white sm:text-base">
                      <AnimatedCounter target={6} suffix="h" resetKey={`a6-b1-6h-${seekNonce}`} /> Daily / <AnimatedCounter target={2} suffix="h" resetKey={`a6-b1-2h-${seekNonce}`} /> Sun Mega Hack
                    </p>
                    <p className="mt-0.5 text-[10px] text-zinc-200 sm:mt-1 sm:text-xs">
                      +<AnimatedCounter target={5} resetKey={`a6-b1-5-${seekNonce}`} /> to +<AnimatedCounter target={100} suffix=" pts" resetKey={`a6-b1-100-${seekNonce}`} /> ·{' '}
                      <AnimatedCounter target={2} suffix="-Min" resetKey={`a6-b1-2min-${seekNonce}`} /> SymPy
                    </p>
                  </TactileTile>

                  <TactileTile accentHex="#00F0FF" className="flex items-center gap-2 p-2.5 text-left text-[11px] font-semibold text-cyan-200 backdrop-blur-xl sm:gap-2.5 sm:p-3.5 sm:text-xs">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#00F0FF]" aria-hidden="true" />
                    <span>
                      &lt;<AnimatedCounter target={3} resetKey={`a6-b1-3q-${seekNonce}`} /> Competitor Quorum Zero-Leak Safeguard
                    </span>
                  </TactileTile>
                </div>
              </div>
            </motion.div>
          )}

          {beat === 'worldcup' && (
            <motion.div
              key="act6-beat2-pyramid"
              initial={{ opacity: 0, scale: 0.88, rotateX: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full max-w-4xl flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-2 font-mono-tabular text-xs font-bold tracking-[0.22em] text-amber-300 uppercase">
                <Crown className="h-4 w-4 text-amber-300" aria-hidden="true" />
                <span>
                  Top <AnimatedCounter target={128} resetKey={`a6-b2-128-${seekNonce}`} /> Golden Tournament Pyramid
                </span>
              </div>

              <h2 className="font-display text-[clamp(1.75rem,4.2vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="Top 128 Annual World Cup"
                  stagger={0.046}
                  highlightWords={['Top', '128', 'World', 'Cup']}
                  highlightClassName="text-amber-300 drop-shadow-[0_0_24px_rgba(251,191,36,0.55)]"
                />
              </h2>

              {/* Rising Pyramid from 128 (base) to World Champion (apex) */}
              <div className="flex w-full flex-col-reverse items-center gap-1.5 sm:gap-2">
                {WORLD_CUP_BRACKET_STAGES.map((stage, idx) => {
                  const reached = idx <= activeBracketStage;
                  const isChampion = idx === WORLD_CUP_BRACKET_STAGES.length - 1;
                  const numericStage = Number(stage);
                  const isNumeric = !Number.isNaN(numericStage);
                  const widthPct = 96 - idx * 10;

                  return (
                    <motion.div
                      key={stage}
                      style={{ width: `${widthPct}%` }}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{
                        opacity: reached ? 1 : 0.35,
                        y: 0,
                        scale: idx === activeBracketStage ? 1.03 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 165, damping: 20 }}
                    >
                      <TactileTile
                        accentHex="#FBBF24"
                        className={`flex items-center justify-center py-1.5 font-mono-tabular text-xs font-bold backdrop-blur-xl sm:py-2 sm:text-sm ${
                          isChampion && reached
                            ? 'border-amber-300 bg-gradient-to-r from-amber-500/40 via-amber-400/50 to-amber-500/40 text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.6)]'
                            : reached
                              ? 'border-amber-400/55 bg-amber-950/50 text-amber-200'
                              : 'border-white/15 bg-black/45 text-zinc-400'
                        }`}
                      >
                        {isNumeric ? (
                          <span>
                            ROUND OF <AnimatedCounter target={numericStage} resetKey={`a6-b2-pyr-${stage}-${reached}-${seekNonce}`} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <Crown className="h-3.5 w-3.5 text-amber-200" aria-hidden="true" />
                            <span>{stage.toUpperCase()}</span>
                          </span>
                        )}
                      </TactileTile>
                    </motion.div>
                  );
                })}
              </div>

              <TactileTile
                accentHex="#FBBF24"
                className="border-amber-400/50 bg-amber-950/45 px-5 py-2 font-mono-tabular text-xs font-bold tracking-widest text-amber-200 uppercase"
              >
                <AnimatedCounter prefix="$" target={0} suffix=" ENTRY FOREVER" resetKey={`a6-b2-0-${seekNonce}`} />
              </TactileTile>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
