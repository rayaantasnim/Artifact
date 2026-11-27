import { motion } from 'framer-motion';
import { ArithmoLogoSVG } from '../brand/ArithmoLogoSVG';

interface CinemaNavbarProps {
  visible: boolean;
}

/**
 * Dynamic Cinema Navbar:
 * - Hidden completely during Act 1 (opacity: 0, y: -60) for pure suspense.
 * - Slides down directly under the top scrubber the instant Arithmo Edge appears (0:32).
 * - Zero togglers, zero hamburger menus, zero buttons.
 */
export function CinemaNavbar({ visible }: CinemaNavbarProps) {
  return (
    <motion.header
      aria-hidden={!visible}
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -60 }
      }
      transition={{ type: 'spring', stiffness: 130, damping: 22 }}
      className={`fixed top-1 right-0 left-0 z-40 border-b border-cyan-400/20 bg-[#0B1120]/80 backdrop-blur-xl ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-2 px-3 sm:h-14 sm:gap-3 sm:px-8">
        {/* Left Side: 3D SVG Logo + Bold Crisp White Wordmark */}
        <div className="flex items-center gap-2 shrink-0 sm:gap-2.5">
          <ArithmoLogoSVG
            size={28}
            enableLightSweep={visible}
            showOrbitingSymbols={false}
          />
          <span className="font-display text-[clamp(0.88rem,1.8vw,1.2rem)] font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            Arithmo Edge
          </span>
        </div>

        {/* Right Side: Glowing Golden-Orange / Cyan Shimmer Tagline */}
        <div className="min-w-0 text-right">
          <motion.p
            animate={
              visible
                ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                : undefined
            }
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundSize: '220% 100%' }}
            className="bg-gradient-to-r from-cyan-200 via-[#F38020] to-amber-200 bg-clip-text text-[clamp(0.6rem,1.4vw,0.95rem)] font-medium tracking-wide text-transparent whitespace-nowrap drop-shadow-[0_0_14px_rgba(243,128,32,0.32)]"
          >
            Inspiring the Younger Generations
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
}
