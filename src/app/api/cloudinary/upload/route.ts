
import { NextResponse } from 'next/server';
import { cloudinaryServer, getUploadPreset } from '@/lib/cloudinary/server';
import { formatTags } from '@/lib/cloudinary/metadata';

/**
 * POST handler for Cloudinary uploads
 * This API route proxies uploads to Cloudinary with proper authentication
 */
export async function POST(request: Request) {
  try {
    // Extract form data from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: { message: 'No file provided' } },
        { status: 400 }
      );
    }
    
    // Get metadata from form data
    const contentType = formData.get('contentType') as string || 'unknown';
    const entityId = formData.get('entityId') as string || '';
    const type = formData.get('type') as string || 'default';
    
    // Get tags from form data
    let tags: string[] = [];
    const tagsString = formData.get('tags') as string;
    if (tagsString) {
      tags = tagsString.split(',').map(tag => tag.trim());
    }
    tags = formatTags(tags, contentType);
    
    // Get additional metadata
    let metadata: Record<string, any> = {};
    const metadataString = formData.get('metadata') as string;
    if (metadataString) {
      try {
        metadata = JSON.parse(metadataString);
      } catch (e) {
        console.error('Error parsing metadata:', e);
      }
    }
    
    // Get upload preset (from form data or determine based on content type)
    let uploadPreset = formData.get('uploadPreset') as string;
    if (!uploadPreset) {
      uploadPreset = getUploadPreset(contentType);
    }
    
    console.log('Uploading to Cloudinary with:', {
      contentType,
      entityId,
      type,
      tags,
      uploadPreset,
      fileName: file.name,
      fileSize: file.size
    });
    
    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Determine folder path based on content type and entity ID
    let folder = 'banksofdeefc';
    if (contentType === 'player' || contentType === 'playerProfile') {
      folder = `banksofdeefc/people/${entityId ? `person-${entityId}` : 'unassigned'}`;
    } else if (contentType === 'news' || contentType === 'newsArticle') {
      folder = `banksofdeefc/news/${entityId ? `article-${entityId}` : 'unassigned'}`;
    } else if (contentType === 'match' || contentType === 'matchGallery') {
      folder = `banksofdeefc/matches/${entityId ? `match-${entityId}` : 'unassigned'}`;
    }
    
    // Upload to Cloudinary
    const result = await cloudinaryServer.uploader.upload(buffer, {
      folder,
      resource_type: 'auto',
      public_id: type, // Use type as the public ID (profile, action, etc.)
      tags,
      context: metadata,
      upload_preset: uploadPreset,
      overwrite: true
    });
    
    console.log('Cloudinary upload successful:', {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url
    });
    
    // Return the successful result
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
    
    return NextResponse.json(
      { 
        error: { 
          message: error instanceof Error ? error.message : 'Failed to upload image to Cloudinary'
        } 
      },
      { status: 500 }
    );
  }
}
