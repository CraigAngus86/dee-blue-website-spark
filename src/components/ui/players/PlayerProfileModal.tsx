
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: any; // We'll type this properly later
}

const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  isOpen,
  onClose,
  player
}) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 bg-white overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
          aria-label="Close profile"
        >
          <X size={24} className="text-[#00105A]" />
        </button>

        {/* Player Image Banner */}
        <div className="w-full aspect-square relative">
          <img 
            src={player.image} 
            alt={player.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00105A]/90"></div>
          
          {/* Player number watermark */}
          {player.number && (
            <div className="absolute right-6 top-6 text-9xl font-bold text-white/20">
              {player.number}
            </div>
          )}
          
          {/* Player name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-col">
              <span className="text-xl font-light">{player.firstName}</span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">{player.lastName}</h2>
              <div className="flex items-center mt-2">
                <p className="text-xl text-gray-200">{player.position}</p>
                {player.number && (
                  <div className="ml-4 bg-white/20 rounded-full px-3 py-1">
                    <span className="font-bold text-white">#{player.number}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Player Details */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#00105A] mb-2">Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Nationality</span>
                    <span className="font-medium">{player.nationality}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Position</span>
                    <span className="font-medium">{player.position}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Squad Number</span>
                    <span className="font-medium">#{player.number}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerProfileModal;
