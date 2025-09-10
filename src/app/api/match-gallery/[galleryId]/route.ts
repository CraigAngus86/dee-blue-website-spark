import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { galleryId: string } }
) {
  try {
    const { galleryId } = params;

    // Pull gallery and dereference photos directly
    const query = `*[_type == "matchGallery" && _id == $galleryId][0]{
      _id,
      title,
      matchDate,
      coverImage,
      photographer,
      publishedAt,
      supabaseMatchId,
      // dereference photos to include Cloudinary fields
      photos[]{
        _type,
        public_id,
        url,
        secure_url,
        format,
        caption,
        category,
        playerIds
      }
    }`;

    const gallery = await sanityClient.fetch(query, { galleryId });

    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Transform so each photo has an `image` key (what your frontend expects)
    const transformedGallery = {
      ...gallery,
      photos: (gallery.photos || [])
        .filter((img: any) => img && img.public_id)
        .map((img: any) => ({
          image: {
            public_id: img.public_id,
            url: img.url,
            secure_url: img.secure_url,
            format: img.format,
            _type: img._type,
          },
          caption: img.caption || undefined,
          category: img.category || undefined,
          playerIds: img.playerIds || undefined,
        })),
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
