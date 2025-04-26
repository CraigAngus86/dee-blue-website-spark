
import { NextResponse } from 'next/server';
import { getUpcomingFixtures, getResults } from '@/mock-data/fixturesData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const season = searchParams.get('season') || '2024/25';

    const data = type === 'results' 
      ? getResults(season)
      : getUpcomingFixtures(season);

    return NextResponse.json({ matches: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fixtures' },
      { status: 500 }
    );
  }
}
