import { Suspense } from 'react';
import { getTeamData } from '@/features/team/services/getTeamData';
import { TeamPage } from '@/features/team';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const { people, error } = await getTeamData();
  
  if (error) {
    console.error('Error loading team data:', error);
  }
  
  return (
    <main>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" role="status"></div>
          <p className="mt-2">Loading team...</p>
        </div>
      </div>}>
        <TeamPage initialPeople={people || []} />
      </Suspense>
    </main>
  );
}
