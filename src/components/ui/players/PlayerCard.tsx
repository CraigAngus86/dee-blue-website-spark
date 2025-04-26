
import React from "react";
import { cn } from "@/lib/utils";
import HoverEffect from "@/components/ui/animations/HoverEffect";

const PlayerCard: React.FC<PlayerCardProps> = ({ player, className }) => {
  return (
    <HoverEffect effect="scale" className="h-full">
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg h-full",
          className
        )}
      >
        <div className="absolute inset-0 bg-[#00105A] z-0" />
        
        {/* Player image */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-grow flex items-end justify-center pt-4">
            <img 
              src={player.image} 
              alt={player.name}
              className="max-h-[400px] w-auto object-contain mix-blend-luminosity"
              loading="lazy"
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
