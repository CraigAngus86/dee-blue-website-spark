
# Image Components

This directory contains reusable image components that provide optimized, responsive, and performant image loading capabilities for the Banks o' Dee FC website.

## Components

### ResponsiveImage
A core component for displaying responsive images with lazy loading and optimization:

```tsx
import ResponsiveImage from './ResponsiveImage';

<ResponsiveImage
  src="/path/to/image.jpg"
  alt="Description"
  aspectRatio="16/9"
  objectFit="cover"
  loading="lazy"
/>
```

### ClubLogo
Displays the Banks o' Dee FC club logo with various options:

```tsx
import ClubLogo from './ClubLogo';

<ClubLogo 
  variant="circle" 
  background="dark" 
  size="md" 
/>
```

### CompetitorLogo
Displays logos of competing clubs with consistent styling:

```tsx
import CompetitorLogo from './CompetitorLogo';

<CompetitorLogo 
  name="Fraserburgh" 
  size="md" 
  variant="default" 
/>
```

### SponsorLogo
Displays sponsor logos with appropriate branding:

```tsx
import SponsorLogo from './SponsorLogo';

<SponsorLogo 
  sponsor={sponsorData}
  variant="light" 
  size="md" 
/>
```

### TeamImage
Displays team photos with consistent styling:

```tsx
import TeamImage from './TeamImage';

<TeamImage
  filename="Squad1.jpg"
  alt="Banks o' Dee Squad 2024/25"
  category="squad"
  size="medium"
/>
```

### StadiumImage
Displays stadium images with consistent styling:

```tsx
import StadiumImage from './StadiumImage';

<StadiumImage
  filename="Spain Park.jpg"
  alt="Spain Park Stadium"
  view="main"
  rounded="md"
/>
```

### PlayerImage
Displays player profile images with consistent styling:

```tsx
import PlayerImage from './PlayerImage';

<PlayerImage
  playerId="player-123"
  name="John Smith"
  position="Forward"
  size="medium"
/>
```

## Usage Guidelines

1. **Always provide meaningful alt text** for accessibility
2. **Use appropriate aspect ratios** for different content types:
   - 16/9 for hero images and news
   - 1/1 for profile pictures and logos
   - 4/3 for general content images
3. **Implement proper error handling** with fallback images
4. **Use WebP format when possible** for better performance
5. **Consider lazy loading** for below-the-fold images

## Image Performance Best Practices

See [Image Performance Guidelines](/src/docs/IMAGE_PERFORMANCE.md) for detailed performance optimization strategies.

## Component Properties

### Common Props
Most image components share these common properties:

| Prop | Type | Description |
|------|------|-------------|
| className | string | Additional CSS classes |
| alt | string | Alternative text for the image |
| rounded | boolean \| 'sm' \| 'md' \| 'lg' \| 'full' | Border radius styling |
| shadow | boolean \| 'sm' \| 'md' \| 'lg' | Shadow styling |

### Component-Specific Props

Each component has specific props relevant to its use case. Refer to the TypeScript interfaces in each component file for detailed type information.
