'use client';
import { useState } from 'react';
import { Person } from '..'; // Import from index.ts
import { useTeamData } from '../hooks/useTeamData';
import { getTeamFilterOptions } from '../services/getTeamData';
import { TeamFilter } from './TeamFilter';
import { TeamSearchBar } from './TeamSearchBar';
import { TeamSection } from './TeamSection';
import { PersonDetailsModal } from './PersonDetailsModal';
import TeamHero from './TeamHero';

interface TeamPageProps {
  initialPeople: Person[];
}

export function TeamPage({ initialPeople }: TeamPageProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  
  const {
    groupedPeople,
    activeFilter,
    setActiveFilter,
    setSearchQuery
  } = useTeamData({ initialPeople });
  
  const filterOptions = getTeamFilterOptions();
  
  // Handle profile click
  const handleProfileClick = (person: Person) => {
    setSelectedPerson(person);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setSelectedPerson(null);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <TeamHero />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <TeamSearchBar onSearch={setSearchQuery} />
        </div>
        
        {/* Filters */}
        <div className="flex justify-center mb-8">
          <TeamFilter
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
        
        {/* Team Sections */}
        {groupedPeople.management?.length > 0 && (
          <TeamSection 
            title="Management & Staff" 
            people={groupedPeople.management} 
            onProfileClick={handleProfileClick}
          />
        )}
        
        {groupedPeople.goalkeeper?.length > 0 && (
          <TeamSection 
            title="Goalkeepers" 
            people={groupedPeople.goalkeeper} 
            onProfileClick={handleProfileClick}
          />
        )}
        
        {groupedPeople.defender?.length > 0 && (
          <TeamSection 
            title="Defenders" 
            people={groupedPeople.defender} 
            onProfileClick={handleProfileClick}
          />
        )}
        
        {groupedPeople.midfielder?.length > 0 && (
          <TeamSection 
            title="Midfielders" 
            people={groupedPeople.midfielder} 
            onProfileClick={handleProfileClick}
          />
        )}
        
        {groupedPeople.forward?.length > 0 && (
          <TeamSection 
            title="Forwards" 
            people={groupedPeople.forward} 
            onProfileClick={handleProfileClick}
          />
        )}
        
        {/* No results message */}
        {Object.values(groupedPeople).every(group => !group || group.length === 0) && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter to find players or staff.</p>
            <button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Modal */}
        {selectedPerson && (
          <PersonDetailsModal 
            person={selectedPerson} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
}

export default TeamPage;
