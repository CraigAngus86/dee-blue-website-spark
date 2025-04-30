
/**
 * Utility to validate Sanity preview secret
 */

/**
 * Validate a preview request using the preview secret
 * 
 * @param req Request object containing query params
 * @param expectedSecret The secret that should match
 * @returns Boolean indicating if the secret is valid
 */
export function validatePreviewSecret(req: any, expectedSecret: string): boolean {
  if (!req?.query?.secret) {
    return false;
  }
  
  return req.query.secret === expectedSecret;
}
