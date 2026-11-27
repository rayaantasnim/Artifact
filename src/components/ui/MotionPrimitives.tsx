import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GALLERY_ASSETS, type GalleryAssetKey } from '../../data/galleryAssets';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  resetKey?: string | number;
  className?: string;
}

/**
 * Deterministic Mount-Triggered 0 -> Target Roll-Up Counter:
 * - Never relies on IntersectionObserver / whileInView.
 * - Triggers requestAnimationFrame inside useEffect immediately on mount
 *   or whenever `target` / `resetKey` changes.
 * - Uses easeOutExpo over 1600ms for rapid early acceleration and a crisp lock.
 * - Uses tabular-nums + inline-block to prevent horizontal layout jitter.
 */
export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 1600,
  resetKey,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || target === 0) {
      setDisplayValue(target);
      return;
    }

    setDisplayValue(0);
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / durationMs));
      // easeOutExpo: rapid acceleration at 0 -> crisp lock at target
      const eased = progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(target * eased);

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
        rafRef.current = 0;
      }
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [target, durationMs, resetKey]);

  const formatted =
    decimals > 0
      ? displayValue.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(displayValue).toLocaleString('en-US');

  return (
    <motion.span
      key={resetKey !== undefined ? `${target}-${resetKey}` : undefined}
      initial={target === 0 ? { scale: 0.85, opacity: 0.45 } : undefined}
      animate={target === 0 ? { scale: 1, opacity: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      className={`font-mono-tabular tabular-nums inline-block ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}

interface GradualWordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  align?: 'center' | 'left';
}

/**
 * Staggered gradual word-by-word kinetic reveal with spring physics.
 * Renders words inside a responsive flex-wrap flow with guaranteed spacing
 * and high-contrast solid colors so words never collide or disappear.
 */
export function GradualWordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.042,
  highlightWords = [],
  highlightClassName = 'text-[#00F0FF]',
  align = 'center',
}: GradualWordRevealProps) {
  const words = text.split(' ');
  const normalizedHighlights = highlightWords.map((w) =>
    w.replace(/[.,·—:;!?"]/g, '').toLowerCase()
  );

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={`flex flex-wrap gap-x-[0.28em] gap-y-[0.14em] ${
        align === 'left' ? 'justify-start text-left' : 'justify-center text-center'
      } ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,·—:;!?"]/g, '').toLowerCase();
        const isHighlighted = normalizedHighlights.includes(cleanWord);
        return (
          <motion.span
            key={`${word}-${index}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                },
              },
            }}
            className={`inline-block will-change-transform ${
              isHighlighted
                ? highlightClassName
                : 'text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]'
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

interface CyberHudPanelProps {
  children: ReactNode;
  className?: string;
  accentHex?: string;
  delay?: number;
  tiltAngle?: number;
}

/**
 * Tactile 3D Cyber-HUD Container:
 * - Angled sci-fi corner brackets
 * - Global tactile 3D magnetic hover (scale 1.03, y -4px, intensified neon rim glow)
 * - Diagonal glossy hover light-sweep across the card surface
 * - Pointer-driven 3D perspective tilt
 */
export function CyberHudPanel({
  children,
  className = '',
  accentHex = '#00F0FF',
  delay = 0,
  tiltAngle = 7,
}: CyberHudPanelProps) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAngle, -tiltAngle]), {
    stiffness: 130,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAngle, tiltAngle]), {
    stiffness: 130,
    damping: 20,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 11, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, scale: 1.05, filter: 'blur(8px)' }}
      whileHover={{ scale: 1.025, y: -4 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        borderColor: hovered ? accentHex : 'rgba(255, 255, 255, 0.2)',
        boxShadow: hovered
          ? `0 32px 96px rgba(0,0,0,0.85), 0 0 46px ${accentHex}66, inset 0 1px 0 rgba(255,255,255,0.4)`
          : `0 24px 80px rgba(0,0,0,0.75), 0 0 28px ${accentHex}28, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-xl border bg-slate-950/65 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${className}`}
    >
      {/* Angled Sci-Fi Corner Brackets */}
      <span
        aria-hidden="true"
        style={{ borderColor: accentHex }}
        className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 opacity-90 transition-transform duration-200 group-hover:scale-110"
      />
      <span
        aria-hidden="true"
        style={{ borderColor: accentHex }}
        className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 opacity-90 transition-transform duration-200 group-hover:scale-110"
      />
      <span
        aria-hidden="true"
        style={{ borderColor: accentHex }}
        className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 opacity-90 transition-transform duration-200 group-hover:scale-110"
      />
      <span
        aria-hidden="true"
        style={{ borderColor: accentHex }}
        className="pointer-events-none absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2 opacity-90 transition-transform duration-200 group-hover:scale-110"
      />

      {/* Sweeping neon rim-light beam */}
      <motion.span
        aria-hidden="true"
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentHex} 50%, transparent 100%)`,
        }}
        className="pointer-events-none absolute top-0 left-0 h-[2px] w-1/2 opacity-90"
      />

      {/* Hover-triggered glossy diagonal light sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[380%]"
      />

      {children}
    </motion.div>
  );
}

interface TactileTileProps {
  children: ReactNode;
  accentHex?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Tactile 3D interactive sub-tile for arena nodes, security badges, and metric wings.
 */
export function TactileTile({
  children,
  accentHex = '#00F0FF',
  className = '',
  onClick,
}: TactileTileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderColor: hovered ? accentHex : 'rgba(255, 255, 255, 0.14)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.7), 0 0 24px ${accentHex}55`
          : '0 4px 14px rgba(0,0,0,0.35)',
      }}
      className={`group relative overflow-hidden rounded-lg border bg-black/45 transition-[border-color,box-shadow] duration-200 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[360%]"
      />
      {children}
    </motion.div>
  );
}

export const TiltGlassCard = CyberHudPanel;
export const LaserCircuitFrame = CyberHudPanel;

interface RadarSweepBadgeProps {
  colorHex?: string;
  size?: number;
}

/**
 * Glowing SVG Radar Sweep Reticle
 */
export function RadarSweepBadge({ colorHex = '#00F0FF', size = 56 }: RadarSweepBadgeProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative inline-flex shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible">
        <circle cx="32" cy="32" r="28" fill="none" stroke={colorHex} strokeOpacity="0.35" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="18" fill="none" stroke={colorHex} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="32" cy="32" r="8" fill="none" stroke={colorHex} strokeOpacity="0.45" strokeWidth="1" />
        <line x1="32" y1="2" x2="32" y2="62" stroke={colorHex} strokeOpacity="0.22" strokeWidth="1" />
        <line x1="2" y1="32" x2="62" y2="32" stroke={colorHex} strokeOpacity="0.22" strokeWidth="1" />
      </svg>

      <motion.svg
        viewBox="0 0 64 64"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 h-full w-full"
      >
        <path d="M32 32 L32 4 A28 28 0 0 1 56 18 Z" fill={colorHex} fillOpacity="0.28" />
        <line x1="32" y1="32" x2="32" y2="4" stroke={colorHex} strokeWidth="1.8" />
      </motion.svg>

      <span
        style={{ backgroundColor: colorHex, boxShadow: `0 0 12px ${colorHex}` }}
        className="absolute h-2 w-2 rounded-full"
      />
    </div>
  );
}

interface EloLaserMeterProps {
  label: string;
  valueText: ReactNode;
  fillRatio: number;
  accentHex?: string;
}

/**
 * Pulsing Segmented ELO Laser Meter
 */
export function EloLaserMeter({
  label,
  valueText,
  fillRatio,
  accentHex = '#F38020',
}: EloLaserMeterProps) {
  const clamped = Math.max(0.08, Math.min(1, fillRatio));

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between gap-2 text-[11px] font-medium sm:text-xs">
        <span className="text-zinc-300">{label}</span>
        <span style={{ color: accentHex }} className="font-mono-tabular font-bold">
          {valueText}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-sm border border-white/15 bg-black/50 p-0.5">
        <motion.div
          initial={{ scaleX: 0.1 }}
          animate={{ scaleX: clamped }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, #1B365D 0%, ${accentHex} 75%, #FFFFFF 100%)`,
            boxShadow: `0 0 14px ${accentHex}`,
          }}
          className="h-full w-full rounded-[2px]"
        />
      </div>
    </div>
  );
}

interface ShatterBurstOverlayProps {
  active: boolean;
  colorHex?: string;
}

const SHARD_VECTORS = [
  { x: -210, y: -140, rot: -45, size: 32 },
  { x: 220, y: -120, rot: 52, size: 28 },
  { x: -240, y: 40, rot: -75, size: 36 },
  { x: 250, y: 65, rot: 68, size: 30 },
  { x: -160, y: 170, rot: -32, size: 26 },
  { x: 175, y: 160, rot: 40, size: 34 },
  { x: -70, y: -195, rot: -18, size: 24 },
  { x: 85, y: -185, rot: 25, size: 26 },
];

export function ShatterBurstOverlay({
  active,
  colorHex = '#F43F5E',
}: ShatterBurstOverlayProps) {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      {SHARD_VECTORS.map((shard, idx) => (
        <motion.svg
          key={idx}
          width={shard.size}
          height={shard.size}
          viewBox="0 0 32 32"
          initial={{ x: 0, y: 0, scale: 0.2, opacity: 0.95, rotate: 0 }}
          animate={{
            x: shard.x,
            y: shard.y,
            scale: 1.3,
            opacity: 0,
            rotate: shard.rot,
          }}
          transition={{ duration: 1.45, ease: 'easeOut' }}
          className="absolute"
        >
          <polygon
            points="4,2 28,10 14,30"
            fill={colorHex}
            fillOpacity="0.28"
            stroke="#FDA4AF"
            strokeWidth="1.5"
          />
        </motion.svg>
      ))}
    </div>
  );
}

const DUST_MOTES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 19 + 7) % 94}%`,
  top: `${(i * 23 + 11) % 88}%`,
  size: 2 + (i % 3),
  duration: 6 + (i % 5) * 1.6,
  delay: (i % 4) * 0.6,
}));

interface KenBurnsArtworkProps {
  assetKey: GalleryAssetKey;
  opacity?: number;
  scaleFrom?: number;
  scaleTo?: number;
  durationSec?: number;
  pointerOffset?: { x: number; y: number };
  scrimClassName?: string;
}

export function KenBurnsArtwork({
  assetKey,
  opacity = 0.56,
  scaleFrom = 1.05,
  scaleTo = 1.18,
  durationSec = 35,
  pointerOffset = { x: 0, y: 0 },
  scrimClassName = 'bg-[radial-gradient(circle_at_center,rgba(5,7,13,0.28)_0%,rgba(5,7,13,0.74)_72%,rgba(4,6,11,0.95)_100%)]',
}: KenBurnsArtworkProps) {
  const asset = GALLERY_ASSETS[assetKey];
  const candidates = [asset.primaryPath, ...asset.fallbackPaths];
  const [candidateIndex, setCandidateIndex] = useState(0);
  const allFailed = candidateIndex >= candidates.length;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {allFailed ? (
        <div
          aria-label={asset.title}
          className="h-full w-full bg-gradient-to-br from-[#0A1428] via-[#05070D] to-[#1D2D4E]"
        />
      ) : (
        <motion.img
          key={candidates[candidateIndex]}
          src={candidates[candidateIndex]}
          alt={asset.title}
          referrerPolicy="no-referrer"
          onError={() => setCandidateIndex((prev) => prev + 1)}
          initial={{ scale: scaleFrom, opacity: 0 }}
          animate={{
            scale: scaleTo,
            opacity,
            x: pointerOffset.x * -28,
            y: pointerOffset.y * -20,
          }}
          transition={{
            scale: { duration: durationSec, ease: 'linear' },
            opacity: { duration: 1.1, ease: 'easeOut' },
            x: { type: 'spring', stiffness: 65, damping: 24 },
            y: { type: 'spring', stiffness: 65, damping: 24 },
          }}
          className="h-full w-full object-cover saturate-[1.18] contrast-[1.08] will-change-transform"
        />
      )}

      <div className={`absolute inset-0 ${scrimClassName}`} aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        {DUST_MOTES.map((mote, i) => (
          <motion.span
            key={i}
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
            }}
            animate={{
              y: [-14, 14, -14],
              opacity: [0.15, 0.75, 0.15],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-sky-200/80 shadow-[0_0_8px_rgba(0,240,255,0.75)]"
          />
        ))}
      </div>
    </div>
  );
}
