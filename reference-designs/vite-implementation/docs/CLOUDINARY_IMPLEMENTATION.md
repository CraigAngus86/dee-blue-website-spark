
# Cloudinary Implementation for Banks o' Dee FC

This document provides technical details on implementing the Cloudinary integration for the Banks o' Dee FC website.

## Configuration

The Cloudinary project is configured with the following settings:

- **Cloud Name**: dlkpaw2a0
- **Product Environment**: Production
- **Base Folder**: banksofdeefc

## Required Environment Variables

```
CLOUDINARY_CLOUD_NAME=dlkpaw2a0
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Architecture Overview

The Cloudinary integration consists of several modules:

1. **Configuration**: Base setup, folder structure constants, and path utilities
2. **Metadata**: Structured metadata fields and utilities for consistent tagging
3. **Upload**: Utilities for generating correct upload parameters for each content type
4. **Transform**: Image transformation utilities for responsive and optimized delivery
5. **React Hooks**: Custom hooks for using Cloudinary in React components

## Core Files

- `src/lib/cloudinary/config.ts`: Basic configuration and folder structure
- `src/lib/cloudinary/metadata.ts`: Metadata structure and utilities
- `src/lib/cloudinary/upload.ts`: Upload parameter generators for different content types
- `src/lib/cloudinary/transform.ts`: Image transformation utilities
- `src/hooks/useCloudinaryImage.ts`: React hooks for Cloudinary integration

## Implementation Steps for Developers

### 1. Direct API Usage

```typescript
import { cloudinary } from '@/lib/cloudinary';

// Get a transformed image URL
const url = cloudinary.image('banksofdeefc/people/person-123/profile')
  .resize(fill().width(300).height(300))
  .format(auto())
  .quality(auto())
  .toURL();
```

### 2. Using the Transform Utilities

```typescript
import { transformImage, profileImage } from '@/lib/cloudinary/transform';

// Get a generic transformed image
const imageUrl = transformImage('banksofdeefc/news/article-123/featured', {
  width: 800,
  height: 450,
  crop: 'fill'
});

// Get a profile image with face detection
const profileUrl = profileImage('banksofdeefc/people/person-123/profile', 300);
```

### 3. Using React Hooks

```tsx
import { useCloudinaryImage } from '@/hooks/useCloudinaryImage';

function PlayerAvatar({ playerId }: { playerId: string }) {
  const publicId = `banksofdeefc/people/person-${playerId}/profile`;
  const { imageUrl, isLoaded, handleLoad, handleError } = useCloudinaryImage(publicId, {
    width: 200,
    height: 200,
    crop: 'fill',
    focus: 'face'
  });

  return (
    <img 
      src={imageUrl}
      alt={`Player ${playerId}`}
      className={`rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
```

### 4. Generating Upload Parameters

```typescript
import { createPlayerUploadParams } from '@/lib/cloudinary/upload';

// Generate upload parameters for a player profile
const uploadParams = createPlayerUploadParams(
  'player-123',
  'profile'
);

// These parameters can be used with Cloudinary's upload API
```

## Security Considerations

- Use signed uploads for client-side uploading
- Store API secret securely in environment variables
- Use upload presets to restrict what can be uploaded
- Implement proper CORS configuration

## CORS Configuration

The following domains should be allowed in Cloudinary CORS settings:

- `https://banksofdeefc.com`
- `https://www.banksofdeefc.com`
- Your development environments (localhost, etc.)

## Build Errors and Solutions

During implementation, we encountered several Cloudinary-related build errors:

1. **Import issues with text overlay**:
   - **Error**: `Module '"@cloudinary/url-gen/actions/overlay"' has no exported member 'text'`
   - **Solution**: Updated import to use `text` from `'@cloudinary/url-gen/qualifiers/source'` instead

2. **Configuration import errors**:
   - **Error**: `Module '"./config"' has no exported member 'cloudinaryConfig'`
   - **Solution**: Updated import to use `cloudinary` directly from the base module

3. **Type mismatch in focus parameter**:
   - **Error**: `Argument of type 'string' is not assignable to parameter of type 'FocusOnValue'`
   - **Solution**: Modified implementation to use gravity separately from resize

4. **TextStyle method errors**:
   - **Error**: `Property 'textColor' does not exist on type 'TextStyle'`
   - **Solution**: Updated to use `fontColor` method instead

5. **Color constructor issues**:
   - **Error**: `This expression is not constructable`
   - **Solution**: Updated to use string color values directly

All these issues were resolved by updating the code to align with the Cloudinary URL Gen SDK's proper API usage patterns, while maintaining the same functionality.

## Next Steps

1. Configure the Cloudinary Upload Widget for admin interfaces
2. Create a transform plugin for Sanity CMS to integrate with our Cloudinary setup
3. Implement automatic image optimization in the build pipeline
4. Create custom components for different content types (player cards, news images, etc.)

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary URL Gen SDK Reference](https://cloudinary.com/documentation/javascript_integration)
- [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration)
