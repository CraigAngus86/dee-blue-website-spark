import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Person } from '@/features/team';

interface TeamMemberCardProps {
  member: Person;
  isManagement?: boolean;
  onViewProfile: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  isManagement = false,
  onViewProfile
}) => {
  const fullName = member.playerName || `${member.firstName} ${member.lastName}`;
  const position = member.personType === 'player' 
    ? member.playerPosition 
    : member.personType === 'staff' 
      ? member.staffRole 
      : 'Staff';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onViewProfile}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#00105A] mb-1">
              {fullName}
            </h3>
            <p className="text-[#6b7280] text-sm capitalize">
              {position?.replace('_', ' ')}
            </p>
            <p className="text-[#9ca3af] text-xs mt-1">
              {member.nationality || 'Scotland'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#C5E7FF]" />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
