import React, { useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlayerProfileModal from '@/components/ui/players/PlayerProfileModal';
import { teamData } from '@/mock-data/team';
import { Separator } from '@/components/ui/separator';

const TeamAndManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Filter members based on search query
  const filterMembers = (members: any[]) => {
    if (!searchQuery) return members;
    return members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render staff or player card
  const renderPersonCard = (person: any, isManagement = false) => (
    <div 
      key={person.id}
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className={`relative aspect-square overflow-hidden ${isManagement ? 'bg-navy-800' : person.position === 'Goalkeeper' ? 'bg-[#218F50]' : 'bg-[#00105A]'}`}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
        
        {/* Player image */}
        <img 
          src={person.image} 
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Player number */}
        {!isManagement && person.number && (
          <div className="absolute right-4 top-4 text-6xl font-bold text-white/20 z-10">
            {person.number}
          </div>
        )}
        
        {/* Person details overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-light">{person.firstName}</span>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{person.lastName}</h3>
            <p className="text-xs text-gray-300">{person.position}</p>
          </div>
        </div>
      </div>
      
      {/* View profile link */}
      <button 
        onClick={() => setSelectedPlayer(person)}
        className="w-full bg-white py-2 px-4 border-t border-gray-200 text-[#00105A] hover:bg-gray-50"
      >
        <div className="flex items-center justify-between text-sm font-medium">
          View Profile
          <ChevronRight size={16} />
        </div>
      </button>
    </div>
  );

  // Render section
  const renderSection = (title: string, people: any[], isManagement = false) => (
    <section className="mb-16">
      <div className="bg-[#F4F7FB] py-16">
        <h2 className="text-4xl font-bold text-center uppercase text-[#00105A] mb-10">{title}</h2>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterMembers(people).map(person => renderPersonCard(person, isManagement))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
      <Footer />

      {/* Player Profile Modal */}
      <PlayerProfileModal
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        player={selectedPlayer}
      />
    </div>
  );
};

export default TeamAndManagement;
