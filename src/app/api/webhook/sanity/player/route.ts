// This webhook is simplified based on our new architecture
// We no longer sync player data from Sanity to Supabase

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Received Sanity webhook for player:', body);
    
    // We no longer sync to Supabase, but we can still log the event
    // and use it for cache invalidation or other purposes
    
    // In the future, we might want to use this webhook for:
    // 1. Invalidating Next.js cache for team pages
    // 2. Triggering image optimization in Cloudinary
    // 3. Sending notifications for content updates
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received - no sync needed in new architecture'
    });
  } catch (error) {
    console.error('Error processing Sanity player webhook:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
