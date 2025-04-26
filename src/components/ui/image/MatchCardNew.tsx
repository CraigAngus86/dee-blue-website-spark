import React from 'react';
import { Match } from '@/types/match';
import { CardNew } from '@/components/ui/CardNew';

interface MatchCardProps {
  match: Match;
}

const MatchCardNew: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <CardNew className="p-4">
      <h3 className="text-lg font-semibold">{match.team1} vs {match.team2}</h3>
      <p>Date: {match.date}</p>
      <p>Score: {match.score1} - {match.score2}</p>
    </CardNew>
  );
};

export default MatchCardNew;
