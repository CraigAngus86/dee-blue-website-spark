import { NextResponse } from 'next/server';
import { cloudinaryServer } from '@/lib/cloudinary/server';

// Mark this route as dynamic since it depends on request parameters
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json(
        { error: { message: 'Folder parameter is required' } },
        { status: 400 }
      );
    }
    
    console.log(`Fetching images from Cloudinary folder: ${folder}`);
    
    // Build the full folder path if not provided
    const folderPath = folder.startsWith('banksofdeefc/') 
      ? folder 
      : `banksofdeefc/matches/gallery/${folder}`;
    
    // Fetch resources from Cloudinary
    const result = await cloudinaryServer.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
      resource_type: 'image',
    });
    
    // Return the resources
    return NextResponse.json({
      folder: folderPath,
      imageCount: result.resources.length,
      resources: result.resources.map(resource => ({
        public_id: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        created_at: resource.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching Cloudinary gallery:', error);
    return NextResponse.json(
      {
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch gallery images from Cloudinary'
        }
      },
      { status: 500 }
    );
  }
}
