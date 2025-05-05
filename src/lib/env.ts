
/**
 * Environment variable utilities for Banks o' Dee FC website
 * This file provides a type-safe way to access environment variables
 * with proper validation and fallbacks.
 */

/**
 * Get an environment variable with optional validation and fallback
 * @param key The environment variable name
 * @param defaultValue Optional fallback value if not found
 * @param required Whether the variable is required (throws error if missing)
 * @returns The environment variable value or fallback
 */
export function getEnv(key: string, defaultValue?: string, required = false): string {
  const value = process.env[key] || defaultValue;
  
  if (!value && required) {
    throw new Error(`Required environment variable ${key} is missing`);
  }
  
  return value || '';
}

/**
 * Check if code is running on the server
 * Used to guard against accessing server-only env vars in client components
 */
export const isServer = typeof window === 'undefined';

/**
 * Server-only environment variables
 * These functions should ONLY be called from server components or API routes
 */
export const serverEnv = {
  // Sanity configuration
  getSanityToken: () => {
    if (!isServer) {
      console.error('SECURITY WARNING: Attempting to access server-only Sanity token in client component');
      return '';
    }
    return getEnv('SANITY_API_TOKEN', '', true);
  },
  
  getSanityPreviewSecret: () => {
    if (!isServer) {
      console.error('SECURITY WARNING: Attempting to access server-only Sanity preview secret in client component');
      return '';
    }
    return getEnv('SANITY_PREVIEW_SECRET', '');
  },
  
  // Cloudinary configuration
  getCloudinaryApiKey: () => {
    if (!isServer) {
      console.error('SECURITY WARNING: Attempting to access server-only Cloudinary API key in client component');
      return '';
    }
    return getEnv('CLOUDINARY_API_KEY', '', true);
  },
  
  getCloudinaryApiSecret: () => {
    if (!isServer) {
      console.error('SECURITY WARNING: Attempting to access server-only Cloudinary API secret in client component');
      return '';
    }
    return getEnv('CLOUDINARY_API_SECRET', '', true);
  },
  
  // Supabase configuration
  getSupabaseServiceKey: () => {
    if (!isServer) {
      console.error('SECURITY WARNING: Attempting to access server-only Supabase service key in client component');
      return '';
    }
    return getEnv('SUPABASE_SERVICE_ROLE_KEY', '', true);
  },
};

/**
 * Public environment variables
 * These are safe to use in both client and server components
 */
export const publicEnv = {
  // Sanity configuration
  getSanityProjectId: () => getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'gxtptap2'),
  getSanityDataset: () => getEnv('NEXT_PUBLIC_SANITY_DATASET', 'production'),
  getSanityApiVersion: () => getEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-04-30'),
  
  // Cloudinary configuration
  getCloudinaryCloudName: () => getEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'dlkpaw2a0'),
  
  // Supabase configuration
  getSupabaseUrl: () => getEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://bbbxhwaixjjxgboeiktq.supabase.co'),
  getSupabaseAnonKey: () => getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
  
  // Site configuration
  getSiteUrl: () => getEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
};
