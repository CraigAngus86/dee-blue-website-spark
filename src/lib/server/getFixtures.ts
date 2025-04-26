
export async function getFixtures(type: 'fixtures' | 'results', season?: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/fixtures`);
  url.searchParams.set('type', type);
  if (season) {
    url.searchParams.set('season', season);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch fixtures');
  }
  return response.json();
}
