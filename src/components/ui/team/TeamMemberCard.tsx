
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TeamMember } from '@/hooks/useTeamData';

interface TeamMemberCardProps {
  member: TeamMember;
  isManagement?: boolean;
  onViewProfile: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  isManagement = false,
  onViewProfile
}) => {
  return (
    <div 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className={`relative aspect-square overflow-hidden ${
        isManagement 
          ? 'bg-navy-800' 
          : member.position.toLowerCase().includes('goalkeeper') 
            ? 'bg-[#218F50]' 
            : 'bg-[#00105A]'
      }`}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
        
        {/* Player image */}
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/images/players/headshot_dummy.jpg';
          }}
        />
        
        {/* Player number */}
        {!isManagement && member.number && (
          <div className="absolute right-4 top-4 text-6xl font-bold text-white/20 z-10">
            {member.number}
          </div>
        )}
        
        {/* Person details overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-light">{member.firstName}</span>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{member.lastName}</h3>
            <p className="text-xs text-gray-300">{member.position}</p>
          </div>
        </div>
      </div>
      
      {/* View profile link */}
      <button 
        onClick={onViewProfile}
        className="w-full bg-white py-2 px-4 border-t border-gray-200 text-[#00105A] hover:bg-gray-50"
      >
        <div className="flex items-center justify-between text-sm font-medium">
          View Profile
          <ChevronRight size={16} />
        </div>
      </button>
    </div>
  );
};

export default TeamMemberCard;
