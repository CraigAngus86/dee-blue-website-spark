
import { MatchPhoto } from "../types";
import { getPlaceholderImageUrl } from "../ImageUtils";
import { v4 as uuidv4 } from 'uuid';

export const getMatchPhotos = (
  matchDate: string,
  opponent: string,
  category?: string
): MatchPhoto[] => {
  return [
    {
      id: uuidv4(),
      url: `/assets/images/matchday/MatchDay1.jpg`,
      src: `/assets/images/matchday/MatchDay1.jpg`,
      thumbnail: `/assets/images/matchday/MatchDay1.jpg`,
      alt: `Action from match against ${opponent}`,
      caption: `Banks o' Dee vs ${opponent}`,
      category: 'action',
      matchId: uuidv4(),
      date: matchDate
    },
    {
      id: uuidv4(),
      url: getPlaceholderImageUrl(800, 600, `Fans at ${matchDate}`),
      src: getPlaceholderImageUrl(800, 600, `Fans at ${matchDate}`),
      thumbnail: getPlaceholderImageUrl(300, 300, `Fans`),
      alt: "Fans cheering",
      caption: "Fans cheering at Spain Park",
      category: 'fans',
      matchId: uuidv4(),
      date: matchDate
    }
  ];
};

