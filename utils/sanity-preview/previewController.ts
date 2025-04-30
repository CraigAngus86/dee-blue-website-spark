
/**
 * Preview mode controller utilities
 */
import { validatePreviewSecret } from './validatePreviewSecret';

/**
 * Preview request parameters
 */
export interface PreviewParams {
  secret?: string;
  slug?: string;
  documentId?: string;
  dataset?: string;
}

/**
 * Preview session data
 */
export interface PreviewData {
  documentId?: string;
  slug?: string;
  dataset: string;
  previewActive: boolean;
}

/**
 * Enable preview mode for a request
 * 
 * This function is designed to be used in a Next.js API route handler.
 * For the current implementation, it returns preview data without actually
 * setting cookies (which would be done in Next.js implementation).
 * 
 * @param req The request object
 * @param previewSecret The secret to validate against
 * @returns Preview data object
 */
export function enablePreviewMode(req: any, previewSecret: string): PreviewData | null {
  const query = req.query as PreviewParams;
  
  // Validate preview secret
  if (!validatePreviewSecret(req, previewSecret)) {
    return null;
  }
  
  // Return preview data (in Next.js, this would be set in cookies)
  return {
    documentId: query.documentId,
    slug: query.slug,
    dataset: query.dataset || 'production',
    previewActive: true
  };
}

/**
 * Disable preview mode
 * 
 * In a Next.js implementation, this would clear the preview data cookies.
 * For our current implementation, it simply returns an object indicating
 * that preview is no longer active.
 * 
 * @returns Object indicating preview is no longer active
 */
export function disablePreviewMode(): { previewActive: false } {
  return { previewActive: false };
}
