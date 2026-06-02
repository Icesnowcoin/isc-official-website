/*
 * Design: Quantum Ice — Tokenomics section
 * Table visualization, key metrics, contract info
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS, LINKS } from '@/lib/assets';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

export default function TokenomicsSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(LINKS.contract);
    setCopied(true);
    toast.success('Contract address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenomicsData = [
    { category: 'Liquidity Pool (Short-term)', percent: '5%', amount: '10,130,000 ISC', usage: '1 Year Lock (UNCX Network)', lock: '✓ Locked' },
    { category: 'Liquidity Pool (Long-term)', percent: '35%', amount: '70,910,000 ISC', usage: '4 Years Lock (UNCX Network)', lock: '✓ Locked' },
    { category: t('tokenomics.team'), percent: '20%', amount: '40,520,000 ISC', usage: '24 Months Linear Release (Team Finance)', lock: '✓ Locked' },
    { category: 'Staking Rewards (APY 10%)', percent: '10.1%', amount: '20,260,000 ISC', usage: 'Annual Staking Rewards Pool', lock: '✓ Active' },
    { category: 'Community / Ecosystem / R&D', percent: 'Remaining', amount: '59,780,000 ISC', usage: t('tokenomics.operationsDesc'), lock: 'Planned' },
  ];

  return (
    <section id="tokenomics" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.tokenomicsBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.92 0.03 220)' }}>
            {t('tokenomics.title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.65 0.08 220)' }}>
            Scientific Economic Model with Layered Liquidity Locking
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.75_0.12_220/0.3)] bg-[oklch(0.75_0.12_220/0.08)]">
            <span className="text-xs font-medium text-ice-blue" style={{ fontFamily: 'var(--font-sub)' }}>
              Total Locked Liquidity: 40% (1-4 Years)
            </span>
          </div>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto mb-16"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="px-4 py-3 text-left font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.category') || '类别'}
                </th>
                <th
                  className="px-4 py-3 text-center font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.percentage') || '百分比'}
                </th>
                <th
                  className="px-4 py-3 text-center font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.amount') || '数量'}
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold border-b-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'oklch(0.88 0.03 220)',
                    borderColor: 'oklch(0.25 0.05 250)',
                    backgroundColor: 'oklch(0.12 0.02 250)',
                  }}
                >
                  {t('tokenomics.usage') || '使用'}
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenomicsData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'oklch(0.10 0.01 250)' : 'transparent',
                    borderBottom: '1px solid oklch(0.20 0.03 250)',
                  }}
                >
                  <td
                    className="px-4 py-4 font-semibold"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'oklch(0.85 0.03 220)',
                    }}
                  >
                    {row.category}
                  </td>
                  <td
                    className="px-4 py-4 text-center font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'oklch(0.75 0.12 220)',
                    }}
                  >
                    {row.percent}
                  </td>
                  <td
                    className="px-4 py-4 text-center"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'oklch(0.70 0.02 220)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {row.amount}
                  </td>
                  <td
                    className="px-4 py-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'oklch(0.65 0.02 220)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {row.usage}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Key Metrics */}
        <motion.div {...fadeInUp} className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { label: t('tokenomics.presalePrice'), value: '1 USDT = 2000 ISC' },
            { label: t('tokenomics.audit'), value: 'TechRate (April 2026 - 21/21 Security Checks Passed)' },
          ].map((metric, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-sub)' }}>{metric.label}</div>
              <div className="text-sm font-bold text-ice-blue" style={{ fontFamily: 'var(--font-mono)' }}>{metric.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Contract Address */}
        <motion.div {...fadeInUp} className="glass-card rounded-xl p-4 max-w-2xl mx-auto">
          <div className="text-xs text-muted-foreground mb-2 text-center" style={{ fontFamily: 'var(--font-sub)' }}>
            {t('tokenomics.contract')} (BSC - BEP20)
          </div>
          <div className="flex items-center gap-2 justify-center">
            <a
              href={LINKS.bscscan}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-ice-blue hover:text-electric-cyan transition-colors break-all"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {LINKS.contract}
            </a>
            <button
              onClick={copyContract}
              className="shrink-0 p-1.5 rounded-md hover:bg-[oklch(0.75_0.12_220/0.1)] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
