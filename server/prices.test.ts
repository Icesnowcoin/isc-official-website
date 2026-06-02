/**
 * Price API Tests
 * Tests for cryptocurrency price queries and operations
 */

import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('Prices API', () => {
  const ctx = createPublicContext();
  const caller = appRouter.createCaller(ctx);

  describe('prices.current', () => {
    it('should return null for non-existent token', async () => {
      const result = await caller.prices.current({ symbol: 'NONEXISTENT' });
      expect(result).toBeNull();
    });

    it('should accept uppercase and lowercase symbols', async () => {
      const resultUpper = await caller.prices.current({ symbol: 'BTC' });
      const resultLower = await caller.prices.current({ symbol: 'btc' });
      // Both should return the same type of result
      if (resultUpper === null && resultLower === null) {
        expect(resultUpper).toBeNull();
        expect(resultLower).toBeNull();
      } else if (resultUpper && resultLower) {
        // Compare key fields (timestamps may differ slightly)
        expect(resultUpper.symbol).toEqual(resultLower.symbol);
        expect(resultUpper.price).toEqual(resultLower.price);
      }
    });
  });

  describe('prices.multiple', () => {
    it('should return empty array for empty symbols', async () => {
      const result = await caller.prices.multiple({ symbols: [] });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle mixed case symbols', async () => {
      const result = await caller.prices.multiple({ 
        symbols: ['BTC', 'eth', 'ISC'] 
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('prices.all', () => {
    it('should return array of all prices', async () => {
      const result = await caller.prices.all();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('prices.history', () => {
    it('should accept valid symbol and days parameter', async () => {
      const result = await caller.prices.history({ 
        symbol: 'BTC', 
        days: 30 
      });
      expect(Array.isArray(result)).toBe(true);
    });

    it('should use default days value', async () => {
      const result = await caller.prices.history({ symbol: 'BTC' });
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle various day ranges', async () => {
      const result7 = await caller.prices.history({ symbol: 'BTC', days: 7 });
      const result30 = await caller.prices.history({ symbol: 'BTC', days: 30 });
      const result90 = await caller.prices.history({ symbol: 'BTC', days: 90 });
      
      expect(Array.isArray(result7)).toBe(true);
      expect(Array.isArray(result30)).toBe(true);
      expect(Array.isArray(result90)).toBe(true);
    });
  });

  describe('prices.stats', () => {
    it('should return null for non-existent token', async () => {
      const result = await caller.prices.stats({ symbol: 'NONEXISTENT' });
      expect(result).toBeNull();
    });

    it('should accept valid symbol', async () => {
      const result = await caller.prices.stats({ symbol: 'BTC' });
      // Result can be null (no data) or an object with stats
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('prices.top', () => {
    it('should return array of top tokens', async () => {
      const result = await caller.prices.top({ limit: 10 });
      expect(Array.isArray(result)).toBe(true);
    });

    it('should use default limit value', async () => {
      const result = await caller.prices.top({});
      expect(Array.isArray(result)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const result5 = await caller.prices.top({ limit: 5 });
      const result10 = await caller.prices.top({ limit: 10 });
      
      expect(Array.isArray(result5)).toBe(true);
      expect(Array.isArray(result10)).toBe(true);
      expect(result5.length).toBeLessThanOrEqual(5);
      expect(result10.length).toBeLessThanOrEqual(10);
    });
  });
});
