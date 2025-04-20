
/**
 * Get player image with proper path
 */
export const getPlayerImage = (
  playerId: string | number,
  type: 'headshot' | 'action' | 'profile' = 'headshot'
): string => {
  // Available player headshots
  const playerImages = [
    "Ewen_Headshot.jpg",
    "Gilly_Headshot.jpg",
    "Hamish_Headshot.jpg",
    "Jevan_Headshot.jpg",
    "Lachie Test.jpg",
    "Laws_Headshot.jpg",
    "Luke_Headshot.jpg",
    "Mags_Headshot.jpg"
  ];
  
  // If playerId is a number, try to map it to an available image
  if (typeof playerId === 'number') {
    const playerIndex = playerId - 1;
    if (playerIndex >= 0 && playerIndex < playerImages.length) {
      return `/assets/images/players/${playerImages[playerIndex]}`;
    }
  } else if (typeof playerId === 'string') {
    // Try to match player name to filename
    const playerName = playerId.toLowerCase();
    const matchedImage = playerImages.find(img => 
      img.toLowerCase().includes(playerName)
    );
    
    if (matchedImage) {
      return `/assets/images/players/${matchedImage}`;
    }
  }
  
  // Fallback to the dummy headshot
  return `/assets/images/players/headshot_dummy.jpg`;
};

/**
 * Get newly uploaded player headshots
 */
export const getPlayerHeadshot = (
  playerNumber: number,
  name?: string
): string => {
  // Available player headshots
  const playerImages = [
    "Ewen_Headshot.jpg",
    "Gilly_Headshot.jpg",
    "Hamish_Headshot.jpg",
    "Jevan_Headshot.jpg",
    "Lachie Test.jpg",
    "Laws_Headshot.jpg",
    "Luke_Headshot.jpg",
    "Mags_Headshot.jpg"
  ];
  
  // If playerNumber is within range, use the corresponding image
  if (playerNumber > 0 && playerNumber <= playerImages.length) {
    return `/assets/images/players/${playerImages[playerNumber - 1]}`;
  }
  
  // Fallback to the dummy headshot
  return `/assets/images/players/headshot_dummy.jpg`;
};
