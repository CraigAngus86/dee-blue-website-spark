import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TeamMember } from '@/features/team/types';

interface PlayerProfileModalProps {
  player: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  player,
  isOpen,
  onClose
}) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 bg-white overflow-hidden">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            {player.name}
            <button 
              onClick={onClose}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Player image */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-64 h-64 rounded-md overflow-hidden bg-slate-100">
              {player.imageUrl ? (
                <img 
                  src={player.imageUrl} 
                  alt={player.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-slate-200">
                  <span className="text-slate-400 text-sm">No image available</span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold">{player.name}</div>
              <div className="text-sm text-slate-500">{player.position}</div>
              {player.number && (
                <div className="mt-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold">
                  {player.number}
                </div>
              )}
            </div>
          </div>
          
          {/* Player details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Biography</h3>
              <p className="text-slate-600">
                {player.bio || 'No biography available.'}
              </p>
            </div>
            
            {player.stats && Object.keys(player.stats).length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Statistics</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(player.stats).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 p-3 rounded">
                      <div className="text-xs text-slate-500 uppercase">{key}</div>
                      <div className="font-bold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {player.social && Object.keys(player.social).length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Social Media</h3>
                <div className="flex space-x-2">
                  {Object.entries(player.social).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerProfileModal;
