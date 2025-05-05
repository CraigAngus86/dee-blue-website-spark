
# Environment Variables Pattern

This project implements a secure and type-safe approach to handling environment variables in a Next.js application. This README documents how to use these utilities properly.

## Core Principles

1. **Server/Client Separation**: Server-only variables are strictly protected from client-side access
2. **Type Safety**: All environment variables are accessed through typed functions
3. **Fallbacks**: Default values are provided for critical configuration
4. **Validation**: Required variables can be validated at runtime

## Usage Examples

### In Server Components or API Routes

```typescript
import { serverEnv, publicEnv } from '@/lib/env';

// Server-side component or API route
export default async function ServerComponent() {
  // Safe to access server-only variables
  const sanityToken = serverEnv.getSanityToken();
  
  // Also safe to access public variables
  const projectId = publicEnv.getSanityProjectId();
  
  // Use these values for server-side operations
  // ...
}
```

### In Client Components

```typescript
import { publicEnv } from '@/lib/env';

// Client-side component
export default function ClientComponent() {
  // Only access public variables
  const cloudName = publicEnv.getCloudinaryCloudName();
  
  // For operations requiring private variables, use API routes
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  };
  
  // ...
}
```

### In Service Clients

```typescript
// In a service client file (e.g., src/lib/sanity/client.ts)
import { publicEnv, serverEnv, isServer } from '@/lib/env';

// Get values safely
const projectId = publicEnv.getSanityProjectId();
const dataset = publicEnv.getSanityDataset();

// Conditionally use server-only values
const token = isServer ? serverEnv.getSanityToken() : undefined;

// Initialize client with appropriate values
const client = createClient({
  projectId,
  dataset,
  token,
  // ...
});
```

## Environment Variables

### Public Variables (NEXT_PUBLIC_*)

These can be used in both client and server components:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION`: Sanity API version
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_SITE_URL`: Website URL

### Private Variables (Server Only)

These can only be used in server components or API routes:

- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `SANITY_API_TOKEN`: Sanity API token
- `SANITY_PREVIEW_SECRET`: Sanity preview secret
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

## Best Practices

1. **Never** access `process.env` directly; always use the environment utilities
2. For client components needing private variables, create API routes
3. Use the `isServer` helper to prevent accidental usage of server variables
4. Always provide fallbacks for non-critical variables

## Troubleshooting

If you encounter errors related to environment variables:

1. Check that you're using the correct utility function
2. Verify that server-only variables are not being accessed in client components
3. Ensure that all required variables are set in your environment
4. Check API routes for proper error handling
