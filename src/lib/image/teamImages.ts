
/**
 * Get team photo with proper path
 */
export const getTeamImage = (
  index: number | string = 0,
  category: 'squad' | 'training' | 'celebration' | 'other' = 'squad'
): string => {
  // Convert string to number if needed
  const imageIndex = typeof index === 'string' ? parseInt(index, 10) : index;
  
  // Map of available team images
  const teamImages = [
    "/assets/images/team/Squad1.jpg",
    "/assets/images/team/Training1_Square.jpg",
    "/assets/images/team/Training2_Square.jpg",
    "/assets/images/team/Training3_Square.jpg",
    "/assets/images/team/Training4_Square.jpg"
  ];
  
  // If index is within range, return that image
  if (imageIndex >= 0 && imageIndex < teamImages.length) {
    return teamImages[imageIndex];
  }
  
  // If index is a specific filename
  if (typeof index === 'string') {
    const trainingImages = [
      "Training1_Square.jpg",
      "Training2_Square.jpg",
      "Training3_Square.jpg",
      "Training4_Square.jpg"
    ];
    
    if (index === "Squad1.jpg") {
      return `/assets/images/team/${index}`;
    }
    
    if (trainingImages.includes(index)) {
      return `/assets/images/team/${index}`;
    }
  }
  
  // Default to the first image (squad)
  return teamImages[0];
};
