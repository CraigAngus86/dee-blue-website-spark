
"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: any;
}

const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({ isOpen, onClose, player }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 focus:outline-none z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Player image */}
          <div className="md:w-2/5 bg-[#00105A] relative h-80 md:h-auto">
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <Image 
                  src={player.image} 
                  alt={player.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            {player.number && (
              <div className="absolute right-4 top-4 text-8xl font-bold text-white/20 z-10">
                {player.number}
              </div>
            )}
          </div>

          {/* Right side - Player details */}
          <div className="md:w-3/5 p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-1">{player.name}</h2>
            <p className="text-lg text-gray-600 mb-6">{player.position}</p>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#00105A]">Player Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {player.nationality && (
                    <div className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Nationality</span>
                      <span className="font-medium">{player.nationality}</span>
                    </div>
                  )}
                  {player.joinedDate && (
                    <div className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Joined</span>
                      <span className="font-medium">{player.joinedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Biography */}
              {player.bio && (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#00105A]">Biography</h3>
                  <p className="text-gray-700">{player.bio}</p>
                </div>
              )}

              {/* Fun Fact */}
              {player.didYouKnow && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-bold mb-1 text-[#00105A]">Did You Know?</h3>
                  <p className="text-gray-700 italic">{player.didYouKnow}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileModal;
