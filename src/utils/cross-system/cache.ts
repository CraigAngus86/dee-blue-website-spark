
/**
 * Cache management for cross-system references
 * 
 * This module provides a simple in-memory cache system for storing
 * resolved references between Sanity and Supabase. This helps reduce
 * duplicate API calls and improve performance.
 */

interface CacheOptions {
  /** Time-to-live in seconds, defaults to 5 minutes */
  ttl?: number;
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

/**
 * Reference Cache implementation
 */
export class ReferenceCache {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTtl: number;  // in milliseconds
  
  constructor(defaultTtlSeconds = 300) {  // default 5 minutes
    this.cache = new Map();
    this.defaultTtl = defaultTtlSeconds * 1000;
  }
  
  /**
   * Get a value from cache if it exists and is not expired
   * @param key Cache key
   * @returns The cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }
    
    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.defaultTtl) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.value;
  }
  
  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Value to cache
   */
  set<T>(key: string, value: T): void {
    if (key === undefined || key === null) {
      console.error('Cache key cannot be null or undefined');
      return;
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  /**
   * Get a value from cache, or set it using the provided factory function
   * @param key Cache key
   * @param factory Function to create the value if not in cache
   * @param skipCache Force skip cache and generate new value
   * @returns The cached or newly created value
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, skipCache = false): Promise<T> {
    if (!skipCache) {
      const cachedValue = this.get<T>(key);
      if (cachedValue !== undefined) {
        return cachedValue;
      }
    }
    
    // Create new value
    const value = await factory();
    this.set(key, value);
    return value;
  }
  
  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Delete a specific key from the cache
   * @param key Cache key to delete
   * @returns True if key was found and deleted
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

// Create a singleton instance of the cache
export const referenceCache = new ReferenceCache();
