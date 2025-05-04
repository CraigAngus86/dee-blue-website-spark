
import { NextResponse } from 'next/server';
import { processSanityWebhook } from '@/utils/sync/SanityToSupabaseSync';

// Handle Sanity webhook requests
export async function POST(request: Request) {
  try {
    // Validate the webhook payload
    const payload = await request.json();
    
    if (!payload || !payload._id || !payload._type) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }
    
    console.log('Received Sanity webhook:', payload._type, payload._id, payload.operation);
    
    // Process the webhook
    const success = await processSanityWebhook(payload);
    
    // Log the webhook for debugging
    await fetch('/api/logs/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'sanity',
        document_type: payload._type,
        document_id: payload._id, 
        operation: payload.operation,
        status: success ? 'success' : 'failed',
        payload
      }),
    }).catch(err => console.error('Failed to log webhook:', err));
    
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error processing Sanity webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
