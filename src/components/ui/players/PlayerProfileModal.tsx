
import React from 'react';
import { X } from 'lucide-react';
import { TeamMember } from '@/hooks/useTeamData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: TeamMember | null;
}

const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  player 
}) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {player.name}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </DialogHeader>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Image */}
          <div className="col-span-1">
            <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100">
              <img 
                src={player.image} 
                alt={player.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/images/players/headshot_dummy.jpg';
                }}
              />
            </div>
            
            {/* Basic info */}
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Position:</span> {player.position}
              </p>
              {player.nationality && (
                <p className="text-sm">
                  <span className="font-medium">Nationality:</span> {player.nationality}
                </p>
              )}
              {player.joinedDate && (
                <p className="text-sm">
                  <span className="font-medium">Joined:</span> {player.joinedDate}
                </p>
              )}
            </div>
          </div>
          
          {/* Bio & Details */}
          <div className="col-span-1 md:col-span-2">
            {player.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Biography</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{player.bio}</p>
              </div>
            )}
            
            {player.didYouKnow && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Favorite Moment at Banks o' Dee</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{player.didYouKnow}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerProfileModal;
