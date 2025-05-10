import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { TeamMember } from '@/features/team/types';

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: (player: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
      onClick={() => onClick(member)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="aspect-square rounded-t-lg overflow-hidden bg-slate-100 relative">
        {member.imageUrl ? (
          <img 
            src={member.imageUrl}
            alt={member.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <span className="text-slate-400 text-sm">No image</span>
          </div>
        )}
        
        {/* Player number */}
        {member.number && !member.isStaff && (
          <div className="absolute top-2 right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
            {member.number}
          </div>
        )}
      </div>
      
      {/* Info container */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.position}</p>
        </div>
        
        <ChevronRight 
          className={`w-5 h-5 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
        />
      </div>
    </div>
  );
};

export default TeamMemberCard;
