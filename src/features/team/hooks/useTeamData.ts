'use client';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { filterPeople, groupPeopleByPosition } from '../services/getTeamData';

interface UseTeamDataProps {
  initialPeople: Person[];
}

export function useTeamData({ initialPeople }: UseTeamDataProps) {
  const [people, setPeople] = useState<Person[]>(initialPeople || []);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Debug logging for image structure
  useEffect(() => {
    if (initialPeople && initialPeople.length > 0) {
      // Find a person with an image
      const personWithImage = initialPeople.find(p => p.profileImage);
      
      if (personWithImage) {
        console.log('===== DETAILED IMAGE STRUCTURE ANALYSIS =====');
        console.log('Person name:', personWithImage.firstName, personWithImage.lastName);
        console.log('Full profileImage object:', personWithImage.profileImage);
        
        // Check for nested properties
        if (personWithImage.profileImage.asset) {
          console.log('Has .asset property:', personWithImage.profileImage.asset);
          
          if (personWithImage.profileImage.asset.public_id) {
            console.log('Has .asset.public_id:', personWithImage.profileImage.asset.public_id);
          }
          
          if (personWithImage.profileImage.asset.url) {
            console.log('Has .asset.url:', personWithImage.profileImage.asset.url);
          }
        }
        
        if (personWithImage.profileImage.public_id) {
          console.log('Has direct .public_id:', personWithImage.profileImage.public_id);
        }
        
        if (personWithImage.profileImage.url) {
          console.log('Has direct .url:', personWithImage.profileImage.url);
        }

        console.log('========== END OF ANALYSIS ==========');
      } else {
        console.warn('No people have profile images');
      }
      
      // Log all image structures to look for differences
      initialPeople.forEach(person => {
        if (person.profileImage) {
          console.log(`Image structure for ${person.firstName} ${person.lastName}:`, 
            JSON.stringify(person.profileImage, null, 2));
        }
      });
    }
  }, [initialPeople]);
  
  // Apply position/type filter
  const filteredByType = filterPeople(people, activeFilter);
    
  // Apply search filter if there's a query
  const filteredPeople = searchQuery
    ? filteredByType.filter(person => 
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByType;
  
  // Group people by position/role for section display
  const groupedPeople = groupPeopleByPosition(filteredPeople);
  
  return {
    people: filteredPeople,
    groupedPeople,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery
  };
}
