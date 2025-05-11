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
