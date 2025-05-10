
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardNew } from '@/components/ui/CardNew';
import Text from '@/components/ui/typography/Text';
import { Link } from 'react-router-dom';

interface StaffMemberCardProps {
  member: {
    id: number;
    name: string;
    position: string;
    nationality: string;
    image: string;
    bio?: string;
    email?: string;
    type: 'management' | 'administration';
  };
  className?: string;
}

const StaffMemberCard: React.FC<StaffMemberCardProps> = ({ member, className }) => {
  return (
    <CardNew className={cn("overflow-hidden", className)} hoverEffect>
      {/* Member Image */}
      <div className="relative bg-[#F5F7FA] h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      
      {/* Member Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Text weight="bold" size="large" color="primary" className="mb-1">{member.name}</Text>
            <Text size="small" color="muted">{member.position}</Text>
          </div>
          
          {member.nationality && (
            <img 
              src={`/assets/images/flags/${member.nationality.toLowerCase().replace(' ', '-')}.svg`} 
              alt={member.nationality}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
        </div>
        
        {(member.bio || member.email) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {member.bio && (
              <Text size="small" color="muted" className="line-clamp-2">{member.bio}</Text>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="text-xs text-primary hover:text-primary-light mt-2 inline-block transition-colors"
              >
                {member.email}
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* View Profile Link */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Link 
          to={`/team/${member.id}`}
          className="flex items-center justify-between text-primary text-sm font-medium hover:text-primary-light transition-colors"
        >
          View Profile
          <ChevronRight size={16} />
        </Link>
      </div>
    </CardNew>
  );
};

export default StaffMemberCard;
