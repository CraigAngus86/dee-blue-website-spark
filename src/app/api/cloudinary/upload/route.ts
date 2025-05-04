import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dlkpaw2a0',
  api_key: '336893478695244',
  api_secret: 'AUF4vnt0LCLEZdy6J4jv3L3081o',
  secure: true
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Get metadata from form data
    const contentType = formData.get('contentType') as string;
    const entityId = formData.get('entityId') as string;
    const type = formData.get('type') as string;
    const tags = formData.get('tags') as string;
    const metadataJson = formData.get('metadata') as string;
    
    // Determine upload preset
    let uploadPreset = 'banks-o-dee';  // Default preset
    
    if (type === 'player') {
      uploadPreset = 'player-upload';
    } else if (type === 'news') {
      uploadPreset = 'news-upload';
    } else if (type === 'match') {
      uploadPreset = 'match-gallery-upload';
    } else if (type === 'sponsor') {
      uploadPreset = 'sponsor-upload';
    } else if (type === 'stadium') {
      uploadPreset = 'stadium-upload';
    }
    
    // Determine folder
    let folder = 'banksofdeefc/other';
    
    if (contentType && entityId) {
      switch (contentType) {
        case 'news':
          folder = `banksofdeefc/news/article-${entityId}`;
          break;
        case 'player':
          folder = `banksofdeefc/people/person-${entityId}`;
          break;
        case 'match':
          folder = `banksofdeefc/matches/match-${entityId}/gallery`;
          break;
        case 'sponsor':
          folder = `banksofdeefc/sponsors/sponsor-${entityId}`;
          break;
        case 'stadium':
          folder = 'banksofdeefc/stadium';
          break;
      }
    }
    
    // Parse metadata
    let context = {};
    if (metadataJson) {
      try {
        context = JSON.parse(metadataJson);
      } catch (e) {
        console.error('Error parsing metadata:', e);
      }
    }
    
    // Parse tags
    const tagsList = tags ? tags.split(',') : [];
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Base64 encode the buffer
    const base64 = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: folder,
      upload_preset: uploadPreset,
      tags: tagsList,
      context: context,
      resource_type: 'auto',
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
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ 
      error: { 
        message: error instanceof Error ? error.message : 'Upload failed',
        details: error
      }
    }, { status: 500 });
  }
}