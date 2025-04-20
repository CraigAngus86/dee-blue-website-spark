
// Staff member data (management and administration)
export const staffMembers = [
  {
    id: 101,
    name: 'Josh Winton',
    position: 'Manager',
    nationality: 'Scotland',
    image: '/assets/images/team/Training1_Square.jpg',
    bio: 'Experienced coach with over 15 years in football management.',
    email: 'josh.winton@banksofdeefc.com',
    type: 'management'
  },
  {
    id: 102,
    name: 'Ian Forbes',
    position: 'Assistant Manager',
    nationality: 'Scotland',
    image: '/assets/images/team/Training2_Square.jpg',
    bio: 'Former player who joined the coaching staff in 2018.',
    email: 'ian.forbes@banksofdeefc.com',
    type: 'management'
  },
  {
    id: 201,
    name: 'Brian Winton',
    position: 'Club President',
    nationality: 'Scotland',
    image: '/assets/images/team/Training3_Square.jpg',
    bio: 'Leading the club since 2010 with a focus on community development.',
    email: 'brian.winton@banksofdeefc.com',
    type: 'administration'
  },
  {
    id: 202,
    name: 'Margaret Fraser',
    position: 'Club Secretary',
    nationality: 'Scotland',
    image: '/assets/images/team/Training4_Square.jpg',
    bio: 'Handles all administrative matters for the club with exceptional organizational skills.',
    email: 'margaret.fraser@banksofdeefc.com',
    type: 'administration'
  }
] as const;

// Player data
export const players = [
  {
    id: 1,
    name: 'Jamie Buglass',
    firstName: 'Jamie',
    lastName: 'Buglass',
    number: 1,
    position: 'Goalkeeper',
    nationality: 'Scotland',
    image: '/assets/images/players/Ewen_Headshot.jpg',
  },
  {
    id: 2,
    name: 'Mark Gilmour',
    firstName: 'Mark',
    lastName: 'Gilmour',
    number: 5,
    position: 'Defender',
    nationality: 'Scotland',
    image: '/assets/images/players/Gilly_Headshot.jpg',
  },
  {
    id: 3,
    name: 'Lachie MacLeod',
    firstName: 'Lachie',
    lastName: 'MacLeod',
    number: 8,
    position: 'Midfielder',
    nationality: 'Scotland',
    image: '/assets/images/players/Lachie Test.jpg',
  },
] as const;
