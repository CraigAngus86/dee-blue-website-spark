'use client';

import Image from 'next/image';
import { Person } from '../types';

interface PersonCardProps {
  person: Person;
  className?: string;
  onProfileClick: (person: Person) => void;
}

export function PersonCard({ person, className = '', onProfileClick }: PersonCardProps) {
  const { firstName, lastName } = person;
  
  // Improved Cloudinary transformation: better face positioning
  const imageUrl = person.profileImage?.url
    ? `${person.profileImage.url.replace('/upload/', '/upload/c_fill,g_face:auto,h_500,w_500/')}`
    : '';

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden 
        transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1
        cursor-pointer
        ${className}
      `}
      onClick={() => onProfileClick(person)}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Player/Staff image */}
        {imageUrl && (
          <div className="relative h-full w-full">
            <Image 
              src={imageUrl} 
              alt={`${firstName} ${lastName}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
          </div>
        )}
        
        {/* Name overlay with stronger gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent z-20 text-white">
          <div>
            <p className="text-base font-medium leading-none mb-0">{firstName}</p>
            <h3 className="text-2xl font-bold leading-tight mt-0">{lastName}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-3 flex items-center justify-between hover:bg-gray-50">
        <span className="font-medium text-primary">View Profile</span>
        <div className="text-primary">→</div>
      </div>
    </div>
  );
}
