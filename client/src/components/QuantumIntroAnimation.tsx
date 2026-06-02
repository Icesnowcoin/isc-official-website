/**
 * Quantum Intro Animation - ISC Quantum Ice
 * Ultra-magical cyberpunk-inspired opening animation
 * Features:
 * - 3D particle system with depth and perspective
 * - Fullscreen scanline effects
 * - Neon glow and color shifting
 * - Electromagnetic wave ripples
 * - Holographic logo transformation
 * - Cyberpunk aesthetic with quantum effects
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  color: string;
  hue: number;
}

interface QuantumIntroAnimationProps {
  onComplete: () => void;
}

export default function QuantumIntroAnimation({
  onComplete,
}: QuantumIntroAnimationProps) {
  const [phase, setPhase] = useState<"init" | "particles" | "logo" | "done">(
    "init"
  );
  const [canSkip, setCanSkip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle3D[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const waveRef = useRef<number>(0);

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate 3D particles
    const particles: Particle3D[] = [];
    const particleCount = 500;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Neon color palette
    const neonColors = [
      { r: 0, g: 255, b: 255 }, // Cyan
      { r: 255, g: 0, b: 255 }, // Magenta
      { r: 0, g: 255, b: 127 }, // Spring Green
      { r: 255, g: 0, b: 127 }, // Rose
      { r: 0, g: 127, b: 255 }, // Dodger Blue
      { r: 255, g: 127, b: 0 }, // Orange
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance =
        Math.random() * Math.max(canvas.width, canvas.height) * 1.5;
      const depth = Math.random() * 200 - 100;

      const startX = centerX + Math.cos(angle) * distance;
      const startY = centerY + Math.sin(angle) * distance;

      // Target positions form a complex 3D snowflake pattern
      const snowflakeAngle = (i / particleCount) * Math.PI * 2;
      const armIndex = Math.floor((i / particleCount) * 6);
      const armAngle = (armIndex / 6) * Math.PI * 2;
      const radius = 100 + Math.sin(i * 0.05) * 60;
      const depthVariation = Math.cos(i * 0.02) * 50;

      const color = neonColors[i % neonColors.length];
      const colorStr = `rgb(${color.r}, ${color.g}, ${color.b})`;

      particles.push({
        x: startX,
        y: startY,
        z: depth,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        vz: (Math.random() - 0.5) * 4,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        targetX: centerX + Math.cos(armAngle) * radius,
        targetY: centerY + Math.sin(armAngle) * radius,
        targetZ: depthVariation,
        color: colorStr,
        hue: (i / particleCount) * 360,
      });
    }

    particlesRef.current = particles;
    setPhase("particles");

    // Allow skip after 1.5 seconds
    const skipTimer = setTimeout(() => setCanSkip(true), 1500);

    return () => clearTimeout(skipTimer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (phase === "done") return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / 4, 1); // 4 second animation

      // Draw quantum background
      drawQuantumBackground(ctx, canvas.width, canvas.height, elapsed);

      // Draw scanlines
      drawScanlines(ctx, canvas.width, canvas.height, elapsed);

      // Update and draw particles
      const particles = particlesRef.current;
      particles.forEach((particle, index) => {
        // Easing function for smooth convergence
        const easeProgress = easeOutCubic(progress);

        // Interpolate towards target position
        particle.x += (particle.targetX - particle.x) * easeProgress * 0.08;
        particle.y += (particle.targetY - particle.y) * easeProgress * 0.08;
        particle.z += (particle.targetZ - particle.z) * easeProgress * 0.08;

        // Add quantum oscillation
        const oscillation = Math.sin(elapsed * 3 + index * 0.1) * 2;
        particle.x += oscillation;
        particle.y += oscillation * 0.5;

        // Color shifting based on time
        const hueShift = (elapsed * 60 + particle.hue) % 360;
        const rgbColor = hslToRgb(hueShift, 100, 50);

        // Calculate depth-based opacity and size
        const depthFactor = Math.max(0.3, 1 - Math.abs(particle.z) / 200);
        const finalOpacity =
          particle.opacity * depthFactor * (1 - progress * 0.2);
        const finalSize = particle.size * depthFactor;

        // Draw particle with glow effect
        ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalOpacity})`;
        ctx.shadowBlur = 20 + Math.sin(elapsed * 2) * 10;
        ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle trail
        ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalOpacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
        ctx.stroke();
      });

      // Draw electromagnetic waves
      drawElectromagneticWaves(
        ctx,
        canvas.width,
        canvas.height,
        elapsed,
        progress
      );

      // Draw central holographic logo
      drawHolographicLogo(ctx, canvas.width, canvas.height, elapsed, progress);

      // Phase transitions
      if (progress > 0.6 && phase === "particles") {
        setPhase("logo");
      }

      if (progress >= 1) {
        setPhase("done");
        setTimeout(onComplete, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [phase, onComplete]);

  const drawQuantumBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number
  ) => {
    // Create quantum gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const hue1 = (elapsed * 20) % 360;
    const hue2 = (elapsed * 20 + 180) % 360;

    gradient.addColorStop(0, `hsl(${hue1}, 100%, 5%)`);
    gradient.addColorStop(0.5, `hsl(${hue2}, 100%, 10%)`);
    gradient.addColorStop(1, `hsl(${hue1 + 120}, 100%, 5%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add radial quantum field
    const radialGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height)
    );
    radialGradient.addColorStop(0, `hsla(${hue1}, 100%, 30%, 0.2)`);
    radialGradient.addColorStop(1, `hsla(${hue1}, 100%, 30%, 0)`);

    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, width, height);
  };

  const drawScanlines = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number
  ) => {
    const lineHeight = 2;
    const offset = (elapsed * 100) % lineHeight;

    ctx.strokeStyle = "rgba(0, 255, 255, 0.03)";
    ctx.lineWidth = 1;

    for (let y = -offset; y < height; y += lineHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Horizontal scanlines
    ctx.strokeStyle = "rgba(255, 0, 255, 0.02)";
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  };

  const drawElectromagneticWaves = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxWaves = 5;

    for (let i = 0; i < maxWaves; i++) {
      const waveProgress = (progress * 2 - i * 0.3) % 1;
      if (waveProgress < 0) continue;

      const radius = waveProgress * Math.max(width, height);
      const opacity = (1 - waveProgress) * 0.4;
      const hue = (elapsed * 60 + i * 72) % 360;

      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawHolographicLogo = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw rotating hexagon (snowflake base)
    const rotation = (elapsed * 0.5) % (Math.PI * 2);
    const scale = Math.sin(progress * Math.PI) * 0.5 + 0.5;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    // Draw hexagon
    const hexSize = 80;
    ctx.strokeStyle = `hsla(${(elapsed * 60) % 360}, 100%, 50%, ${0.5 + progress * 0.5})`;
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * hexSize;
      const y = Math.sin(angle) * hexSize;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Draw inner rotating elements
    ctx.strokeStyle = `hsla(${(elapsed * 60 + 120) % 360}, 100%, 50%, ${0.3 + progress * 0.3})`;
    ctx.lineWidth = 1;
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const innerSize = hexSize * (0.6 - j * 0.15);
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + rotation * (j + 1);
        const x = Math.cos(angle) * innerSize;
        const y = Math.sin(angle) * innerSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  };

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  const handleSkip = () => {
    setPhase("done");
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Quantum text overlay */}
          {phase === "logo" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-center"
                animate={{
                  scale: [0.5, 1.2, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                  ISC
                </h1>
                <p className="text-2xl text-cyan-300/80 font-light tracking-widest">
                  QUANTUM ICE
                </p>
                <p className="text-sm text-purple-300/60 mt-4 tracking-widest">
                  AI CHAIN GAMING ECOSYSTEM
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          {canSkip && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 px-6 py-2 border border-cyan-400/50 text-cyan-300 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              SKIP
            </motion.button>
          )}

          {/* Loading indicator */}
          <div className="absolute bottom-8 left-8 text-cyan-300/50 text-xs font-mono">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              INITIALIZING QUANTUM SYSTEM...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
