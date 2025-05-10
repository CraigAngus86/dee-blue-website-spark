import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

/**
 * Get the Supabase URL - throws meaningful errors if not set
 */
const getSupabaseUrl = (): string => {
  if (!env.supabase.url) {
    throw new Error('Supabase URL is missing. Please check your environment variables.');
  }
  
  return env.supabase.url;
};

/**
 * Get the Supabase anon key - throws meaningful errors if not set
 */
const getSupabaseAnonKey = (): string => {
  if (!env.supabase.anonKey) {
    throw new Error('Supabase anon key is missing. Please check your environment variables.');
  }
  
  return env.supabase.anonKey;
};

// Client for browser usage (client-side)
export const supabase = createClient(
  getSupabaseUrl(),
  getSupabaseAnonKey(),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Types for database
export type Database = any; // Replace with generated types once available

// Create a server-side client (for use in Server Components)
export const createServerClient = (cookieStore?: any) => {
  // For server-side only operations
  if (env.isServer) {
    const serviceKey = env.supabase.serviceKey;
    if (serviceKey) {
      // Use service role if available (admin privileges)
      return createClient(getSupabaseUrl(), serviceKey, {
        auth: {
          persistSession: false,
        },
      });
    }
  }
  
  // Regular client with cookie integration for Server Components
  return createClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: {
        persistSession: false,
      },
      // We can add cookies for server components here when needed
      // global: {
      //   headers: {
      //     cookie: // cookie header
      //   },
      // },
    }
  );
};

// Create a service role client (SERVER ONLY)
export const createServiceClient = () => {
  if (!env.isServer) {
    console.error('SECURITY WARNING: Attempting to create service client on client-side');
    return null;
  }
  
  const serviceKey = env.supabase.serviceKey;
  if (!serviceKey) {
    console.error('Supabase service key is missing');
    return null;
  }
  
  return createClient(getSupabaseUrl(), serviceKey, {
    auth: {
      persistSession: false,
    }
  });
};
