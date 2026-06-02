/*
 * Design: Quantum Ice — DEX Trade Section
 * Collapsible card showing 12 DEX platforms for trading ISC
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ISC_CONTRACT = "0x11229a3f976566FA8a3ba462C432122f3B8876f6";

// 12 DEX platforms (removed MDEX, BabySwap, dYdX, 1inch)
const DEX_PLATFORMS = [
  {
    name: "PancakeSwap",
    url: "https://pancakeswap.finance",
    description: "Leading BSC DEX",
  },
  { name: "Biswap", url: "https://biswap.org", description: "BSC Exchange" },
  {
    name: "ApeSwap",
    url: "https://apeswap.finance",
    description: "Multi-chain DEX",
  },
  { name: "Nomiswap", url: "https://nomiswap.io", description: "Stable Swap" },
  { name: "Thena", url: "https://thena.fi", description: "Optimized DEX" },
  {
    name: "Uniswap",
    url: "https://app.uniswap.org",
    description: "Multi-chain DEX",
  },
  {
    name: "SushiSwap",
    url: "https://www.sushi.com",
    description: "Community DEX",
  },
  { name: "Curve", url: "https://curve.fi", description: "Stablecoin DEX" },
  { name: "CowSwap", url: "https://cow.fi", description: "Intent-based DEX" },
  {
    name: "ParaSwap",
    url: "https://app.paraswap.io",
    description: "DEX Aggregator",
  },
  {
    name: "OpenOcean",
    url: "https://openocean.finance",
    description: "DEX Aggregator",
  },
  {
    name: "KyberSwap",
    url: "https://kyberswap.com",
    description: "Multi-chain DEX",
  },
];

// SVG Logo components
const DexLogos: Record<string, () => React.ReactNode> = {
  PancakeSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#38A169" />
      <path
        d="M100 40 L140 80 L140 140 L100 160 L60 140 L60 80 Z"
        fill="#fff"
      />
      <circle cx="100" cy="100" r="30" fill="#38A169" />
    </svg>
  ),
  Biswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#00D4FF" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  ApeSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FF6B35" />
      <circle cx="85" cy="85" r="15" fill="#fff" />
      <circle cx="115" cy="85" r="15" fill="#fff" />
      <path
        d="M80 120 Q100 135 120 120"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  ),
  Nomiswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#7B2FF7" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  Thena: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#00D4FF" />
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
      />
    </svg>
  ),
  Uniswap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FF007A" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
  SushiSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FA52A0" />
      <circle cx="100" cy="100" r="40" fill="#fff" />
    </svg>
  ),
  Curve: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#1E90FF" />
      <path
        d="M60 100 Q100 60 140 100"
        stroke="#fff"
        strokeWidth="8"
        fill="none"
      />
    </svg>
  ),
  CowSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#FFCC00" />
      <circle cx="85" cy="85" r="12" fill="#000" />
      <circle cx="115" cy="85" r="12" fill="#000" />
    </svg>
  ),
  ParaSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#00D4FF" />
      <path
        d="M70 100 L130 100 M100 70 L100 130"
        stroke="#fff"
        strokeWidth="8"
      />
    </svg>
  ),
  OpenOcean: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#1E90FF" />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
      />
    </svg>
  ),
  KyberSwap: () => (
    <svg viewBox="0 0 200 200" className="w-12 h-12">
      <circle cx="100" cy="100" r="95" fill="#31CB9E" />
      <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="#fff" />
    </svg>
  ),
};

export default function DexTradeSection() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ISC_CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ice-blue/5 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.92 0.03 220)",
            }}
          >
            {t("dex.title") || "Trade ISC on 12+ DEX"}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.70 0.02 220)",
            }}
          >
            {t("dex.subtitle") ||
              "Multi-chain trading access across leading decentralized exchanges"}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              backgroundColor: "oklch(0.08 0.01 250)",
              borderColor: "oklch(0.25 0.05 250)",
            }}
          >
            {/* Header */}
            <div
              className="p-6 sm:p-8 border-b"
              style={{ borderColor: "oklch(0.20 0.03 250)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.92 0.03 220)",
                    }}
                  >
                    {t("dex.cardTitle") || "ISC Contract"}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "oklch(0.65 0.02 220)",
                    }}
                  >
                    {t("dex.cardDesc") || "BEP20 Token on BSC Network"}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "oklch(0.75 0.12 220 / 0.1)",
                    color: "oklch(0.75 0.12 220)",
                  }}
                >
                  <ChevronDown
                    size={24}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-6 sm:p-8 border-t"
                    style={{ borderColor: "oklch(0.20 0.03 250)" }}
                  >
                    {/* Contract Address */}
                    <div className="mb-8">
                      <p
                        className="text-sm mb-3"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "oklch(0.65 0.02 220)",
                        }}
                      >
                        {t("dex.contractLabel") ||
                          "Contract Address (BSC - BEP20)"}
                      </p>
                      <div className="flex items-center gap-2 p-4 rounded-lg bg-white/5">
                        <code
                          className="flex-1 text-xs sm:text-sm break-all"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "oklch(0.75 0.12 220)",
                          }}
                        >
                          {ISC_CONTRACT}
                        </code>
                        <button
                          onClick={handleCopy}
                          className="flex-shrink-0 p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: "oklch(0.75 0.12 220 / 0.1)",
                            color: "oklch(0.75 0.12 220)",
                          }}
                        >
                          {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* DEX Grid - FIXED: motion.div + standard a tag */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                      {DEX_PLATFORMS.map((dex, index) => {
                        const LogoComponent = DexLogos[dex.name];
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="rounded-xl transition-all hover:translate-y-[-2px]"
                            style={{
                              background: "oklch(0.10 0.02 250)",
                              border: "1px solid oklch(0.55 0.18 255 / 0.2)",
                            }}
                          >
                            <a
                              href={dex.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 text-center"
                            >
                              <div className="flex justify-center mb-3">
                                {LogoComponent && <LogoComponent />}
                              </div>
                              <h4
                                className="font-semibold text-sm mb-1"
                                style={{ color: "oklch(0.90 0.04 220)" }}
                              >
                                {dex.name}
                              </h4>
                              <p
                                className="text-xs"
                                style={{ color: "oklch(0.60 0.02 220)" }}
                              >
                                {dex.description}
                              </p>
                            </a>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* How to Trade */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4
                        className="font-semibold mb-4"
                        style={{ color: "oklch(0.90 0.04 220)" }}
                      >
                        {t("dex.howToTrade") || "How to Trade ISC"}
                      </h4>
                      <div className="grid sm:grid-cols-4 gap-4">
                        {[
                          {
                            step: "1",
                            label: t("dex.step1") || "Connect Wallet",
                          },
                          { step: "2", label: t("dex.step2") || "Select DEX" },
                          {
                            step: "3",
                            label: t("dex.step3") || "Paste Contract",
                          },
                          {
                            step: "4",
                            label: t("dex.step4") || "Swap & Trade",
                          },
                        ].map((item, i) => (
                          <div key={i} className="text-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold"
                              style={{
                                backgroundColor: "oklch(0.75 0.12 220 / 0.2)",
                                color: "oklch(0.75 0.12 220)",
                              }}
                            >
                              {item.step}
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: "oklch(0.65 0.02 220)" }}
                            >
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Button */}
            <div
              className="p-6 sm:p-8 border-t"
              style={{ borderColor: "oklch(0.20 0.03 250)" }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: isOpen
                    ? "oklch(0.75 0.12 220 / 0.1)"
                    : "oklch(0.75 0.12 220)",
                  color: isOpen ? "oklch(0.75 0.12 220)" : "#000",
                  border: isOpen ? "1px solid oklch(0.75 0.12 220)" : "none",
                }}
              >
                {isOpen
                  ? t("dex.collapse") || "Collapse"
                  : t("dex.expand") || "View All DEX"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
