import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { galleryId } = params;

    const query = `*[_type == "matchGallery" && _id == $galleryId][0] {
      _id,
      title,
      matchDate,
      coverImage,
      galleryImages,
      photographer,
      publishedAt,
      supabaseMatchId
    }`;
    
    const gallery = await sanityClient.fetch(query, { galleryId });
    
    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' }, 
        { status: 404 }
      );
    }

    // Transform to match expected GalleryPhoto structure
    const transformedGallery = {
      ...gallery,
      photos: (gallery.galleryImages || [])
        .filter((img: any) => img && img.public_id) // Filter out null/invalid images
        .map((img: any) => ({
          image: {
            public_id: img.public_id,
            url: img.url,
            secure_url: img.secure_url,
            format: img.format,
            _type: img._type
          },
          // Provide safe defaults for missing Sanity fields
          caption: undefined,
          category: undefined,
          playerIds: undefined
        }))
    };

    return NextResponse.json(transformedGallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' }, 
      { status: 500 }
    );
  }
}
