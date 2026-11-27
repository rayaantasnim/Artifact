import { useEffect, useRef } from 'react';
import type { ActVisualTheme } from '../data/timeline';

export type CanvasBeatMode =
  | 'tunnel-dive'
  | 'chess-matrix'
  | 'red-shatter'
  | 'singularity-warp'
  | 'auditorium-boom'
  | 'hud-matrix'
  | 'laser-circuit'
  | 'monument-gold'
  | 'standard';

interface CanvasEngineProps {
  theme: ActVisualTheme;
  beatMode: CanvasBeatMode;
  isPlaying: boolean;
  warpPulse: number;
  shockwaveNonce: number;
  pointerOffset: { x: number; y: number };
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface StarParticle {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: [number, number, number];
}

interface DataComet {
  orbitRadius: number;
  inclinationX: number;
  inclinationZ: number;
  angle: number;
  speed: number;
  color: [number, number, number];
}

interface ShatterShard {
  x: number;
  y: number;
  z: number;
  rx: number;
  scale: number;
}

interface ShockwaveRing {
  radius: number;
  alpha: number;
  rgb: [number, number, number];
}

const SIGNATURE_PALETTE: [number, number, number][] = [
  [243, 128, 32], // #F38020 Vibrant Orange
  [0, 240, 255], // #00F0FF Electric Cyan
  [139, 92, 246], // #8B5CF6 Neon Violet
  [248, 250, 252], // Crisp Star White
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function rotatePoint(p: Vec3, rx: number, ry: number, rz: number): Vec3 {
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;

  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = p.x * cosY + z1 * sinY;
  const z2 = -p.x * sinY + z1 * cosY;

  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

function createIcosahedron(radius: number): { vertices: Vec3[]; edges: [number, number][] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],
    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],
    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1],
  ];
  const norm = Math.sqrt(1 + phi * phi);
  const vertices = raw.map(([x, y, z]) => ({
    x: (x / norm) * radius,
    y: (y / norm) * radius,
    z: (z / norm) * radius,
  }));
  const edges: [number, number][] = [];
  const target = (2 / norm) * radius;
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const dx = vertices[i].x - vertices[j].x;
      const dy = vertices[i].y - vertices[j].y;
      const dz = vertices[i].z - vertices[j].z;
      if (Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - target) < radius * 0.15) {
        edges.push([i, j]);
      }
    }
  }
  return { vertices, edges };
}

function createOctahedron(radius: number): { vertices: Vec3[]; edges: [number, number][] } {
  const vertices: Vec3[] = [
    { x: radius, y: 0, z: 0 },
    { x: -radius, y: 0, z: 0 },
    { x: 0, y: radius, z: 0 },
    { x: 0, y: -radius, z: 0 },
    { x: 0, y: 0, z: radius },
    { x: 0, y: 0, z: -radius },
  ];
  const edges: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [4, 3],
    [3, 5],
    [5, 2],
  ];
  return { vertices, edges };
}

function createCube(radius: number): { vertices: Vec3[]; edges: [number, number][] } {
  const s = radius / Math.sqrt(3);
  const vertices: Vec3[] = [
    { x: -s, y: -s, z: -s },
    { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s },
    { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s },
    { x: s, y: -s, z: s },
    { x: s, y: s, z: s },
    { x: -s, y: s, z: s },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  return { vertices, edges };
}

function getBeatThemeOverride(
  beatMode: CanvasBeatMode,
  base: ActVisualTheme
): {
  primary: [number, number, number];
  secondary: [number, number, number];
  warp: number;
  camRollTarget: number;
  camYawTarget: number;
  camDiveTarget: number;
} {
  switch (beatMode) {
    case 'tunnel-dive':
      return {
        primary: [0, 240, 255],
        secondary: [139, 92, 246],
        warp: 1.75,
        camRollTarget: 0.08,
        camYawTarget: 0,
        camDiveTarget: 150,
      };
    case 'chess-matrix':
      return {
        primary: [0, 240, 255],
        secondary: [27, 54, 93],
        warp: 1.25,
        camRollTarget: Math.PI * 0.5,
        camYawTarget: 0.45,
        camDiveTarget: 230,
      };
    case 'red-shatter':
      return {
        primary: [244, 63, 94],
        secondary: [243, 128, 32],
        warp: 1.5,
        camRollTarget: -0.2,
        camYawTarget: -0.35,
        camDiveTarget: 175,
      };
    case 'singularity-warp':
      return {
        primary: [243, 128, 32],
        secondary: [0, 240, 255],
        warp: 2.85,
        camRollTarget: 0,
        camYawTarget: 0,
        camDiveTarget: 95,
      };
    case 'auditorium-boom':
      return {
        primary: [243, 128, 32],
        secondary: [139, 92, 246],
        warp: 2.1,
        camRollTarget: 0,
        camYawTarget: 0.14,
        camDiveTarget: 310,
      };
    case 'hud-matrix':
      return {
        primary: [0, 240, 255],
        secondary: [243, 128, 32],
        warp: 1.35,
        camRollTarget: 0.06,
        camYawTarget: -0.24,
        camDiveTarget: 245,
      };
    case 'laser-circuit':
      return {
        primary: [16, 185, 129],
        secondary: [0, 240, 255],
        warp: 1.6,
        camRollTarget: -0.07,
        camYawTarget: 0.28,
        camDiveTarget: 225,
      };
    case 'monument-gold':
      return {
        primary: [251, 191, 36],
        secondary: [243, 128, 32],
        warp: 1.4,
        camRollTarget: 0,
        camYawTarget: 0,
        camDiveTarget: 265,
      };
    default:
      return {
        primary: hexToRgb(base.primaryHex),
        secondary: hexToRgb(base.secondaryHex),
        warp: Math.max(1.15, base.warpIntensity),
        camRollTarget: 0,
        camYawTarget: 0,
        camDiveTarget: 250,
      };
  }
}

export function CanvasEngine({
  theme,
  beatMode,
  isPlaying,
  warpPulse,
  shockwaveNonce,
  pointerOffset,
}: CanvasEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const flareAlphaRef = useRef<number>(0);
  const gyroRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stateRef = useRef({
    theme,
    beatMode,
    isPlaying,
    warpPulse,
    pointerOffset,
  });

  useEffect(() => {
    stateRef.current = { theme, beatMode, isPlaying, warpPulse, pointerOffset };
  }, [theme, beatMode, isPlaying, warpPulse, pointerOffset]);

  // Mobile/tablet subtle gyro parallax listener
  useEffect(() => {
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;
      gyroRef.current = {
        x: Math.max(-0.5, Math.min(0.5, event.gamma / 45)),
        y: Math.max(-0.5, Math.min(0.5, (event.beta - 35) / 45)),
      };
    };
    window.addEventListener('deviceorientation', onOrientation);
    return () => window.removeEventListener('deviceorientation', onOrientation);
  }, []);

  // Trigger multi-ring shockwave & anamorphic lens flare flash
  useEffect(() => {
    if (shockwaveNonce <= 0) return;
    const override = getBeatThemeOverride(stateRef.current.beatMode, stateRef.current.theme);
    shockwavesRef.current.push({
      radius: 22,
      alpha: 0.96,
      rgb: override.primary,
    });
    flareAlphaRef.current = 0.85;
    if (shockwavesRef.current.length > 6) {
      shockwavesRef.current.shift();
    }
  }, [shockwaveNonce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Interlocking Platonic Solids
    const icosa = createIcosahedron(190);
    const cube = createCube(280);
    const octa = createOctahedron(118);

    // 440+ Depth-of-field warp-speed light streaks (#F38020, #00F0FF, #8B5CF6, White)
    const particleCount = 440;
    const maxDepth = 1800;
    const particles: StarParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const z = 70 + Math.random() * maxDepth;
      return {
        x: (Math.random() - 0.5) * 3200,
        y: (Math.random() - 0.5) * 2000,
        z,
        prevZ: z,
        size: 1.0 + (i % 4) * 0.55,
        color: SIGNATURE_PALETTE[i % SIGNATURE_PALETTE.length],
      };
    });

    // Flying orbital data comets around the 3D Olympiad Sphere
    const comets: DataComet[] = Array.from({ length: 14 }, (_, i) => ({
      orbitRadius: 270 + (i % 4) * 52,
      inclinationX: (i % 5) * 0.42 - 0.85,
      inclinationZ: (i % 3) * 0.55 - 0.55,
      angle: (i / 14) * Math.PI * 2,
      speed: 0.75 + (i % 4) * 0.38,
      color: SIGNATURE_PALETTE[i % 3],
    }));

    const shards: ShatterShard[] = Array.from({ length: 34 }, (_, i) => ({
      x: (Math.random() - 0.5) * 980,
      y: (Math.random() - 0.5) * 700,
      z: 200 + (i % 7) * 115,
      rx: Math.random() * Math.PI,
      scale: 20 + (i % 5) * 12,
    }));

    const currentPrimary = hexToRgb(stateRef.current.theme.primaryHex);
    const currentSecondary = hexToRgb(stateRef.current.theme.secondaryHex);
    let currentWarp = stateRef.current.theme.warpIntensity;
    let camRoll = 0;
    let camYaw = 0;
    let camDive = 220;
    let tunnelScroll = 0;
    let gridScroll = 0;
    let angle = 0;
    let lastTime = performance.now();
    let rafId = 0;

    const renderFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const {
        theme: activeTheme,
        beatMode: mode,
        isPlaying: playing,
        warpPulse: pulse,
        pointerOffset: ptr,
      } = stateRef.current;

      const target = getBeatThemeOverride(mode, activeTheme);

      for (let c = 0; c < 3; c++) {
        currentPrimary[c] = lerp(currentPrimary[c], target.primary[c], 0.09);
        currentSecondary[c] = lerp(currentSecondary[c], target.secondary[c], 0.09);
      }

      const targetWarp = target.warp + pulse * 1.9;
      currentWarp = lerp(currentWarp, targetWarp, 0.1);
      camRoll = lerp(camRoll, target.camRollTarget, prefersReducedMotion ? 0.2 : 0.075);
      camYaw = lerp(camYaw, target.camYawTarget, prefersReducedMotion ? 0.2 : 0.075);
      camDive = lerp(camDive, target.camDiveTarget, 0.065);
      flareAlphaRef.current = Math.max(0, flareAlphaRef.current - dt * 1.35);

      const motionFactor = prefersReducedMotion ? 0.14 : playing ? 1 : 0.42;
      angle += dt * (activeTheme.rotationSpeed + currentWarp * 0.28) * motionFactor;
      gridScroll = (gridScroll + dt * (155 * currentWarp) * motionFactor) % 120;
      tunnelScroll = (tunnelScroll + dt * (280 * currentWarp) * motionFactor) % 240;

      const combinedPtrX = ptr.x + gyroRef.current.x * 0.65;
      const combinedPtrY = ptr.y + gyroRef.current.y * 0.65;

      // Deep space background clear
      ctx.fillStyle = '#04060B';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + combinedPtrX * 48 + Math.sin(camYaw) * 52;
      const cy = height * 0.49 + combinedPtrY * 34;
      const fov = Math.min(width, height) * 0.9;
      const primaryRgbStr = `${Math.round(currentPrimary[0])}, ${Math.round(currentPrimary[1])}, ${Math.round(currentPrimary[2])}`;
      const secondaryRgbStr = `${Math.round(currentSecondary[0])}, ${Math.round(currentSecondary[1])}, ${Math.round(currentSecondary[2])}`;

      // Atmospheric energy nebula behind the 3D Olympiad Sphere
      const bgGrad = ctx.createRadialGradient(
        cx,
        cy,
        mode === 'singularity-warp' ? 45 : 15,
        cx,
        cy,
        Math.max(width, height) * 0.82
      );
      bgGrad.addColorStop(
        0,
        mode === 'red-shatter'
          ? `rgba(244, 63, 94, ${0.32 + Math.abs(Math.sin(now * 0.008)) * 0.2})`
          : mode === 'singularity-warp'
            ? 'rgba(255, 220, 145, 0.48)'
            : `rgba(${primaryRgbStr}, 0.26)`
      );
      bgGrad.addColorStop(0.42, `rgba(${secondaryRgbStr}, 0.2)`);
      bgGrad.addColorStop(1, 'rgba(4, 6, 11, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. High-Speed 3D Neon Laser Floor Grid (+ Chessboard Matrix on Beat 2)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(camRoll * 0.35);
      ctx.translate(-cx, -cy);

      if (mode === 'chess-matrix') {
        const tileSize = 115;
        const cols = 12;
        const rows = 11;
        const floorY = 235;
        for (let r = 0; r < rows; r++) {
          const z1 = 150 + r * tileSize - (gridScroll % tileSize);
          const z2 = z1 + tileSize;
          if (z1 < 90) continue;
          const s1 = fov / z1;
          const s2 = fov / z2;
          const depthAlpha = Math.max(0, 1 - z1 / (rows * tileSize + 160));

          for (let c = -cols / 2; c < cols / 2; c++) {
            const isLight = (Math.abs(c) + r) % 2 === 0;
            const x1L = cx + c * tileSize * s1;
            const x1R = cx + (c + 1) * tileSize * s1;
            const y1 = cy + floorY * s1;
            const x2L = cx + c * tileSize * s2;
            const x2R = cx + (c + 1) * tileSize * s2;
            const y2 = cy + floorY * s2;

            ctx.beginPath();
            ctx.moveTo(x1L, y1);
            ctx.lineTo(x1R, y1);
            ctx.lineTo(x2R, y2);
            ctx.lineTo(x2L, y2);
            ctx.closePath();

            if (isLight) {
              ctx.fillStyle = `rgba(0, 240, 255, ${(0.2 * depthAlpha).toFixed(3)})`;
              ctx.fill();
            }
            ctx.strokeStyle = `rgba(0, 240, 255, ${(0.42 * depthAlpha).toFixed(3)})`;
            ctx.lineWidth = 1.15;
            ctx.stroke();
          }
        }
      } else {
        const horizonY = cy + height * 0.04;
        const floorDepth = 1650;
        const gridSpan = 1800;
        const gridStep = 120;

        // Neon floor longitudinal beams
        ctx.lineWidth = 1.1;
        for (let gx = -gridSpan; gx <= gridSpan; gx += gridStep) {
          const scaleNear = fov / 100;
          const scaleFar = fov / floorDepth;
          const fade = 1 - Math.min(1, Math.abs(gx) / gridSpan);
          ctx.strokeStyle = `rgba(${primaryRgbStr}, ${(0.34 * fade).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(cx + gx * scaleFar, horizonY + 265 * scaleFar);
          ctx.lineTo(cx + gx * scaleNear, horizonY + 265 * scaleNear);
          ctx.stroke();
        }

        // Neon floor rushing Z-lines
        for (let gz = 120; gz < floorDepth; gz += gridStep) {
          const z = gz - gridScroll;
          if (z < 85) continue;
          const scale = fov / z;
          const y = horizonY + 265 * scale;
          if (y > height + 80) continue;
          const depthAlpha = Math.max(0, 1 - z / floorDepth);
          ctx.strokeStyle = `rgba(${primaryRgbStr}, ${(0.4 * depthAlpha).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(cx - gridSpan * scale, y);
          ctx.lineTo(cx + gridSpan * scale, y);
          ctx.stroke();
        }

        // Subtle upper holographic sky lattice
        for (let gz = 180; gz < floorDepth; gz += gridStep * 2) {
          const z = gz - gridScroll;
          if (z < 110) continue;
          const scale = fov / z;
          const y = horizonY - 310 * scale;
          if (y < -40) continue;
          const depthAlpha = Math.max(0, 1 - z / floorDepth) * 0.2;
          ctx.strokeStyle = `rgba(${secondaryRgbStr}, ${depthAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(cx - gridSpan * scale, y);
          ctx.lineTo(cx + gridSpan * scale, y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 2. 440+ Warp-Speed Starfield & Multi-Chromatic Light Streaks (#F38020, #00F0FF, #8B5CF6)
      const pSpeed = (240 + 420 * currentWarp) * motionFactor;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.prevZ = pt.z;
        pt.z -= pSpeed * dt;

        if (pt.z <= 40) {
          pt.z = maxDepth;
          pt.prevZ = maxDepth;
          pt.x = (Math.random() - 0.5) * 3200;
          pt.y = (Math.random() - 0.5) * 2000;
        }

        const sx = cx + (pt.x * fov) / pt.z;
        const sy = cy + (pt.y * fov) / pt.z;
        const px = cx + (pt.x * fov) / pt.prevZ;
        const py = cy + (pt.y * fov) / pt.prevZ;

        if (sx < -120 || sx > width + 120 || sy < -120 || sy > height + 120) continue;

        const depthRatio = 1 - pt.z / maxDepth;
        const alpha = Math.min(0.95, Math.max(0.08, depthRatio * 0.95));
        const rgb = `${pt.color[0]}, ${pt.color[1]}, ${pt.color[2]}`;

        if (!prefersReducedMotion) {
          ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = Math.max(1, pt.size * depthRatio * (1.2 + currentWarp * 0.5));
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.9, pt.size * depthRatio * 1.4), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Rapid 3D Wireframe Tunnel Rings (tunnel-dive / singularity-warp / auditorium-boom)
      if (mode === 'tunnel-dive' || mode === 'singularity-warp' || mode === 'auditorium-boom') {
        const ringCount = 10;
        for (let r = 0; r < ringCount; r++) {
          const z = 140 + ((r * 240 - tunnelScroll + 2400) % 2400);
          const scale = fov / z;
          const rad = 430 * scale;
          const alpha = Math.max(0, (1 - z / 2400) * 0.42);
          ctx.strokeStyle = `rgba(${primaryRgbStr}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          const sides = 8;
          for (let s = 0; s <= sides; s++) {
            const theta = (s / sides) * Math.PI * 2 + angle * 0.45 + r * 0.16;
            const px = cx + Math.cos(theta) * rad;
            const py = cy + Math.sin(theta) * rad;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      // 4. 3D Wireframe Olympiad Sphere (Earth/Globe) + Concentric Orbital Rings
      const sphereZ = 470 + camDive;
      const globeRadius = 235;
      const globeRx = 0.28 + combinedPtrY * 0.45 + Math.sin(angle * 0.4) * 0.15;
      const globeRy = angle * 0.52 + camYaw + combinedPtrX * 0.55;
      const globeRz = camRoll * 0.25;

      // Latitude parallels
      const latSteps = [-0.65, -0.35, 0, 0.35, 0.65];
      for (let li = 0; li < latSteps.length; li++) {
        const lat = latSteps[li] * Math.PI * 0.5;
        const rLat = Math.cos(lat) * globeRadius;
        const yLat = Math.sin(lat) * globeRadius;
        ctx.strokeStyle = `rgba(0, 240, 255, ${li === 2 ? 0.34 : 0.18})`;
        ctx.lineWidth = li === 2 ? 1.4 : 0.9;
        ctx.beginPath();
        const segs = 36;
        for (let s = 0; s <= segs; s++) {
          const lon = (s / segs) * Math.PI * 2;
          const pt = rotatePoint(
            { x: Math.cos(lon) * rLat, y: yLat, z: Math.sin(lon) * rLat },
            globeRx,
            globeRy,
            globeRz
          );
          const sc = fov / Math.max(120, pt.z + sphereZ);
          const sx = cx + pt.x * sc;
          const sy = cy + pt.y * sc;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Longitude meridians
      const lonCount = 12;
      for (let m = 0; m < lonCount; m++) {
        const lon = (m / lonCount) * Math.PI;
        ctx.strokeStyle = `rgba(${primaryRgbStr}, ${m % 3 === 0 ? 0.26 : 0.13})`;
        ctx.lineWidth = m % 3 === 0 ? 1.15 : 0.85;
        ctx.beginPath();
        const segs = 32;
        for (let s = 0; s <= segs; s++) {
          const lat = (s / segs) * Math.PI * 2;
          const pt = rotatePoint(
            {
              x: Math.cos(lat) * Math.cos(lon) * globeRadius,
              y: Math.sin(lat) * globeRadius,
              z: Math.cos(lat) * Math.sin(lon) * globeRadius,
            },
            globeRx,
            globeRy,
            globeRz
          );
          const sc = fov / Math.max(120, pt.z + sphereZ);
          const sx = cx + pt.x * sc;
          const sy = cy + pt.y * sc;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // 3 Tilted Concentric Orbital Rings around the Olympiad Sphere
      const ringConfigs: { radius: number; rx: number; rz: number; rgb: string }[] = [
        { radius: 305, rx: 1.15, rz: 0.32, rgb: '243, 128, 32' },
        { radius: 345, rx: -0.95, rz: -0.48, rgb: '0, 240, 255' },
        { radius: 385, rx: 0.45, rz: 1.08, rgb: '139, 92, 246' },
      ];
      for (const rc of ringConfigs) {
        ctx.strokeStyle = `rgba(${rc.rgb}, 0.34)`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        const segs = 48;
        for (let s = 0; s <= segs; s++) {
          const t = (s / segs) * Math.PI * 2;
          const pt = rotatePoint(
            { x: Math.cos(t) * rc.radius, y: 0, z: Math.sin(t) * rc.radius },
            rc.rx + angle * 0.2,
            angle * 0.45 + camYaw,
            rc.rz
          );
          const sc = fov / Math.max(120, pt.z + sphereZ);
          const sx = cx + pt.x * sc;
          const sy = cy + pt.y * sc;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // 5. Flying 3D Orbital Data Comets
      for (let i = 0; i < comets.length; i++) {
        const cm = comets[i];
        cm.angle += dt * cm.speed * motionFactor;
        const tailSteps = 6;
        const rgb = `${cm.color[0]}, ${cm.color[1]}, ${cm.color[2]}`;

        for (let t = 0; t < tailSteps; t++) {
          const a1 = cm.angle - t * 0.065;
          const a2 = cm.angle - (t + 1) * 0.065;
          const p1 = rotatePoint(
            { x: Math.cos(a1) * cm.orbitRadius, y: 0, z: Math.sin(a1) * cm.orbitRadius },
            cm.inclinationX,
            angle * 0.3,
            cm.inclinationZ
          );
          const p2 = rotatePoint(
            { x: Math.cos(a2) * cm.orbitRadius, y: 0, z: Math.sin(a2) * cm.orbitRadius },
            cm.inclinationX,
            angle * 0.3,
            cm.inclinationZ
          );
          const s1 = fov / Math.max(120, p1.z + sphereZ);
          const s2 = fov / Math.max(120, p2.z + sphereZ);
          const alpha = ((tailSteps - t) / tailSteps) * 0.85;

          ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = ((tailSteps - t) / tailSteps) * 3.2;
          ctx.beginPath();
          ctx.moveTo(cx + p1.x * s1, cy + p1.y * s1);
          ctx.lineTo(cx + p2.x * s2, cy + p2.y * s2);
          ctx.stroke();
        }
      }

      // 6. Interlocking Platonic Solids (Cube + Icosahedron + Octahedron)
      const drawPoly = (
        geom: { vertices: Vec3[]; edges: [number, number][] },
        rx: number,
        ry: number,
        rz: number,
        zOff: number,
        rgb: [number, number, number],
        opacity: number,
        lineWidth: number
      ) => {
        const projected = geom.vertices.map((v) => {
          const r = rotatePoint(v, rx, ry, rz);
          const scale = fov / Math.max(120, r.z + zOff);
          return { x: cx + r.x * scale, y: cy + r.y * scale };
        });

        ctx.strokeStyle = `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        for (const [a, b] of geom.edges) {
          ctx.moveTo(projected[a].x, projected[a].y);
          ctx.lineTo(projected[b].x, projected[b].y);
        }
        ctx.stroke();

        ctx.fillStyle = `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${Math.min(0.95, opacity * 1.8)})`;
        for (const p of projected) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, lineWidth * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawPoly(
        cube,
        angle * 0.45 + combinedPtrY * 0.3,
        -angle * 0.55 + camYaw + combinedPtrX * 0.3,
        angle * 0.2,
        sphereZ + 40,
        [139, 92, 246],
        0.24,
        1.15
      );
      drawPoly(
        icosa,
        angle * 0.8 + combinedPtrY * 0.4,
        angle * 1.0 + camYaw + combinedPtrX * 0.4,
        angle * 0.35 + camRoll * 0.35,
        sphereZ,
        currentPrimary,
        0.42,
        1.45
      );
      drawPoly(
        octa,
        -angle * 1.35,
        angle * 0.95 + camYaw,
        -angle * 0.55,
        sphereZ - 35,
        [243, 128, 32],
        0.46,
        1.25
      );

      // 7. Shattering Polygon Shards (Beat 3 Crimson Warning)
      if (mode === 'red-shatter') {
        for (let i = 0; i < shards.length; i++) {
          const sh = shards[i];
          const jitter = Math.sin(now * 0.018 + i) * 7;
          const scale = fov / sh.z;
          const sx = cx + (sh.x + jitter) * scale;
          const sy = cy + (sh.y - jitter) * scale;
          const r = sh.scale * scale;
          const rot = sh.rx + angle * (i % 2 === 0 ? 2.1 : -1.8);

          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(rot);
          ctx.beginPath();
          ctx.moveTo(-r, -r * 0.5);
          ctx.lineTo(r * 0.95, -r * 0.2);
          ctx.lineTo(0, r);
          ctx.closePath();
          ctx.fillStyle = 'rgba(244, 63, 94, 0.16)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(251, 113, 133, 0.65)';
          ctx.lineWidth = 1.25;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 8. Expanding Multi-Ring Shockwaves & Anamorphic Lens Flare
      const activeRings = shockwavesRef.current;
      for (let i = activeRings.length - 1; i >= 0; i--) {
        const ring = activeRings[i];
        ring.radius += dt * Math.max(width, height) * 1.3;
        ring.alpha -= dt * 1.15;

        if (ring.alpha <= 0.01) {
          activeRings.splice(i, 1);
          continue;
        }

        const rStr = `${Math.round(ring.rgb[0])}, ${Math.round(ring.rgb[1])}, ${Math.round(ring.rgb[2])}`;
        ctx.strokeStyle = `rgba(${rStr}, ${ring.alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(1.8, ring.alpha * 7.5);
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${(ring.alpha * 0.55).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (flareAlphaRef.current > 0.02) {
        const fAlpha = flareAlphaRef.current;
        const flareGrad = ctx.createLinearGradient(0, cy, width, cy);
        flareGrad.addColorStop(0, 'rgba(0,0,0,0)');
        flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(fAlpha * 0.35).toFixed(3)})`);
        flareGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, cy - 3, width, 6);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
