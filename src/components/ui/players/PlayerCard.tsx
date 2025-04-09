
import React from "react";
import { cn } from "@/lib/utils";
import PlayerImage from "../image/PlayerImage";
import Text from "../typography/Text";
import { Player } from "@/lib/types";

interface PlayerCardProps {
  player: Player;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, className }) => {
  const { id, name, position, isAcademy } = player;

  return (
    <div
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
        className
      )}
    >
      <div className="aspect-[3/4] w-full relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-secondary/5 z-0" />
        
        {/* Player image */}
        <PlayerImage
          playerId={id}
          name={name}
          className="w-full h-full object-cover z-10"
        />
        
        {/* Academy badge if applicable */}
        {isAcademy && (
          <div className="absolute top-3 right-3 bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full z-20">
            MADE IN OUR ACADEMY
          </div>
        )}
      </div>
      
      {/* Player info */}
      <div className="p-4">
        <Text
          as="div"
          size="large"
          weight="bold"
          className="uppercase text-primary"
        >
          {name}
        </Text>
        <Text
          size="small"
          color="secondary"
          className="uppercase tracking-wider"
        >
          {position}
        </Text>
      </div>
    </div>
  );
};

export default PlayerCard;
