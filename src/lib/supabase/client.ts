
import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log warnings if environment variables are missing
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Supabase configuration error: NEXT_PUBLIC_SUPABASE_URL is missing.');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
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
