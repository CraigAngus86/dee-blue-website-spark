
# Sanity Webhook Integration

This document outlines the webhook integration between Sanity CMS and our application, which allows for real-time data synchronization when content changes in Sanity.

## Overview

When content is created, updated, or deleted in Sanity, a webhook sends an event to our application's API endpoint. The application authenticates the request, logs the event, and processes the content change to keep our Supabase database in sync with Sanity.

## Setup Requirements

### Environment Variables

The following environment variable must be set:

- `SANITY_WEBHOOK_SECRET`: A secret key used to authenticate webhook requests. This must match the secret configured in Sanity.

### Supabase Table for Webhook Logs

You'll need to create a table in Supabase to store webhook logs (optional but recommended):

```sql
CREATE TABLE public.webhook_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id TEXT NOT NULL,
  document_type TEXT NOT NULL,
  operation TEXT NOT NULL,
  payload JSONB,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'processed',
  error_message TEXT
);
```

## Setting Up Webhooks in Sanity

1. Go to your Sanity project dashboard
2. Navigate to API > Webhooks
3. Click "Create webhook"
4. Configure the webhook:
   - URL: `https://your-app-url.com/api/sanity-webhook`
   - Dataset: `production` (or whichever dataset you're using)
   - Filter: `_type in ["playerProfile", "newsArticle", "fanOfMonth", "sponsor", "matchGallery"]`
   - Projection: Include the fields you need (minimum: `{_id, _type, _rev}`)
   - Secret: Generate a secure random string and set it as both the webhook secret and the `SANITY_WEBHOOK_SECRET` environment variable

## Webhook Payload Structure

The webhook sends a JSON payload with the following structure:

```json
{
  "_type": "playerProfile",          // Document type
  "documentId": "abc123",            // Sanity document ID
  "operation": "update",             // Operation type: create, update, or delete
  "revision": "rev123",              // Document revision
  "document": {                      // The actual document data (not always included)
    "_id": "abc123",
    // ... document fields
  }
}
```

## Testing Webhooks

To test webhooks locally:

1. Use a tool like ngrok to expose your local server: `ngrok http 3000`
2. Set up a temporary webhook in Sanity pointing to your ngrok URL
3. Make changes to documents in Sanity to trigger the webhook
4. Check your application logs for webhook processing information

## Troubleshooting

- **401 Unauthorized**: Check that the `SANITY_WEBHOOK_SECRET` environment variable matches the secret set in Sanity.
- **Webhook not triggering**: Verify the document type is included in the filter and that you're making changes to documents that match the filter.
- **Missing data**: Check the projection in your webhook configuration to ensure all required fields are included.

## Implementing New Handlers

To add support for a new document type:

1. Create a new handler class in `utils/sanity-webhook-handlers.ts` that extends `SanityWebhookHandler`
2. Implement the required methods: `handleCreate`, `handleUpdate`, and `handleDelete`
3. Add the new handler to the `getHandler` function
4. Update the switch statement in `pages/api/sanity-webhook.ts` to include the new document type
