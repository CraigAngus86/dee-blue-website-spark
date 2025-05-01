
import { MatchPhoto } from "../types";
import { getPlaceholderImage } from "./imageBase";

/**
 * Get match photos for a specific match
 */
export const getMatchPhotos = (
  matchDate: string,
  opponent: string,
  category?: string
): MatchPhoto[] => {
  return [
    {
      src: `/assets/images/matchday/MatchDay1.jpg`,
      thumbnail: `/assets/images/matchday/MatchDay1.jpg`,
      alt: `Action from match against ${opponent}`,
      caption: `Banks o' Dee vs ${opponent}`,
      category: 'action',
    },
    {
      src: getPlaceholderImage(800, 600, `Fans at ${matchDate}`),
      thumbnail: getPlaceholderImage(300, 300, `Fans`),
      alt: "Fans cheering",
      caption: "Fans cheering at Spain Park",
      category: 'fans',
    }
  ];
};

/**
 * Get matchday image with proper path
 */
export const getMatchDayImage = (): string => {
  return `/assets/images/matchday/MatchDay1.jpg`;
};
