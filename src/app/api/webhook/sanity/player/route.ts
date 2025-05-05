
import { NextResponse } from 'next/server';
import { syncPlayerProfileToSupabase } from 'utils/cross-system/syncSanityToSupabase';
import { supabase } from '@/lib/supabase/client';
import { serverEnv } from '@/lib/env';

/**
 * Webhook handler for Sanity player profile events
 * Syncs player profile data from Sanity to Supabase
 */
export async function POST(request: Request) {
  try {
    // Verify webhook secret if provided
    const headers = new Headers(request.headers);
    const secret = headers.get('x-sanity-webhook-secret');
    
    // TODO: Add proper webhook secret validation when in production
    // if (secret !== serverEnv.getSanityWebhookSecret()) {
    //   return NextResponse.json({ error: 'Invalid webhook secret' }, { status: 401 });
    // }
    
    // Parse the webhook payload
    const payload = await request.json();
    console.log('[Webhook] Received Sanity webhook:', payload);
    
    // Log the webhook in Supabase for tracking
    await supabase.from('webhook_logs').insert([{
      event_type: 'sanity.player',
      document_type: payload._type,
      document_id: payload._id,
      operation: payload.operation,
      payload: payload,
      status: 'received'
    }]);
    
    // Handle different operations
    switch (payload.operation) {
      case 'create':
      case 'update':
        // Sync the player profile to Supabase
        const supabaseId = await syncPlayerProfileToSupabase(payload);
        
        if (supabaseId) {
          // Update the webhook log status
          await supabase
            .from('webhook_logs')
            .update({ 
              status: 'processed',
              processed_at: new Date().toISOString()
            })
            .eq('document_id', payload._id)
            .eq('event_type', 'sanity.player');
            
          return NextResponse.json({
            success: true,
            message: 'Player profile synced to Supabase',
            supabaseId
          });
        } else {
          // Update the webhook log status
          await supabase
            .from('webhook_logs')
            .update({ 
              status: 'failed',
              error_message: 'Failed to sync player profile to Supabase',
              processed_at: new Date().toISOString()
            })
            .eq('document_id', payload._id)
            .eq('event_type', 'sanity.player');
            
          return NextResponse.json(
            { error: 'Failed to sync player profile to Supabase' },
            { status: 500 }
          );
        }
        
      case 'delete':
        // Handle deletion by updating status in Supabase
        const { error: deleteError } = await supabase
          .from('people')
          .update({ is_deleted: true })
          .eq('sanity_id', payload._id.replace('drafts.', ''));
          
        if (deleteError) {
          console.error('Error marking player as deleted:', deleteError);
          return NextResponse.json(
            { error: 'Failed to mark player as deleted in Supabase' },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          message: 'Player marked as deleted in Supabase'
        });
        
      default:
        return NextResponse.json(
          { error: `Unsupported operation: ${payload.operation}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[Webhook] Error processing Sanity webhook:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
