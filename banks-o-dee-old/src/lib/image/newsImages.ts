/**
 * Get news images with proper paths
 */
export const getNewsImage = (
  index: number | string = 0,
  size: 'thumbnail' | 'full' = 'full'
): string => {
  // Convert string to number if needed
  const imageIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  
  // Define available news images
  const newsImages = [
    '/assets/images/news/News1.jpg',
    '/assets/images/news/News2.jpg',
    '/assets/images/news/News3.jpg',
    '/assets/images/news/News4.jpg',
    '/assets/images/news/News5.jpg'
  ];
  
  // If index is within range, return that image
  if (imageIndex >= 0 && imageIndex < newsImages.length) {
    return newsImages[imageIndex];
  }
  
  // If input is a filename that matches News1.jpg to News5.jpg, use it directly
  if (typeof index === 'string' && /^News[1-5]\.jpg$/.test(index)) {
    return `/assets/images/news/${index}`;
  }
  
  // Otherwise return the first news image
  return newsImages[0];
};
