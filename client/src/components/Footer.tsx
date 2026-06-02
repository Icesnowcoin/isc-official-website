/**
 * Footer Component
 * 4-column layout with Project, Resources, Community, and Contact sections
 */

import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CONTRACT_ADDRESS = "0x11229a3f976566FA8a3ba462C432122f3B8876f6";

export default function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const footerColumns = [
    {
      title: t("footer.project"),
      links: [
        { label: "Home", href: "#", internal: true },
        { label: "About", href: "#about", internal: true },
        { label: "Tokenomics", href: "#tokenomics", internal: true },
        { label: "Roadmap", href: "#roadmap", internal: true },
        {
          label: "Whitepaper",
          href: "https://icesnowcoin.org",
          external: true,
        },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        {
          label: "Smart Contract",
          href: "https://bscscan.com/address/0x11229a3f976566FA8a3ba462C432122f3B8876f6",
          external: true,
        },
        {
          label: "Source Code",
          href: "https://bscscan.com/address/0xf74f38cb35255b85514c49255f0ea29a013cb618#code",
          external: true,
        },
        {
          label: "LP Lock (UNCX)",
          href: "https://app.uncx.network/lockers/manage/lockers-v3?service=edit&wallet=0xf946A6521D201F2C757562Add139E5635e2a80b3&chain=56",
          external: true,
        },
        {
          label: "Team Vesting",
          href: "https://app.team.finance/token-vesting",
          external: true,
        },
        {
          label: "Telegram",
          href: "https://t.me/IceSnowCoinCommunity",
          external: true,
        },
        {
          label: "GitHub",
          href: "https://github.com/Icesnowcoin",
          external: true,
        },
      ],
    },
    {
      title: t("footer.community"),
      links: [
        {
          label: "X (Twitter)",
          href: "https://x.com/IceSnowCoin",
          external: true,
        },
        {
          label: "Telegram",
          href: "https://t.me/IceSnowCoinCommunity",
          external: true,
        },
        { label: "Discord", href: "#", external: true },
        { label: "Medium", href: "#", external: true },
      ],
    },
  ];

  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="relative bg-[#050818] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Columns 1-3 */}
          {footerColumns.map((column, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#8892b0] hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-1.5 group"
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Column 4 - Contact & Contract */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 md:col-span-1"
          >
            <div className="border border-cyan-500/30 rounded-lg p-6 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors duration-300">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                {t("footer.contact")}
              </h4>

              <div className="space-y-4">
                {/* Contract Address */}
                <div>
                  <p className="text-[#8892b0] text-xs mb-2">
                    {t("footer.contractAddress")}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-cyan-400 text-xs font-mono bg-black/30 px-2 py-1 rounded">
                      0x1122...7f6f6
                    </code>
                    <button
                      onClick={handleCopyContract}
                      className="p-1.5 hover:bg-cyan-500/20 rounded transition-colors duration-300"
                      title="Copy full contract address"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-cyan-400 hover:text-cyan-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Network Info */}
                <p className="text-[#8892b0] text-xs">
                  {t("footer.networkInfo")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-8" />

        {/* Risk Disclaimer */}
        <motion.div
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-yellow-600 text-xs">
            {t("footer.riskDisclaimer")}
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[#8892b0]">{t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-[#8892b0] hover:text-cyan-400 transition-colors duration-300"
            >
              {t("footer.privacyPolicy")}
            </a>
            <span className="text-white/10">|</span>
            <a
              href="#terms"
              className="text-[#8892b0] hover:text-cyan-400 transition-colors duration-300"
            >
              {t("footer.termsOfService")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
