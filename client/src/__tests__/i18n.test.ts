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

      // Find missing keys
      const missingInEn = zhKeys.filter(k => !enKeys.includes(k));
      const missingInVi = zhKeys.filter(k => !viKeys.includes(k));
      const missingInZh = enKeys.filter(k => !zhKeys.includes(k));

      expect(missingInEn, `Keys missing in English: ${missingInEn.join(', ')}`).toHaveLength(0);
      expect(missingInVi, `Keys missing in Vietnamese: ${missingInVi.join(', ')}`).toHaveLength(0);
      expect(missingInZh, `Keys missing in Chinese: ${missingInZh.join(', ')}`).toHaveLength(0);
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
      expect(translations.zh["hero.subtitle"]).toBeDefined();
      expect(translations.zh["hero.description"]).toBeDefined();
      expect(translations.zh["hero.liveOnBsc"]).toBeDefined();
    });

    it("should have English hero translations", () => {
      expect(translations.en["hero.subtitle"]).toBeDefined();
      expect(translations.en["hero.description"]).toBeDefined();
      expect(translations.en["hero.liveOnBsc"]).toBeDefined();
    });

    it("should have Vietnamese hero translations", () => {
      expect(translations.vi["hero.subtitle"]).toBeDefined();
      expect(translations.vi["hero.description"]).toBeDefined();
      expect(translations.vi["hero.liveOnBsc"]).toBeDefined();
    });
  });

  describe("How to Trade Translations", () => {
    it("should have Chinese how to trade translations", () => {
      expect(translations.zh["howToBuy.title"]).toBe("如何在去中心化交易所交易 ISC");
      expect(translations.zh["howToBuy.subtitle"]).toBe("在 DEX 上交易 ISC");
      expect(translations.zh["howToBuy.step1.title"]).toBe("连接您的钱包");
      expect(translations.zh["howToBuy.step2.title"]).toBe("选择 DEX 并交易");
    });

    it("should have English how to trade translations", () => {
      expect(translations.en["howToBuy.title"]).toBe("How to Trade ISC on Decentralized Exchanges");
      expect(translations.en["howToBuy.subtitle"]).toBe("Trade ISC on DEX");
      expect(translations.en["howToBuy.step1.title"]).toBe("Connect Your Wallet");
      expect(translations.en["howToBuy.step2.title"]).toBe("Choose DEX and Trade");
    });

    it("should have Vietnamese how to trade translations", () => {
      expect(translations.vi["howToBuy.title"]).toBe("Cách giao dịch ISC trên Sàn giao dịch phi tập trung");
      expect(translations.vi["howToBuy.subtitle"]).toBe("Giao dịch ISC trên DEX");
      expect(translations.vi["howToBuy.step1.title"]).toBe("Kết nối Ví của bạn");
      expect(translations.vi["howToBuy.step2.title"]).toBe("Chọn DEX và giao dịch");
    });
  });

  describe("FAQ Translations", () => {
    it("should have Chinese FAQ translations", () => {
      expect(translations.zh["faq.title"]).toBeDefined();
      expect(translations.zh["faq.q1"]).toBeDefined();
      expect(translations.zh["faq.q2"]).toBeDefined();
      expect(translations.zh["faq.q3"]).toBeDefined();
    });

    it("should have English FAQ translations", () => {
      expect(translations.en["faq.title"]).toBeDefined();
      expect(translations.en["faq.q1"]).toBeDefined();
      expect(translations.en["faq.q2"]).toBeDefined();
      expect(translations.en["faq.q3"]).toBeDefined();
    });

    it("should have Vietnamese FAQ translations", () => {
      expect(translations.vi["faq.title"]).toBeDefined();
      expect(translations.vi["faq.q1"]).toBeDefined();
      expect(translations.vi["faq.q2"]).toBeDefined();
      expect(translations.vi["faq.q3"]).toBeDefined();
    });
  });

  describe("Security Translations", () => {
    it("should have Chinese security translations", () => {
      expect(translations.zh["security.title"]).toBe("安全与透明");
      expect(translations.zh["security.subtitle"]).toBe("多层保护社区的安全");
      expect(translations.zh["security.card1.title"]).toBe("已验证的智能合约");
      expect(translations.zh["security.card2.title"]).toBe("所有权已放弃");
    });

    it("should have English security translations", () => {
      expect(translations.en["security.title"]).toBe("Security & Transparency");
      expect(translations.en["security.subtitle"]).toBe(
        "Multiple layers of protection for the community"
      );
      expect(translations.en["security.card1.title"]).toBe("Verified Smart Contract");
      expect(translations.en["security.card2.title"]).toBe("Ownership Renounced");
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
        "Quyền sở hữu bị từ bỏ"
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
