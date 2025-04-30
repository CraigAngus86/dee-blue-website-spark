
import { Transformation, Resize, Gravity, Effect, Overlay, TextStyle, TextAlignment } from '@cloudinary/url-gen';
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { scale, fill, crop, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { color } from "@cloudinary/url-gen/qualifiers/color";
import { TextFit } from "@cloudinary/url-gen/qualifiers/textFit";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { gradientFade } from "@cloudinary/url-gen/actions/effect";
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";

// Brand colors
const BRAND_COLORS = {
  navy: '#00105A',
  lightBlue: '#C5E7FF',
  gold: '#FFD700',
};

/**
 * Transformation presets for player profile images
 */
export const playerProfileTransformations = {
  /**
   * Square 1:1 aspect ratio for team listings and management grid
   * @returns Transformation preset for square player profile
   */
  square: () => {
    return new Transformation()
      .resize(fill().width(400).height(400).gravity(compass('face')))
      .quality(auto())
      .format('auto');
  },

  /**
   * Featured player profile with 1.75:1 aspect ratio
   * @returns Transformation preset for featured player profile
   */
  featured: () => {
    return new Transformation()
      .resize(fill().width(700).height(400).gravity(compass('face:center')))
      .quality(auto())
      .format('auto');
  },

  /**
   * Apply Banks o' Dee FC branded background for player photos
   * @returns Transformation with branded background
   */
  brandedBackground: () => {
    return new Transformation()
      .resize(fill().width(500).height(600))
      .overlay(
        source(text('Banks o\' Dee FC', new TextStyle('Arial', 14))
          .textColor(BRAND_COLORS.navy)
          .textBackground(BRAND_COLORS.lightBlue)
        )
      )
      .effect(gradientFade().strength(20))
      .quality(auto())
      .format('auto');
  },

  /**
   * Silhouette placeholder for missing player images
   * @returns Transformation preset for player silhouette placeholder
   */
  silhouette: () => {
    // Create a transformation that overlays a silhouette on a branded background
    return new Transformation()
      .resize(fill().width(400).height(500))
      .overlay(
        source(text('Player', new TextStyle('Arial', 24))
          .textColor('#FFFFFF')
        ).position(new Position().gravity(compass('south')))
      )
      .effect(artisticFilter('shadow'))
      .quality(auto())
      .format('auto');
  },

  /**
   * Player image placeholder with striped background
   * @returns Transformation for player placeholder
   */
  placeholder: () => {
    const tx = new Transformation();
    tx.resize(fill().width(400).height(500))
      .overlay(
        source(text('No Image', new TextStyle('Arial', 20))
          .textColor('#FFFFFF')
        ).position(new Position().gravity(compass('center')))
      )
      .quality(auto())
      .format('auto');
    return tx;
  }
};

/**
 * Transformation presets for match gallery images
 */
export const matchGalleryTransformations = {
  /**
   * Standard match photo with 4:3 aspect ratio
   * @returns Transformation preset for match photo
   */
  standard: () => {
    const tx = new Transformation();
    tx.resize(fill().width(800).height(600).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Thumbnail for match gallery grid
   * @returns Transformation preset for match gallery thumbnail
   */
  thumbnail: () => {
    const tx = new Transformation();
    tx.resize(thumbnail().width(300).height(200).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Featured match photo with 16:9 widescreen aspect ratio
   * @returns Transformation preset for featured match photo
   */
  featured: () => {
    const tx = new Transformation();
    tx.resize(fill().width(1280).height(720).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  }
};

/**
 * Transformation presets for news article images
 */
export const newsTransformations = {
  /**
   * Featured news image with 16:9 aspect ratio
   * @returns Transformation preset for featured news image
   */
  featured: () => {
    const tx = new Transformation();
    tx.resize(fill().width(1200).height(675).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * News thumbnail with 4:3 aspect ratio for article listings
   * @returns Transformation preset for news thumbnail
   */
  thumbnail: () => {
    const tx = new Transformation();
    tx.resize(fill().width(400).height(300).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * In-article image with flexible aspect ratio
   * @returns Transformation preset for in-article image
   */
  article: () => {
    const tx = new Transformation();
    tx.resize(scale().width(800))
      .quality(auto())
      .format('auto');
    return tx;
  }
};

/**
 * Transformation presets for sponsor logos
 */
export const sponsorTransformations = {
  /**
   * Standard sponsor logo with preserved transparency
   * @returns Transformation preset for sponsor logo
   */
  logo: () => {
    const tx = new Transformation();
    tx.resize(scale().width(300))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Small sponsor logo for footer or sidebar
   * @returns Transformation preset for small sponsor logo
   */
  small: () => {
    const tx = new Transformation();
    tx.resize(scale().width(150))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Large sponsor logo for dedicated sponsor pages
   * @returns Transformation preset for large sponsor logo
   */
  large: () => {
    const tx = new Transformation();
    tx.resize(scale().width(600))
      .quality(auto())
      .format('auto');
    return tx;
  }
};

/**
 * Transformation presets for stadium images
 */
export const stadiumTransformations = {
  /**
   * Panoramic stadium view with 21:9 aspect ratio
   * @returns Transformation preset for panoramic stadium view
   */
  panoramic: () => {
    const tx = new Transformation();
    tx.resize(fill().width(1680).height(720).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Facility image with 3:2 aspect ratio
   * @returns Transformation preset for facility image
   */
  facility: () => {
    const tx = new Transformation();
    tx.resize(fill().width(600).height(400).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  },

  /**
   * Gallery thumbnail for stadium images
   * @returns Transformation preset for stadium gallery thumbnail
   */
  thumbnail: () => {
    const tx = new Transformation();
    tx.resize(fill().width(300).height(200).gravity(compass('center')))
      .quality(auto())
      .format('auto');
    return tx;
  }
};

/**
 * Helper function for creating responsive image transformations
 * @param baseTransformation Base transformation to apply
 * @param breakpoints Breakpoints for responsive variants
 * @returns Object with responsive transformations
 */
export function createResponsiveTransformations(
  baseTransformation: () => Transformation,
  breakpoints: { sm?: number, md?: number, lg?: number, xl?: number } = {
    sm: 640,
    md: 1024,
    lg: 1280,
    xl: 1920
  }
) {
  const sm = breakpoints.sm || 640;
  const md = breakpoints.md || 1024;
  const lg = breakpoints.lg || 1280;
  const xl = breakpoints.xl || 1920;

  return {
    sm: () => {
      const tx = baseTransformation();
      tx.resize(scale().width(sm));
      return tx;
    },
    md: () => {
      const tx = baseTransformation();
      tx.resize(scale().width(md));
      return tx;
    },
    lg: () => {
      const tx = baseTransformation();
      tx.resize(scale().width(lg));
      return tx;
    },
    xl: () => {
      const tx = baseTransformation();
      tx.resize(scale().width(xl));
      return tx;
    }
  };
}

/**
 * Apply text overlay to an image
 * @param transformation Base transformation
 * @param text Text to overlay
 * @param options Options for text overlay
 * @returns Transformation with text overlay
 */
export function applyTextOverlay(
  transformation: Transformation,
  textContent: string,
  options: {
    fontSize?: number;
    fontFamily?: string;
    textColor?: string;
    backgroundColor?: string;
    position?: 'top' | 'bottom' | 'center';
    padding?: number;
  } = {}
) {
  const {
    fontSize = 30,
    fontFamily = 'Arial',
    textColor = '#FFFFFF',
    backgroundColor = 'rgb:000000,60',
    position = 'bottom',
    padding = 10
  } = options;

  const textStyle = new TextStyle(fontFamily, fontSize);

  // Position mapping to Cloudinary compass positions
  const positionMapping = {
    top: 'north',
    center: 'center',
    bottom: 'south'
  };

  transformation.overlay(
    source(text(textContent, textStyle)
      .textColor(textColor)
      .backgroundColor(backgroundColor)
    ).position(new Position().gravity(compass(positionMapping[position])).offsetY(padding))
  );

  return transformation;
}

/**
 * Create a brand watermark overlay
 * @param transformation Base transformation
 * @param opacity Watermark opacity (0-100)
 * @returns Transformation with brand watermark
 */
export function applyBrandWatermark(
  transformation: Transformation,
  opacity: number = 50
) {
  // This would typically reference a stored logo image in Cloudinary
  // For now, we're using text as a placeholder
  const tx = transformation;
  tx.overlay(
    source(text('Banks o\' Dee FC', new TextStyle('Arial', 20))
      .textColor('#FFFFFF')
    ).position(new Position().gravity(compass('southeast')))
  );

  return tx;
}

/**
 * Apply art direction to an image based on its intended use
 * @param transformation Base transformation
 * @param artDirection Type of art direction to apply
 * @returns Transformation with art direction applied
 */
export function applyArtDirection(
  transformation: Transformation,
  artDirection: 'hero' | 'card' | 'thumbnail' | 'overlay'
) {
  const tx = transformation;

  switch (artDirection) {
    case 'hero':
      // For hero images, ensure there's space at bottom for text overlay
      tx.resize(fill().width(1600).height(600).gravity(compass('center')));
      break;
    case 'card':
      // For card images, focus on the subject
      tx.resize(fill().width(400).height(300).gravity(compass('auto')));
      break;
    case 'thumbnail':
      // For thumbnails, create a square format
      tx.resize(fill().width(200).height(200).gravity(compass('auto')));
      break;
    case 'overlay':
      // For images with text overlay, add a gradient
      tx.effect(gradientFade().strength(20));
      break;
  }

  return tx;
}
