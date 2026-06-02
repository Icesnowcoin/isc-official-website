/**
 * ISC Price Fetcher Module
 * 
 * Fetches ISC token price from DexScreener API with:
 * - TTL cache (60 seconds)
 * - Request timeout (10 seconds)
 * - Exponential backoff retry (max 3 attempts)
 * - Structured error states
 */

export type PriceState = 
  | { status: 'loading' }
  | { status: 'success'; price: number; formattedPrice: string; pairName: string; lastUpdated: number }
  | { status: 'error'; errorType: 'rate_limit' | 'network' | 'no_pair' | 'timeout' | 'unknown'; message: string };

const ISC_CONTRACT = '0x11229a3f976566FA8a3ba462C432122f3B8876f6';
const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${ISC_CONTRACT}`;
const CACHE_TTL_MS = 60_000; // 60 seconds
const REQUEST_TIMEOUT_MS = 10_000; // 10 seconds
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000; // 1 second base for exponential backoff

// In-memory cache
let cachedResult: { data: PriceState; timestamp: number } | null = null;

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Calculate exponential backoff delay
 */
function getBackoffDelay(attempt: number): number {
  return BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
}

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse DexScreener API response into PriceState
 */
function parseResponse(data: any): PriceState {
  const pairs = data?.pairs;
  
  if (!pairs || pairs.length === 0) {
    return {
      status: 'error',
      errorType: 'no_pair',
      message: 'No trading pairs found for ISC token',
    };
  }

  const price = parseFloat(pairs[0].priceUsd);
  if (!price || isNaN(price)) {
    return {
      status: 'error',
      errorType: 'no_pair',
      message: 'Invalid price data from trading pair',
    };
  }

  const formattedPrice = `1 ISC = $${price < 0.01 ? price.toFixed(7) : price.toFixed(4)}`;
  const pairName = pairs[0].pairAddress 
    ? `${pairs[0].baseToken?.symbol || 'ISC'}/${pairs[0].quoteToken?.symbol || 'USDT'}`
    : 'ISC/USDT';

  return {
    status: 'success',
    price,
    formattedPrice,
    pairName,
    lastUpdated: Date.now(),
  };
}



/**
 * Main price fetcher with cache, timeout, and retry
 */
export async function fetchISCPrice(): Promise<PriceState> {
  // Check cache first
  if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_TTL_MS) {
    return cachedResult.data;
  }

  let lastError: PriceState | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(DEXSCREENER_API, REQUEST_TIMEOUT_MS);

      if (response.status === 429) {
        lastError = {
          status: 'error',
          errorType: 'rate_limit',
          message: 'API rate limit exceeded. Retrying...',
        };
        if (attempt < MAX_RETRIES - 1) {
          await sleep(getBackoffDelay(attempt));
          continue;
        }
        break;
      }

      if (!response.ok) {
        lastError = {
          status: 'error',
          errorType: 'unknown',
          message: `API returned status ${response.status}`,
        };
        if (attempt < MAX_RETRIES - 1) {
          await sleep(getBackoffDelay(attempt));
          continue;
        }
        break;
      }

      const data = await response.json();
      const result = parseResponse(data);

      // Cache successful results
      if (result.status === 'success') {
        cachedResult = { data: result, timestamp: Date.now() };
      }

      return result;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        lastError = {
          status: 'error',
          errorType: 'timeout',
          message: 'Request timed out. Please check your connection.',
        };
      } else {
        lastError = {
          status: 'error',
          errorType: 'network',
          message: 'Network error. Please check your connection.',
        };
      }

      if (attempt < MAX_RETRIES - 1) {
        await sleep(getBackoffDelay(attempt));
        continue;
      }
    }
  }

  // If all retries failed but we have stale cache, return it
  if (cachedResult && cachedResult.data.status === 'success') {
    return cachedResult.data;
  }

  return lastError || {
    status: 'error',
    errorType: 'unknown',
    message: 'Failed to fetch price after multiple attempts',
  };
}

/**
 * Clear the price cache (useful for testing)
 */
export function clearPriceCache(): void {
  cachedResult = null;
}

/**
 * Get cache status (useful for debugging)
 */
export function getCacheStatus(): { isCached: boolean; age: number | null } {
  if (!cachedResult) return { isCached: false, age: null };
  return { isCached: true, age: Date.now() - cachedResult.timestamp };
}
