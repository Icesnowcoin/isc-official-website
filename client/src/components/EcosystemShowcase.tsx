/**
 * Ecosystem Showcase Component
 * Displays NFT and GameFi ecosystem information from Whitepaper v3.0
 */

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Gamepad2, Image as ImageIcon, TrendingUp } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function EcosystemShowcase() {
  const { locale } = useLanguage();

  const content = {
    en: {
      title: "ISC Ecosystem",
      subtitle: "NFT & GameFi Dual-Track Development",
      nft: {
        title: "ISC Commemorative Dynamic NFT",
        description:
          "Limited edition commemorative dynamic NFTs as core ecosystem benefit certificates",
        features: [
          {
            label: "Total Supply",
            value: "2,026",
            unit: "NFTs (Commemorating 2026)",
          },
          {
            label: "Type",
            value: "Dynamic SVG Animation",
            unit: "Based on ISC Official LOGO",
          },
          {
            label: "Payment",
            value: "ISC Token",
            unit: "Minting (Pricing TBA)",
          },
          {
            label: "Benefits",
            value: "GameFi Priority",
            unit: "Airdrops, Governance Voting Bonus",
          },
        ],
        status: "Coming Soon Deployment",
      },
      gamefi: {
        title: "GameFi Ecosystem",
        description:
          "Building a native decentralized gaming platform with sustainable economy",
        features: [
          { label: "Type", value: "Decentralized Gaming", unit: "Platform" },
          {
            label: "Model",
            value: "Play-to-Earn",
            unit: "+ ISC Token Incentives",
          },
          {
            label: "NFT Integration",
            value: "Core Assets",
            unit: "Identity Markers",
          },
          { label: "Goal", value: "Sustainable Economy", unit: "on BSC" },
        ],
        status: "Full Development",
      },
    },
    zh: {
      title: "ISC 生态",
      subtitle: "NFT 与 GameFi 双轨并行发展",
      nft: {
        title: "ISC 纪念动态 NFT",
        description: "作为核心生态权益证书的限量版纪念动态 NFT",
        features: [
          { label: "总供应量", value: "2,026", unit: "个 NFT (纪念2026年)" },
          { label: "类型", value: "动态 SVG 动画", unit: "基于 ISC 官方 LOGO" },
          { label: "支付方式", value: "ISC 代币", unit: "铸造 (价格待公布)" },
          {
            label: "权益",
            value: "GameFi 优先",
            unit: "生态空投、治理投票加成",
          },
        ],
        status: "即将部署阶段",
      },
      gamefi: {
        title: "GameFi 生态",
        description: "构建原生去中心化游戏平台，建立可持续的经济模型",
        features: [
          { label: "类型", value: "去中心化游戏", unit: "平台" },
          { label: "经济模型", value: "Play-to-Earn", unit: "+ ISC 代币激励" },
          { label: "NFT 集成", value: "核心资产", unit: "身份标记" },
          { label: "目标", value: "可持续经济", unit: "在 BSC 上" },
        ],
        status: "全面开发中",
      },
    },
    vi: {
      title: "Hệ sinh thái ISC",
      subtitle: "Phát triển song song NFT & GameFi",
      nft: {
        title: "ISC Commemorative Dynamic NFT",
        description:
          "NFT động kỷ niệm phiên bản giới hạn làm chứng chỉ quyền lợi hệ sinh thái cốt lõi",
        features: [
          { label: "Tổng cung", value: "2,026", unit: "NFT (Kỷ niệm 2026)" },
          { label: "Loại", value: "SVG Animation", unit: "Dựa trên LOGO ISC" },
          { label: "Thanh toán", value: "Token ISC", unit: "Đúc (Giá TBA)" },
          {
            label: "Quyền lợi",
            value: "GameFi Ưu tiên",
            unit: "Airdrops, Voting Bonus",
          },
        ],
        status: "Sắp triển khai",
      },
      gamefi: {
        title: "Hệ sinh thái GameFi",
        description:
          "Xây dựng nền tảng trò chơi phi tập trung với kinh tế bền vững",
        features: [
          { label: "Loại", value: "Trò chơi phi tập trung", unit: "Nền tảng" },
          {
            label: "Mô hình",
            value: "Play-to-Earn",
            unit: "+ Khích lệ Token ISC",
          },
          {
            label: "Tích hợp NFT",
            value: "Tài sản cốt lõi",
            unit: "Đánh dấu danh tính",
          },
          { label: "Mục tiêu", value: "Kinh tế bền vững", unit: "trên BSC" },
        ],
        status: "Phát triển toàn bộ",
      },
    },
  };

  const dict = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-cyan-950/10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-glow"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.92 0.03 220)",
            }}
          >
            {dict.title}
          </h2>
          <p
            className="mt-3 text-base sm:text-lg"
            style={{
              fontFamily: "var(--font-sub)",
              color: "oklch(0.65 0.08 220)",
            }}
          >
            {dict.subtitle}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* NFT Section */}
        <motion.div
          {...fadeInUp}
          className="mb-16 p-8 rounded-xl border border-[oklch(0.75_0.12_220/0.3)] bg-gradient-to-br from-[oklch(0.75_0.12_220/0.08)] to-transparent backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cyan-500/20">
              <ImageIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {dict.nft.title}
              </h3>
              <p
                className="mt-2 text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {dict.nft.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-medium text-cyan-400">
                  {dict.nft.status}
                </span>
              </div>
            </div>
          </div>

          {/* NFT Video Display */}
          <div className="mb-6 rounded-lg overflow-hidden border border-[oklch(0.75_0.12_220/0.3)]">
            <video
              src="/manus-storage/isc_nft_crystal_solid_5bc6ebe6.mp4"
              autoPlay
              loop
              muted
              className="w-full h-auto"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* NFT Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.nft.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]"
              >
                <div
                  className="text-xs font-semibold text-ice-blue mb-2"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {feature.label}
                </div>
                <div
                  className="text-sm font-bold text-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {feature.value}
                </div>
                <div
                  className="text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {feature.unit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GameFi Section */}
        <motion.div
          {...fadeInUp}
          className="p-8 rounded-xl border border-[oklch(0.75_0.12_220/0.3)] bg-gradient-to-br from-[oklch(0.75_0.12_220/0.08)] to-transparent backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {dict.gamefi.title}
              </h3>
              <p
                className="mt-2 text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {dict.gamefi.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs font-medium text-purple-400">
                  {dict.gamefi.status}
                </span>
              </div>
            </div>
          </div>

          {/* GameFi Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.gamefi.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]"
              >
                <div
                  className="text-xs font-semibold text-ice-blue mb-2"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {feature.label}
                </div>
                <div
                  className="text-sm font-bold text-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {feature.value}
                </div>
                <div
                  className="text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {feature.unit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
