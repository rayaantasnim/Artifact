import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

interface BottomControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

/**
 * Ultra-minimal bottom-center Play / Pause glassmorphic button.
 * Strictly zero extra buttons, zero sliders, zero text labels.
 */
export function BottomControl({ isPlaying, onTogglePlay }: BottomControlProps) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 sm:bottom-7">
      <motion.button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause film' : 'Play film'}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-colors hover:border-white/35 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
        ) : (
          <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
