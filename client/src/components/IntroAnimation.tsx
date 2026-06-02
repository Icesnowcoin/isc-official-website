/*
 * Design: Quantum Ice — Opening animation
 * Particles converge from all directions to form the ISC snowflake logo
 * Then logo materializes and fades into the main page
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/assets";

interface IntroAnimationProps {
  onComplete: () => void;
}

interface AnimParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  size: number;
  delay: number;
  opacity: number;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"particles" | "logo" | "done">(
    "particles"
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<AnimParticle[]>([]);
  const startTimeRef = useRef(0);
  const animRef = useRef<number>(0);

  const generateParticles = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const particles: AnimParticle[] = [];
    const count = 200;

    // Generate target positions in a snowflake pattern
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const armIndex = i % 6;
      const armAngle = (armIndex / 6) * Math.PI * 2;
      const r = 30 + Math.random() * 100;
      const spread = (Math.random() - 0.5) * 0.4;

      const targetX = cx + Math.cos(armAngle + spread) * r;
      const targetY = cy + Math.sin(armAngle + spread) * r;

      // Start from random edges
      const edge = Math.random();
      let startX: number, startY: number;
      if (edge < 0.25) {
        startX = Math.random() * w;
        startY = -50;
      } else if (edge < 0.5) {
        startX = w + 50;
        startY = Math.random() * h;
      } else if (edge < 0.75) {
        startX = Math.random() * w;
        startY = h + 50;
      } else {
        startX = -50;
        startY = Math.random() * h;
      }

      particles.push({
        x: startX,
        y: startY,
        targetX,
        targetY,
        startX,
        startY,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 0.3,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = generateParticles(canvas.width, canvas.height);
    startTimeRef.current = performance.now();

    const CONVERGE_DURATION = 2000; // ms
    const HOLD_DURATION = 500;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / CONVERGE_DURATION, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Easing function
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      particlesRef.current.forEach(p => {
        const pProgress = Math.max(
          0,
          Math.min((progress - p.delay) / (1 - p.delay), 1)
        );
        const eased = ease(pProgress);

        p.x = p.startX + (p.targetX - p.startX) * eased;
        p.y = p.startY + (p.targetY - p.startY) * eased;

        // Draw
        const alpha = p.opacity * (0.3 + eased * 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 201, 246, ${alpha})`;
        ctx.fill();

        // Trail
        if (pProgress < 0.9) {
          const trailX =
            p.startX +
            (p.targetX - p.startX) * ease(Math.max(0, pProgress - 0.1));
          const trailY =
            p.startY +
            (p.targetY - p.startY) * ease(Math.max(0, pProgress - 0.1));
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(77, 201, 246, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Glow at target
        if (pProgress > 0.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(77, 201, 246, ${(pProgress - 0.8) * 0.5 * 0.15})`;
          ctx.fill();
        }
      });

      // Draw connections near end
      if (progress > 0.7) {
        const connAlpha = ((progress - 0.7) / 0.3) * 0.2;
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 3; j < particles.length; j += 3) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[j].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(77, 201, 246, ${connAlpha * (1 - dist / 60)})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        }
      }

      if (elapsed < CONVERGE_DURATION + HOLD_DURATION) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("logo");
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [generateParticles]);

  useEffect(() => {
    if (phase === "logo") {
      const timer = setTimeout(() => setPhase("done"), 1800);
      return () => clearTimeout(timer);
    }
    if (phase === "done") {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[oklch(0.08_0.02_250)] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{
              opacity: phase === "particles" ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />

          {/* Logo reveal */}
          <AnimatePresence>
            {phase === "logo" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.img
                  src={ASSETS.logo}
                  alt="ISC"
                  className="w-28 h-28 sm:w-36 sm:h-36"
                  initial={{ filter: "brightness(2) blur(10px)" }}
                  animate={{ filter: "brightness(1) blur(0px)" }}
                  transition={{ duration: 0.8 }}
                />
                <motion.h1
                  className="mt-4 text-2xl sm:text-3xl font-bold tracking-[0.2em] text-glow"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.85 0.08 220)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  ICE SNOW COIN
                </motion.h1>
                <motion.div
                  className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-ice-blue to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          <button
            onClick={() => {
              setPhase("done");
            }}
            className="absolute bottom-8 right-8 text-xs text-[oklch(0.50_0.02_220)] hover:text-[oklch(0.70_0.05_220)] transition-colors"
            style={{ fontFamily: "var(--font-sub)" }}
          >
            SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
