import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { articleId: string } }
) {
  try {
    const { articleId } = params;

    // Use existing proven query pattern from MatchCenter.tsx
    const query = `*[_type == "newsArticle" && _id == $articleId][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      excerpt,
      category,
      body,
      author,
      "matchId": matchId,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": profileImage
      },
      gallery
    }`;
    
    // Server-side Sanity fetch (no CORS issues)
    const article = await sanityClient.fetch(query, { articleId });
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' }, 
        { status: 404 }
      );
    }

    // Transform to expected format
    const transformedArticle = {
      ...article,
      id: article._id
    };

    return NextResponse.json(transformedArticle);
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' }, 
      { status: 500 }
    );
  }
}
