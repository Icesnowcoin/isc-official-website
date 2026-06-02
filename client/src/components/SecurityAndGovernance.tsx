/**
 * Security & Governance Component
 * Displays contract security, ownership release, and DAO governance model
 */

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Users, CheckCircle, Lock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function SecurityAndGovernance() {
  const { locale } = useLanguage();

  const content = {
    en: {
      title: "Security & Governance",
      subtitle: "Permanent Decentralization & Community DAO",
      security: {
        title: "Security Foundation",
        items: [
          {
            icon: Lock,
            label: "Contract Ownership Release",
            desc: "Status: ✓ Completed (Irreversible)",
            details: [
              "Current Owner: 0x0000000000000000000000000000000000000000 (Zero Address)",
              "Developers cannot modify contract code",
              "Cannot mint additional tokens",
              "Cannot freeze accounts or modify rules",
            ],
          },
          {
            icon: Shield,
            label: "Security Audit",
            desc: "Status: Completed (April 2026)",
            details: [
              "TechRate Audit: 21/21 Security Checks Passed",
              "Report: github.com/Icesnowcoin/isc-audit-reports",
              "Website updated with audit results",
            ],
          },
        ],
      },
      governance: {
        title: "Community DAO Governance",
        items: [
          {
            icon: Users,
            label: "Decision Mechanism",
            desc: "Community Voting (Snapshot)",
            details: [
              "Major changes require community voting",
              "Transparent decision-making process",
              "All stakeholders have voting rights",
            ],
          },
          {
            icon: CheckCircle,
            label: "Code Upgrades",
            desc: "Community Consensus Required",
            details: [
              "If upgrades needed, deploy new contracts",
              "Migration through community consensus",
              "Ensures no unilateral changes",
            ],
          },
        ],
      },
      verification: {
        title: "On-Chain Verification",
        methods: [
          {
            name: "BscScan Contract Query",
            url: "View contract code and transaction history",
          },
          {
            name: "Ownership Query",
            url: "Read Contract → owner() → Should return 0x0000...0000",
          },
          { name: "LP Lock (UNCX)", url: "Verify on UNCX lock panel" },
          {
            name: "Team Lock (Team Finance)",
            url: "Verify on Team Finance panel",
          },
        ],
      },
    },
    zh: {
      title: "安全与治理",
      subtitle: "永久去中心化与社区 DAO",
      security: {
        title: "安全基础",
        items: [
          {
            icon: Lock,
            label: "合约所有权释放",
            desc: "状态：✓ 已完成 (不可逆)",
            details: [
              "当前所有者：0x0000000000000000000000000000000000000000 (零地址)",
              "开发者无法修改合约代码",
              "无法铸造额外代币",
              "无法冻结账户或修改规则",
            ],
          },
          {
            icon: Shield,
            label: "安全审计",
            desc: "状态：已完成（2026年4月）",
            details: [
              "TechRate 审计：21/21 安全检查全部通过",
              "报告：github.com/Icesnowcoin/isc-audit-reports",
              "网站已更新审计结果",
            ],
          },
        ],
      },
      governance: {
        title: "社区 DAO 治理",
        items: [
          {
            icon: Users,
            label: "决策机制",
            desc: "社区投票 (Snapshot)",
            details: [
              "重大变更需社区投票",
              "透明的决策流程",
              "所有利益相关者都有投票权",
            ],
          },
          {
            icon: CheckCircle,
            label: "代码升级",
            desc: "需要社区共识",
            details: [
              "如需升级，部署新合约",
              "通过社区共识进行迁移",
              "确保无单方面变更",
            ],
          },
        ],
      },
      verification: {
        title: "链上验证",
        methods: [
          { name: "BscScan 合约查询", url: "查看合约代码和交易历史" },
          {
            name: "所有权查询",
            url: "读取合约 → owner() → 应返回 0x0000...0000",
          },
          { name: "LP 锁定 (UNCX)", url: "在 UNCX 锁定面板验证" },
          { name: "团队锁定 (Team Finance)", url: "在 Team Finance 面板验证" },
        ],
      },
    },
    vi: {
      title: "Bảo mật & Quản trị",
      subtitle: "Phi tập trung vĩnh viễn & DAO Cộng đồng",
      security: {
        title: "Nền tảng Bảo mật",
        items: [
          {
            icon: Lock,
            label: "Phát hành Quyền sở hữu Hợp đồng",
            desc: "Trạng thái: ✓ Hoàn thành (Không thể đảo ngược)",
            details: [
              "Chủ sở hữu hiện tại: 0x0000000000000000000000000000000000000000 (Địa chỉ Zero)",
              "Nhà phát triển không thể sửa đổi mã hợp đồng",
              "Không thể đúc thêm token",
              "Không thể đóng băng tài khoản hoặc sửa đổi quy tắc",
            ],
          },
          {
            icon: Shield,
            label: "Kiểm toán Bảo mật",
            desc: "Trạng thái: Đang tiến hành",
            details: [
              "Liên hệ: CertiK, HashDit, SlowMist",
              "Báo cáo kiểm toán sẽ được công bố ngay lập tức",
              "Trang web sẽ được cập nhật khi hoàn thành",
            ],
          },
        ],
      },
      governance: {
        title: "Quản trị DAO Cộng đồng",
        items: [
          {
            icon: Users,
            label: "Cơ chế Quyết định",
            desc: "Bỏ phiếu Cộng đồng (Snapshot)",
            details: [
              "Các thay đổi lớn cần bỏ phiếu cộng đồng",
              "Quy trình ra quyết định minh bạch",
              "Tất cả các bên liên quan đều có quyền bỏ phiếu",
            ],
          },
          {
            icon: CheckCircle,
            label: "Nâng cấp Mã",
            desc: "Cần Sự đồng thuận Cộng đồng",
            details: [
              "Nếu cần nâng cấp, triển khai hợp đồng mới",
              "Di chuyển thông qua sự đồng thuận cộng đồng",
              "Đảm bảo không có thay đổi đơn phương",
            ],
          },
        ],
      },
      verification: {
        title: "Xác minh Trên chuỗi",
        methods: [
          {
            name: "Truy vấn Hợp đồng BscScan",
            url: "Xem mã hợp đồng và lịch sử giao dịch",
          },
          {
            name: "Truy vấn Quyền sở hữu",
            url: "Đọc Hợp đồng → owner() → Nên trả về 0x0000...0000",
          },
          {
            name: "Khóa LP (UNCX)",
            url: "Xác minh trên bảng điều khiển khóa UNCX",
          },
          {
            name: "Khóa Nhóm (Team Finance)",
            url: "Xác minh trên bảng điều khiển Team Finance",
          },
        ],
      },
    },
  };

  const dict = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/10 via-transparent to-blue-950/10 pointer-events-none" />

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

        {/* Security Section */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {dict.security.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.security.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="p-6 rounded-xl border border-[oklch(0.75_0.12_220/0.3)] bg-gradient-to-br from-[oklch(0.75_0.12_220/0.08)] to-transparent backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <IconComponent className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.label}
                      </h4>
                      <p className="text-sm text-green-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.details.map((detail, didx) => (
                      <li
                        key={didx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Governance Section */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {dict.governance.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.governance.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="p-6 rounded-xl border border-[oklch(0.75_0.12_220/0.3)] bg-gradient-to-br from-[oklch(0.75_0.12_220/0.08)] to-transparent backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.label}
                      </h4>
                      <p className="text-sm text-blue-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.details.map((detail, didx) => (
                      <li
                        key={didx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Verification Section */}
        <motion.div
          {...fadeInUp}
          className="p-8 rounded-xl border border-[oklch(0.75_0.12_220/0.3)] bg-gradient-to-br from-[oklch(0.75_0.12_220/0.08)] to-transparent backdrop-blur-sm"
        >
          <h3
            className="text-2xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {dict.verification.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.verification.methods.map((method, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[oklch(0.75_0.12_220/0.2)] bg-[oklch(0.75_0.12_220/0.05)]"
              >
                <div
                  className="text-sm font-semibold text-ice-blue mb-2"
                  style={{ fontFamily: "var(--font-sub)" }}
                >
                  {method.name}
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {method.url}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
