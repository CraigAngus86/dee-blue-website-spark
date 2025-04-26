
/// <reference types="vite/client" />

// Next.js specific type extensions
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  }
}

// Extend window with Next.js specific properties
interface Window {
  __NEXT_DATA__: any;
}
