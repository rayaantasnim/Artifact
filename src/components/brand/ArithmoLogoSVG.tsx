import { useState } from 'react';
import { motion } from 'framer-motion';

interface ArithmoLogoSVGProps {
  size?: number;
  enableLightSweep?: boolean;
  showOrbitingSymbols?: boolean;
  className?: string;
}

const LOGO_CANDIDATES = [
  './Assets/favicon/favicon.ico',
  'https://rayaantasnim.github.io/Arithmo-Edge/favicon.jpg',
];

/**
 * Authentic Arithmo Edge 3D Beveled Glassmorphic Logo Badge:
 * Renders the authentic Arithmo Edge logo image inside a beveled 3D glassmorphic
 * rounded-2xl badge with Vibrant Orange (#F38020) & Deep Navy (#1B365D) aura,
 * subtle light-sweep reflection, and optional orbiting ×, +, ÷, Σ operators.
 */
export function ArithmoLogoSVG({
  size = 156,
  enableLightSweep = true,
  showOrbitingSymbols = true,
  className = '',
}: ArithmoLogoSVGProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const allFailed = srcIndex >= LOGO_CANDIDATES.length;
  const isCompact = size <= 44;

  const badgeSize = showOrbitingSymbols ? Math.round(size * 0.72) : size;

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Deep Navy (#1B365D) & Vibrant Orange (#F38020) dual-core aura */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(27,54,93,0.75),rgba(243,128,32,0.42)_65%,transparent_100%)] blur-lg"
      />

      {/* Orbiting mathematical operators */}
      {showOrbitingSymbols && !isCompact && (
        <motion.span
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute inset-0"
        >
          <span className="font-mono-tabular absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-semibold text-sky-300/90 sm:text-sm">
            Σ
          </span>
          <span className="font-mono-tabular absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs font-semibold text-[#F38020] sm:text-sm">
            ÷
          </span>
          <span className="font-mono-tabular absolute top-1/2 left-0 -translate-x-1 -translate-y-1/2 text-xs font-semibold text-sky-200/85 sm:text-sm">
            ×
          </span>
          <span className="font-mono-tabular absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 text-xs font-semibold text-amber-300/95 sm:text-sm">
            +
          </span>
        </motion.span>
      )}

      {/* Sleek beveled 3D glassmorphic badge */}
      <div
        style={{ width: badgeSize, height: badgeSize }}
        className={`relative flex items-center justify-center overflow-hidden border border-white/25 bg-gradient-to-br from-[#1B365D]/90 via-[#0E1B33]/95 to-[#2A180D]/85 shadow-[0_14px_38px_rgba(27,54,93,0.75),0_0_26px_rgba(243,128,32,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md ${
          isCompact ? 'rounded-lg p-0.5' : 'rounded-2xl p-1.5'
        }`}
      >
        {allFailed ? (
          <span className="font-display text-lg font-bold tracking-tight text-white">
            A
          </span>
        ) : (
          <img
            src={LOGO_CANDIDATES[srcIndex]}
            alt="Arithmo Edge official emblem"
            referrerPolicy="no-referrer"
            onError={() => setSrcIndex((prev) => prev + 1)}
            className={`h-full w-full object-cover ${
              isCompact ? 'rounded-md' : 'rounded-xl'
            }`}
          />
        )}

        {/* Top-left glass bevel specular highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/35"
        />

        {/* Subtle light-sweep reflection confined cleanly inside the rounded-2xl badge */}
        {enableLightSweep && (
          <motion.span
            aria-hidden="true"
            initial={{ x: '-140%' }}
            animate={{ x: '240%' }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 2.6,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
