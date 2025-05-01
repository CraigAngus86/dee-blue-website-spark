
/**
 * Helper module for retrieving team images
 */

// Define a set of fallback team images
const teamImages = [
  '/assets/images/team/Squad1.jpg',
  '/assets/images/team/Training1_Square.jpg',
  '/assets/images/team/Training2_Square.jpg',
  '/assets/images/team/Training3_Square.jpg',
  '/assets/images/team/Training4_Square.jpg',
];

/**
 * Get a team image by index, with fallback
 * @param index Image index to retrieve
 * @returns URL to the team image
 */
export function getTeamImage(index: number): string {
  // Use modulo to wrap around if index is out of bounds
  const safeIndex = index % teamImages.length;
  return teamImages[safeIndex];
}

/**
 * Get a random team image
 * @returns URL to a random team image
 */
export function getRandomTeamImage(): string {
  const randomIndex = Math.floor(Math.random() * teamImages.length);
  return teamImages[randomIndex];
}

/**
 * Get all available team images
 * @returns Array of all team image URLs
 */
export function getAllTeamImages(): string[] {
  return [...teamImages];
}
