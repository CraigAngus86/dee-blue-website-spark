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
