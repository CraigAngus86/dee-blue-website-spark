
import { Player } from "@/lib/types";

export const players: Player[] = [
  {
    id: "1",
    name: "Paul Lawson",
    firstName: "Paul",
    lastName: "Lawson",
    position: "Manager",
    image: "/assets/images/players/Laws_Headshot.jpg",
    isAcademy: false,
    stats: {
      appearances: 0,
      goals: 0,
      assists: 0,
    }
  },
  {
    id: "2",
    name: "Jevan Anderson",
    firstName: "Jevan",
    lastName: "Anderson",
    position: "Defender",
    image: "/assets/images/players/Jevan_Headshot.jpg",
    isAcademy: false,
    stats: {
      appearances: 28,
      goals: 2,
      assists: 4,
    }
  },
  {
    id: "3",
    name: "Lachie MacLeod",
    firstName: "Lachie",
    lastName: "MacLeod",
    position: "Midfielder",
    image: "/assets/images/players/Lachie Test.jpg",
    isAcademy: true,
    stats: {
      appearances: 15,
      goals: 3,
      assists: 7,
    }
  },
  {
    id: "4",
    name: "Hamish MacLeod",
    firstName: "Hamish",
    lastName: "MacLeod",
    position: "Forward",
    image: "/assets/images/players/Hamish_Headshot.jpg",
    isAcademy: false,
    stats: {
      appearances: 32,
      goals: 18,
      assists: 6,
    }
  },
  {
    id: "5",
    name: "Luke Emmett",
    firstName: "Luke",
    lastName: "Emmett",
    position: "Midfielder",
    image: "/assets/images/players/Luke_Headshot.jpg",
    isAcademy: true,
    stats: {
      appearances: 24,
      goals: 4,
      assists: 9,
    }
  },
  {
    id: "6",
    name: "Ewen Macleod",
    firstName: "Ewen",
    lastName: "Macleod",
    position: "Defender",
    image: "/assets/images/players/Ewen_Headshot.jpg",
    isAcademy: true,
    stats: {
      appearances: 19,
      goals: 0,
      assists: 3,
    }
  },
  {
    id: "7",
    name: "Marc Gilmour",
    firstName: "Marc",
    lastName: "Gilmour",
    position: "Forward",
    image: "/assets/images/players/Gilly_Headshot.jpg",
    isAcademy: false,
    stats: {
      appearances: 26,
      goals: 14,
      assists: 5,
    }
  },
  {
    id: "8",
    name: "Magnus Watson",
    firstName: "Magnus",
    lastName: "Watson",
    position: "Goalkeeper",
    image: "/assets/images/players/Mags_Headshot.jpg",
    isAcademy: false,
    stats: {
      appearances: 30,
      goals: 0,
      assists: 0,
    }
  },
];
