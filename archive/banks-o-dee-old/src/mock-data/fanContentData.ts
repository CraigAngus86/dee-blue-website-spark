
export interface FanOfTheMonthData {
  id: number;
  name: string;
  image: string;
  quote: string;
  supporterSince: number;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface PollData {
  id: number;
  question: string;
  options: PollOption[];
}

export interface UserGeneratedContent {
  id: number;
  image: string;
  user: string;
  date: string;
}

export const fansOfTheMonth: FanOfTheMonthData[] = [
  {
    id: 1,
    name: "Sarah McPherson",
    image: "/assets/images/team/Training2_Square.jpg",
    quote: "Been supporting the Dee through thick and thin for decades. The atmosphere at Spain Park is always electric and the community around the club is just amazing. Wouldn't miss a home game for the world!",
    supporterSince: 1998,
  },
  {
    id: 2,
    name: "David Henderson",
    image: "/assets/images/team/Training1_Square.jpg",
    quote: "My grandfather brought me to my first Banks o' Dee match when I was just five years old. Now I bring my own children to Spain Park every weekend. The club is part of our family tradition.",
    supporterSince: 2001,
  },
  {
    id: 3,
    name: "Jamie Campbell",
    image: "/assets/images/team/Training4_Square.jpg",
    quote: "From the lowest points to the highest highs, I've been there cheering for the Dee. The sense of community in this club is something special that you don't find everywhere.",
    supporterSince: 1987,
  },
];

export const polls: PollData[] = [
  {
    id: 1,
    question: "Which competition are you most excited about this season?",
    options: [
      { id: 1, text: "Highland League", votes: 68 },
      { id: 2, text: "Scottish Cup", votes: 42 },
      { id: 3, text: "League Cup", votes: 23 },
      { id: 4, text: "Evening Express Cup", votes: 17 },
    ],
  },
  {
    id: 2,
    question: "What's your favorite matchday food at Spain Park?",
    options: [
      { id: 1, text: "Steak Pie", votes: 56 },
      { id: 2, text: "Scotch Pie", votes: 48 },
      { id: 3, text: "Sausage Roll", votes: 32 },
      { id: 4, text: "Chips", votes: 29 },
    ],
  },
];

export const userGeneratedContent: UserGeneratedContent[] = [
  { 
    id: 1, 
    image: "/assets/images/matchday/MatchDay1.jpg", 
    user: "Andy Clark", 
    date: "Mar 12, 2024" 
  },
  { 
    id: 2, 
    image: "/assets/images/team/Training3_Square.jpg", 
    user: "Emma Wilson", 
    date: "Feb 28, 2024" 
  },
  { 
    id: 3, 
    image: "/assets/images/team/Training1_Square.jpg", 
    user: "John MacLeod", 
    date: "Feb 10, 2024" 
  },
  { 
    id: 4, 
    image: "/assets/images/team/Training4_Square.jpg", 
    user: "Sarah Johnson", 
    date: "Jan 25, 2024" 
  },
  { 
    id: 5, 
    image: "/assets/images/stadium/Spain Park.jpg", 
    user: "Craig Thompson", 
    date: "Jan 15, 2024" 
  },
];
