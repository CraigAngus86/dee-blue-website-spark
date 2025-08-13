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
    <main className="min-h-screen bg-[rgb(var(--white))] text-[rgb(var(--brand-black))]">
      <Suspense
        fallback={
          <div
            className="flex justify-center items-center min-h-screen"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="text-center">
              {/* Brand spinner: gold ring, one side transparent */}
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--brand-gold))] border-r-transparent"
                role="status"
                aria-label="Loading team"
              />
              <p className="mt-3 font-body text-sm text-[rgb(var(--dark-gray))]">
                Loading team…
              </p>
            </div>
          </div>
        }
      >
        <TeamPage initialPeople={people || []} />
      </Suspense>
    </main>
  );
}
