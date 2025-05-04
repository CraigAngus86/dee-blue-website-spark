
/**
 * Simple cache implementation for cross-system references
 */

import { ReferenceCache } from './types';

// Simple in-memory cache implementation
class InMemoryCache implements ReferenceCache {
  private cache: Map<string, any>;
  private maxSize: number;
  
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  /**
   * Get a value from cache or compute and store it
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, skipCache = false): Promise<T> {
    // Skip cache if requested
    if (skipCache) {
      const value = await factory();
      this.set(key, value);
      return value;
    }
    
    // Ensure we have a valid key
    if (!key) {
      console.warn('Invalid cache key provided');
      return await factory();
    }
    
    // Check cache first
    const cachedValue = this.cache.get(key);
    if (cachedValue !== undefined) {
      return cachedValue as T;
    }
    
    // Compute value and store in cache
    const value = await factory();
    this.set(key, value);
    return value;
  }
  
  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!key) return null;
    const value = this.cache.get(key);
    return value !== undefined ? value as T : null;
  }
  
  /**
   * Set a value in cache
   */
  set<T>(key: string, value: T): void {
    if (!key) return;
    
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, value);
  }
  
  /**
   * Clear the cache
   */
  clear(): void {
    this.cache.clear();
  }
}

// Create and export the cache instance
export const referenceCache = new InMemoryCache();
