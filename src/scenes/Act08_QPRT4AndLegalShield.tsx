import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Gavel, Lock, Scale, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { LEGAL_SHIELD_ITEMS, QPRT4_PHASES } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

type Act8Beat = 'dome' | 'blackhole' | 'legal';

function getAct8Beat(actTime: number): Act8Beat {
  if (actTime < 11) return 'dome';
  if (actTime < 22) return 'blackhole';
  return 'legal';
}

/**
 * Concentric 4-Layer Hexagonal Cyber Dome SVG deflecting red cheat shards
 */
function HexagonalCyberDomeSVG() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden opacity-60"
    >
      <svg viewBox="0 0 640 640" className="h-[min(88dvh,580px)] w-[min(92vw,580px)] overflow-visible">
        {[248, 198, 148, 98].map((radius, idx) => {
          const pts = Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            return `${320 + radius * Math.cos(angle)},${320 + radius * Math.sin(angle)}`;
          }).join(' ');
          const stroke = idx % 2 === 0 ? '#14B8A6' : '#00F0FF';
          return (
            <motion.polygon
              key={radius}
              points={pts}
              fill="none"
              stroke={stroke}
              strokeWidth={idx === 0 ? 2.2 : 1.5}
              strokeOpacity={0.7 - idx * 0.08}
              strokeDasharray={idx % 2 === 1 ? '10 6' : undefined}
              animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 15 - idx * 2.5, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '320px 320px' }}
            />
          );
        })}

        {/* Deflected red cheat shards */}
        {[25, 95, 165, 235, 305].map((deg, idx) => (
          <motion.g key={deg} transform={`rotate(${deg} 320 320)`}>
            <motion.polygon
              points="314,34 326,34 320,66"
              fill="#F43F5E"
              animate={{ y: [0, -18, 0], opacity: [0.3, 0.95, 0.3] }}
              transition={{ duration: 1.4, delay: idx * 0.25, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Swirling Blackhole Vortex SVG pulling in anomaly shards
 */
function SwirlingBlackholeVortexSVG() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden opacity-65"
    >
      <svg viewBox="0 0 600 600" className="h-[min(86vw,540px)] w-[min(86vw,540px)] overflow-visible">
        <defs>
          <radialGradient id="eventHorizonGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#020307" stopOpacity="1" />
            <stop offset="38%" stopColor="#090414" stopOpacity="0.88" />
            <stop offset="68%" stopColor="#F43F5E" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#05070D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="215" fill="url(#eventHorizonGrad)" />
        {[195, 148, 102].map((r, idx) => (
          <motion.circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke={idx === 1 ? '#F38020' : '#F43F5E'}
            strokeWidth="1.8"
            strokeOpacity="0.65"
            strokeDasharray="18 10"
            animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 9 - idx * 2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '300px 300px' }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * ACT VIII (4:02 – 4:35) — Concentric 4-Layer Hexagonal Cyber Dome,
 * 11-Flag Blackhole Vortex & 14-Point Constitutional Legal Shield.
 */
export function Act08_QPRT4AndLegalShield({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const beat = getAct8Beat(actTime);
  const activePhaseIdx = Math.min(3, Math.floor(actTime / 2.7));

  const artworkKey =
    beat === 'dome'
      ? 'cyberShield'
      : beat === 'blackhole'
        ? 'blackholeEscalation'
        : 'youthPrivacyShield';

  return (
    <section
      aria-label="Act 8: QPRT-4 Hexagonal Cyber Dome, Blackhole Vortex and Legal Shield"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        key={artworkKey}
        assetKey={artworkKey}
        opacity={0.56}
        scaleFrom={1.04}
        scaleTo={1.19}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(8,12,24,0.26)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      {beat === 'dome' && <HexagonalCyberDomeSVG />}
      {beat === 'blackhole' && <SwirlingBlackholeVortexSVG />}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {beat === 'dome' && (
            <motion.div
              key="act8-beat1-dome"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-4"
            >
              <p className="font-mono-tabular text-xs font-bold tracking-[0.22em] text-teal-300 uppercase">
                Act VIII · QPRT-<AnimatedCounter target={4} resetKey={`a8-b1-qprt4-${seekNonce}`} /> Concentric Cyber Dome
              </p>

              <h2 className="font-display text-[clamp(1.6rem,3.9vw,3.15rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="4-Phase Anti-Cheat & Outage Resilience Dome"
                  stagger={0.042}
                  highlightWords={['4-Phase', 'Anti-Cheat', 'Resilience', 'Dome']}
                  highlightClassName="text-[#00F0FF] drop-shadow-[0_0_22px_rgba(0,240,255,0.45)]"
                />
              </h2>

              {/* 4 Corner Spatial Phase Nodes around the Hexagonal Dome */}
              <div className="grid w-full grid-cols-2 gap-2 sm:gap-5">
                {QPRT4_PHASES.map((item, idx) => {
                  const isFocused = idx === activePhaseIdx;
                  return (
                    <TactileTile
                      key={item.phase}
                      accentHex={item.accentHex}
                      className={`p-2.5 text-left backdrop-blur-xl sm:p-4 ${
                        isFocused ? 'bg-slate-900/85' : 'bg-slate-950/65'
                      }`}
                    >
                      <p
                        style={{ color: item.accentHex }}
                        className="font-mono-tabular text-[11px] font-bold uppercase sm:text-sm"
                      >
                        {item.phase}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-zinc-200 sm:text-xs sm:leading-relaxed">{item.detail}</p>
                    </TactileTile>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <TactileTile accentHex="#00F0FF" className="px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
                  <span className="font-mono-tabular text-[11px] font-bold text-[#00F0FF] sm:text-xs">
                    &gt;<AnimatedCounter target={75} suffix="%" resetKey={`a8-b1-75-${seekNonce}`} /> AoPS Similarity Block
                  </span>
                </TactileTile>
                <TactileTile accentHex="#F38020" className="px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
                  <span className="font-mono-tabular text-[11px] font-bold text-[#F38020] sm:text-xs">
                    <AnimatedCounter target={30} suffix="s" resetKey={`a8-b1-30s-${seekNonce}`} /> ISP Freeze &amp; Hot-Swap
                  </span>
                </TactileTile>
                <TactileTile accentHex="#10B981" className="px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
                  <span className="font-mono-tabular text-[11px] font-bold text-emerald-300 sm:text-xs">
                    <AnimatedCounter target={24} suffix="h" resetKey={`a8-b1-24h-${seekNonce}`} /> Zero-PII Cold Lake
                  </span>
                </TactileTile>
              </div>
            </motion.div>
          )}

          {beat === 'blackhole' && (
            <motion.div
              key="act8-beat2-blackhole"
              initial={{ opacity: 0, scale: 0.88, rotateY: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full max-w-5xl flex-col items-center gap-5"
            >
              <div className="flex items-center gap-2 font-mono-tabular text-xs font-bold tracking-[0.22em] text-rose-300 uppercase">
                <ShieldAlert className="h-4 w-4 text-rose-400" aria-hidden="true" />
                <span>
                  Optional Module <AnimatedCounter target={7} resetKey={`a8-b2-mod7-${seekNonce}`} /> &amp;{' '}
                  <AnimatedCounter target={11} suffix="-Flag" resetKey={`a8-b2-11f-${seekNonce}`} /> Blackhole Vortex
                </span>
              </div>

              <h2 className="font-display text-[clamp(1.6rem,4vw,3.15rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="In-Browser Telemetry & 11-Flag Blackhole Escalation"
                  stagger={0.042}
                  highlightWords={['11-Flag', 'Blackhole', 'Escalation']}
                  highlightClassName="text-rose-400 drop-shadow-[0_0_22px_rgba(251,113,133,0.45)]"
                />
              </h2>

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <TactileTile accentHex="#00F0FF" className="border-[#00F0FF]/45 bg-slate-950/70 p-5 text-left backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-bold text-[#00F0FF] uppercase">
                      Optional Module <AnimatedCounter target={7} resetKey={`a8-b2-card7-${seekNonce}`} />
                    </span>
                    <Eye className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                  </div>
                  <p className="font-display mt-1.5 text-lg font-bold text-white">
                    <AnimatedCounter target={4.5} decimals={1} suffix="s" resetKey={`a8-b2-45s-${seekNonce}`} /> MediaPipe Gaze Guard +{' '}
                    <AnimatedCounter target={3} suffix="-Axis" resetKey={`a8-b2-3ax-${seekNonce}`} /> Audio Trap
                  </p>
                  <p className="mt-1 text-xs text-zinc-200">
                    <AnimatedCounter target={100} suffix="%" resetKey={`a8-b2-100-${seekNonce}`} /> In-Browser TensorFlow.js ·{' '}
                    <AnimatedCounter target={0} resetKey={`a8-b2-0b-${seekNonce}`} /> Bytes of Server Video
                  </p>
                </TactileTile>

                <TactileTile accentHex="#F43F5E" className="border-rose-500/45 bg-slate-950/70 p-5 text-left backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-bold text-rose-300 uppercase">
                      Forensic Quarantine
                    </span>
                    <Gavel className="h-4 w-4 text-rose-400" aria-hidden="true" />
                  </div>
                  <p className="font-display mt-1.5 text-lg font-bold text-white">
                    <AnimatedCounter target={11} suffix="-Flag" resetKey={`a8-b2-11card-${seekNonce}`} /> Blackhole Escalation
                  </p>
                  <p className="mt-1 text-xs text-zinc-200">
                    <AnimatedCounter target={4} suffix="-Step" resetKey={`a8-b2-4step-${seekNonce}`} /> Forensic Appeal &amp;{' '}
                    <AnimatedCounter target={5} suffix="-Min" resetKey={`a8-b2-5min-${seekNonce}`} /> Live Video Skill Audit
                  </p>
                </TactileTile>
              </div>
            </motion.div>
          )}

          {beat === 'legal' && (
            <motion.div
              key="act8-beat3-legal"
              initial={{ opacity: 0, scale: 0.88, rotateX: 12, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full max-w-5xl flex-col items-center gap-5"
            >
              <div className="flex items-center gap-2 font-mono-tabular text-xs font-bold tracking-[0.22em] text-amber-300 uppercase">
                <Scale className="h-4 w-4 text-amber-300" aria-hidden="true" />
                <span>Constitutional Governance Vault</span>
              </div>

              <h2 className="font-display text-[clamp(1.65rem,3.9vw,3.15rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <span className="text-amber-300">
                  <AnimatedCounter target={14} suffix="-Point" resetKey={`a8-b3-14p-${seekNonce}`} />
                </span>{' '}
                Constitutional Legal &amp; Youth Privacy Shield
              </h2>

              <div className="grid w-full grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
                {LEGAL_SHIELD_ITEMS.map((item) => (
                  <TactileTile
                    key={item}
                    accentHex="#FBBF24"
                    className="flex items-center gap-2 border-amber-400/35 bg-slate-950/70 px-2.5 py-2.5 text-left backdrop-blur-xl sm:gap-2.5 sm:px-4 sm:py-3.5"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300 sm:h-4 sm:w-4" aria-hidden="true" />
                    <span className="font-mono-tabular text-[11px] font-bold text-amber-100 sm:text-sm">
                      {item}
                    </span>
                  </TactileTile>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-200">
                <Lock className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                <span className="font-mono-tabular">
                  Zero-NID Youth Protection · <AnimatedCounter target={100} suffix="%" resetKey={`a8-b3-100mor-${seekNonce}`} /> Global MoR Compliance
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
