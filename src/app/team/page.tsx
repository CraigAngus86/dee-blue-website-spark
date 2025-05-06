
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import PlayerProfileModal from '@/components/ui/players/PlayerProfileModal';
import TeamMemberCard from '@/components/ui/team/TeamMemberCard';
import { useTeamData, TeamMember } from '@/hooks/useTeamData';

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<TeamMember | null>(null);

  // Use the team data hook which handles fetching data
  const { data: teamData, isLoading, error } = useTeamData();

  // Debug team data loading
  useEffect(() => {
    if (teamData) {
      console.log('Team data loaded:', {
        management: teamData.management.length,
        goalkeepers: teamData.goalkeepers.length,
        defenders: teamData.defenders.length,
        midfielders: teamData.midfielders.length,
        forwards: teamData.forwards.length,
        total: teamData.management.length + teamData.goalkeepers.length + 
               teamData.defenders.length + teamData.midfielders.length + 
               teamData.forwards.length
      });
    }
  }, [teamData]);

  // Filter members based on search query
  const filterMembers = (members: TeamMember[] = []) => {
    if (!members || !searchQuery) return members || [];
    return members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading team data:', error);
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">Unable to load team data</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
        <p className="text-gray-500 mt-1">Error: {error.message}</p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">No team data available</h2>
        <p className="text-gray-600 mt-2">Please check back later</p>
      </div>
    );
  }

  // Render section for a group of team members
  const renderSection = (title: string, people: TeamMember[] = [], isManagement = false) => {
    const filteredMembers = filterMembers(people);
    
    if (filteredMembers.length === 0 && !searchQuery) {
      return null;
    }
    
    return (
      <section className="mb-16">
        <div className="bg-[#F4F7FB] py-16">
          <h2 className="text-4xl font-bold text-center uppercase text-[#00105A] mb-10">{title}</h2>
          
          {filteredMembers.length === 0 ? (
            <p className="text-center text-gray-500">No members found matching "{searchQuery}"</p>
          ) : (
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMembers.map((person) => (
                  <TeamMemberCard 
                    key={person.id}
                    member={person}
                    isManagement={isManagement}
                    onViewProfile={() => setSelectedPlayer(person)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: `url(/assets/images/team/Squad1.jpg)`,
              backgroundPosition: "center 30%"
            }}
          >
            <div className="absolute inset-0 bg-[#00105A]/60 z-10"></div>
          </div>
          
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
              Team & Management
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
              Meet the players and staff who represent Banks o' Dee FC on and off the pitch
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-16 px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search players and staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00105A] focus:border-[#00105A]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          {/* Debug Information - only visible in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="max-w-7xl mx-auto px-4 mb-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-bold mb-2">Debug Information</h3>
              <div className="grid grid-cols-5 gap-4 text-sm">
                <div><strong>Management:</strong> {teamData.management.length}</div>
                <div><strong>Goalkeepers:</strong> {teamData.goalkeepers.length}</div>
                <div><strong>Defenders:</strong> {teamData.defenders.length}</div>
                <div><strong>Midfielders:</strong> {teamData.midfielders.length}</div>
                <div><strong>Forwards:</strong> {teamData.forwards.length}</div>
              </div>
              <p className="mt-2 text-sm">
                <strong>Total players:</strong> {
                  teamData.management.length + 
                  teamData.goalkeepers.length + 
                  teamData.defenders.length + 
                  teamData.midfielders.length + 
                  teamData.forwards.length
                }
              </p>
            </div>
          )}
          
          {/* Team Sections */}
          <div className="space-y-4">
            {renderSection('Team Management', teamData.management, true)}
            <div className="h-4 bg-white" />
            {renderSection('Goalkeepers', teamData.goalkeepers)}
            <div className="h-4 bg-white" />
            {renderSection('Defenders', teamData.defenders)}
            <div className="h-4 bg-white" />
            {renderSection('Midfielders', teamData.midfielders)}
            <div className="h-4 bg-white" />
            {renderSection('Forwards', teamData.forwards)}
          </div>
        </div>
      </main>

      {/* Player Profile Modal */}
      {selectedPlayer && (
        <PlayerProfileModal
          isOpen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          player={selectedPlayer}
        />
      )}
    </div>
  );
}
