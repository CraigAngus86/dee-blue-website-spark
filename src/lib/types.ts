export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  score?: string;
  competition: string;
  location: string;
  report?: string;
  attendance?: number;
  homeLogo?: string;
  awayLogo?: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface Player {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  number?: number;
  isAcademy?: boolean;
  image?: string;
}
