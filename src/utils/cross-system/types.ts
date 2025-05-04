
/**
 * Types for cross-system reference handling
 */

export interface ReferenceOptions {
  /** Skip cache and force fresh lookup */
  skipCache?: boolean;
  /** Additional fetch options */
  fetchOptions?: RequestInit;
  /** Include related documents */
  includeRelated?: boolean;
  /** Deep populate nested references */
  deepPopulate?: boolean;
}

export interface ResolvedReference<T, U> {
  source: T;
  target: U;
  resolvedAt: Date;
}

// ReferenceCache is implemented in cache.ts, so we just declare the interface here
export interface ReferenceCache {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): void;
  getOrSet<T>(key: string, factory: () => Promise<T>, skipCache?: boolean): Promise<T>;
  clear(): void;
  delete(key: string): boolean;
}
