/**
 * ISC Logo Intro Animation - Cyberpunk Ice Snow Theme
 * Features:
 * - Futuristic cyberpunk city skyline background
 * - ISC Logo gradually appearing from above with glow effects
 * - Multiple silhouettes of people looking up at the logo
 * - Ice/snow blue color scheme with neon accents
 * - Particle effects and light beams
 * - 5-6 second total animation duration
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Silhouette {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

interface ISCLogoIntroAnimationProps {
  onComplete: () => void;
}

export default function ISCLogoIntroAnimation({
  onComplete,
}: ISCLogoIntroAnimationProps) {
  const [phase, setPhase] = useState<"init" | "reveal" | "done">("init");
  const [canSkip, setCanSkip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const silhouettesRef = useRef<Silhouette[]>([]);
  const windowStatesRef = useRef<Map<string, boolean>>(new Map());

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Initialize canvas and silhouettes
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

    // Generate silhouettes
    const silhouettes: Silhouette[] = [];
    const silhouetteCount = 15;
    const groundY = canvas.height * 0.75;

    for (let i = 0; i < silhouetteCount; i++) {
      silhouettes.push({
        x: (i / silhouetteCount) * canvas.width + Math.random() * 40 - 20,
        y: groundY + Math.random() * 30,
        scale: 0.8 + Math.random() * 0.4,
        opacity: 0,
      });
    }

    silhouettesRef.current = silhouettes;
    setPhase("reveal");

    const skipTimer = setTimeout(() => setCanSkip(true), 2000);
    return () => {
      if (skipTimer) clearTimeout(skipTimer);
    };
  }, [prefersReducedMotion, onComplete]);

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
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
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
      const progress = Math.min(elapsed / 5.5, 1); // 5.5 second total animation

      // Clear canvas
      ctx.fillStyle = "#0a0e27";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cyberpunk city background
      drawCyberpunkCity(ctx, canvas.width, canvas.height, elapsed, progress);

      // Draw silhouettes
      drawSilhouettes(ctx, canvas.width, canvas.height, progress);

      // Draw light beams
      drawLightBeams(ctx, canvas.width, canvas.height, elapsed, progress);

      // Draw ISC Logo
      drawISCLogo(ctx, canvas.width, canvas.height, elapsed, progress);

      // Phase transitions
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
  }, [phase, prefersReducedMotion, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      windowStatesRef.current.clear();
    };
  }, []);

  const drawCyberpunkCity = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    // Gradient sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, "#0a0e27");
    skyGradient.addColorStop(0.4, "#0d1b3d");
    skyGradient.addColorStop(1, "#1a2a4a");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // City skyline
    const buildingCount = 12;
    const groundY = height * 0.75;

    for (let i = 0; i < buildingCount; i++) {
      const x = (i / buildingCount) * width;
      const buildingWidth = width / buildingCount;
      const baseHeight = height * (0.2 + Math.sin(i * 0.5) * 0.15);
      const buildingHeight = baseHeight + Math.sin(elapsed * 0.5 + i) * 20;

      // Building silhouette
      ctx.fillStyle = "rgba(10, 14, 39, 0.9)";
      ctx.fillRect(x, groundY - buildingHeight, buildingWidth, buildingHeight);

      // Building outline
      ctx.strokeStyle = "rgba(0, 200, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(
        x,
        groundY - buildingHeight,
        buildingWidth,
        buildingHeight
      );

      // Windows with lights (pre-generated to avoid flicker)
      const windowSize = 8;
      const windowSpacing = 12;
      for (let wx = 0; wx < buildingWidth; wx += windowSpacing) {
        for (let wy = 0; wy < buildingHeight; wy += windowSpacing) {
          const windowX = x + wx;
          const windowY = groundY - buildingHeight + wy;
          const windowKey = `${i}-${Math.floor(wx)}-${Math.floor(wy)}`;

          // Pre-generate window states to avoid flicker
          if (!windowStatesRef.current.has(windowKey)) {
            windowStatesRef.current.set(windowKey, Math.random() > 0.5);
          }

          if (windowStatesRef.current.get(windowKey)) {
            ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(elapsed * 2 + i + wx) * 0.3})`;
            ctx.fillRect(windowX, windowY, windowSize, windowSize);
          }
        }
      }
    }

    // Ground line
    ctx.strokeStyle = "rgba(0, 200, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(width, groundY);
    ctx.stroke();

    // Neon glow on ground
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(width, groundY);
    ctx.stroke();
  };

  const drawSilhouettes = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    const silhouettes = silhouettesRef.current;
    const groundY = height * 0.75;

    silhouettes.forEach(silhouette => {
      // Fade in silhouettes
      silhouette.opacity = Math.min(progress * 1.5, 1) * 0.7;

      // Draw silhouette (simple human shape)
      ctx.save();
      ctx.translate(silhouette.x, silhouette.y);
      ctx.scale(silhouette.scale, silhouette.scale);
      ctx.fillStyle = `rgba(0, 100, 150, ${silhouette.opacity})`;

      // Head
      ctx.beginPath();
      ctx.arc(0, -25, 8, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillRect(-6, -15, 12, 20);

      // Arms
      ctx.fillRect(-15, -10, 30, 4);

      // Legs
      ctx.fillRect(-4, 5, 4, 12);
      ctx.fillRect(2, 5, 4, 12);

      ctx.restore();
    });
  };

  const drawLightBeams = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height * 0.3;
    const beamOpacity = Math.sin(progress * Math.PI) * 0.2;

    // Vertical light beam
    const beamGradient = ctx.createLinearGradient(
      centerX - 100,
      0,
      centerX + 100,
      0
    );
    beamGradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
    beamGradient.addColorStop(0.5, `rgba(0, 255, 255, ${beamOpacity})`);
    beamGradient.addColorStop(1, `rgba(0, 255, 255, 0)`);

    ctx.fillStyle = beamGradient;
    ctx.fillRect(centerX - 100, 0, 200, centerY + 200);

    // Horizontal light rays
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const rayLength = 300;

      ctx.strokeStyle = `rgba(0, 200, 255, ${beamOpacity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * rayLength,
        centerY + Math.sin(angle) * rayLength
      );
      ctx.stroke();
    }
  };

  const drawISCLogo = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    progress: number
  ) => {
    const centerX = width / 2;
    const centerY = height * 0.3;

    // Logo appears from top
    const logoProgress = Math.min(progress * 1.2, 1);
    const logoScale = logoProgress;
    const logoOpacity = Math.min(progress * 2, 1);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(logoScale, logoScale);
    ctx.globalAlpha = logoOpacity;

    // Outer glow
    ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
    ctx.shadowBlur = 40 + Math.sin(elapsed * 2) * 10;

    // Draw ISC text as logo
    ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ISC", 0, 0);

    // Outline
    ctx.strokeStyle = "rgba(0, 200, 255, 0.6)";
    ctx.lineWidth = 3;
    ctx.strokeText("ISC", 0, 0);

    // Rotating hexagon around logo
    const rotation = (elapsed * 0.3) % (Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 200, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + rotation;
      const x = Math.cos(angle) * 150;
      const y = Math.sin(angle) * 150;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Particles around logo
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 200 + Math.sin(elapsed * 2 + i) * 30;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(elapsed * 3 + i) * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const handleSkip = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    windowStatesRef.current.clear();
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

          {/* Skip button */}
          {canSkip && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 px-6 py-2 border border-cyan-400/50 text-cyan-300 rounded-sm hover:bg-cyan-400/10 transition-colors text-sm font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
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
              &gt; INITIALIZING ISC NETWORK...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
