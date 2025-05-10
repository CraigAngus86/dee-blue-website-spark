
/**
 * Simple in-memory cache for cross-system references
 */

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

interface CacheOptions {
  ttl?: number; // Time-to-live in milliseconds
}

class ReferenceCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTtl: number = 5 * 60 * 1000; // 5 minutes default TTL

  /**
   * Get an item from the cache
   * @param key Cache key
   * @returns Cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    
    if (!item) return undefined;
    
    // Check if the item has expired
    if (Date.now() - item.timestamp > this.defaultTtl) {
      this.delete(key);
      return undefined;
    }
    
    return item.value as T;
  }

  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Value to cache
   * @param options Cache options
   */
  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  /**
   * Delete an item from the cache
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Check if a key exists in the cache
   * @param key Cache key
   * @returns Whether the key exists and is not expired
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) return false;
    
    // Check if the item has expired
    if (Date.now() - item.timestamp > this.defaultTtl) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Execute a function and cache its result
   * @param key Cache key
   * @param fn Function to execute if cache miss
   * @param skipCache Whether to skip the cache
   * @returns Function result, either from cache or fresh execution
   */
  async getOrSet<T>(key: string, fn: () => Promise<T>, skipCache: boolean = false): Promise<T> {
    if (!skipCache) {
      const cached = this.get<T>(key);
      if (cached !== undefined) {
        return cached;
      }
    }
    
    const result = await fn();
    this.set(key, result);
    return result;
  }
}

// Export singleton instance
export const referenceCache = new ReferenceCache();
