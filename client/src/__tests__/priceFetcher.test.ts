/**
 * Price Fetcher Unit Tests
 * Tests for the DexScreener price fetching module with:
 * - Successful price fetch
 * - Rate limiting (429)
 * - Network errors
 * - Empty data / no pairs
 * - TTL cache behavior
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchISCPrice, clearPriceCache, getCacheStatus } from '@/lib/priceFetcher';

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Price Fetcher Module', () => {
  beforeEach(() => {
    clearPriceCache();
    mockFetch.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Successful fetch', () => {
    it('should return formatted price on successful API response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('success');
      if (result.status === 'success') {
        expect(result.price).toBeCloseTo(0.0006584);
        expect(result.formattedPrice).toBe('1 ISC = $0.0006584');
        expect(result.pairName).toBe('ISC/USDT');
        expect(result.lastUpdated).toBeGreaterThan(0);
      }
    });

    it('should format price with 4 decimals when >= 0.01', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '1.2345',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('success');
      if (result.status === 'success') {
        expect(result.formattedPrice).toBe('1 ISC = $1.2345');
      }
    });

    it('should format price with 7 decimals when < 0.01', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0000012',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('success');
      if (result.status === 'success') {
        expect(result.formattedPrice).toBe('1 ISC = $0.0000012');
      }
    });
  });

  describe('Rate limiting (429)', () => {
    it('should return rate_limit error after max retries', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({}),
      });

      const resultPromise = fetchISCPrice();
      
      // Advance timers for retries
      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);
      await vi.advanceTimersByTimeAsync(8000);
      
      const result = await resultPromise;
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('rate_limit');
      }
    });
  });

  describe('Network errors', () => {
    it('should return network error when fetch throws', async () => {
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      const resultPromise = fetchISCPrice();
      
      // Advance timers for retries
      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);
      await vi.advanceTimersByTimeAsync(8000);
      
      const result = await resultPromise;
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('network');
        expect(result.message).toContain('Network error');
      }
    });

    it('should return timeout error when request is aborted', async () => {
      const abortError = new Error('The operation was aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValue(abortError);

      const resultPromise = fetchISCPrice();
      
      // Advance timers for retries
      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);
      await vi.advanceTimersByTimeAsync(8000);
      
      const result = await resultPromise;
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('timeout');
        expect(result.message).toContain('timed out');
      }
    });
  });

  describe('Empty data / no pairs', () => {
    it('should return no_pair error when pairs array is empty', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ pairs: [] }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('no_pair');
        expect(result.message).toContain('No trading pairs');
      }
    });

    it('should return no_pair error when pairs is null', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ pairs: null }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('no_pair');
      }
    });

    it('should return no_pair error when price is NaN', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: 'invalid',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      const result = await fetchISCPrice();
      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.errorType).toBe('no_pair');
      }
    });
  });

  describe('TTL Cache', () => {
    it('should cache successful results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      await fetchISCPrice();
      
      // Second call should use cache
      const result = await fetchISCPrice();
      expect(result.status).toBe('success');
      expect(mockFetch).toHaveBeenCalledTimes(1); // Only one actual fetch
    });

    it('should return stale cache on error after successful fetch', async () => {
      // First successful fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      await fetchISCPrice();
      
      // Advance time past cache TTL
      vi.advanceTimersByTime(61000);
      
      // Now fetch fails
      mockFetch.mockRejectedValue(new Error('Network error'));
      
      const resultPromise = fetchISCPrice();
      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);
      await vi.advanceTimersByTimeAsync(8000);
      
      const result = await resultPromise;
      // Should return stale cached data
      expect(result.status).toBe('success');
    });

    it('should report cache status correctly', async () => {
      expect(getCacheStatus().isCached).toBe(false);
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      await fetchISCPrice();
      
      const status = getCacheStatus();
      expect(status.isCached).toBe(true);
      expect(status.age).toBeGreaterThanOrEqual(0);
    });

    it('should clear cache when clearPriceCache is called', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      await fetchISCPrice();
      expect(getCacheStatus().isCached).toBe(true);
      
      clearPriceCache();
      expect(getCacheStatus().isCached).toBe(false);
    });
  });

  describe('Retry behavior', () => {
    it('should retry on server error and succeed on second attempt', async () => {
      // First call fails with 500
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      });
      
      // Second call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          pairs: [{
            priceUsd: '0.0006584',
            baseToken: { symbol: 'ISC' },
            quoteToken: { symbol: 'USDT' },
            pairAddress: '0xabc123',
          }],
        }),
      });

      const resultPromise = fetchISCPrice();
      await vi.advanceTimersByTimeAsync(2000);
      
      const result = await resultPromise;
      expect(result.status).toBe('success');
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
