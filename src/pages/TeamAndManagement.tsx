
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';
import SectionHero from '@/components/ui/hero/SectionHero';
import Grid from '@/components/ui/layout/Grid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StaffMemberCard from '@/components/ui/team/StaffMemberCard';
import PlayerCard from '@/components/ui/players/PlayerCard';
import { staffMembers, players } from '@/mock-data/teamData';

const TeamAndManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterMembers = (members: any[]) => {
    if (!searchQuery) return members;
    
    return members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <main className="min-h-screen bg-light-gray">
      <SectionHero 
        title="Team & Management"
        subtitle="Meet the players and staff who represent Banks o' Dee FC on and off the pitch."
        backgroundImage="/assets/images/team/Squad1.jpg"
      />
      
      <Section spacing="lg" className="-mt-8">
        <Container size="xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8 pb-6 border-b border-gray-200">
              <Tabs defaultValue="management" className="w-full md:w-auto">
                <TabsList className="bg-gray-100 p-1 rounded-full">
                  <TabsTrigger value="management">Team Management</TabsTrigger>
                  <TabsTrigger value="players">Players</TabsTrigger>
                  <TabsTrigger value="administration">Club Administration</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="management" className="mt-6">
              <TabsContent value="management">
                <Grid 
                  columns={{ default: 1, sm: 2, lg: 3, xl: 4 }}
                  gap="lg"
                  className="mt-6"
                >
                  {filterMembers(staffMembers.filter(m => m.type === 'management')).map((member) => (
                    <StaffMemberCard key={member.id} member={member} />
                  ))}
                </Grid>
              </TabsContent>

              <TabsContent value="players">
                <Grid 
                  columns={{ default: 1, sm: 2, lg: 3, xl: 4 }}
                  gap="lg"
                  className="mt-6"
                >
                  {filterMembers(players).map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </Grid>
              </TabsContent>

              <TabsContent value="administration">
                <Grid 
                  columns={{ default: 1, sm: 2, lg: 3, xl: 4 }}
                  gap="lg"
                  className="mt-6"
                >
                  {filterMembers(staffMembers.filter(m => m.type === 'administration')).map((member) => (
                    <StaffMemberCard key={member.id} member={member} />
                  ))}
                </Grid>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default TeamAndManagement;
