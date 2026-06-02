import { describe, it, expect } from "vitest";
import { translations } from "@/lib/i18n";

describe("i18n Translation System", () => {
  describe("Language Availability", () => {
    it("should have Chinese translations", () => {
      expect(translations.zh).toBeDefined();
      expect(Object.keys(translations.zh).length).toBeGreaterThan(0);
    });

    it("should have English translations", () => {
      expect(translations.en).toBeDefined();
      expect(Object.keys(translations.en).length).toBeGreaterThan(0);
    });

    it("should have Vietnamese translations", () => {
      expect(translations.vi).toBeDefined();
      expect(Object.keys(translations.vi).length).toBeGreaterThan(0);
    });
  });

  describe("Key Consistency", () => {
    it("should have same keys across all languages", () => {
      const zhKeys = Object.keys(translations.zh).sort();
      const enKeys = Object.keys(translations.en).sort();
      const viKeys = Object.keys(translations.vi).sort();

      expect(zhKeys).toEqual(enKeys);
      expect(enKeys).toEqual(viKeys);
    });
  });

  describe("Navigation Translations", () => {
    it("should have Chinese navigation translations", () => {
      expect(translations.zh["nav.home"]).toBe("首页");
      expect(translations.zh["nav.whitepaper"]).toBe("白皮书");
      expect(translations.zh["nav.game"]).toBe("游戏");
      expect(translations.zh["nav.tokenomics"]).toBe("代币经济学");
      expect(translations.zh["nav.roadmap"]).toBe("路线图");
      expect(translations.zh["nav.community"]).toBe("社区");
    });

    it("should have English navigation translations", () => {
      expect(translations.en["nav.home"]).toBe("Home");
      expect(translations.en["nav.whitepaper"]).toBe("Whitepaper");
      expect(translations.en["nav.game"]).toBe("Game");
      expect(translations.en["nav.tokenomics"]).toBe("Tokenomics");
      expect(translations.en["nav.roadmap"]).toBe("Roadmap");
      expect(translations.en["nav.community"]).toBe("Community");
    });

    it("should have Vietnamese navigation translations", () => {
      expect(translations.vi["nav.home"]).toBe("Trang chủ");
      expect(translations.vi["nav.whitepaper"]).toBe("Whitepaper");
      expect(translations.vi["nav.game"]).toBe("Trò chơi");
      expect(translations.vi["nav.tokenomics"]).toBe("Kinh tế học Token");
      expect(translations.vi["nav.roadmap"]).toBe("Lộ trình");
      expect(translations.vi["nav.community"]).toBe("Cộng đồng");
    });
  });

  describe("Hero Section Translations", () => {
    it("should have Chinese hero translations", () => {
      expect(translations.zh["hero.title"]).toBeDefined();
      expect(translations.zh["hero.subtitle"]).toBeDefined();
      expect(translations.zh["hero.description"]).toBeDefined();
    });

    it("should have English hero translations", () => {
      expect(translations.en["hero.title"]).toBeDefined();
      expect(translations.en["hero.subtitle"]).toBeDefined();
      expect(translations.en["hero.description"]).toBeDefined();
    });

    it("should have Vietnamese hero translations", () => {
      expect(translations.vi["hero.title"]).toBeDefined();
      expect(translations.vi["hero.subtitle"]).toBeDefined();
      expect(translations.vi["hero.description"]).toBeDefined();
    });
  });

  describe("How to Buy Translations", () => {
    it("should have Chinese how to buy translations", () => {
      expect(translations.zh["howToBuy.title"]).toBe("如何购买 ISC");
      expect(translations.zh["howToBuy.subtitle"]).toBe(
        "3 个简单步骤开始您的 ISC 之旅"
      );
      expect(translations.zh["howToBuy.step1.title"]).toBe("选择您的钱包");
      expect(translations.zh["howToBuy.step2.title"]).toBe("将 BNB 交换为 ISC");
      expect(translations.zh["howToBuy.step3.title"]).toBe("将 ISC 添加到钱包");
    });

    it("should have English how to buy translations", () => {
      expect(translations.en["howToBuy.title"]).toBe("How to Buy ISC");
      expect(translations.en["howToBuy.subtitle"]).toBe(
        "Get started with Ice Snow Coin in 3 simple steps"
      );
      expect(translations.en["howToBuy.step1.title"]).toBe(
        "Connect Your Wallet"
      );
      expect(translations.en["howToBuy.step2.title"]).toBe("Swap BNB for ISC");
      expect(translations.en["howToBuy.step3.title"]).toBe("Add ISC to Wallet");
    });

    it("should have Vietnamese how to buy translations", () => {
      expect(translations.vi["howToBuy.title"]).toBe("Cách mua ISC");
      expect(translations.vi["howToBuy.subtitle"]).toBe(
        "Bắt đầu với Ice Snow Coin trong 3 bước đơn giản"
      );
      expect(translations.vi["howToBuy.step1.title"]).toBe(
        "Kết nối Ví của bạn"
      );
      expect(translations.vi["howToBuy.step2.title"]).toBe(
        "Hoán đổi BNB lấy ISC"
      );
      expect(translations.vi["howToBuy.step3.title"]).toBe("Thêm ISC vào Ví");
    });
  });

  describe("FAQ Translations", () => {
    it("should have Chinese FAQ translations", () => {
      expect(translations.zh["faq.title"]).toBe("常见问题");
      expect(translations.zh["faq.subtitle"]).toBe("关于 ISC 的所有信息");
      expect(translations.zh["faq.q1"]).toBe("ISC (Ice Snow Coin) 是什么？");
      expect(translations.zh["faq.q2"]).toBe("合约是否安全？是否进行过审计？");
      expect(translations.zh["faq.q3"]).toBe("我如何质押 ISC 并赚取奖励？");
    });

    it("should have English FAQ translations", () => {
      expect(translations.en["faq.title"]).toBe("Frequently Asked Questions");
      expect(translations.en["faq.subtitle"]).toBe(
        "Everything you need to know about ISC"
      );
      expect(translations.en["faq.q1"]).toBe("What is ISC (Ice Snow Coin)?");
      expect(translations.en["faq.q2"]).toBe(
        "Is the contract safe? Has it been audited?"
      );
      expect(translations.en["faq.q3"]).toBe(
        "How do I stake ISC and earn rewards?"
      );
    });

    it("should have Vietnamese FAQ translations", () => {
      expect(translations.vi["faq.title"]).toBe("Các câu hỏi thường gặp");
      expect(translations.vi["faq.subtitle"]).toBe(
        "Mọi thứ bạn cần biết về ISC"
      );
      expect(translations.vi["faq.q1"]).toBe("ISC (Ice Snow Coin) là gì?");
      expect(translations.vi["faq.q2"]).toBe(
        "Hợp đồng có an toàn không? Có được kiểm toán không?"
      );
      expect(translations.vi["faq.q3"]).toBe(
        "Làm cách nào tôi có thể đặt cược ISC và kiếm phần thưởng?"
      );
    });
  });

  describe("Security Translations", () => {
    it("should have Chinese security translations", () => {
      expect(translations.zh["security.title"]).toBe("安全与透明");
      expect(translations.zh["security.subtitle"]).toBe("为社区提供多层保护");
      expect(translations.zh["security.card1.title"]).toBe("已验证的智能合约");
      expect(translations.zh["security.card2.title"]).toBe("所有权已放弃");
      expect(translations.zh["security.card3.title"]).toBe(
        "流动性锁定 3 年 11 个月"
      );
      expect(translations.zh["security.card4.title"]).toBe(
        "团队代币锁定（24 个月线性解锁）"
      );
    });

    it("should have English security translations", () => {
      expect(translations.en["security.title"]).toBe("Security & Transparency");
      expect(translations.en["security.subtitle"]).toBe(
        "Multiple layers of protection for the community"
      );
      expect(translations.en["security.card1.title"]).toBe(
        "Verified Smart Contract"
      );
      expect(translations.en["security.card2.title"]).toBe(
        "Ownership Renounced"
      );
      expect(translations.en["security.card3.title"]).toBe(
        "LP Locked 3 Years 11 Months"
      );
      expect(translations.en["security.card4.title"]).toBe(
        "Team Tokens Locked (24-Month Linear Vesting)"
      );
    });

    it("should have Vietnamese security translations", () => {
      expect(translations.vi["security.title"]).toBe("Bảo mật & Minh bạch");
      expect(translations.vi["security.subtitle"]).toBe(
        "Nhiều lớp bảo vệ cho cộng đồng"
      );
      expect(translations.vi["security.card1.title"]).toBe(
        "Hợp đồng thông minh đã xác minh"
      );
      expect(translations.vi["security.card2.title"]).toBe(
        "Quyền sở hữu đã từ bỏ"
      );
      expect(translations.vi["security.card3.title"]).toBe(
        "LP bị khóa 3 năm 11 tháng"
      );
      expect(translations.vi["security.card4.title"]).toBe(
        "Token nhóm bị khóa (Giải phóng tuyến tính 24 tháng)"
      );
    });
  });

  describe("Translation Value Validation", () => {
    it("should not have empty translation values", () => {
      Object.entries(translations.zh).forEach(([key, value]) => {
        expect(
          value,
          `Chinese translation for ${key} should not be empty`
        ).toBeTruthy();
      });

      Object.entries(translations.en).forEach(([key, value]) => {
        expect(
          value,
          `English translation for ${key} should not be empty`
        ).toBeTruthy();
      });

      Object.entries(translations.vi).forEach(([key, value]) => {
        expect(
          value,
          `Vietnamese translation for ${key} should not be empty`
        ).toBeTruthy();
      });
    });

    it("should not have translation keys as values (untranslated)", () => {
      Object.entries(translations.zh).forEach(([key, value]) => {
        expect(
          value,
          `Chinese translation for ${key} should not be a key`
        ).not.toBe(key);
      });

      Object.entries(translations.en).forEach(([key, value]) => {
        expect(
          value,
          `English translation for ${key} should not be a key`
        ).not.toBe(key);
      });

      Object.entries(translations.vi).forEach(([key, value]) => {
        expect(
          value,
          `Vietnamese translation for ${key} should not be a key`
        ).not.toBe(key);
      });
    });
  });
});
