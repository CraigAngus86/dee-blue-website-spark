
import { createClient } from '@supabase/supabase-js';
import { publicEnv, serverEnv, isServer } from '@/lib/env';

/**
 * Get the Supabase URL - throws meaningful errors if not set
 */
const getSupabaseUrl = (): string => {
  const supabaseUrl = publicEnv.getSupabaseUrl();
  
  if (!supabaseUrl) {
    throw new Error('Supabase URL is missing. Please check your environment variables.');
  }
  
  return supabaseUrl;
};

/**
 * Get the Supabase anon key - throws meaningful errors if not set
 */
const getSupabaseAnonKey = (): string => {
  const supabaseAnonKey = publicEnv.getSupabaseAnonKey();
  
  if (!supabaseAnonKey) {
    throw new Error('Supabase anon key is missing. Please check your environment variables.');
  }
  
  return supabaseAnonKey;
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
  if (isServer) {
    const serviceKey = serverEnv.getSupabaseServiceKey();
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
  if (!isServer) {
    console.error('SECURITY WARNING: Attempting to create service client on client-side');
    return null;
  }
  
  const serviceKey = serverEnv.getSupabaseServiceKey();
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
