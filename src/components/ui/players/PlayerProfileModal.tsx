import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Player } from '@/features/team';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
}

const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  isOpen,
  onClose,
  player
}) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{player.firstName} {player.lastName}</span>
            <button
              onClick={onClose}
              className="text-[#6b7280] hover:text-[#00105A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[#00105A] font-medium">
              {player.personType === 'player' ? player.playerPosition : 'Staff'}
            </p>
            <p className="text-[#6b7280]">{player.nationality || 'Scotland'}</p>
          </div>
          
          {player.extendedBio && (
            <div>
              <h3 className="text-lg font-semibold text-[#00105A] mb-2">Biography</h3>
              <div className="text-[#4b5563]">{player.extendedBio}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerProfileModal;
