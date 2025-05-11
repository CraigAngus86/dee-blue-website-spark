import React, { useState } from 'react';
import { Person } from '@/features/team/types';
import PlayerImage from './PlayerImage';

interface TeamMemberCardProps {
  member: Person;
  onClick: (player: Person) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const fullName = member.playerName || `${member.firstName} ${member.lastName}`;
  const position = member.personType === 'player' 
    ? member.playerPosition 
    : member.staffRole;
  
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
      onClick={() => onClick(member)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="aspect-square rounded-t-lg overflow-hidden bg-slate-100 relative">
        <PlayerImage 
          image={member.profileImage}
          name={fullName}
          size="card"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Info container */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold">{fullName}</h3>
          <p className="text-sm text-slate-500 capitalize">{position}</p>
        </div>
        
        {/* Circular arrow icon */}
        <div className={`w-7 h-7 rounded-full flex items-center justify-center border border-primary group-hover:bg-primary transition-colors duration-300`}>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`text-primary group-hover:text-white transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`}
          >
            <path 
              d="M1 7H13M13 7L7 1M13 7L7 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
