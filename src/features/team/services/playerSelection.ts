import { Person, Player, PlayerPosition } from '../types';

/**
 * Randomly select players by position for homepage display
 * Target: 1 goalkeeper, 2 defenders, 2 midfielders, 1 forward (6 total)
 */
export function selectRandomPlayersByPosition(people: Person[]): Player[] {
  // Filter to only get players
  const players = people.filter(person => person.personType === 'player') as Player[];
  
  // Group players by position
  const playersByPosition: Record<PlayerPosition, Player[]> = {
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: []
  };
  
  players.forEach(player => {
    if (player.playerPosition && playersByPosition[player.playerPosition]) {
      playersByPosition[player.playerPosition].push(player);
    }
  });
  
  // Define target selection counts
  const selectionTargets = {
    goalkeeper: 1,
    defender: 2,
    midfielder: 2,
    forward: 1
  };
  
  const selectedPlayers: Player[] = [];
  
  // Select random players for each position
  Object.entries(selectionTargets).forEach(([position, count]) => {
    const positionPlayers = playersByPosition[position as PlayerPosition];
    const selected = getRandomPlayers(positionPlayers, count);
    selectedPlayers.push(...selected);
  });
  
  // If we don't have enough players in specific positions, fill from available
  const targetTotal = 6;
  if (selectedPlayers.length < targetTotal) {
    const remainingCount = targetTotal - selectedPlayers.length;
    const allAvailable = players.filter(player => 
      !selectedPlayers.find(selected => selected._id === player._id)
    );
    const additionalPlayers = getRandomPlayers(allAvailable, remainingCount);
    selectedPlayers.push(...additionalPlayers);
  }
  
  // Shuffle final array to avoid predictable position ordering
  return shuffleArray(selectedPlayers);
}

/**
 * Get random selection of players from array
 */
function getRandomPlayers(players: Player[], count: number): Player[] {
  if (players.length <= count) {
    return [...players]; // Return all if not enough available
  }
  
  const shuffled = shuffleArray([...players]);
  return shuffled.slice(0, count);
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get players grouped by position for debugging/admin purposes
 */
export function getPlayerCountsByPosition(people: Person[]): Record<PlayerPosition, number> {
  const players = people.filter(person => person.personType === 'player') as Player[];
  
  const counts: Record<PlayerPosition, number> = {
    goalkeeper: 0,
    defender: 0,
    midfielder: 0,
    forward: 0
  };
  
  players.forEach(player => {
    if (player.playerPosition && counts[player.playerPosition] !== undefined) {
      counts[player.playerPosition]++;
    }
  });
  
  return counts;
}
