// Reference cache system for cross-system utilities

export const referenceCache = new Map<string, any>();

export function cacheReference(key: string, value: any): void {
  referenceCache.set(key, value);
}

export function getCachedReference(key: string): any {
  return referenceCache.get(key);
}

export function clearCache(): void {
  referenceCache.clear();
}

// Add the getOrSet method that cross-system files expect
referenceCache.getOrSet = async function<T>(
  key: string, 
  factory: () => Promise<T>, 
  skipCache: boolean = false
): Promise<T> {
  if (!skipCache && this.has(key)) {
    return this.get(key);
  }
  
  const value = await factory();
  this.set(key, value);
  return value;
};

// Extend the Map type to include our custom method
declare global {
  interface Map<K, V> {
    getOrSet<T>(key: K, factory: () => Promise<T>, skipCache?: boolean): Promise<T>;
  }
}
