
import { NextResponse } from 'next/server';
import { newsArticles } from '@/mock-data/newsData';

export async function GET() {
  try {
    return NextResponse.json({ articles: newsArticles });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}
