import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, RotateCcw } from 'lucide-react';
import { ArithmoLogoSVG } from '../brand/ArithmoLogoSVG';
import { CyberHudPanel } from '../ui/MotionPrimitives';

interface EndRedirectProps {
  visible: boolean;
  onReplay: () => void;
}

const TARGET_URL = 'https://rayaantasnim.github.io/Arithmo-Edge/';

/**
 * Post-Film Redirect Overlay:
 * Strictly mounts and begins its 5-second countdown ONLY once playback reaches 5:30 (330s).
 * Never triggers during playback from 0:00 to 5:29.
 */
export function EndRedirect({ visible, onReplay }: EndRedirectProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!visible) {
      setCountdown(5);
      return;
    }

    setCountdown(5);
    const interval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          window.location.assign(TARGET_URL);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Arithmo Edge Launch Portal Redirect"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(18px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070D]/85 px-4"
        >
          <CyberHudPanel
            accentHex="#F38020"
            className="w-full max-w-lg px-6 py-7 text-center sm:px-9 sm:py-9"
          >
            <div className="flex flex-col items-center gap-4">
              <ArithmoLogoSVG size={78} enableLightSweep />

              <div>
                <p className="font-mono-tabular text-xs font-bold tracking-[0.22em] text-[#00F0FF] uppercase">
                  Launch Sequence Complete · V4.0
                </p>
                <h2 className="font-display mt-2 text-[clamp(1.6rem,3.6vw,2.35rem)] font-bold text-white">
                  Entering <span className="text-[#F38020]">Arithmo Edge</span>
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  Redirecting to the live ecosystem portal in{' '}
                  <span className="font-mono-tabular font-bold text-[#00F0FF]">
                    {countdown}s
                  </span>
                  .
                </p>
              </div>

              {/* Smooth 5-second countdown progress track */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  style={{ transformOrigin: 'left center' }}
                  className="h-full w-full bg-gradient-to-r from-[#00F0FF] via-[#F38020] to-amber-300 shadow-[0_0_16px_#F38020]"
                />
              </div>

              <div className="mt-2 flex w-full flex-col gap-2.5 sm:flex-row">
                <a
                  href={TARGET_URL}
                  target="_top"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F38020]/70 bg-gradient-to-r from-[#F38020] to-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_26px_rgba(243,128,32,0.45)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <span>Launch Arithmo Edge →</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onReplay}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-cyan-200 transition-all hover:border-[#00F0FF] hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>Replay Film</span>
                </button>
              </div>
            </div>
          </CyberHudPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
