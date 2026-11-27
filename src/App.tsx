import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { BottomControl } from './components/hud/BottomControl';
import { CinemaNavbar } from './components/hud/CinemaNavbar';
import { EndRedirect } from './components/hud/EndRedirect';
import { TopScrubber } from './components/hud/TopScrubber';
import { getActAtTime, TOTAL_FILM_DURATION } from './data/timeline';
import { AudioSynth } from './engine/AudioSynth';
import { CanvasEngine, type CanvasBeatMode } from './engine/CanvasEngine';
import { Act01_PhilosophyHook } from './scenes/Act01_PhilosophyHook';
import { Act02_GrandAwakening } from './scenes/Act02_GrandAwakening';
import { Act03_FederatedConstellation } from './scenes/Act03_FederatedConstellation';
import { Act04_DomainArenas } from './scenes/Act04_DomainArenas';
import { Act05_DuelAndShadowBots } from './scenes/Act05_DuelAndShadowBots';
import { Act06_ContestsAndWorldCup } from './scenes/Act06_ContestsAndWorldCup';
import { Act07_HybridAICore42 } from './scenes/Act07_HybridAICore42';
import { Act08_QPRT4AndLegalShield } from './scenes/Act08_QPRT4AndLegalShield';
import { Act09_EcosystemAndSpaceXLaunch } from './scenes/Act09_EcosystemAndSpaceXLaunch';
import { Act10_GrandFinale } from './scenes/Act10_GrandFinale';
import type { SceneProps } from './scenes/sceneTypes';

function getBeatDescriptor(seconds: number): { id: string; mode: CanvasBeatMode } {
  // Act 1 (0-32s): 3-5s micro-beats
  if (seconds < 3.4) return { id: 'b1a', mode: 'tunnel-dive' };
  if (seconds < 7) return { id: 'b1b', mode: 'tunnel-dive' };
  if (seconds < 10.4) return { id: 'b2a', mode: 'chess-matrix' };
  if (seconds < 14) return { id: 'b2b', mode: 'chess-matrix' };
  if (seconds < 18.2) return { id: 'b3a', mode: 'red-shatter' };
  if (seconds < 23) return { id: 'b3b', mode: 'red-shatter' };
  if (seconds < 27.2) return { id: 'b4a', mode: 'singularity-warp' };
  if (seconds < 32) return { id: 'b4b', mode: 'singularity-warp' };

  // Act 2 (32-70s): 3-5s micro-beats
  if (seconds < 36.2) return { id: 'b5a', mode: 'auditorium-boom' };
  if (seconds < 42) return { id: 'b5b', mode: 'auditorium-boom' };
  if (seconds < 46.5) return { id: 'b6a', mode: 'hud-matrix' };
  if (seconds < 52) return { id: 'b6b', mode: 'hud-matrix' };
  if (seconds < 56) return { id: 'b7a', mode: 'laser-circuit' };
  if (seconds < 61) return { id: 'b7b', mode: 'laser-circuit' };
  if (seconds < 65.5) return { id: 'b8a', mode: 'monument-gold' };
  if (seconds < 70) return { id: 'b8b', mode: 'monument-gold' };

  // Acts 3-4 (70-140s): 4-second dynamic shockwave cadence
  if (seconds < 140) {
    const act = getActAtTime(seconds);
    const pulseSlot = Math.floor((seconds - act.startSec) / 4);
    const modes: CanvasBeatMode[] = ['hud-matrix', 'laser-circuit', 'tunnel-dive'];
    return {
      id: `act-${act.id}-p${pulseSlot}`,
      mode: modes[pulseSlot % modes.length],
    };
  }

  // Act 5 (140-175s)
  if (seconds < 144) return { id: 'a5-b1a', mode: 'tunnel-dive' };
  if (seconds < 148) return { id: 'a5-b1b', mode: 'laser-circuit' };
  if (seconds < 152) return { id: 'a5-b1c', mode: 'auditorium-boom' };
  if (seconds < 175) {
    const botStep = Math.floor((seconds - 152) / 3.8);
    return { id: `a5-b2-${botStep}`, mode: 'hud-matrix' };
  }

  // Act 6 (175-210s)
  if (seconds < 187) return { id: `a6-b1-${Math.floor((seconds - 175) / 4)}`, mode: 'hud-matrix' };
  if (seconds < 198) return { id: `a6-b2-${Math.floor((seconds - 187) / 4)}`, mode: 'laser-circuit' };
  if (seconds < 210) return { id: `a6-b3-${Math.floor((seconds - 198) / 4)}`, mode: 'monument-gold' };

  // Act 7 (210-242s)
  if (seconds < 221) return { id: `a7-b1-${Math.floor((seconds - 210) / 3.7)}`, mode: 'laser-circuit' };
  if (seconds < 232) return { id: `a7-b2-${Math.floor((seconds - 221) / 3.7)}`, mode: 'hud-matrix' };
  if (seconds < 242) return { id: `a7-b3-${Math.floor((seconds - 232) / 3.5)}`, mode: 'singularity-warp' };

  // Act 8 (242-275s)
  if (seconds < 253) return { id: `a8-b1-${Math.floor((seconds - 242) / 3.7)}`, mode: 'hud-matrix' };
  if (seconds < 264) return { id: `a8-b2-${Math.floor((seconds - 253) / 3.7)}`, mode: 'red-shatter' };
  if (seconds < 275) return { id: `a8-b3-${Math.floor((seconds - 264) / 3.7)}`, mode: 'monument-gold' };

  // Act 9 (275-305s)
  if (seconds < 285) return { id: `a9-b1-${Math.floor((seconds - 275) / 3.4)}`, mode: 'hud-matrix' };
  if (seconds < 305) return { id: `a9-b2-${Math.floor((seconds - 285) / 4)}`, mode: 'singularity-warp' };

  // Act 10 (305-330s)
  if (seconds < 317) return { id: `a10-b1-${Math.floor((seconds - 305) / 4)}`, mode: 'laser-circuit' };
  return { id: `a10-b2-${Math.floor((seconds - 317) / 4)}`, mode: 'monument-gold' };
}

function renderScene(actId: number, props: SceneProps) {
  switch (actId) {
    case 1:
      return <Act01_PhilosophyHook {...props} />;
    case 2:
      return <Act02_GrandAwakening {...props} />;
    case 3:
      return <Act03_FederatedConstellation {...props} />;
    case 4:
      return <Act04_DomainArenas {...props} />;
    case 5:
      return <Act05_DuelAndShadowBots {...props} />;
    case 6:
      return <Act06_ContestsAndWorldCup {...props} />;
    case 7:
      return <Act07_HybridAICore42 {...props} />;
    case 8:
      return <Act08_QPRT4AndLegalShield {...props} />;
    case 9:
      return <Act09_EcosystemAndSpaceXLaunch {...props} />;
    case 10:
    default:
      return <Act10_GrandFinale {...props} />;
  }
}

export function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [warpPulse, setWarpPulse] = useState(0);
  const [shockwaveNonce, setShockwaveNonce] = useState(0);
  const [seekNonce, setSeekNonce] = useState(0);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const audioRef = useRef<AudioSynth | null>(null);
  const prevActIdRef = useRef<number>(1);
  const prevBeatIdRef = useRef<string>('b1a');
  const warpTimeoutRef = useRef<number | null>(null);

  const currentAct = getActAtTime(currentTime);
  const actTime = Math.max(0, currentTime - currentAct.startSec);
  const actDuration = currentAct.endSec - currentAct.startSec;
  const beatDescriptor = getBeatDescriptor(currentTime);
  const showNavbar = currentTime >= 32; // Appears at exact moment brand is revealed (Act 2+)

  const triggerWarpBurst = useCallback((strength = 1) => {
    setWarpPulse(strength);
    setShockwaveNonce((n) => n + 1);
    if (warpTimeoutRef.current !== null) {
      window.clearTimeout(warpTimeoutRef.current);
    }
    warpTimeoutRef.current = window.setTimeout(() => {
      setWarpPulse(0);
    }, 850);
  }, []);

  useEffect(() => {
    const synth = new AudioSynth();
    audioRef.current = synth;
    return () => {
      synth.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    void audioRef.current?.setPlaying(isPlaying);
  }, [isPlaying]);

  // Trigger shockwaves & audio cues on Beat and Act transitions
  useEffect(() => {
    const actChanged = currentAct.id !== prevActIdRef.current;
    const beatChanged = beatDescriptor.id !== prevBeatIdRef.current;

    if (actChanged) {
      audioRef.current?.setAct(currentAct.id, true);
      triggerWarpBurst(currentAct.id === 2 ? 1.8 : 1.05);
      prevActIdRef.current = currentAct.id;
      prevBeatIdRef.current = beatDescriptor.id;
    } else if (beatChanged) {
      const isMajorBeat = beatDescriptor.id.endsWith('a') || beatDescriptor.id.includes('-b');
      if (isMajorBeat) {
        audioRef.current?.playShockwaveImpact(0.75);
      } else {
        audioRef.current?.playTransitionWhoosh(0.12);
      }
      triggerWarpBurst(isMajorBeat ? 1.1 : 0.8);
      prevBeatIdRef.current = beatDescriptor.id;
    }
  }, [currentAct.id, beatDescriptor.id, triggerWarpBurst]);

  // Master 60fps playback clock
  useEffect(() => {
    if (!isPlaying) return;

    let lastNow = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;

      setCurrentTime((prev) => {
        const next = prev + dt;
        if (next >= TOTAL_FILM_DURATION) {
          setIsPlaying(false);
          return TOTAL_FILM_DURATION;
        }
        return next;
      });

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const handleTogglePlay = useCallback(() => {
    setCurrentTime((prev) => (prev >= TOTAL_FILM_DURATION ? 0 : prev));
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSeek = useCallback(
    (seconds: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FILM_DURATION, seconds));
      setCurrentTime(clamped);
      setSeekNonce((n) => n + 1);
      triggerWarpBurst(0.75);
    },
    [triggerWarpBurst]
  );

  const handleReplay = useCallback(() => {
    setCurrentTime(0);
    setSeekNonce((n) => n + 1);
    setIsPlaying(true);
    triggerWarpBurst(1.2);
  }, [triggerWarpBurst]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleTogglePlay();
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleSeek(currentTime + 4);
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        handleSeek(currentTime - 4);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentTime, handleSeek, handleTogglePlay]);

  return (
    <MotionConfig reducedMotion="user">
      <main
        onPointerMove={(e) => {
          const nx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
          const ny = e.clientY / Math.max(1, window.innerHeight) - 0.5;
          setPointerOffset({ x: nx, y: ny });
        }}
        onPointerLeave={() => setPointerOffset({ x: 0, y: 0 })}
        className="relative h-[100dvh] w-[100vw] overflow-hidden bg-[#05070D] text-zinc-100"
      >
        {/* Live 60fps 3D perspective wireframe, chessboard matrix, singularity & shockwave canvas */}
        <CanvasEngine
          theme={currentAct.theme}
          beatMode={beatDescriptor.mode}
          isPlaying={isPlaying}
          warpPulse={warpPulse}
          shockwaveNonce={shockwaveNonce}
          pointerOffset={pointerOffset}
        />

        {/* Razor-thin top scrubber (zero timestamps) */}
        <TopScrubber
          currentTime={currentTime}
          accentHex={currentAct.theme.primaryHex}
          onSeek={handleSeek}
        />

        {/* Dynamic Cinema Navbar: hidden in Act 1, slides down at 0:32 brand reveal */}
        <CinemaNavbar visible={showNavbar} />

        {/* Z-Axis depth scene viewport */}
        <div className="cinema-perspective relative z-10 h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAct.id}
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateX: 7,
                filter: 'blur(12px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                scale: 1.09,
                rotateX: -5,
                filter: 'blur(12px)',
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="h-full w-full"
            >
              {renderScene(currentAct.id, {
                act: currentAct,
                actTime,
                actDuration,
                pointerOffset,
                seekNonce,
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Single glassmorphic bottom-center Play / Pause control */}
        <BottomControl isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />

        {/* Post-film redirect overlay — strictly active only at 5:30 (330s) */}
        <EndRedirect
          visible={currentTime >= TOTAL_FILM_DURATION}
          onReplay={handleReplay}
        />
      </main>
    </MotionConfig>
  );
}

export default App;
