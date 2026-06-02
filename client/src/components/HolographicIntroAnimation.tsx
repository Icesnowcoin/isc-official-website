/**
 * Holographic Intro Animation - ISC Cyberpunk Aesthetic
 * Premium fullscreen opening animation inspired by reference videos
 * Features:
 * - Holographic neon glow effects (cyan/blue)
 * - Central rotating snowflake energy source
 * - Particle convergence and light beams
 * - Data visualization elements
 * - Cyberpunk atmosphere with depth
 * - Smooth 3D-like transitions
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetX: number;
  targetY: number;
  life: number;
  maxLife: number;
}

interface HolographicIntroAnimationProps {
  onComplete: () => void;
}

export default function HolographicIntroAnimation({
  onComplete,
}: HolographicIntroAnimationProps) {
  const [phase, setPhase] = useState<"init" | "converge" | "hologram" | "done">(
    "init"
  );
  const [canSkip, setCanSkip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion) {
      setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 300);
      }, 500);
      return;
    }

    // Initialize particles
    const particles: Particle[] = [];
    const particleCount = 800;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * Math.max(canvas.width, canvas.height);
      const startX = centerX + Math.cos(angle) * distance;
      const startY = centerY + Math.sin(angle) * distance;

      // Target: converge to center in snowflake pattern
      const snowflakeAngle = (i / particleCount) * Math.PI * 2;
      const armIndex = Math.floor((i / particleCount) * 6);
      const armAngle = (armIndex / 6) * Math.PI * 2;
      const radius = 120;

      particles.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        targetX: centerX + Math.cos(armAngle) * radius,
        targetY: centerY + Math.sin(armAngle) * radius,
        life: 0,
        maxLife: 1,
      });
    }

    particlesRef.current = particles;
    setPhase("converge");

    const skipTimer = setTimeout(
      () => setCanSkip(true),
      prefersReducedMotion ? 100 : 2000
    );
    return () => {
      if (skipTimer) clearTimeout(skipTimer);
    };
  }, [prefersReducedMotion]);

  // Handle resize
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

  // Handle page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animation when tab is hidden
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Animation loop
  useEffect(() => {
    if (phase === "done" || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / 6, 1); // 6 second total animation

      // Draw background
      drawHolographicBackground(ctx, canvas.width, canvas.height, elapsed);

      // Draw light beams
      drawLightBeams(ctx, canvas.width, canvas.height, elapsed, progress);

      // Update and draw particles
      const particles = particlesRef.current;
      particles.forEach(particle => {
        // Smooth convergence
        const easeProgress = easeOutQuart(Math.min(progress * 1.2, 1));
        particle.x += (particle.targetX - particle.x) * easeProgress * 0.1;
        particle.y += (particle.targetY - particle.y) * easeProgress * 0.1;

        // Glow effect
        const glowSize = particle.size * (1 + Math.sin(elapsed * 3) * 0.3);
        const finalOpacity = particle.opacity * (1 - progress * 0.3);

        // Draw particle with glow
        ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
        ctx.shadowBlur = 15 + Math.sin(elapsed * 2) * 5;
        ctx.fillStyle = `rgba(0, 255, 255, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central hologram
      drawCentralHologram(ctx, canvas.width, canvas.height, elapsed, progress);

      // Draw data visualization
      if (progress > 0.4) {
        drawDataVisualization(
          ctx,
          canvas.width,
          canvas.height,
          elapsed,
          progress
        );
      }

      // Phase transitions
      if (progress > 0.5 && phase === "converge") {
        setPhase("hologram");
      }

      if (progress >= 1) {
        setPhase("done");
        setTimeout(onComplete, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, onComplete, prefersReducedMotion]);

  const drawHolographicBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number
  ) => {
    // Deep dark background
    ctx.fillStyle = "#0a0e27";
    ctx.fillRect(0, 0, width, height);

    // Radial gradient glow
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.8
    );
    gradient.addColorStop(0, "rgba(0, 200, 255, 0.1)");
    gradient.addColorStop(0.5, "rgba(0, 100, 200, 0.05)");
    gradient.addColorStop(1, "rgba(0, 50, 100, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid overlay
    ctx.strokeStyle = "rgba(0, 150, 200, 0.05)";
    ctx.lineWidth = 1;
    const gridSize = 100;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawLightBeams = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Vertical light beam
    const beamOpacity = Math.sin(progress * Math.PI) * 0.3;
    const beamGradient = ctx.createLinearGradient(
      centerX - 50,
      0,
      centerX + 50,
      0
    );
    beamGradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
    beamGradient.addColorStop(0.5, `rgba(0, 255, 255, ${beamOpacity})`);
    beamGradient.addColorStop(1, `rgba(0, 255, 255, 0)`);

    ctx.fillStyle = beamGradient;
    ctx.fillRect(centerX - 50, centerY - height / 2, 100, height);

    // Horizontal light beam
    const beamGradient2 = ctx.createLinearGradient(
      0,
      centerY - 50,
      0,
      centerY + 50
    );
    beamGradient2.addColorStop(0, `rgba(0, 200, 255, 0)`);
    beamGradient2.addColorStop(0.5, `rgba(0, 200, 255, ${beamOpacity * 0.7})`);
    beamGradient2.addColorStop(1, `rgba(0, 200, 255, 0)`);

    ctx.fillStyle = beamGradient2;
    ctx.fillRect(centerX - width / 2, centerY - 50, width, 100);
  };

  const drawCentralHologram = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const rotation = (elapsed * 0.3) % (Math.PI * 2);
    const scale = Math.sin(progress * Math.PI) * 0.5 + 0.5;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    // Draw hexagon snowflake
    const hexSize = 100;
    ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(0, 255, 255, 0.6)";
    ctx.shadowBlur = 30;

    // Outer hexagon
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

    // Inner rotating hexagons
    for (let j = 0; j < 3; j++) {
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.6 - j * 0.15})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const innerSize = hexSize * (0.6 - j * 0.15);
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - rotation * (j + 1);
        const x = Math.cos(angle) * innerSize;
        const y = Math.sin(angle) * innerSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Center circle with "S" letter
    ctx.fillStyle = "rgba(0, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  };

  const drawDataVisualization = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const opacity = Math.min((progress - 0.4) * 2, 1) * 0.4;

    // Draw circular data panels
    const panelRadius = 250;
    const panelCount = 4;

    for (let i = 0; i < panelCount; i++) {
      const angle = (i / panelCount) * Math.PI * 2 + elapsed * 0.2;
      const x = centerX + Math.cos(angle) * panelRadius;
      const y = centerY + Math.sin(angle) * panelRadius;

      // Draw panel
      ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 60, y - 40, 120, 80);

      // Draw bar chart inside
      for (let j = 0; j < 4; j++) {
        const barHeight = (Math.sin(elapsed * 2 + i + j) + 1) * 20 + 10;
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.6})`;
        ctx.fillRect(x - 40 + j * 25, y + 20 - barHeight, 15, barHeight);
      }
    }
  };

  // Adaptive particle count based on device capability
  const getParticleCount = (): number => {
    if (prefersReducedMotion) return 200;
    // Check device pixel ratio for high-DPI screens
    if (window.devicePixelRatio > 2) return 600;
    return 800;
  };

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const handleSkip = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
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

          {/* Text overlay */}
          {phase === "hologram" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-center"
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h1 className="text-8xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text drop-shadow-2xl mb-2">
                  ISC
                </h1>
                <p className="text-xl text-cyan-300/90 font-light tracking-widest">
                  QUANTUM CHAIN GAMING
                </p>
                <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          {canSkip && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 px-6 py-2 border border-cyan-400/50 text-cyan-300 rounded-sm hover:bg-cyan-400/10 transition-colors text-sm font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              [ SKIP ]
            </motion.button>
          )}

          {/* Status indicator */}
          <div className="absolute bottom-8 left-8 text-cyan-400/60 text-xs font-mono tracking-widest">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &gt; INITIALIZING HOLOGRAPHIC SYSTEM...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
