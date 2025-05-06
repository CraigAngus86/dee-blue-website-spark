
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TeamMember } from '@/hooks/useTeamData';

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

  // Debug what data we have for this player
  console.log('Player profile data:', player);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold flex justify-between items-center">
            <span>{player.name}</span>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Player image */}
          <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-[#00105A]">
            <img
              src={player.image || '/assets/images/players/headshot_dummy.jpg'}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/images/players/headshot_dummy.jpg';
              }}
            />
            {player.number && (
              <div className="absolute right-4 top-4 text-6xl font-bold text-white/20">
                {player.number}
              </div>
            )}
          </div>
          
          {/* Player info */}
          <div className="p-6 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold">{player.name}</h3>
              <p className="text-gray-600">{player.position}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium">{player.nationality || 'Scotland'}</p>
              </div>
              
              {player.joinedDate && (
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{player.joinedDate}</p>
                </div>
              )}
            </div>
            
            {player.stats && (
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-2">Season Statistics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <p className="text-sm text-gray-500">Appearances</p>
                    <p className="text-xl font-bold">{player.stats.matchesPlayed || 0}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <p className="text-sm text-gray-500">Goals</p>
                    <p className="text-xl font-bold">{player.stats.goals || 0}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <p className="text-sm text-gray-500">Assists</p>
                    <p className="text-xl font-bold">{player.stats.assists || 0}</p>
                  </div>
                </div>
              </div>
            )}
            
            {player.bio && (
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-2">Bio</h4>
                <p className="text-gray-700">{player.bio}</p>
              </div>
            )}
            
            {player.didYouKnow && (
              <div>
                <h4 className="text-lg font-bold mb-2">Did You Know?</h4>
                <p className="text-gray-700">{player.didYouKnow}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerProfileModal;
