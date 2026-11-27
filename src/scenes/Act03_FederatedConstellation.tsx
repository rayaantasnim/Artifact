import { motion } from 'framer-motion';
import {
  AnimatedCounter,
  GradualWordReveal,
  KenBurnsArtwork,
  ShatterBurstOverlay,
  TactileTile,
} from '../components/ui/MotionPrimitives';
import { ECOSYSTEM_METRICS } from '../data/ecosystemData';
import type { SceneProps } from './sceneTypes';

const CONSTELLATION_PORTALS = [
  'Core Gateway',
  'Auth SSO',
  'Number Theory',
  'Algebra',
  'Geometry',
  'Combinatorics',
  'Mixed Olympiad',
  'Bullet Blitz',
  'Shadow Gauntlet',
  '7-Day Contests',
  'Find the Flaw',
  'AI Forge 42',
  'QPRT-4 Shield',
  'Academy OS',
];

/**
 * Animated 14-node SVG Constellation Network radiating from central `engine.js`
 * with flying <50ms cyan & orange data pulses.
 */
function FederatedConstellationSVG({ activeIdx }: { activeIdx: number }) {
  const cx = 360;
  const cy = 220;

  return (
    <div className="relative flex w-full max-w-4xl items-center justify-center">
      <svg
        viewBox="0 0 720 440"
        className="h-[min(42dvh,380px)] w-full overflow-visible"
        aria-label="14-Portal Federated Constellation Network"
      >
        <defs>
          <radialGradient id="spineHubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#0EA5E9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#05070D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbital reference rings */}
        <circle cx={cx} cy={cy} r="175" fill="none" stroke="#00F0FF" strokeOpacity="0.16" strokeDasharray="6 6" />
        <circle cx={cx} cy={cy} r="115" fill="none" stroke="#F38020" strokeOpacity="0.18" strokeDasharray="4 5" />
        <circle cx={cx} cy={cy} r="90" fill="url(#spineHubGlow)" />

        {/* 14 Radiating Edges + Animated <50ms Data Pulses */}
        {CONSTELLATION_PORTALS.map((portalName, idx) => {
          const angle = (idx / CONSTELLATION_PORTALS.length) * Math.PI * 2 - Math.PI / 2;
          const radiusX = idx % 2 === 0 ? 275 : 210;
          const radiusY = idx % 2 === 0 ? 172 : 128;
          const nx = cx + Math.cos(angle) * radiusX;
          const ny = cy + Math.sin(angle) * radiusY;
          const isActive = idx === activeIdx;
          const pulseColor = idx % 3 === 0 ? '#F38020' : '#00F0FF';

          return (
            <g key={portalName}>
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke={pulseColor}
                strokeWidth={isActive ? 2.4 : 1.15}
                strokeOpacity={isActive ? 0.92 : 0.35}
              />

              {/* Flying <50ms data packet */}
              <motion.circle
                r={isActive ? 4.5 : 3}
                fill={pulseColor}
                animate={{
                  cx: [cx, nx],
                  cy: [cy, ny],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.35,
                  delay: (idx * 0.14) % 1.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Portal Node Circle + Label */}
              <circle
                cx={nx}
                cy={ny}
                r={isActive ? 11 : 7.5}
                fill="#071122"
                stroke={pulseColor}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={nx}
                y={ny + (ny < cy ? -14 : 20)}
                textAnchor="middle"
                fill={isActive ? '#FFFFFF' : '#BAE6FD'}
                fontSize={isActive ? '11.5' : '9.5'}
                fontWeight={isActive ? '700' : '600'}
                fontFamily="monospace"
              >
                {portalName}
              </text>
            </g>
          );
        })}

        {/* Central engine.js Spine Hub */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="46"
          fill="#061224"
          stroke="#00F0FF"
          strokeWidth="2.5"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="800"
          fontFamily="monospace"
        >
          engine.js
        </text>
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          fill="#00F0FF"
          fontSize="9.5"
          fontWeight="700"
          fontFamily="monospace"
        >
          ZERO-DEP SPINE
        </text>
      </svg>
    </div>
  );
}

/**
 * ACT III (1:10 – 1:45) — The 14-Portal Federated Constellation.
 * Shattering glass barrier intro + 14-node SVG constellation with flying <50ms data pulses.
 */
export function Act03_FederatedConstellation({
  actTime,
  actDuration,
  pointerOffset,
  seekNonce = 0,
}: SceneProps) {
  const showShatter = actTime < 3.5;
  const activePortalIdx = Math.floor(actTime / 2.2) % CONSTELLATION_PORTALS.length;

  return (
    <section
      aria-label="Act 3: The 14-Portal Federated Constellation"
      className="cinema-perspective relative flex h-full w-full flex-col items-center overflow-hidden px-4 pt-20 pb-20 sm:px-8 md:pt-24 md:pb-24"
    >
      <KenBurnsArtwork
        assetKey="federatedConstellation"
        opacity={0.58}
        scaleFrom={1.04}
        scaleTo={1.2}
        durationSec={actDuration}
        pointerOffset={pointerOffset}
        scrimClassName="bg-[radial-gradient(circle_at_center,rgba(4,12,26,0.28)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.96)_100%)]"
      />

      <ShatterBurstOverlay active={showShatter} colorHex="#00F0FF" />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 text-center">
        <p className="font-mono-tabular text-xs font-bold tracking-[0.22em] text-[#00F0FF] uppercase">
          Act III · Zero-Dependency Vanilla JS Spine &amp; SSO Sync
        </p>

        <h2 className="font-display text-[clamp(1.6rem,3.8vw,3.15rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.9)]">
          <GradualWordReveal
            text="The 14-Portal Federated Constellation"
            stagger={0.04}
            highlightWords={['14-Portal', 'Constellation']}
            highlightClassName="text-[#00F0FF] drop-shadow-[0_0_24px_rgba(0,240,255,0.5)]"
          />
        </h2>

        <FederatedConstellationSVG activeIdx={activePortalIdx} />

        {/* Floating telemetry wings (no center box) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <TactileTile accentHex="#00F0FF" className="px-4 py-2.5 text-center backdrop-blur-xl">
            <p className="font-mono-tabular text-lg font-extrabold text-[#00F0FF] sm:text-xl">
              <AnimatedCounter
                resetKey={`a3-14-${seekNonce}`}
                target={ECOSYSTEM_METRICS.federatedPortals}
              />
            </p>
            <p className="text-[11px] font-medium text-zinc-200">Federated Portals</p>
          </TactileTile>

          <TactileTile accentHex="#F38020" className="px-4 py-2.5 text-center backdrop-blur-xl">
            <p className="font-mono-tabular text-lg font-extrabold text-[#F38020] sm:text-xl">
              &lt;<AnimatedCounter resetKey={`a3-50-${seekNonce}`} target={50} suffix="ms" />
            </p>
            <p className="text-[11px] font-medium text-zinc-200">Edge SSO Sync</p>
          </TactileTile>

          <TactileTile accentHex="#10B981" className="px-4 py-2.5 text-center backdrop-blur-xl">
            <p className="font-mono-tabular text-lg font-extrabold text-emerald-300 sm:text-xl">
              <AnimatedCounter resetKey={`a3-98-${seekNonce}`} target={98} suffix="%" />
            </p>
            <p className="text-[11px] font-medium text-zinc-200">Firestore Read-Shield</p>
          </TactileTile>
        </div>
      </div>
    </section>
  );
}
