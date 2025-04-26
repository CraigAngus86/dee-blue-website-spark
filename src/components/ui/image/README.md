
# Image Components

This directory contains reusable image components that provide optimized, responsive, and performant image loading capabilities.

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

### OptimizedImage
Enhanced image component with transformation capabilities:

```tsx
import OptimizedImage from './OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  transforms={{
    blur: 5,
    grayscale: true
  }}
/>
```

## Usage Guidelines

1. Always provide meaningful alt text
2. Use appropriate aspect ratios
3. Consider lazy loading for below-the-fold images
4. Implement proper error handling
5. Use WebP format when possible

## Performance Considerations

See [Image Performance Guidelines](../../docs/IMAGE_PERFORMANCE.md) for detailed performance optimization strategies.
