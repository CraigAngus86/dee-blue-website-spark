// Image utility functions for Banks o' Dee FC website

export function resolveImagePath(path: string): string {
  if (path.startsWith('http')) return path;
  return `/images/${path}`;
}

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  img.src = '/images/placeholder.jpg';
}

export function createPlaceholder(width: number, height: number): string {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Loading...</text>
    </svg>`
  )}`;
}

export function transformImage(src: string, transforms: string): string {
  if (src.includes('cloudinary.com')) {
    return src.replace('/upload/', `/upload/${transforms}/`);
  }
  return src;
}
