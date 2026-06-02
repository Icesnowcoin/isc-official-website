/*
 * Design: Quantum Ice — Roadmap section
 * Vertical timeline with glowing nodes, four phases based on Whitepaper v3.0
 */
import { motion } from "framer-motion";
import { Sprout, TrendingUp, Rocket, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS } from "@/lib/assets";

export default function RoadmapSection() {
  const { locale } = useLanguage();

  const content = {
    en: {
      title: "Development Roadmap",
      subtitle: "Whitepaper v3.0 - April 20, 2026",
      phases: [
        {
          icon: Sprout,
          title: "✓ Completed (April 2026)",
          time: "April 20, 2026",
          items: [
            "Contract deployment and testing",
            "Proxy and implementation contract ownership fully released",
            "LP liquidity layered locking (5% one year + 35% four years)",
            "Team funds 20% locked (24-month linear release)",
            "Official website and whitepaper launch",
          ],
          color: "oklch(0.82 0.16 195)",
          active: true,
        },
        {
          icon: TrendingUp,
          title: "⏳ In Progress (Q2 2026)",
          time: "Q2 2026",
          items: [
            "Security audit ✅ Passed TechRate audit, all 21 security checks passed",
            "ISC commemorative dynamic NFT prototype design",
            "GameFi core framework development",
          ],
          color: "oklch(0.75 0.12 220)",
          active: true,
        },
        {
          icon: Rocket,
          title: "📋 Planned (Q3 2026)",
          time: "Q3 2026",
          items: [
            "NFT minting functionality launch",
            "GameFi beta release",
            "Community DAO governance launch",
            "APY staking mechanism launch",
          ],
          color: "oklch(0.55 0.18 255)",
          active: false,
        },
        {
          icon: Crown,
          title: "🚀 Future (Q4 2026+)",
          time: "Q4 2026 and Beyond",
          items: [
            "Cross-chain deployment evaluation",
            "Advanced GameFi features",
            "Ecosystem partnerships",
            "Global community expansion",
          ],
          color: "oklch(0.65 0.14 230)",
          active: false,
        },
      ],
    },
    zh: {
      title: "开发路线图",
      subtitle: "白皮书 v3.0 - 2026年4月20日",
      phases: [
        {
          icon: Sprout,
          title: "✓ 已完成 (2026年4月)",
          time: "2026年4月20日",
          items: [
            "合约部署和测试",
            "Proxy 和 Implementation 合约所有权完全释放",
            "LP 流动性分层锁定 (5% 一年 + 35% 四年)",
            "团队基金 20% 锁定 (24个月线性释放)",
            "官方网站和白皮书发布",
          ],
          color: "oklch(0.82 0.16 195)",
          active: true,
        },
        {
          icon: TrendingUp,
          title: "⏳ 进行中 (Q2 2026)",
          time: "Q2 2026",
          items: [
            "安全审计 ✅ 已通过 TechRate 审计，21 项安全检查全部通过",
            "ISC 纪念动态 NFT 原型设计",
            "GameFi 核心框架开发",
          ],
          color: "oklch(0.75 0.12 220)",
          active: true,
        },
        {
          icon: Rocket,
          title: "📋 计划中 (Q3 2026)",
          time: "Q3 2026",
          items: [
            "NFT 铸造功能上线",
            "GameFi 测试版发布",
            "社区 DAO 治理启动",
            "APY 质押机制启动",
          ],
          color: "oklch(0.55 0.18 255)",
          active: false,
        },
        {
          icon: Crown,
          title: "🚀 未来 (Q4 2026+)",
          time: "2026年Q4及以后",
          items: [
            "跨链部署评估",
            "高级 GameFi 功能",
            "生态伙伴关系",
            "全球社区扩展",
          ],
          color: "oklch(0.65 0.14 230)",
          active: false,
        },
      ],
    },
    vi: {
      title: "Lộ trình Phát triển",
      subtitle: "Whitepaper v3.0 - 20 tháng 4 năm 2026",
      phases: [
        {
          icon: Sprout,
          title: "✓ Hoàn thành (Tháng 4 năm 2026)",
          time: "20 tháng 4 năm 2026",
          items: [
            "Triển khai hợp đồng và thử nghiệm",
            "Quyền sở hữu hợp đồng Proxy và Implementation được phát hành hoàn toàn",
            "Khóa thanh khoản LP theo lớp (5% một năm + 35% bốn năm)",
            "Quỹ nhóm 20% bị khóa (phát hành tuyến tính 24 tháng)",
            "Phát hành trang web chính thức và whitepaper",
          ],
          color: "oklch(0.82 0.16 195)",
          active: true,
        },
        {
          icon: TrendingUp,
          title: "⏳ Đang tiến hành (Q2 2026)",
          time: "Q2 2026",
          items: [
            "Kiểm toán bảo mật ✅ Đã vượt qua kiểm toán TechRate, tất cả 21 kiểm tra bảo mật đã vượt qua",
            "Thiết kế nguyên mẫu ISC Commemorative Dynamic NFT",
            "Phát triển khung GameFi cốt lõi",
          ],
          color: "oklch(0.75 0.12 220)",
          active: true,
        },
        {
          icon: Rocket,
          title: "📋 Được lên kế hoạch (Q3 2026)",
          time: "Q3 2026",
          items: [
            "Ra mắt chức năng đúc NFT",
            "Phát hành beta GameFi",
            "Ra mắt quản trị DAO cộng đồng",
            "Ra mắt cơ chế staking APY",
          ],
          color: "oklch(0.55 0.18 255)",
          active: false,
        },
        {
          icon: Crown,
          title: "🚀 Tương lai (Q4 2026+)",
          time: "Q4 2026 trở đi",
          items: [
            "Đánh giá triển khai đa chuỗi",
            "Các tính năng GameFi nâng cao",
            "Quan hệ đối tác hệ sinh thái",
            "Mở rộng cộng đồng toàn cầu",
          ],
          color: "oklch(0.65 0.14 230)",
          active: false,
        },
      ],
    },
  };

  const dict = content[locale as keyof typeof content] || content.en;

  return (
    <section id="roadmap" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.roadmapBg}
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
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

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[oklch(0.82_0.16_195/0.5)] via-[oklch(0.75_0.12_220/0.3)] to-[oklch(0.55_0.18_255/0.1)]" />

          {dict.phases.map((phase, i) => {
            const IconComponent = phase.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-16 sm:pl-20 pb-12 last:pb-0"
              >
                {/* Node */}
                <div
                  className="absolute left-3 sm:left-5 w-7 h-7 rounded-full flex items-center justify-center border-2"
                  style={{
                    borderColor: phase.color,
                    backgroundColor: phase.active
                      ? `color-mix(in oklch, ${phase.color}, transparent 70%)`
                      : "oklch(0.12 0.02 250)",
                    boxShadow: phase.active
                      ? `0 0 15px ${phase.color}`
                      : "none",
                  }}
                >
                  <IconComponent
                    className="w-4 h-4"
                    style={{ color: phase.color }}
                  />
                </div>

                {/* Card */}
                <div
                  className="glass-card rounded-xl p-5 sm:p-6 border transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    borderColor: `color-mix(in oklch, ${phase.color}, transparent 80%)`,
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: phase.color,
                      }}
                    >
                      {phase.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: phase.color,
                        backgroundColor: `color-mix(in oklch, ${phase.color}, transparent 90%)`,
                      }}
                    >
                      {phase.time}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "oklch(0.65 0.02 220)",
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: phase.color, opacity: 0.6 }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
