
import React from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/lib/types";
import OptimizedImage from "@/components/ui/image/OptimizedImage";
import HoverEffect from "@/components/ui/animations/HoverEffect";

interface PlayerCardProps {
  player: Player;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, className }) => {
  // Determine background gradient based on player position
  const getGradient = (position: string) => {
    switch (position.toLowerCase()) {
      case "forward":
        return "from-[#AB0534] to-[#8A0529]"; // Dark red gradient for forwards
      case "midfielder":
        return "from-[#00105A] to-[#000D42]"; // Dark blue gradient for midfielders
      case "defender":
        return "from-[#004F2D] to-[#003B22]"; // Dark green gradient for defenders
      case "goalkeeper":
        return "from-[#333333] to-[#1A1A1A]"; // Dark gray gradient for goalkeepers
      default:
        return "from-[#00105A] to-[#000D42]"; // Default navy blue gradient
    }
  };

  return (
    <HoverEffect effect="scale" className="h-full">
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg h-full",
          className
        )}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${getGradient(player.position)} z-0`} />
        
        {/* Player image */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-grow flex items-end justify-center pt-4">
            <OptimizedImage 
              src={player.image} 
              alt={player.name}
              className="max-h-[400px] w-auto object-contain mix-blend-luminosity"
            />
          </div>
          
          {/* Player info overlay */}
          <div className="p-4 text-white">
            {player.isAcademy && (
              <div className="absolute top-4 right-4 z-20">
                <div className="rounded-full bg-accent text-primary text-xs font-bold px-3 py-1.5 rotate-12 uppercase shadow-md">
                  Made in our academy
                </div>
              </div>
            )}
            
            {/* Player name and position */}
            <div className="mb-2">
              {player.firstName && (
                <p className="text-sm font-normal opacity-90">{player.firstName}</p>
              )}
              <h3 className="text-2xl font-montserrat font-extrabold uppercase tracking-wide">
                {player.lastName || player.name}
              </h3>
              <p className="text-sm opacity-80">{player.position}</p>
            </div>
          </div>
        </div>
      </div>
    </HoverEffect>
  );
};

export default PlayerCard;
