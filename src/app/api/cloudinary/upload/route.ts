
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with proper environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function POST(request: Request) {
  try {
    console.log('[API] Cloudinary upload API route called');
    
    // Check if the request is from Sanity Studio
    const headers = new Headers(request.headers);
    const isSanityRequest = headers.get('x-sanity-studio') === 'true';
    
    if (isSanityRequest) {
      console.log('[API] Request from Sanity Studio detected');
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('[API] No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Log file details
    console.log('[API] File received:', { 
      name: file.name, 
      type: file.type, 
      size: file.size 
    });
    
    // Get metadata from form data
    const contentType = formData.get('contentType') as string;
    const entityId = formData.get('entityId') as string;
    const type = formData.get('type') as string;
    const tags = formData.get('tags') as string;
    const metadataJson = formData.get('metadata') as string;
    
    console.log('[API] Metadata received:', { 
      contentType, entityId, type, tags,
      metadataJson: metadataJson ? 'provided' : 'not provided' 
    });
    
    // Determine folder
    let folder = 'banksofdeefc/other';
    
    if (contentType && entityId) {
      switch (contentType) {
        case 'news':
        case 'newsArticle':
          folder = `banksofdeefc/news/article-${entityId}`;
          break;
        case 'player':
        case 'playerProfile':
          folder = `banksofdeefc/people/person-${entityId}`;
          break;
        case 'match':
        case 'matchGallery':
          folder = `banksofdeefc/matches/match-${entityId}/gallery`;
          break;
        case 'sponsor':
          folder = `banksofdeefc/sponsors/sponsor-${entityId}`;
          break;
        case 'stadium':
        case 'stadiumInfo':
          folder = 'banksofdeefc/stadium';
          break;
      }
    }
    
    console.log('[API] Upload configuration:', { folder });
    
    // Parse metadata
    let context = {};
    if (metadataJson) {
      try {
        context = JSON.parse(metadataJson);
        console.log('[API] Parsed metadata context:', context);
      } catch (e) {
        console.error('[API] Error parsing metadata:', e);
      }
    }
    
    // Parse tags
    const tagsList = tags ? tags.split(',') : [];
    console.log('[API] Tags for upload:', tagsList);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Base64 encode the buffer
    const base64 = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;
    
    console.log('[API] Starting Cloudinary upload...');
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: folder,
      resource_type: 'auto',
      tags: tagsList,
      context: context,
    });
    
    console.log('[API] Cloudinary upload successful:', { 
      publicId: result.public_id,
      url: result.secure_url,
      format: result.format
    });
    
    return NextResponse.json({
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      originalFilename: file.name,
      format: result.format,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    console.error('[API] Error uploading to Cloudinary:', error);
    return NextResponse.json({ 
      error: { 
        message: error instanceof Error ? error.message : 'Upload failed',
        details: error
      }
    }, { status: 500 });
  }
}
