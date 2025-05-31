import { useMemo } from 'react';
import { Person, Player } from '../types';
import { selectRandomPlayersByPosition } from '../services/playerSelection';

interface UseRandomPlayersProps {
  people: Person[];
  enabled?: boolean;
}

/**
 * Custom hook to select random players by position for homepage display
 * Returns 6 players: 1 GK, 2 DEF, 2 MID, 1 FWD (with fallbacks)
 */
export function useRandomPlayers({ people, enabled = true }: UseRandomPlayersProps) {
  const randomPlayers = useMemo(() => {
    if (!enabled || !people || people.length === 0) {
      return [];
    }
    
    return selectRandomPlayersByPosition(people);
  }, [people, enabled]);
  
  return {
    players: randomPlayers,
    playerCount: randomPlayers.length
  };
}

export default useRandomPlayers;
