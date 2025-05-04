
/**
 * Cache utility for cross-system reference resolution
 * to avoid repeated API calls for the same data
 */

type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

interface CacheOptions {
  ttl?: number; // Time-to-live in milliseconds
  maxSize?: number; // Maximum number of entries in cache
}

class ReferenceCache {
  private cache: Map<string, CacheEntry<any>>;
  private ttl: number;
  private maxSize: number;

  constructor(options: CacheOptions = {}) {
    const { ttl = 5 * 60 * 1000, maxSize = 1000 } = options; // Default 5 mins TTL, 1000 max entries
    this.cache = new Map();
    this.ttl = ttl;
    this.maxSize = maxSize;
  }

  /**
   * Get a value from cache or create it using the provided factory function
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, skipCache: boolean = false): Promise<T> {
    // Ensure we have a valid string key
    const cacheKey = key || 'null-key';
    
    if (!skipCache) {
      const cached = this.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    const value = await factory();
    this.set(cacheKey, value);
    return value;
  }

  /**
   * Get a value from cache if it exists and is not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Set a value in the cache
   */
  set<T>(key: string, value: T): void {
    // If at max size, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
  }
}

// Singleton instance for use throughout the app
export const referenceCache = new ReferenceCache();

// Export class for custom instances
export { ReferenceCache };
