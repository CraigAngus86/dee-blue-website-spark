
import { NextResponse } from 'next/server';
import { cloudinaryServer, getPersonFolderPath, getUploadPreset } from '@/lib/cloudinary/server';
import { isServer } from '@/lib/env';

export async function POST(request: Request) {
  // Check if this is actually running on the server
  if (!isServer) {
    return NextResponse.json(
      { error: 'This API route can only be executed on the server' },
      { status: 500 }
    );
  }

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
    const uploadPreset = formData.get('uploadPreset') as string;
    const customFolder = formData.get('folder') as string;
    
    console.log('[API] Metadata received:', { 
      contentType, entityId, type, tags,
      uploadPreset: uploadPreset || 'default',
      customFolder: customFolder || 'not provided',
      metadataJson: metadataJson ? 'provided' : 'not provided' 
    });
    
    // Determine folder
    let folder = customFolder || 'banksofdeefc/other';
    
    if (!customFolder && contentType && entityId) {
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
    if (contentType) tagsList.push(contentType);
    if (type) tagsList.push(type);
    console.log('[API] Tags for upload:', tagsList);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Base64 encode the buffer
    const base64 = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;
    
    console.log('[API] Starting Cloudinary upload...');
    
    // Get the appropriate upload preset
    const finalUploadPreset = uploadPreset || getUploadPreset(contentType);
    console.log('[API] Using upload preset:', finalUploadPreset);
    
    // Upload to Cloudinary
    const result = await cloudinaryServer.uploader.upload(fileUri, {
      folder: folder,
      upload_preset: finalUploadPreset,
      resource_type: 'auto',
      tags: tagsList,
      context: context,
      public_id: type === 'profile' ? 'profile' : undefined
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
