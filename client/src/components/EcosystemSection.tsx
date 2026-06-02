/*
 * Design: Quantum Ice — Ecosystem section
 * Three interconnected ecosystem pillars with background image
 */
import { motion } from "framer-motion";
import { Coins, Gamepad2, Building2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS, LINKS } from "@/lib/assets";

export default function EcosystemSection() {
  const { t } = useLanguage();

  const ecosystems = [
    {
      icon: <Coins className="w-8 h-8" />,
      title: t("ecosystem.defi.title"),
      desc: t("ecosystem.defi.desc"),
      gradient: "from-[oklch(0.55_0.18_255/0.2)] to-transparent",
      borderColor: "oklch(0.55 0.18 255 / 0.3)",
      iconColor: "oklch(0.65 0.18 255)",
      link: LINKS.pancakeswap,
      linkLabel: "PancakeSwap",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: t("ecosystem.gamefi.title"),
      desc: t("ecosystem.gamefi.desc"),
      gradient: "from-[oklch(0.75_0.12_220/0.2)] to-transparent",
      borderColor: "oklch(0.75 0.12 220 / 0.3)",
      iconColor: "oklch(0.75 0.12 220)",
      link: LINKS.game,
      linkLabel: "ISC Game",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t("ecosystem.real.title"),
      desc: t("ecosystem.real.desc"),
      gradient: "from-[oklch(0.82_0.16_195/0.2)] to-transparent",
      borderColor: "oklch(0.82 0.16 195 / 0.3)",
      iconColor: "oklch(0.82 0.16 195)",
      link: "https://docs.icesnowcoin.com/real-world",
      linkLabel: "Learn More",
    },
  ];

  return (
    <section id="ecosystem" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.ecosystemBg}
          alt=""
          className="w-full h-full object-cover opacity-12"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.10_0.02_250/0.85)] to-background" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-glow"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.92 0.03 220)",
            }}
          >
            {t("ecosystem.title")}
          </h2>
          <p
            className="mt-3 text-base sm:text-lg"
            style={{
              fontFamily: "var(--font-sub)",
              color: "oklch(0.65 0.08 220)",
            }}
          >
            {t("ecosystem.subtitle")}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Ecosystem Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ecosystems.map((eco, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl p-6 sm:p-8 h-full border transition-all duration-500 hover:translate-y-[-4px]"
                style={{
                  background: `linear-gradient(135deg, oklch(0.14 0.02 250 / 0.8), oklch(0.12 0.02 250 / 0.6))`,
                  borderColor: eco.borderColor,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${eco.gradient}`}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `color-mix(in oklch, ${eco.iconColor}, transparent 88%)`,
                    color: eco.iconColor,
                  }}
                >
                  {eco.icon}
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.90 0.04 220)",
                  }}
                >
                  {eco.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "oklch(0.60 0.02 220)",
                  }}
                >
                  {eco.desc}
                </p>

                {/* Link */}
                <a
                  href={eco.link}
                  target={eco.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    eco.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-sub)",
                    color: eco.iconColor,
                  }}
                  onClick={e => {
                    if (eco.link === "#") {
                      e.preventDefault();
                    }
                  }}
                >
                  {eco.linkLabel}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
