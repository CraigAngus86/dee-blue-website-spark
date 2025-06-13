// Central Cloudinary Image Transform System for Banks o' Dee FC
// This replaces all scattered getImageUrl functions

export const ASPECT_RATIOS = {
  hero: { 
    desktop: { ratio: '21:9', css: 'aspect-[21/9]' },
    mobile: { ratio: '4:3', css: 'aspect-[4/3]' }
  },
  card: { 
    all: { ratio: '16:9', css: 'aspect-[16/9]' }
  },
  modal: { 
    all: { ratio: '16:9', css: 'aspect-[16/9]' }
  },
  square: { 
    all: { ratio: '1:1', css: 'aspect-square' }
  },
  portrait: { 
    all: { ratio: '3:4', css: 'aspect-[3/4]' }
  },
  playerCard: {
    all: { ratio: '1:1', css: 'aspect-square' }
  },
  playerModal: {
    all: { ratio: '3:4', css: 'aspect-[3/4]' }
  },
  // News mosaic grid specific ratios
  mosaic1x1: {
    all: { ratio: '1:1', css: 'aspect-square' }
  },
  mosaic2x1: {
    all: { ratio: '2:1', css: 'aspect-[2/1]' }
  },
  mosaic1x2: {
    all: { ratio: '1:2', css: 'aspect-[1/2]' }
  },
  mosaic2x2: {
    all: { ratio: '1:1', css: 'aspect-square' }
  }
} as const;

export type ImageVariant = keyof typeof ASPECT_RATIOS;

interface CloudinaryImageOptions {
  variant: ImageVariant;
  contentType?: 'match' | 'player' | 'general';
  isMobile?: boolean;
  width?: number;
  quality?: string;
}

export function getCloudinaryImageUrl(
  image: any,
  options: CloudinaryImageOptions
): string {
  // Fallback for missing images
  if (!image) return '/images/placeholder.jpg';
  
  // CRITICAL: Only use public_id, ignore URLs
  if (!image.public_id) {
    console.warn('Image missing public_id, bypassing transforms:', image);
    // If we have a URL, use it as last resort
    if (image.secure_url) return image.secure_url;
    if (image.url) return image.url;
    return '/images/placeholder.jpg';
  }
  
  const { 
    variant, 
    contentType = 'general', 
    isMobile = false, 
    width,
    quality = 'auto:good'
  } = options;
  
  // Get aspect ratio config with proper type guards
  const aspectConfig = ASPECT_RATIOS[variant];
  let aspectRatio: string;
  
  // Type-safe access to ratio
  if ('mobile' in aspectConfig && 'desktop' in aspectConfig) {
    // Has both mobile and desktop
    aspectRatio = isMobile ? aspectConfig.mobile.ratio : aspectConfig.desktop.ratio;
  } else if ('all' in aspectConfig) {
    // Has only all
    aspectRatio = aspectConfig.all.ratio;
  } else {
    // Fallback (should never happen with our types)
    aspectRatio = '16:9';
  }
  
  // Determine gravity based on content type
  let gravity = 'g_auto:subject'; // Default
  if (contentType === 'match') {
    gravity = 'g_auto:faces'; // Multiple faces in match photos
  } else if (contentType === 'player') {
    gravity = 'g_auto:face'; // Single face for player photos
  }
  
  // Build transform parts
  const parts = [
    'c_fill',
    gravity,
    `ar_${aspectRatio}`,
    width ? `w_${width}` : 'w_auto',
    'dpr_auto',
    `q_${quality}`,
    'f_auto'
  ];
  
  // Add progressive loading for larger images
  if (variant === 'hero' || variant === 'modal' || variant === 'playerModal' || variant === 'mosaic2x2') {
    parts.push('fl_progressive');
  }
  
  const transform = parts.join(',');
  
  return `https://res.cloudinary.com/dlkpaw2a0/image/upload/${transform}/${image.public_id}.${image.format || 'jpg'}`;
}

export function getAspectRatioClass(variant: ImageVariant, isMobile: boolean = false): string {
  const config = ASPECT_RATIOS[variant];
  
  // Type-safe access to css classes
  if ('mobile' in config && 'desktop' in config) {
    // Has both mobile and desktop
    return isMobile ? config.mobile.css : config.desktop.css;
  } else if ('all' in config) {
    // Has only all
    return config.all.css;
  } else {
    // Fallback (should never happen with our types)
    return 'aspect-[16/9]';
  }
}

// Helper to detect if content is match-related
export function isMatchContent(category?: string): boolean {
  return category === 'matchReport' || category === 'matchGallery';
}

// Helper to get content type from category
export function getContentType(category?: string, isPlayer?: boolean): 'match' | 'player' | 'general' {
  if (isPlayer) return 'player';
  if (isMatchContent(category)) return 'match';
  return 'general';
}

// Helper to determine mosaic variant based on card size
export function getMosaicVariant(cardSize: string): ImageVariant {
  switch(cardSize) {
    case '1x1': return 'mosaic1x1';
    case '2x1': return 'mosaic2x1';
    case '1x2': return 'mosaic1x2';
    case '2x2': return 'mosaic2x2';
    default: return 'card'; // fallback
  }
}
