/*
 * Design: Quantum Ice — Hero section with presale countdown
 * Full viewport, background image with overlay, key stats
 */
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS, LINKS } from "@/lib/assets";

export default function HeroSection() {
  const { t } = useLanguage();

  const stats = [
    { label: t("hero.totalSupply"), value: "202,600,000", unit: "ISC" },
    { label: t("hero.chain"), value: "BSC", unit: "BEP-20" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.02_250/0.3)] via-transparent to-[oklch(0.10_0.02_250)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.02_250/0.6)] to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.08)] mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-ice-blue" />
            <span
              className="text-xs font-medium text-ice-blue"
              style={{ fontFamily: "var(--font-sub)" }}
            >
              {t("hero.liveOnBsc")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-glow"
              style={{
                fontFamily: "var(--font-heading)",
                color: "oklch(0.95 0.02 220)",
              }}
            >
              ICE SNOW COIN
            </h1>
            <p
              className="mt-3 text-lg sm:text-xl lg:text-2xl font-light"
              style={{
                fontFamily: "var(--font-sub)",
                color: "oklch(0.75 0.08 220)",
              }}
            >
              {t("hero.subtitle")}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.08)]">
              <span
                className="text-xs font-medium text-ice-blue"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                ✓ Fully Decentralized • No Admin Privileges • Community Governed
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.65 0.02 220)",
            }}
          >
            {t("hero.description")}
          </motion.p>

          {/* Whitepaper 3.0 Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
          >
            <div className="p-3 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]">
              <div
                className="text-xs font-semibold text-ice-blue mb-1"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                Contract Ownership
              </div>
              <div
                className="text-sm font-bold text-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Permanently Released
              </div>
            </div>
            <div className="p-3 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]">
              <div
                className="text-xs font-semibold text-ice-blue mb-1"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                Liquidity Lock
              </div>
              <div
                className="text-sm font-bold text-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                40% Locked (1-4 Years)
              </div>
            </div>
            <div className="p-3 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]">
              <div
                className="text-xs font-semibold text-ice-blue mb-1"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                Ecosystem
              </div>
              <div
                className="text-sm font-bold text-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                NFT + GameFi
              </div>
            </div>
          </motion.div>



          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={LINKS.pancakeswap}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ice-blue text-[oklch(0.10_0.02_250)] font-semibold text-sm hover:bg-electric-cyan transition-all duration-300 border-glow"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <Zap className="w-4 h-4" />
              {t("hero.tradeNow")}
            </a>
            <a
              href="#about"
              onClick={e => {
                e.preventDefault();
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[oklch(0.75_0.12_220/0.3)] text-ice-blue font-medium text-sm hover:bg-[oklch(0.75_0.12_220/0.1)] transition-all duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("hero.learnMore")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://icesnowcoin.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[oklch(0.75_0.12_220/0.3)] text-ice-blue font-medium text-sm hover:bg-[oklch(0.75_0.12_220/0.1)] transition-all duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Whitepaper v3.0
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div
                  className="text-xs text-muted-foreground mb-1"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-sm sm:text-base font-bold text-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs text-ice-blue"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {stat.unit}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
