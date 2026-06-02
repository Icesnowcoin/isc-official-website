/**
 * Premium Intro Animation - ISC Quantum Ice
 * Features:
 * - 3D particle system with physics
 * - Glowing snowflake logo formation
 * - Aurora borealis background effect
 * - Smooth transitions and skip functionality
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
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
}

interface PremiumIntroAnimationProps {
  onComplete: () => void;
}

export default function PremiumIntroAnimation({
  onComplete,
}: PremiumIntroAnimationProps) {
  const [phase, setPhase] = useState<"particles" | "logo" | "done">(
    "particles"
  );
  const [canSkip, setCanSkip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate particles
    const particles: Particle[] = [];
    const particleCount = 300;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Color palette - icy blues and cyans
    const colors = [
      "rgba(100, 200, 255, ",
      "rgba(150, 220, 255, ",
      "rgba(200, 240, 255, ",
      "rgba(100, 180, 255, ",
      "rgba(50, 150, 255, ",
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * Math.max(canvas.width, canvas.height);
      const startX = centerX + Math.cos(angle) * distance;
      const startY = centerY + Math.sin(angle) * distance;

      // Target positions form a snowflake pattern
      const snowflakeAngle = (i / particleCount) * Math.PI * 2;
      const armIndex = Math.floor((i / particleCount) * 6);
      const armAngle = (armIndex / 6) * Math.PI * 2;
      const radius = 80 + Math.sin(i * 0.1) * 40;

      particles.push({
        x: startX,
        y: startY,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        targetX: centerX + Math.cos(armAngle) * radius,
        targetY: centerY + Math.sin(armAngle) * radius,
        targetZ: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    particlesRef.current = particles;

    // Allow skip after 1 second
    const skipTimer = setTimeout(() => setCanSkip(true), 1000);

    return () => clearTimeout(skipTimer);
  }, []);

  // Animation loop
  useEffect(() => {
    if (phase === "done") return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion()) {
      setPhase("done");
      setTimeout(onComplete, 300);
      return;
    }

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / 3, 1); // 3 second animation

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(5, 15, 40, 1)");
      gradient.addColorStop(0.5, "rgba(10, 25, 60, 1)");
      gradient.addColorStop(1, "rgba(5, 15, 40, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aurora effect
      drawAurora(ctx, canvas.width, canvas.height, elapsed);

      // Update and draw particles
      const particles = particlesRef.current;
      particles.forEach(particle => {
        // Interpolate towards target position
        const easeProgress = easeInOutCubic(progress);
        particle.x += (particle.targetX - particle.x) * easeProgress * 0.05;
        particle.y += (particle.targetY - particle.y) * easeProgress * 0.05;
        particle.z += (particle.targetZ - particle.z) * easeProgress * 0.05;

        // Add slight floating motion
        particle.x += Math.sin(elapsed * 2 + particle.size) * 0.5;
        particle.y += Math.cos(elapsed * 1.5 + particle.size) * 0.5;

        // Calculate opacity based on z depth
        const depthOpacity = Math.max(0.2, 1 - Math.abs(particle.z - 50) / 100);
        const finalOpacity =
          particle.opacity * depthOpacity * (1 - progress * 0.3);

        // Draw particle with glow
        ctx.shadowColor = `${particle.color}${finalOpacity})`;
        ctx.shadowBlur = 15;
        ctx.fillStyle = `${particle.color}${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw center glow
      const glowSize = 150 + Math.sin(elapsed * 2) * 30;
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        glowSize
      );
      glowGradient.addColorStop(0, "rgba(100, 200, 255, 0.3)");
      glowGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.1)");
      glowGradient.addColorStop(1, "rgba(100, 200, 255, 0)");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(
        canvas.width / 2 - glowSize,
        canvas.height / 2 - glowSize,
        glowSize * 2,
        glowSize * 2
      );

      // Phase transitions
      if (progress > 0.7 && phase === "particles") {
        setPhase("logo");
      }

      if (progress >= 1) {
        setPhase("done");
        setTimeout(onComplete, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [phase, onComplete]);

  // Pause animation when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const drawAurora = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number
  ) => {
    const auroraGradient = ctx.createLinearGradient(0, 0, width, height);
    const hue1 = (elapsed * 30) % 360;
    const hue2 = (elapsed * 30 + 120) % 360;

    auroraGradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0.1)`);
    auroraGradient.addColorStop(0.5, `hsla(${hue2}, 100%, 50%, 0.15)`);
    auroraGradient.addColorStop(1, `hsla(${hue1 + 60}, 100%, 50%, 0.1)`);

    ctx.fillStyle = auroraGradient;
    ctx.fillRect(0, 0, width, height);
  };

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

          {/* Logo text animation */}
          {phase === "logo" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center"
                animate={{
                  scale: [0.8, 1.1, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  ISC
                </h1>
                <p className="text-xl text-cyan-300/80">Ice Snow Coin</p>
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          {canSkip && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 px-6 py-2 border border-cyan-400/50 text-cyan-300 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Skip
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
