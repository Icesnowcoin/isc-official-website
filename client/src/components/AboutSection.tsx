/*
 * Design: Quantum Ice — About section with three feature cards
 * Animated on scroll, glass morphism cards
 */
import { motion } from "framer-motion";
import { CreditCard, Gamepad2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS } from "@/lib/assets";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: t("about.feature1.title"),
      desc: t("about.feature1.desc"),
      video: ASSETS.networkVideo,
    },
    {
      icon: <Gamepad2 className="w-7 h-7" />,
      title: t("about.feature2.title"),
      desc: t("about.feature2.desc"),
      video: ASSETS.aiConceptVideo,
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: t("about.feature3.title"),
      desc: t("about.feature3.desc"),
      video: ASSETS.cityVideo,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-glow"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.92 0.03 220)",
            }}
          >
            {t("about.title")}
          </h2>
          <p
            className="mt-3 text-base sm:text-lg"
            style={{
              fontFamily: "var(--font-sub)",
              color: "oklch(0.65 0.08 220)",
            }}
          >
            {t("about.subtitle")}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.div
          {...fadeInUp}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p
            className="text-sm sm:text-base leading-relaxed mb-4"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.70 0.02 220)",
            }}
          >
            {t("about.desc1")}
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.60 0.02 220)",
            }}
          >
            {t("about.desc2")}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group glass-card rounded-xl overflow-hidden border-glow-hover transition-all duration-500"
            >
              {/* Video Preview */}
              <div className="relative h-44 overflow-hidden">
                <video
                  src={feature.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.02_250)] to-transparent" />
                <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-[oklch(0.10_0.02_250/0.7)] backdrop-blur-sm text-ice-blue">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.90 0.04 220)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "oklch(0.60 0.02 220)",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
