import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { galleryId } = params;

    // Pull the gallery and dereference the photos
    const query = `*[_type == "matchGallery" && _id == $galleryId][0]{
      _id,
      title,
      matchDate,
      coverImage, 
      // dereference each photo asset so we get URLs etc.
      photos[]{
        caption,
        category,
        playerIds,
        // if your schema has an "image" field use this:
        "public_id": image.asset->public_id,
        "url": image.asset->url,
        "secure_url": image.asset->secure_url,
        "format": image.asset->format,
        _type
      },
      photographer,
      publishedAt,
      supabaseMatchId
    }`;

    const gallery = await sanityClient.fetch(query, { galleryId });

    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    // We can return the photos as-is now because they’re already projected with URLs
    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}
