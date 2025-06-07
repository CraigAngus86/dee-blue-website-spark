import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { galleryId } = params;

    // Use existing query pattern from useGallery hook
    const query = `*[_type == "matchGallery" && _id == $galleryId][0] {
      _id,
      title,
      matchDate,
      "coverImage": coverImage.asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "galleryImages": galleryImages[].asset->{
        _id,
        url,
        "public_id": cloudinary.public_id,
        "format": cloudinary.format,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      photographer,
      publishedAt,
      supabaseMatchId
    }`;
    
    // Server-side Sanity fetch (no CORS issues)
    const gallery = await sanityClient.fetch(query, { galleryId });
    
    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' }, 
        { status: 404 }
      );
    }

    // Transform to expected format
    const transformedGallery = {
      ...gallery,
      photos: gallery.galleryImages || []
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
