import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, Dna, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { AI_ENGINE_MATRIX_NODES } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

type Act7Beat = 'reactor' | 'matrix42' | 'genome';

function getAct7Beat(actTime: number): Act7Beat {
  if (actTime < 11) return 'reactor';
  if (actTime < 22) return 'matrix42';
  return 'genome';
}

const OLYMPIAD_GRAPH_NODES = ['IMO', 'Putnam', 'RMM', 'BMO', 'BdMO'];

/**
 * Full-Screen Rotating Triple-Gyroscope Neural Reactor SVG
 * shooting laser beams between Gemini, Qwen-Math-72B, and SymPy orbital nodes.
 */
function TripleGyroscopeLaserReactorSVG({ showNodes }: { showNodes: boolean }) {
  return (
    <div
      aria-hidden={!showNodes}
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 680 520" className="h-[min(84dvh,520px)] w-[min(96vw,680px)] overflow-visible opacity-75">
        <defs>
          <radialGradient id="reactorCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#F38020" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#05070D" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="340" cy="260" r="220" fill="url(#reactorCoreGlow)" />

        {/* Triple Gyroscope Rings */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '340px 260px' }}
        >
          <ellipse cx="340" cy="260" rx="225" ry="105" fill="none" stroke="#00F0FF" strokeWidth="1.6" strokeOpacity="0.55" strokeDasharray="14 8" />
          <circle cx="565" cy="260" r="5" fill="#00F0FF" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '340px 260px' }}
        >
          <ellipse cx="340" cy="260" rx="180" ry="86" transform="rotate(58 340 260)" fill="none" stroke="#F38020" strokeWidth="1.8" strokeOpacity="0.65" strokeDasharray="10 6" />
          <circle cx="340" cy="80" r="4.5" fill="#F38020" />
        </motion.g>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '340px 260px' }}
        >
          <ellipse cx="340" cy="260" rx="126" ry="60" transform="rotate(-58 340 260)" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />
        </motion.g>

        {/* Active Laser Beams Shooting Between Gemini, Qwen-Math-72B & SymPy */}
        {showNodes && (
          <g>
            <motion.line
              x1="125"
              y1="170"
              x2="555"
              y2="170"
              stroke="#00F0FF"
              strokeWidth="2.4"
              strokeDasharray="10 8"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.line
              x1="555"
              y1="170"
              x2="340"
              y2="415"
              stroke="#F38020"
              strokeWidth="2.4"
              strokeDasharray="10 8"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.line
              x1="340"
              y1="415"
              x2="125"
              y2="170"
              stroke="#10B981"
              strokeWidth="2.4"
              strokeDasharray="10 8"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

function LaserGenomeHelixSVG() {
  const rungs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <svg viewBox="0 0 360 96" className="h-20 w-full max-w-[360px] overflow-visible" aria-hidden="true">
      <motion.path
        d="M10,22 Q95,78 180,22 T350,22"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="2.6"
        initial={{ pathLength: 0.2 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />
      <motion.path
        d="M10,74 Q95,18 180,74 T350,74"
        fill="none"
        stroke="#F38020"
        strokeWidth="2.6"
        initial={{ pathLength: 0.2 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />
      {rungs.map((idx) => {
        const x = 32 + idx * 37;
        return (
          <motion.line
            key={idx}
            x1={x}
            y1="26"
            x2={x}
            y2="70"
            stroke={idx % 2 === 0 ? '#00F0FF' : '#F38020'}
            strokeWidth="1.6"
            animate={{ opacity: [0.25, 0.95, 0.25] }}
            transition={{ duration: 1.8, delay: idx * 0.14, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
}

/**
 * ACT VII (3:30 – 4:02) — Full-Screen Rotating Triple-Gyroscope Neural Reactor (42 Engines).
 */
export function Act07_HybridAICore42({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const beat = getAct7Beat(actTime);
  const activeNodeIdx = Math.min(
    AI_ENGINE_MATRIX_NODES.length - 1,
    Math.max(0, Math.floor((actTime - 11) / 2.1))
  );

  return (
    <section
      aria-label="Act 7: The 42-Engine Hybrid Olympiad AI Core"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        assetKey="neuralCore"
        opacity={0.58}
        scaleFrom={1.04}
        scaleTo={1.2}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(5,12,26,0.25)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      <TripleGyroscopeLaserReactorSVG showNodes={beat === 'reactor'} />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {beat === 'reactor' && (
            <motion.div
              key="act7-beat1-reactor"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, rotateY: -14, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-5"
            >
              <h2 className="font-display text-[clamp(1.65rem,4vw,3.3rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                <GradualWordReveal
                  text="Dual-Model Hybrid Proof Reactor"
                  stagger={0.042}
                  highlightWords={['Dual-Model', 'Hybrid', 'Reactor']}
                  highlightClassName="text-[#00F0FF] drop-shadow-[0_0_22px_rgba(0,240,255,0.5)]"
                />
              </h2>

              {/* Triangular Spatial Orbital Nodes matching laser beams */}
              <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
                <TactileTile accentHex="#00F0FF" className="border-[#00F0FF]/50 bg-slate-950/70 p-4 text-left backdrop-blur-xl">
                  <p className="font-mono-tabular text-[11px] font-bold text-[#00F0FF] uppercase">
                    Node 01 · Reasoning Core
                  </p>
                  <p className="font-display mt-1 text-lg font-bold text-white">
                    Google Gemini (Pro &amp; Flash)
                  </p>
                </TactileTile>

                <TactileTile accentHex="#F38020" className="border-[#F38020]/50 bg-slate-950/70 p-4 text-left backdrop-blur-xl">
                  <p className="font-mono-tabular text-[11px] font-bold text-[#F38020] uppercase">
                    Node 02 · Math Co-Verifier
                  </p>
                  <p className="font-display mt-1 text-lg font-bold text-white">
                    Qwen-Math-<AnimatedCounter target={72} suffix="B" resetKey={`a7-b1-72b-${seekNonce}`} />
                  </p>
                </TactileTile>
              </div>

              <TactileTile accentHex="#10B981" className="w-full max-w-md border-emerald-400/55 bg-slate-950/75 p-4 text-center backdrop-blur-xl">
                <p className="font-mono-tabular text-[11px] font-bold text-emerald-300 uppercase">
                  Node 03 · Isolated Symbolic Lock
                </p>
                <p className="font-display mt-1 text-lg font-bold text-white">
                  Python / SymPy Proof Sandbox
                </p>
              </TactileTile>

              <TactileTile
                accentHex="#10B981"
                className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-emerald-400/45 bg-emerald-950/50 px-4 py-2 text-xs font-bold text-emerald-200 backdrop-blur-xl sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span className="font-mono-tabular">
                  <AnimatedCounter target={0} suffix="% MATH HALLUCINATION" resetKey={`a7-b1-0-${seekNonce}`} />
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular text-[#00F0FF]">
                  <AnimatedCounter target={100} suffix="% DETERMINISTIC SYMPY PROOF CHECK" resetKey={`a7-b1-100-${seekNonce}`} />
                </span>
              </TactileTile>
            </motion.div>
          )}

          {beat === 'matrix42' && (
            <motion.div
              key="act7-beat2-matrix42"
              initial={{ opacity: 0, scale: 0.88, rotateY: 14, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full flex-col items-center gap-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono-tabular text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase">
                <Cpu className="h-4 w-4 text-[#F38020]" aria-hidden="true" />
                <span>
                  <AnimatedCounter target={42} suffix="-Engine" resetKey={`a7-b2-42-${seekNonce}`} /> Autonomous Mesh (
                  <AnimatedCounter target={2} resetKey={`a7-b2-m1-${seekNonce}`} /> + <AnimatedCounter target={2} resetKey={`a7-b2-m2-${seekNonce}`} /> +{' '}
                  <AnimatedCounter target={24} resetKey={`a7-b2-m3-${seekNonce}`} /> + <AnimatedCounter target={12} resetKey={`a7-b2-m4-${seekNonce}`} /> +{' '}
                  <AnimatedCounter target={1} resetKey={`a7-b2-m5-${seekNonce}`} /> + <AnimatedCounter target={1} resetKey={`a7-b2-m6-${seekNonce}`} />)
                </span>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
                <TactileTile accentHex="#38BDF8" className="border-sky-400/45 bg-slate-950/70 p-2.5 text-left backdrop-blur-xl sm:p-4">
                  <span className="font-mono-tabular text-sm font-extrabold text-sky-300 sm:text-lg">
                    <AnimatedCounter target={2} resetKey={`a7-b2-dual-${seekNonce}`} /> Dual-Core Engines
                  </span>
                  <p className="mt-1 text-[11px] leading-snug text-zinc-200 sm:text-xs">
                    Gemini Pro/Flash + Qwen-Math-72B Symbolic Co-Router
                  </p>
                </TactileTile>

                {AI_ENGINE_MATRIX_NODES.map((node, idx) => {
                  const isLit = idx === activeNodeIdx;
                  return (
                    <TactileTile
                      key={node.role}
                      accentHex={node.accentHex}
                      className={`p-2.5 text-left backdrop-blur-xl sm:p-4 ${
                        isLit ? 'bg-slate-900/90' : 'bg-slate-950/70'
                      }`}
                    >
                      <span style={{ color: node.accentHex }} className="font-mono-tabular text-sm font-extrabold sm:text-lg">
                        <AnimatedCounter target={Number(node.count)} resetKey={`a7-b2-node-${node.role}-${seekNonce}`} /> {node.role}
                      </span>
                      <p className="mt-1 text-[11px] leading-snug text-zinc-200 sm:text-xs">{node.engines}</p>
                    </TactileTile>
                  );
                })}
              </div>
            </motion.div>
          )}

          {beat === 'genome' && (
            <motion.div
              key="act7-beat3-genome"
              initial={{ opacity: 0, scale: 0.88, rotateX: 12, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 125, damping: 18 }}
              className="flex w-full max-w-4xl flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2 font-mono-tabular text-xs font-bold tracking-[0.22em] text-[#F38020] uppercase">
                <Dna className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                <span>Zero-Copy Mathematical Genome &amp; Fair TokenMeter</span>
              </div>

              <LaserGenomeHelixSVG />

              <h2 className="font-display text-[clamp(1.65rem,3.8vw,3.1rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
                Abstract Theorem Graph ·{' '}
                <span className="text-[#F38020]">
                  <AnimatedCounter target={0} resetKey={`a7-b3-0vc-${seekNonce}`} />
                </span>{' '}
                Verbatim Copies
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {OLYMPIAD_GRAPH_NODES.map((org) => (
                  <TactileTile
                    key={org}
                    accentHex="#00F0FF"
                    className="font-mono-tabular px-3.5 py-1.5 text-xs font-bold text-cyan-200 backdrop-blur-xl"
                  >
                    {org}
                  </TactileTile>
                ))}
              </div>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <TactileTile accentHex="#00F0FF" className="bg-slate-950/75 p-4 text-left backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span className="font-mono-tabular">
                      <AnimatedCounter target={0} suffix="-Token Greeting Shield" resetKey={`a7-b3-0tok-${seekNonce}`} />
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-200">
                    Greetings consume <AnimatedCounter target={0} resetKey={`a7-b3-0q-${seekNonce}`} /> daily quota tokens across all mentors.
                  </p>
                </TactileTile>

                <TactileTile accentHex="#F43F5E" className="bg-slate-950/75 p-4 text-left backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    <span>Cloudflare Worker Contest Hard-Lock</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-200">
                    <AnimatedCounter target={100} suffix="%" resetKey={`a7-b3-100-${seekNonce}`} /> AI hint suspension during live rated contests.
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
