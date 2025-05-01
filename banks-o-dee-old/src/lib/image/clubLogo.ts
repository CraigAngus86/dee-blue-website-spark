
/**
 * Get the path to club logo based on variant and background
 */
export const getClubLogo = (
  variant: 'rect' | 'square' | 'circle' = 'circle',
  background: 'light' | 'dark' = 'dark'
): string => {
  const logoName = background === 'dark' ? 'BOD_Logo_Navy_square.png' : 'BOD_Logo_White_square.png';
  return `/assets/images/logos/${logoName}`;
};
