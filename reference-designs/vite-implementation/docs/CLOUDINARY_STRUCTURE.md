
# Cloudinary Structure for Banks o' Dee FC

This document outlines the Cloudinary folder structure, naming conventions, and best practices for the Banks o' Dee FC website.

## Folder Hierarchy

```
banksofdeefc/
  ├── people/
  │   ├── person-{id}/
  │   │   ├── profile.jpg
  │   │   ├── action-1.jpg
  │   │   ├── action-2.jpg
  │   │   └── ...
  ├── teams/
  │   ├── team-{id}-logo.png
  │   ├── team-{id}-squad.jpg
  │   └── team-{id}-training.jpg
  ├── matches/
  │   ├── match-{id}/
  │   │   ├── gallery/
  │   │   │   ├── action-1.jpg
  │   │   │   ├── celebration-1.jpg
  │   │   │   ├── fans-1.jpg
  │   │   │   └── ...
  ├── news/
  │   ├── article-{id}/
  │   │   ├── featured.jpg
  │   │   ├── content-1.jpg
  │   │   └── ...
  ├── sponsors/
  │   ├── sponsor-{id}/
  │   │   ├── logo-light.png
  │   │   ├── logo-dark.png
  │   │   └── ...
  └── stadium/
      ├── exterior/
      │   ├── main-entrance.jpg
      │   └── ...
      ├── facilities/
      │   ├── changing-rooms.jpg
      │   └── ...
      └── interior/
          ├── pitch-view.jpg
          └── ...
```

## Folder Descriptions

### people/
Contains images of individual people, primarily players and staff. Each person has their own subfolder.
- **person-{id}/**: Individual folder for each person, using their UUID as identifier
  - **profile.jpg**: Official headshot/profile image
  - **action-{n}.jpg**: Action shots of the player

### teams/
Contains team-related images.
- **team-{id}-logo.png**: Team logo
- **team-{id}-squad.jpg**: Full squad photo
- **team-{id}-training.jpg**: Team training photos

### matches/
Contains match-related images, organized by match ID.
- **match-{id}/**: Individual folder for each match
  - **gallery/**: Subfolder containing match photos
    - **action-{n}.jpg**: Action shots from the match
    - **celebration-{n}.jpg**: Celebration photos
    - **fans-{n}.jpg**: Photos of fans at the match
    - **pre-match-{n}.jpg**: Pre-match photos
    - **post-match-{n}.jpg**: Post-match photos

### news/
Contains images for news articles.
- **article-{id}/**: Individual folder for each news article
  - **featured.jpg**: Main featured image for the article
  - **content-{n}.jpg**: Additional images used in the article body

### sponsors/
Contains sponsor logos and related images.
- **sponsor-{id}/**: Individual folder for each sponsor
  - **logo-light.png**: Light version of logo (for dark backgrounds)
  - **logo-dark.png**: Dark version of logo (for light backgrounds)

### stadium/
Contains images of Spain Park stadium.
- **exterior/**: External views of the stadium
- **facilities/**: Images of stadium facilities
- **interior/**: Inside the stadium, includes pitch views

## Naming Conventions

1. **Folders**: All folder names use lowercase kebab-case format
2. **Files**: Use descriptive names in lowercase kebab-case format
3. **IDs**: Use actual UUIDs when available, or descriptive identifiers
4. **Indexing**: Use numeric suffixes for multiple images of the same type (e.g., action-1.jpg, action-2.jpg)

## Metadata Requirements

All images should include the following metadata:

| Field | Description | Example |
|-------|-------------|---------|
| content_type | Type of content | "player", "match", "news" |
| entity_id | UUID reference | "f47ac10b-58cc-4372-a567-0e02b2c3d479" |
| alt_text | Accessibility text | "Player John Smith scoring a goal" |
| credit | Attribution | "Photo by Jane Doe" |
| tags | Categorization tags | ["player", "action", "first-team"] |

## Best Practices

1. **Always use the provided utility functions** for uploading and transforming images to maintain consistency
2. **Apply appropriate tags** to all uploads to facilitate searching and filtering
3. **Include alt text** for accessibility
4. **Use the correct folder** for each type of content
5. **Optimize images** before uploading when possible
6. **Use UUID identifiers** to maintain cross-platform compatibility with Sanity and Supabase

## Usage Examples

### Uploading a Player Profile Image

```typescript
import { createPlayerUploadParams } from '@/lib/cloudinary/upload';

const playerId = 'player-uuid';
const uploadParams = createPlayerUploadParams(playerId, 'profile');

// Use these params with the Cloudinary upload API
```

### Generating an Optimized Image URL

```typescript
import { profileImage } from '@/lib/cloudinary/transform';

const publicId = 'banksofdeefc/people/person-uuid/profile';
const imageUrl = profileImage(publicId, 300);
```

### Creating Responsive Images

```typescript
import { generateResponsiveSrcSet } from '@/lib/cloudinary/transform';

const publicId = 'banksofdeefc/news/article-uuid/featured';
const srcSet = generateResponsiveSrcSet(publicId);
```

## Integration with Sanity CMS

When storing image references in Sanity:

1. Store the complete Cloudinary public ID (including folder path)
2. Use the same UUID across both systems for consistency
3. Consider storing basic transformation parameters if specific crops/sizes are needed

## Security Considerations

1. Use signed uploads for client-side uploading
2. Restrict upload permissions to authenticated users only
3. Consider using upload presets for different content types
4. Use the Cloudinary SDK for secure uploads rather than direct API calls

## Accessing Assets

```typescript
// Import the Cloudinary utilities
import { transformImage, profileImage } from '@/lib/cloudinary/transform';

// Access a player profile image
const playerProfileUrl = profileImage('banksofdeefc/people/person-uuid/profile', 300);

// Access a news featured image
const newsImageUrl = transformImage('banksofdeefc/news/article-uuid/featured', {
  width: 1200,
  height: 675,
  crop: 'fill'
});
```
