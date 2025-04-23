import { getNewsImage } from '@/lib/image';

export const newsArticles = [
  {
    id: 1,
    title: "Banks o' Dee secure crucial victory in Highland League clash",
    excerpt: "A stunning performance from the squad resulted in a 3-0 win against Formartine United at Spain Park, pushing the team closer to the league title...",
    image: getNewsImage(0),
    category: "MATCH REPORT",
    date: "April 8, 2025",
    timestamp: "2 days ago",
    isFeatured: true
  },
  {
    id: 2,
    title: "Major Stadium Upgrades Announced for Spain Park",
    excerpt: "The club unveils ambitious plans for facility improvements, including expanded seating capacity and state-of-the-art training facilities...",
    image: getNewsImage(1),
    category: "CLUB NEWS",
    date: "April 7, 2025",
    timestamp: "3 days ago",
    isFeatured: true
  },
  {
    id: 3,
    title: "New signing announced ahead of crucial cup tie",
    excerpt: "Banks o' Dee FC is delighted to announce the signing of midfielder James Anderson from Aberdeen...",
    image: getNewsImage(2),
    category: "CLUB NEWS",
    date: "April 5, 2025",
    timestamp: "5 days ago"
  },
  {
    id: 4,
    title: "Spain Park facilities upgrade completed ahead of schedule",
    excerpt: "The club is pleased to announce the completion of the new changing facilities and gym at Spain Park...",
    image: getNewsImage(3),
    category: "CLUB NEWS",
    date: "April 3, 2025",
    timestamp: "1 week ago"
  },
  {
    id: 5,
    title: "Manager's preview: 'We're ready for the challenge'",
    excerpt: "Banks o' Dee manager Josh Winton shared his thoughts ahead of this weekend's crucial fixture...",
    image: getNewsImage(4),
    category: "TEAM NEWS",
    date: "April 2, 2025",
    timestamp: "1 week ago"
  },
  {
    id: 6,
    title: "Supporters' Club announces new travel arrangements",
    excerpt: "The Banks o' Dee Supporters' Club has arranged additional transport for the upcoming away fixtures...",
    image: getNewsImage(0),
    category: "CLUB NEWS",
    date: "March 31, 2025",
    timestamp: "10 days ago"
  }
];
