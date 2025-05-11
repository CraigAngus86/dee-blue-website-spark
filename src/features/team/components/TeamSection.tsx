'use client';
import { Person } from '../types';
import { PersonCard } from './PersonCard';

interface TeamSectionProps {
  title: string;
  people: Person[];
  className?: string;
  onProfileClick: (person: Person) => void;
}

export function TeamSection({ 
  title, 
  people, 
  className = '',
  onProfileClick
}: TeamSectionProps) {
  if (people.length === 0) {
    return null;
  }
  
  // Format section title
  const formatTitle = (rawTitle: string) => {
    switch(rawTitle.toLowerCase()) {
      case 'management':
        return 'MANAGEMENT & STAFF';
      case 'goalkeeper':
        return 'GOALKEEPERS';
      case 'defender':
        return 'DEFENDERS';
      case 'midfielder':
        return 'MIDFIELDERS';
      case 'forward':
        return 'FORWARDS';
      default:
        return rawTitle.toUpperCase();
    }
  };
  
  const formattedTitle = formatTitle(title);
  
  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-3xl font-bold text-center text-[#00105a] mb-8">{formattedTitle}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person) => (
          <PersonCard 
            key={person._id} 
            person={person}
            onProfileClick={onProfileClick}
          />
        ))}
      </div>
    </section>
  );
}
