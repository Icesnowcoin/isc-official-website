/*
 * Design: Quantum Ice — Glass morphism navbar with ice-blue accents
 * Fixed top navigation, backdrop blur, subtle border glow
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ExternalLink, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Locale, LOCALE_NAMES } from "@/lib/i18n";
import { ASSETS, LINKS } from "@/lib/assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.whitepaper"), href: LINKS.whitepaper, external: true },
    { label: t("nav.game"), href: LINKS.game, external: true },
    { label: t("nav.tokenomics"), href: "#tokenomics" },
    { label: t("nav.roadmap"), href: "#roadmap" },
    { label: t("nav.community"), href: LINKS.community, external: true },
  ];

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-[oklch(0.10_0.02_250/0.85)] backdrop-blur-xl border-b border-[oklch(0.75_0.12_220/0.1)]" />
        <div className="relative container mx-auto flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#hero"
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 shrink-0"
          >
            <img src={ASSETS.logo} alt="ISC" className="w-9 h-9 rounded-lg" />
            <span
              className="font-heading text-lg font-700 tracking-wide text-glow-sm hidden sm:block"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ICE SNOW COIN
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={e => {
                  if (!item.external) {
                    e.preventDefault();
                    scrollTo(item.href);
                  }
                }}
                className="px-3 py-2 text-sm font-medium text-[oklch(0.75_0.02_220)] hover:text-[oklch(0.90_0.05_220)] transition-colors duration-300 flex items-center gap-1"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                {item.label}
                {item.external && (
                  <ExternalLink className="w-3 h-3 opacity-50" />
                )}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg border border-[oklch(0.75_0.12_220/0.2)] hover:border-[oklch(0.75_0.12_220/0.4)] transition-all duration-300"
                style={{ fontFamily: "var(--font-sub)" }}
              >
                <Globe className="w-4 h-4 text-ice-blue" />
                <span className="hidden sm:inline text-[oklch(0.80_0.02_220)]">
                  {LOCALE_NAMES[locale]}
                </span>
                <ChevronDown className="w-3 h-3 text-[oklch(0.60_0.02_220)]" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 glass-card rounded-lg overflow-hidden min-w-[140px]"
                  >
                    {(Object.keys(LOCALE_NAMES) as Locale[]).map(loc => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[oklch(0.75_0.12_220/0.1)] transition-colors ${
                          locale === loc
                            ? "text-ice-blue"
                            : "text-[oklch(0.75_0.02_220)]"
                        }`}
                        style={{ fontFamily: "var(--font-sub)" }}
                      >
                        {LOCALE_NAMES[loc]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trade Button */}
            <a
              href={LINKS.pancakeswap}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-[oklch(0.75_0.12_220/0.15)] border border-[oklch(0.75_0.12_220/0.3)] text-ice-blue hover:bg-[oklch(0.75_0.12_220/0.25)] transition-all duration-300"
              style={{ fontFamily: "var(--font-sub)" }}
            >
              {t("nav.trade")}
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Wallet Connect Button */}
            <div className="hidden sm:block">
              <ConnectButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[oklch(0.75_0.02_220)]"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden relative bg-[oklch(0.10_0.02_250/0.95)] backdrop-blur-xl border-b border-[oklch(0.75_0.12_220/0.1)]"
            >
              <div className="container py-4 flex flex-col gap-1">
                {navItems.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={e => {
                      if (!item.external) {
                        e.preventDefault();
                        scrollTo(item.href);
                      }
                    }}
                    className="px-4 py-3 text-sm font-medium text-[oklch(0.75_0.02_220)] hover:text-ice-blue hover:bg-[oklch(0.75_0.12_220/0.05)] rounded-lg transition-colors flex items-center gap-2"
                    style={{ fontFamily: "var(--font-sub)" }}
                  >
                    {item.label}
                    {item.external && (
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    )}
                  </a>
                ))}
                <a
                  href={LINKS.pancakeswap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-ice-blue hover:bg-[oklch(0.75_0.12_220/0.05)] rounded-lg transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {t("nav.trade")}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Close language dropdown on outside click */}
      {langOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangOpen(false)}
        />
      )}
    </>
  );
}
