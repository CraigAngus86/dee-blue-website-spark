// Preview secret validation for Sanity previews

export function validatePreviewSecret(secret: string): boolean {
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  return expectedSecret && secret === expectedSecret;
}

export function getPreviewSecret(): string | undefined {
  return process.env.SANITY_PREVIEW_SECRET;
}
