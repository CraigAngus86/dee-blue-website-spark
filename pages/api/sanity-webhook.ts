
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { supabase } from '@/integrations/supabase/client';

/**
 * Environment variable containing the Sanity webhook secret
 * This must be set in your environment and must match the secret configured in Sanity
 */
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

/**
 * Validates that the request is authenticated using HMAC signature verification
 * 
 * @param req The incoming API request
 * @returns boolean True if the request signature is valid
 */
function validateWebhookSignature(req: NextApiRequest): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('SANITY_WEBHOOK_SECRET is not defined in environment variables');
    return false;
  }

  const signature = req.headers['sanity-webhook-signature'] as string;
  
  if (!signature) {
    console.error('No Sanity webhook signature found in request headers');
    return false;
  }

  // Get raw body for signature validation
  const rawBody = JSON.stringify(req.body);
  
  // Create HMAC signature using sha256 and the webhook secret
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const computedSignature = hmac.update(rawBody).digest('hex');
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

/**
 * Logs webhook events for monitoring and debugging
 * In production, this should be connected to a proper logging service
 * 
 * @param event The webhook event payload
 */
function logWebhookEvent(event: any): void {
  const timestamp = new Date().toISOString();
  const documentId = event.documentId || 'unknown';
  const operation = event.operation || 'unknown';
  const documentType = event._type || 'unknown';
  
  console.log(`[${timestamp}] Webhook: ${operation} on ${documentType} (ID: ${documentId})`);
  
  // Store webhook events in Supabase for auditing (optional)
  try {
    supabase.from('webhook_logs').insert({
      event_type: 'sanity_webhook',
      document_id: documentId,
      document_type: documentType,
      operation: operation,
      payload: event,
      status: 'received',
      processed_at: new Date().toISOString()
    }).then(response => {
      if (response.error) {
        console.error('Error logging webhook to Supabase:', response.error);
      }
    });
  } catch (error) {
    console.error('Failed to log webhook event to Supabase:', error);
  }
}

/**
 * Main webhook handler function
 * Processes incoming webhooks from Sanity
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate Content-Type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ error: 'Invalid Content-Type, expected application/json' });
  }
  
  // Authenticate the webhook request
  if (!validateWebhookSignature(req)) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Unauthorized - Invalid signature' });
  }
  
  try {
    const body = req.body;
    
    // Log the incoming webhook event
    logWebhookEvent(body);
    
    // Ensure we have the necessary information
    if (!body._type || !body.operation || !body.documentId) {
      return res.status(400).json({ error: 'Missing required webhook data' });
    }
    
    // Process different document types with dedicated handlers
    switch(body._type) {
      case 'playerProfile':
        // Will implement player profile handler later
        console.log(`Received ${body.operation} event for playerProfile`);
        break;
      
      case 'newsArticle':
        // Will implement news article handler later
        console.log(`Received ${body.operation} event for newsArticle`);
        break;
      
      case 'fanOfMonth':
        // Will implement fan of month handler later
        console.log(`Received ${body.operation} event for fanOfMonth`);
        break;
      
      case 'sponsor':
        // Will implement sponsor handler later
        console.log(`Received ${body.operation} event for sponsor`);
        break;
      
      case 'matchGallery':
        // Will implement match gallery handler later
        console.log(`Received ${body.operation} event for matchGallery`);
        break;
        
      default:
        console.log(`No handler implemented for document type: ${body._type}`);
    }
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      message: `Webhook received for ${body._type} (${body.operation})`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
  }
}
