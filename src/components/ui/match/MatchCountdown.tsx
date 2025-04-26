import React, { useState, useEffect } from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { ButtonNew } from "@/components/ui/ButtonNew";
import Text from "@/components/ui/typography/Text";

interface MatchCountdownProps {
  nextMatch: {
    competition: string;
    round: string;
    date: string;
    time: string;
  };
}

const MatchCountdown: React.FC<MatchCountdownProps> = ({ nextMatch }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const matchDate = new Date(`${nextMatch.date} ${nextMatch.time}`);
      const now = new Date();
      const difference = matchDate.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    
    setCountdown(calculateTimeLeft());
    const timer = setInterval(() => setCountdown(calculateTimeLeft()), 1000);
    
    return () => clearInterval(timer);
  }, [nextMatch]);

  return (
    <div className="px-4 sm:px-6 py-6 border-b border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Next Match Title */}
        <div className="mb-4 md:mb-0">
          <Text as="span" weight="semibold" size="large" color="primary" className="uppercase">
            Next Match
          </Text>
          <div className="flex items-center mt-1">
            <Trophy className="h-4 w-4 text-accent mr-2" />
            <Text color="muted" size="small">
              {nextMatch.competition} - {nextMatch.round}
            </Text>
          </div>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          {Object.entries(countdown).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">
                {value.toString().padStart(2, '0')}
              </div>
              <Text size="xs" color="muted" className="uppercase mt-1">
                {unit}
              </Text>
            </div>
          ))}
        </div>
        
        {/* Sync to Calendar */}
        <ButtonNew 
          variant="tertiary" 
          size="sm"
          iconLeft={<Calendar className="w-4 h-4" />}
        >
          Sync to Calendar
        </ButtonNew>
      </div>
    </div>
  );
};

export default MatchCountdown;
