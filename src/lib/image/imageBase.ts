
/**
 * Creates a placeholder image URL for when actual images are not available
 */
export const getPlaceholderImageUrl = (
  width = 400, 
  height = 300, 
  text = "Image"
): string => {
  // Generate a placeholder URL with size and text
  return `https://placehold.co/${width}x${height}/CCCCCC/333333?text=${encodeURIComponent(text)}`;
};

// For backward compatibility, also export the old function name
// This helps with the transition but should be deprecated in future
export const getPlaceholderImage = getPlaceholderImageUrl;
