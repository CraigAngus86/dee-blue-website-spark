/**
 * Simple cache system for cross-system references
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

class ReferenceCache {
  private cache: Record<string, CacheEntry<any>> = {};
  private readonly ttlMs: number = 5 * 60 * 1000; // 5 minutes default TTL

  constructor(ttlMs?: number) {
    if (ttlMs) {
      this.ttlMs = ttlMs;
    }
  }

  /**
   * Get a value from the cache or set it if not present
   */
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, skipCache = false): Promise<T> {
    // If skipCache is true or we're in development, bypass cache
    if (skipCache || process.env.NODE_ENV === 'development') {
      return await fetcher();
    }

    const now = Date.now();
    const cachedEntry = this.cache[key];

    // Return cached value if present and not expired
    if (cachedEntry && now - cachedEntry.timestamp < this.ttlMs) {
      return cachedEntry.value;
    }

    // Otherwise fetch fresh data
    const value = await fetcher();
    this.cache[key] = { value, timestamp: now };
    return value;
  }

  /**
   * Manually set a value in the cache
   */
  set<T>(key: string, value: T): void {
    this.cache[key] = {
      value,
      timestamp: Date.now()
    };
  }

  /**
   * Manually invalidate a cache entry
   */
  invalidate(key: string): boolean {
    if (this.cache[key]) {
      delete this.cache[key];
      return true;
    }
    return false;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache = {};
  }

  /**
   * Get the size of the cache
   */
  get size(): number {
    return Object.keys(this.cache).length;
  }
}

// Export a singleton instance
export const referenceCache = new ReferenceCache();
