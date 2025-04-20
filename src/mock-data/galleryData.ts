import { getTeamImage, getMatchDayImage, getStadiumImage } from '@/lib/image';

export const matchDayGallery = [
  {
    src: getMatchDayImage(),
    alt: 'Match action shot',
    caption: "Banks o' Dee vs Formartine United - April 8, 2025"
  },
  {
    src: getTeamImage(0),
    alt: 'Squad photo',
    caption: "Banks o' Dee squad 2024/25 season"
  },
  {
    src: getTeamImage(1),
    alt: 'Training session',
    caption: 'Pre-match training session'
  },
  {
    src: getTeamImage(2),
    alt: 'Training drill',
    caption: 'Players during a training drill'
  },
  {
    src: getTeamImage(3),
    alt: 'Team warmup',
    caption: 'Team warming up before the match'
  },
  {
    src: getStadiumImage(),
    alt: 'Spain Park Stadium',
    caption: "Spain Park Stadium - Home of Banks o' Dee FC"
  }
];
