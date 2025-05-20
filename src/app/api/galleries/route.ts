import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get('matchId');
  
  if (!matchId) {
    return NextResponse.json({ error: 'Match ID is required' }, { status: 400 });
  }
  
  try {
    // Query Sanity for galleries with this matchId
    const query = `*[_type == "matchGallery" && supabaseId == $matchId][0] {
      _id,
      title,
      coverImage,
      photos,
      publishedAt
    }`;
    
    const gallery = await sanityClient.fetch(query, { matchId });
    
    if (!gallery) {
      return NextResponse.json({ exists: false });
    }
    
    return NextResponse.json({ 
      exists: true,
      id: gallery._id,
      title: gallery.title,
      coverImage: gallery.coverImage,
      photoCount: gallery.photos?.length || 0
    });
  } catch (error) {
    console.error('Error checking gallery existence:', error);
    return NextResponse.json({ error: 'Failed to check gallery' }, { status: 500 });
  }
}
