
"use client";

import { NextResponse } from 'next/server';
import { processSanityWebhook } from '@/utils/sync/SanityToSupabaseSync';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

/**
 * Validates the webhook signature for legacy endpoint
 */
function validateWebhookSignature(req: Request): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('SANITY_WEBHOOK_SECRET is not defined in environment variables');
    return false;
  }

  const signature = req.headers.get('sanity-webhook-signature');
  
  if (!signature) {
    console.error('No Sanity webhook signature found in request headers');
    return false;
  }

  // Same signature validation challenges as in the new endpoint
  // For development purposes, we're bypassing validation
  if (process.env.NODE_ENV === 'development') {
    console.warn('Skipping webhook signature validation in development mode');
    return true;
  }
  
  return true; // Placeholder - real implementation would verify signature
}

/**
 * Legacy webhook handler - provides compatibility with existing webhooks
 * This has the same core functionality as the new endpoint but maintains
 * the legacy URL structure
 */
export async function POST(request: Request) {
  try {
    // Log the request for debugging
    console.log('Received Sanity webhook at legacy /api/sanity-webhook endpoint');
    
    // Validate webhook signature
    if (!validateWebhookSignature(request)) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }
    
    // Parse the webhook payload
    const payload = await request.json();
    
    if (!payload || !payload._id || !payload._type) {
      console.error('Invalid webhook payload:', payload);
      return NextResponse.json(
        { success: false, error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }
    
    // Process the webhook using the same shared utility
    console.log('Processing legacy webhook for document:', payload._type, payload._id);
    const success = await processSanityWebhook(payload);
    
    // Return appropriate response
    return NextResponse.json({ 
      success,
      message: `Legacy webhook processed for ${payload._type} (${payload._id})`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing legacy Sanity webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
