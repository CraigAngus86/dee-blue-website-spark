/**
 * Simplified environment variables for Banks o' Dee FC website
 */
// Helper function for safer env var access with optional validation
function getEnvVar(key: string, defaultValue: string = '', required: boolean = false): string {
  const value = process.env[key] || defaultValue;
  
  if (required && !value) {
    throw new Error(`Required environment variable ${key} is missing`);
  }
  
  return value;
}
export const env = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://bbbxhwaixjjxgboeiktq.supabase.co'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiYnhod2FpeGpqeGdib2Vpa3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzA1NzMsImV4cCI6MjA1ODQwNjU3M30.ZZEenwbdq-bGlya3R2yvuspOlKMqkBp6tzC3TAdKGcQ'),
    serviceKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  sanity: {
    projectId: getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID', 'gxtptap2'),
    dataset: getEnvVar('NEXT_PUBLIC_SANITY_DATASET', 'production'),
    apiVersion: getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION', '2024-04-30'),
    token: getEnvVar('SANITY_API_TOKEN'),
    previewSecret: getEnvVar('SANITY_PREVIEW_SECRET'),
  },
  cloudinary: {
    cloudName: getEnvVar('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'dlkpaw2a0'),
    apiKey: getEnvVar('CLOUDINARY_API_KEY'),
    apiSecret: getEnvVar('CLOUDINARY_API_SECRET'),
  },
  mapbox: {
    accessToken: getEnvVar('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN', ''),
  },
  site: {
    url: getEnvVar('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  },
  isServer: typeof window === 'undefined',
  
  // Utility to enforce server-side usage
  ensureServerSide(variableName: string): void {
    if (!this.isServer) {
      console.error(`SECURITY WARNING: Attempting to access server-only variable '${variableName}' in client component`);
      throw new Error(`Cannot access '${variableName}' on the client side`);
    }
  }
};
