
# Cloudinary Transformation Presets

This document details all the transformation presets available for the Banks o' Dee FC website, explaining when and how to use each preset.

## Overview

Our Cloudinary implementation provides a set of standardized transformation presets for different content types and display contexts. These ensure consistent image rendering, optimal performance, and proper responsiveness across the site.

## Responsive Design

All presets support responsive variants through the `deviceSize` parameter:

- **sm**: Mobile devices (max-width: 640px)
- **md**: Tablets (max-width: 1024px)
- **lg**: Desktop (max-width: 1280px)
- **xl**: Large desktop (1280px+)

## Player Image Transformations

### Player Profile Square

Creates a square (1:1) player profile image, perfect for team grid layouts.

```typescript
import { playerProfileSquare } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = playerProfileSquare('banksofdeefc/people/person-123/profile', 300);

// Responsive variant for mobile
const mobileImageUrl = playerProfileSquare('banksofdeefc/people/person-123/profile', 300, 'sm');
```

**Use Cases**:
- Team grid pages (like our Team & Management page)
- Player listings in sidebars
- Squad selection interfaces

### Player Profile Featured

Creates a player profile image with 3:4 aspect ratio, showing more of the upper body. Ideal for featured player cards.

```typescript
import { playerProfileFeatured } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = playerProfileFeatured('banksofdeefc/people/person-123/profile', 400);

// Responsive variant for desktop
const desktopImageUrl = playerProfileFeatured('banksofdeefc/people/person-123/profile', 400, 'lg');
```

**Use Cases**:
- Featured player profile cards
- Player detail pages
- Player highlight sections

### Player Action Shot

Transforms player action photos with a 16:9 aspect ratio, optimized for action shots.

```typescript
import { playerAction } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = playerAction('banksofdeefc/people/person-123/action-1', 800);
```

**Use Cases**:
- Player galleries
- Match reports
- Player performance highlights

### Standard Player Profile

Uses the Banks o' Dee FC standard blue and white striped background for player profiles. Automatically provides a silhouette placeholder if image is missing.

```typescript
import { standardPlayerProfile } from '@/lib/cloudinary/transform';

// With existing image
const imageUrl = standardPlayerProfile('banksofdeefc/people/person-123/profile', 200, 'Player Name');

// With missing image (will generate placeholder)
const placeholderUrl = standardPlayerProfile('', 200, 'Player Name');
```

**Use Cases**:
- Team pages where standard background is required
- When consistent background is needed across all player images

## Match Image Transformations

### Match Gallery Thumbnail

Creates optimized thumbnails for match galleries with a 4:3 aspect ratio.

```typescript
import { matchGalleryThumb } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = matchGalleryThumb('banksofdeefc/matches/match-123/gallery/image-1', 300);
```

**Use Cases**:
- Match gallery grids
- Match report image thumbnails

### Match Featured Image

Creates a featured match image with 16:9 aspect ratio.

```typescript
import { matchFeatured } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = matchFeatured('banksofdeefc/matches/match-123/featured', 1200);
```

**Use Cases**:
- Featured match banners
- Match preview headers
- Match report headers

## News Image Transformations

### News Featured Image

Transforms news article featured images with a 16:9 aspect ratio.

```typescript
import { newsFeatured } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = newsFeatured('banksofdeefc/news/article-123/featured', 1200);

// Responsive variant for tablet
const tabletImageUrl = newsFeatured('banksofdeefc/news/article-123/featured', 1200, 'md');
```

**Use Cases**:
- News article hero images
- Featured news on homepage
- News category headers

### News Thumbnail

Creates news thumbnail images with a 4:3 aspect ratio.

```typescript
import { newsThumbnail } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = newsThumbnail('banksofdeefc/news/article-123/featured', 400);
```

**Use Cases**:
- News listing pages
- Related articles sections
- News archives

## Sponsor Image Transformations

### Sponsor Logo

Optimizes sponsor logos while preserving transparency and quality.

```typescript
import { sponsorLogo } from '@/lib/cloudinary/transform';

// Basic usage (PNG format)
const imageUrl = sponsorLogo('banksofdeefc/sponsors/sponsor-123/logo-dark', 300, 'png');

// Auto format detection
const autoFormatImageUrl = sponsorLogo('banksofdeefc/sponsors/sponsor-123/logo-dark', 300, 'auto');
```

**Use Cases**:
- Sponsor showcase sections
- Partner logos in footer
- Sponsor banners

## Stadium Image Transformations

### Stadium Panoramic

Creates panoramic stadium images with a 21:9 aspect ratio, perfect for wide shots.

```typescript
import { stadiumPanoramic } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = stadiumPanoramic('banksofdeefc/stadium/exterior/main-stand', 1600);
```

**Use Cases**:
- Stadium overview pages
- Stadium hero images
- Wide exterior shots

### Stadium Facility

Transforms stadium facility images with a 3:2 aspect ratio.

```typescript
import { stadiumFacility } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = stadiumFacility('banksofdeefc/stadium/facilities/changing-rooms', 800);
```

**Use Cases**:
- Facility detail pages
- Interior shots
- Amenity showcase sections

## Art Direction Transformations

### Hero Banner

Creates optimized hero banner images with responsive aspect ratios based on device size.

```typescript
import { heroBanner } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = heroBanner('banksofdeefc/news/article-123/featured', 1920);

// Responsive mobile variant (will use 1:1 aspect)
const mobileImageUrl = heroBanner('banksofdeefc/news/article-123/featured', 1920, 'sm');
```

**Use Cases**:
- Homepage hero sliders
- Section header banners
- Full-width image sections

### Card Image

Creates optimized images for card UI elements with a 4:3 aspect ratio.

```typescript
import { cardImage } from '@/lib/cloudinary/transform';

// Basic usage
const imageUrl = cardImage('banksofdeefc/news/article-123/featured', 600);
```

**Use Cases**:
- News cards
- Event cards
- Feature cards

## Utility Functions

### Create Silhouette Placeholder

Generates a standard player silhouette placeholder with the blue and white striped background.

```typescript
import { createSilhouettePlaceholder } from '@/lib/cloudinary/transform';

// Basic usage
const placeholderUrl = createSilhouettePlaceholder(400, 500, 'Player Name');
```

**Use Cases**:
- Fallback for missing player images
- Placeholder for new players without photos

## React Hooks

### usePlayerProfileImage

Custom hook for player profile images with fallback to silhouette placeholders.

```typescript
import { usePlayerProfileImage } from '@/hooks/useCloudinaryImage';

function PlayerProfile({ playerId, playerName }) {
  const { imageUrl, isLoaded, handleLoad, handleError } = usePlayerProfileImage(
    `banksofdeefc/people/person-${playerId}/profile`,
    {
      variant: 'featured', // or 'square'
      size: 400,
      name: playerName,
      deviceSize: 'md'
    }
  );

  return (
    <img 
      src={imageUrl} 
      alt={playerName}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
```

## Examples in Components

### Player Card with Responsive Images

```tsx
import React from 'react';
import { usePlayerProfileImage } from '@/hooks/useCloudinaryImage';

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    position: string;
  };
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { imageUrl, isLoaded, handleLoad, handleError } = usePlayerProfileImage(
    `banksofdeefc/people/person-${player.id}/profile`,
    {
      variant: 'square',
      size: 300,
      name: player.name
    }
  );

  return (
    <div className="relative overflow-hidden bg-[#00105A] rounded-lg shadow-md">
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={`${player.name} - Banks o' Dee FC Player`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{player.name}</h3>
        <p className="text-sm text-gray-300">{player.position}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
```

### News Article with Responsive Featured Image

```tsx
import React from 'react';
import { newsFeatured } from '@/lib/cloudinary/transform';
import { useCloudinaryImage, useCloudinarySrcSet } from '@/hooks/useCloudinaryImage';

interface NewsArticleProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    imageId: string;
  };
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article }) => {
  const publicId = `banksofdeefc/news/article-${article.id}/featured`;
  
  // Get responsive srcSet
  const { srcSet, sizes } = useCloudinarySrcSet(publicId);
  
  // Get default image URL for fallback
  const { imageUrl } = useCloudinaryImage(publicId);
  
  return (
    <article className="max-w-3xl mx-auto">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          srcSet={srcSet}
          sizes={sizes}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="mt-2 text-gray-700">{article.excerpt}</p>
    </article>
  );
};

export default NewsArticle;
```

## Performance Considerations

- All presets use automatic format selection (`format: 'auto'`) to serve WebP when supported
- All presets use automatic quality optimization (`quality: 'auto'`) to balance file size and visual quality
- Responsive variants ensure appropriate image dimensions for different device sizes
- Use the `srcSet` generator for optimal responsive image loading

## Best Practices

1. **Always use the appropriate preset for the content type**:
   - Use `playerProfileSquare` for team grids
   - Use `playerProfileFeatured` for featured player profiles
   - Use appropriate aspect ratios for different contexts

2. **Include responsive variants**:
   - Pass the `deviceSize` parameter to generate optimized images for different screen sizes
   - Use the `useCloudinarySrcSet` hook for comprehensive responsive image support

3. **Handle loading states**:
   - Use the `isLoaded` state from hooks to manage loading transitions
   - Implement proper error handling with the provided error handlers

4. **Use consistent naming conventions**:
   - Follow the folder structure guidelines for uploading new assets
   - Use descriptive names for images that reflect their content and purpose

5. **Optimize for performance**:
   - Don't oversize images - use appropriate dimensions for the display context
   - Utilize lazy loading for below-the-fold images
   - Consider using the `<picture>` element for art direction needs
