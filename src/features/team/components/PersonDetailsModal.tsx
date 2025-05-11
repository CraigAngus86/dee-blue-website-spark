'use client';

import { useEffect, useRef } from 'react';
import { Person } from '../types';
import { X } from 'lucide-react';

interface PersonDetailsModalProps {
  person: Person;
  onClose: () => void;
}

export function PersonDetailsModal({ person, onClose }: PersonDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  const { firstName, lastName, personType, nationality } = person;
  
  // Get position label
  let positionLabel = '';
  if (personType === 'player' && person.playerPosition) {
    positionLabel = person.playerPosition.charAt(0).toUpperCase() + person.playerPosition.slice(1);
  } else if (personType === 'staff' && person.staffRole) {
    if (person.staffRole === 'physio') {
      positionLabel = 'Physio';
    } else if (person.staffRole === 'gk_coach') {
      positionLabel = 'Goalkeeper Coach';
    } else if (person.staffRole === 'assistant_manager') {
      positionLabel = 'Assistant Manager';
    } else {
      positionLabel = person.staffRole
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }
  
  // Just use the original image URL for now
  const imageUrl = person.profileImage?.url || '';
  
  // For debug purposes - log the image structure
  console.log('Profile image:', person.profileImage);
  console.log('Image URL:', imageUrl);
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-100 flex justify-end p-2 z-10">
          <button 
            onClick={onClose} 
            className="bg-[#C5E7FF] text-[#00105A] p-1 rounded-full hover:bg-opacity-90"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="relative aspect-[4/3]">
          {imageUrl && (
            <img src={imageUrl} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover"/>
          )}
          
          {/* Name overlay with gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
            <p className="text-xl font-medium leading-none mb-0">{firstName}</p>
            <h1 className="text-4xl font-bold mb-3 leading-tight mt-0">{lastName}</h1>
            <div className="flex items-center gap-2">
              {positionLabel && (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#C5E7FF] text-[#00105A] rounded">
                  {positionLabel}
                </span>
              )}
              
              {/* Scottish flag for Scotland nationality */}
              {nationality && nationality.toLowerCase() === 'scotland' && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-blue-600 relative">
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to top right, transparent calc(50% - 1px), white, transparent calc(50% + 1px)), linear-gradient(to bottom right, transparent calc(50% - 1px), white, transparent calc(50% + 1px))"
                    }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#00105A] mb-3">Bio</h2>
          <p>{person.favoriteMoment || 'No biography available.'}</p>
          
          <h2 className="text-xl font-bold text-[#00105A] mt-6 mb-3">Details</h2>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Nationality</span>
            <span>{nationality || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Position</span>
            <span>{positionLabel || 'N/A'}</span>
          </div>
          
          {/* Career History section */}
          {personType === 'player' && person.careerHistory && person.careerHistory.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#00105A] mb-3">Career History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Club</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Years</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Apps</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Goals</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {person.careerHistory.map((club, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">{club.club}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {club.startYear}{club.endYear ? `–${club.endYear}` : '–Present'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">{club.appearances || '-'}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{club.goals || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Did You Know section */}
          {person.personalFacts && person.personalFacts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#00105A] mb-3">Did You Know?</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3">
                  {person.personalFacts.map((fact, index) => (
                    <li key={index}>
                      <p className="font-medium">{fact.question}</p>
                      <p className="text-gray-700">{fact.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
