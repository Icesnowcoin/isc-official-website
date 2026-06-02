/**
 * How to Buy ISC Section
 * Displays a 3-step guide to purchasing ISC tokens
 */

import { motion } from "framer-motion";
import { Wallet, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CONTRACT_ADDRESS = "0x11229a3f976566FA8a3ba462C432122f3B8876f6";
const PANCAKESWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${CONTRACT_ADDRESS}`;

export default function HowToBuySection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: t("howToBuy.step1.title"),
      description: t("howToBuy.step1.desc"),
      hint: t("howToBuy.step1.hint"),
    },
    {
      number: "02",
      icon: ArrowRightLeft,
      title: t("howToBuy.step2.title"),
      description: t("howToBuy.step2.desc"),
      button: {
        text: t("howToBuy.step2.button"),
        link: PANCAKESWAP_URL,
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t("howToBuy.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("howToBuy.subtitle")}
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                )}

                {/* Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-colors duration-300">
                    {/* Number */}
                    <div className="text-5xl font-bold text-cyan-400 mb-6 font-mono">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 p-4 bg-cyan-500/10 rounded-xl w-fit">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>

                    {/* Hint */}
                    {step.hint && (
                      <p className="text-xs text-cyan-400/70 mb-4">
                        💡 {step.hint}
                      </p>
                    )}

                    {/* Button */}
                    {step.button && (
                      <Button
                        onClick={() => window.open(step.button.link, "_blank")}
                        className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300"
                      >
                        {step.button.text}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security Warning */}
        <motion.div
          className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-amber-100 text-sm md:text-base">
            ⚠️{" "}
            <span className="font-semibold">{t("howToBuy.securityTip")}</span>{" "}
            <span className="font-mono text-amber-300">{CONTRACT_ADDRESS}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
