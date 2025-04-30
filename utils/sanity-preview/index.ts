
/**
 * Sanity Preview Utilities
 * 
 * This module exports all preview-related utilities for easy consumption.
 */

// Export preview controllers
export * from './validatePreviewSecret';
export * from './previewController';

// Export API handlers (for future Next.js integration)
export * from './api/preview';
export * from './api/exit-preview';
export * from './api/news';
export * from './api/player';
export * from './api/sponsor';

/**
 * Preview Banner Props
 */
export interface PreviewBannerProps {
  isActive: boolean;
  documentType: string;
  documentId: string;
  onExit?: () => void;
}

/**
 * Check if preview mode is active
 * 
 * In a Next.js implementation, this would check the preview cookie.
 * For our current implementation, it checks URL parameters.
 * 
 * @param req Request object
 * @returns Boolean indicating if preview is active
 */
export function isPreviewModeActive(req: any): boolean {
  // In Next.js this would check preview cookies
  // For now, we'll check URL for preview=true parameter
  return req?.query?.preview === 'true';
}
