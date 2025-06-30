'use client';

import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  playerPosition: 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
  isYouthProduct?: boolean;
  profileImage?: {
    public_id: string;
    secure_url: string;
    version?: number;
  };
}

export function PlayerManagementTab() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [positionCounts, setPositionCounts] = useState({
    goalkeeper: 0,
    defender: 0,
    midfielder: 0,
    forward: 0,
    youthProduct: 0
  });
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [loading, setLoading] = useState(true);

 type AdminMode = 'add' | 'edit' | 'delete';

  interface ModalState {
    isOpen: boolean;
    mode: AdminMode;
    recordId: string | null;
  }

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  // Fetch players data on component mount
  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/admin/players?pageSize=50');
      const data = await response.json();
      
      if (data.success) {
        console.log('Players data:', data.players);
        setPlayers(data.players || []);
        setPositionCounts(data.positionCounts || {
          goalkeeper: 0,
          defender: 0,
          midfielder: 0,
          forward: 0,
          youthProduct: 0
        });
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Transform function that we know works
  const getTransformedUrl = (image: any) => {
    if (!image?.secure_url) return '';
    
    return image.secure_url.replace(
      '/upload/',
      '/upload/c_fill,g_auto:face,ar_1:1,w_200/'
    );
  };

  // Universal modal functions
  const openModal = (mode: AdminMode, recordId?: string) => {
    setModalState({
      isOpen: true,
      mode,
      recordId: recordId || null
    });
  };

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
  };

  const handleModalSuccess = () => {
    console.log('Player operation successful - refreshing grid...');
    fetchPlayers(); // Actually refresh the grid
    closeModal();
  };

  // Group players by position
  const playersByPosition = {
    goalkeeper: players.filter(p => p.playerPosition === 'goalkeeper'),
    defender: players.filter(p => p.playerPosition === 'defender'),
    midfielder: players.filter(p => p.playerPosition === 'midfielder'),
    forward: players.filter(p => p.playerPosition === 'forward')
  };

  // Get filtered players for display
  const getPlayersToShow = () => {
    if (selectedPosition === 'all') {
      return playersByPosition; // Show all sections
    } else {
      // Show only selected position section
      return {
        goalkeeper: selectedPosition === 'goalkeeper' ? playersByPosition.goalkeeper : [],
        defender: selectedPosition === 'defender' ? playersByPosition.defender : [],
        midfielder: selectedPosition === 'midfielder' ? playersByPosition.midfielder : [],
        forward: selectedPosition === 'forward' ? playersByPosition.forward : []
      };
    }
  };

  const displayPlayers = getPlayersToShow();

  // Render player card
  const renderPlayerCard = (player: Player) => {
    return (
      <div 
  key={player._id} 
  onClick={() => openModal('edit', player._id)}
  className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-200">
        {/* Square aspect ratio container */}
        <div className="aspect-square rounded-lg overflow-hidden relative">
          {player.profileImage ? (
            <img 
              src={getTransformedUrl(player.profileImage)}
              alt={`${player.firstName} ${player.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
              <div className="text-white text-2xl font-bold">
                {player.firstName.charAt(0)}{player.lastName.charAt(0)}
              </div>
            </div>
          )}
          
          {/* REMOVED: Made in Dee Star - but keeping the logic below */}
        </div>
        
        {/* Player Info */}
        <div className="mt-2 text-center">
          <div className="text-sm font-medium text-[#374151] truncate">
            {player.firstName} {player.lastName}
          </div>
          <div className="text-xs text-[#6b7280] capitalize">
            {player.playerPosition}
          </div>
          {player.isYouthProduct && (
            <div className="text-xs text-[#FFD700] font-medium">Made in Dee</div>
          )}
        </div>
      </div>
    );
  };

  // Render position section
  const renderPositionSection = (position: keyof typeof playersByPosition, title: string, emoji: string) => {
    const positionPlayers = displayPlayers[position];
    
    if (positionPlayers.length === 0 && selectedPosition !== 'all') {
      return null; // Don't show empty sections when filtering
    }

    return (
      <div key={position} className="mb-8">
        <h5 className="text-lg font-semibold text-[#00105A] mb-4 flex items-center">
          <span className="mr-2">{emoji}</span>
          {title} ({positionPlayers.length})
        </h5>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          {positionPlayers.map(renderPlayerCard)}
          
          {/* Add new player card */}
          {(selectedPosition === 'all' || selectedPosition === position) && (
            <div 
              onClick={() => openModal('add')}
              className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-200"
             >
              <div className="aspect-square bg-[#f9fafb] border-2 border-dashed border-[#C5E7FF] rounded-lg flex items-center justify-center hover:bg-[#C5E7FF] hover:bg-opacity-10 transition-colors">
                <div className="text-center text-[#00105A]">
                  <div className="text-xl mb-1">+</div>
                  <div className="text-xs font-medium">Add New</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminCard title="Player Profile Management">
          <div className="flex items-center justify-center h-64">
            <div className="text-[#6b7280]">Loading players...</div>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminCard title="Player Profile Management">
        <div className="space-y-6">
          
          {/* Squad Overview Statistics */}
          <div className="mb-6">
            <h4 className="font-medium text-[#00105A] mb-4 m-0">Squad Overview:</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{players.length}</div>
                <div className="text-sm text-[#6b7280]">Total Players</div>
                <div className="text-xs text-[#6b7280] mt-1">First Team Squad</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{positionCounts.goalkeeper}</div>
                <div className="text-sm text-[#6b7280]">Goalkeepers</div>
                <div className="text-xs text-[#6b7280] mt-1">Position group</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{positionCounts.defender}</div>
                <div className="text-sm text-[#6b7280]">Defenders</div>
                <div className="text-xs text-[#6b7280] mt-1">Position group</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{positionCounts.midfielder}</div>
                <div className="text-sm text-[#6b7280]">Midfielders</div>
                <div className="text-xs text-[#6b7280] mt-1">Position group</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{positionCounts.forward}</div>
                <div className="text-sm text-[#6b7280]">Forwards</div>
                <div className="text-xs text-[#6b7280] mt-1">Position group</div>
              </div>
            </div>
          </div>

          {/* Position Filter & Add Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="font-medium text-[#00105A] m-0">Filter by Position:</h4>
              <div className="relative">
                <select 
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-[#00105A] rounded text-[#00105A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] font-medium min-w-[150px]"
                >
                  <option value="all">All Positions</option>
                  <option value="goalkeeper">Goalkeepers ({positionCounts.goalkeeper})</option>
                  <option value="defender">Defenders ({positionCounts.defender})</option>
                  <option value="midfielder">Midfielders ({positionCounts.midfielder})</option>
                  <option value="forward">Forwards ({positionCounts.forward})</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#00105A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button 
               onClick={() => openModal('add')}
               className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors"
            >
              + Add New Player
            </button>
          </div>
          
          {/* Player Grid by Position Sections */}
          <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
            {renderPositionSection('goalkeeper', 'Goalkeepers')}
            {renderPositionSection('defender', 'Defenders')}
            {renderPositionSection('midfielder', 'Midfielders')}
            {renderPositionSection('forward', 'Forwards')}
          </div>
           </div>
      </AdminCard>

      {/* AdminModal Integration */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        entityType="player"
        mode={modalState.mode}
        recordId={modalState.recordId}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
