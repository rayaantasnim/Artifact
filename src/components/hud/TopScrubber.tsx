import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { TIMELINE_ACTS, TOTAL_FILM_DURATION } from '../../data/timeline';

interface TopScrubberProps {
  currentTime: number;
  accentHex: string;
  onSeek: (seconds: number) => void;
}

/**
 * Razor-thin interactive progress bar pinned to the very top edge.
 * Supports smooth click and pointer-drag scrubbing with zero timecode numbers.
 */
export function TopScrubber({ currentTime, accentHex, onSeek }: TopScrubberProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progressRatio = Math.max(0, Math.min(1, currentTime / TOTAL_FILM_DURATION));

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onSeek(ratio * TOTAL_FILM_DURATION);
    },
    [onSeek]
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    seekFromClientX(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    seekFromClientX(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Film timeline scrubber"
      aria-valuemin={0}
      aria-valuemax={TOTAL_FILM_DURATION}
      aria-valuenow={Math.round(currentTime)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          onSeek(Math.min(TOTAL_FILM_DURATION, currentTime + 5));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onSeek(Math.max(0, currentTime - 5));
        }
      }}
      className="group fixed top-0 right-0 left-0 z-50 flex h-6 cursor-pointer items-start touch-none focus-visible:outline-none"
    >
      {/* Razor-thin track (4px resting, expands to 8px on hover/drag) */}
      <div
        className={`relative w-full overflow-hidden bg-white/10 backdrop-blur-sm transition-[height] duration-150 ${
          isDragging ? 'h-2' : 'h-1 group-hover:h-2 group-focus-visible:h-2'
        }`}
      >
        {/* Subtle Act divider ticks */}
        {TIMELINE_ACTS.slice(1).map((act) => {
          const leftPct = (act.startSec / TOTAL_FILM_DURATION) * 100;
          return (
            <span
              key={act.id}
              aria-hidden="true"
              style={{ left: `${leftPct}%` }}
              className="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-black/55"
            />
          );
        })}

        {/* Active glowing progress fill */}
        <div
          style={{
            width: `${progressRatio * 100}%`,
            background: `linear-gradient(90deg, #1B365D 0%, ${accentHex} 75%, #F8FAFC 100%)`,
            boxShadow: `0 0 14px ${accentHex}`,
          }}
          className="h-full transition-[width] duration-75 ease-linear"
        />
      </div>
    </div>
  );
}
