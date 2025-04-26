
import { fixturesData, resultsData } from '@/mock-data/fixturesData';

export async function getFixtures(type: 'fixtures' | 'results', season?: string) {
  // In a production app, this would be an API call
  // For now, we'll use mock data directly
  
  if (type === 'fixtures') {
    return { matches: fixturesData.matches };
  } else {
    return { matches: resultsData.results };
  }
}
