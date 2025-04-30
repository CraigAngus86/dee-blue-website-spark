# Cloudinary Upload Workflows

This document outlines the upload workflows and integration patterns for working with Cloudinary in the Banks o' Dee FC website.

## Overview

Our Cloudinary implementation provides several upload patterns depending on the context:

1. **Sanity CMS Integration** - For editorial content managed through the CMS
2. **Direct Uploads** - For programmatic uploads from the application
3. **Signed Uploads** - For secure client-side uploads

## Upload Patterns

### 1. Sanity CMS Integration

The Sanity CMS integration allows content editors to upload images directly through the Sanity Studio interface. These images are stored in Cloudinary but referenced in Sanity documents.

#### Configuration

The integration is configured in the Sanity Studio using the `sanity-plugin-cloudinary` plugin:

```javascript
// sanity-studio/sanity.config.js
import { defineConfig } from 'sanity';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';

export default defineConfig({
  // ... other config
  plugins: [
    // ... other plugins
    cloudinaryAssetSourcePlugin({
      cloudName: 'dlkpaw2a0',
      apiKey: 'YOUR_API_KEY', // from environment variables
      folders: {
        // Map document types to folders
        newsArticle: 'banksofdeefc/news/article-{_id}',
        playerProfile: 'banksofdeefc/people/person-{_id}',
        // ... other document types
      },
      // Default metadata fields
      metadata: {
        alt: '{title}', // Template pattern using document fields
        caption: '{description}',
        credit: 'Banks o\' Dee FC'
      }
    })
  ]
});
```

#### Usage in Sanity Schemas

To use Cloudinary as the asset source in your schema:

```javascript
// sanity-studio/schemas/documents/newsArticle.js
export default {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    // ... other fields
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'cloudinary.asset',
      description: 'Featured image for the article',
      options: {
        folder: 'banksofdeefc/news/article-{_id}',
        metadata: ['alt', 'caption', 'credit'],
        // Set default metadata for this specific field
        defaultValues: {
          alt: '{title}',
          context: {
            custom: {
              alt: '{title}',
              caption: '{excerpt}'
            }
          },
          tags: ['news', 'featured']
        }
      }
    },
    // ... other fields
  ]
}
```

### 2. Direct Uploads (Server-side)

For programmatic uploads that don't involve user interaction, the `CloudinaryService` class provides server-side upload capabilities.

```typescript
import { CloudinaryService } from '@/lib/cloudinary/service';
import { ContentType } from '@/lib/cloudinary/metadata';

// Example: Upload a player profile image
async function uploadPlayerProfile(playerId: string, imageFile: File) {
  try {
    const result = await CloudinaryService.uploadMedia(
      imageFile,
      ContentType.PLAYER,
      playerId,
      {
        type: 'profile',
        metadata: {
          alt: `Player profile for ${playerName}`,
          playerId
        },
        tags: ['player', 'profile']
      }
    );
    
    console.log('Upload successful:', result);
    return result.publicId;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

### 3. Client-side Uploads (React)

For client-side uploads in React components, use the `useCloudinaryUpload` hook:

```tsx
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { ContentType } from '@/lib/cloudinary/metadata';

function PlayerProfileUploader({ playerId, playerName }) {
  const { uploadFile, isUploading, progress, error, result } = useCloudinaryUpload();
  
  async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    await uploadFile(file, {
      contentType: ContentType.PLAYER,
      entityId: playerId,
      type: 'profile',
      metadata: {
        playerName,
        altText: `${playerName} - profile photo`
      },
      tags: ['player', 'profile']
    });
  }
  
  return (
    <div>
      <input type="file" onChange={handleFileSelect} disabled={isUploading} />
      {isUploading && <div>Uploading: {progress}%</div>}
      {error && <div>Error: {error.message}</div>}
      {result && <div>Upload complete: {result.publicId}</div>}
    </div>
  );
}
```

## Signed Uploads

For secure client-side uploads, we use signed upload parameters. This requires a server endpoint to generate the signature:

```typescript
// Server-side API endpoint (Next.js example)
export async function POST(req) {
  const { contentType, entityId, options } = await req.json();
  
  // Generate signed upload parameters
  const uploadParams = CloudinaryService.generateSignedUploadParams(
    contentType,
    entityId,
    options
  );
  
  return Response.json({ uploadParams });
}
```

Then on the client:

```typescript
// Client-side upload with signed parameters
async function uploadWithSignature(file, contentType, entityId, options = {}) {
  // 1. Get signed upload parameters from server
  const response = await fetch('/api/cloudinary/sign-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType, entityId, options })
  });
  
  const { uploadParams } = await response.json();
  
  // 2. Create form data for upload
  const formData = new FormData();
  Object.entries(uploadParams).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);
  
  // 3. Upload directly to Cloudinary
  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${uploadParams.cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  return uploadResponse.json();
}
```

## Security Best Practices

1. **Never expose API Secret** - The Cloudinary API secret should never be included in client-side code. Use signed uploads.

2. **Use Upload Presets** - For simplified uploads, create upload presets in the Cloudinary console that restrict options.

3. **Validate Files** - Always validate file types and sizes before uploading.

4. **Set Upload Limits** - Configure max file sizes and allowed formats.

5. **Restrict CORS** - Configure Cloudinary's CORS settings to only allow uploads from your domains.

## Environment Variables

Required environment variables for Cloudinary integration:

```
CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Integration with Next.js

When transitioning to Next.js, the same upload utilities can be used with minimal changes:

1. Move server-side functionality to API routes or serverless functions
2. Keep the client-side hooks and components as-is
3. Leverage Next.js Image component with Cloudinary loader

Example Next.js Image component with Cloudinary:

```tsx
import Image from 'next/image';
import { playerProfileSquare } from '@/lib/cloudinary/transform';

function PlayerProfileImage({ playerId, name, size = 300 }) {
  const publicId = `banksofdeefc/people/person-${playerId}/profile`;
  const imageUrl = playerProfileSquare(publicId, size);
  
  return (
    <Image
      src={imageUrl}
      width={size}
      height={size}
      alt={`${name} - Player Profile`}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..."
    />
  );
}
```

## Troubleshooting

### Common Issues and Solutions

1. **Upload Fails with 401**
   - Check API key and secret
   - Verify upload preset permissions

2. **Images Not Appearing in Folder Structure**
   - Verify folder parameter in upload request
   - Check folder permissions in Cloudinary console

3. **Transformations Not Working**
   - Ensure public ID is correct
   - Check for typos in transformation parameters

4. **CORS Issues During Upload**
   - Add your domain to allowed origins in Cloudinary settings
   - Check if you're using the correct upload endpoint

## Seeking Support

For further assistance:
- Check the [Cloudinary documentation](https://cloudinary.com/documentation)
- Review the [Sanity Cloudinary Plugin docs](https://github.com/sanity-io/sanity-plugin-cloudinary)
- Contact the development team via Slack
