
/**
 * Get stadium images
 */
export const getStadiumImage = (
  filename: string = "Spain Park.jpg",
  view: 'aerial' | 'main' | 'pitch' | 'facilities' | 'other' = 'main'
): string => {
  return `/assets/images/stadium/${filename}`;
};
