
import { createClient } from '@supabase/supabase-js';
import { publicEnv, serverEnv, isServer } from '@/lib/env';

// Get environment variables from our utilities
const supabaseUrl = publicEnv.getSupabaseUrl();
const supabaseAnonKey = publicEnv.getSupabaseAnonKey();

// Log warnings if environment variables are missing
if (!supabaseUrl || supabaseUrl === '') {
  console.error('Supabase configuration error: NEXT_PUBLIC_SUPABASE_URL is missing.');
}

if (!supabaseAnonKey || supabaseAnonKey === '') {
  console.error('Supabase configuration error: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
}

// Client for browser usage (client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Types for database
export type Database = any; // Replace with generated types once available

// Create a server-side client (for use in Server Components)
export const createServerClient = (cookieStore?: any) => {
  // For server-side only operations
  if (isServer) {
    const serviceKey = serverEnv.getSupabaseServiceKey();
    if (serviceKey) {
      // Use service role if available (admin privileges)
      return createClient(supabaseUrl, serviceKey, {
        auth: {
          persistSession: false,
        },
      });
    }
  }
  
  // Regular client with cookie integration for Server Components
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
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
  
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
    }
  });
};
