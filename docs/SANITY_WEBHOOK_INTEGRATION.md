
# Sanity Webhook Integration

This document outlines the webhook integration between Sanity CMS and our application, which allows for real-time data synchronization when content changes in Sanity.

## Overview

When content is created, updated, or deleted in Sanity, a webhook sends an event to our application's API endpoint. The application authenticates the request, logs the event, and processes the content change to keep our Supabase database in sync with Sanity.

## Webhook Endpoints

We support two webhook endpoint formats to allow for a smooth migration path:

1. **Legacy Endpoint**: `/api/sanity-webhook` - This was the original endpoint and continues to be supported.
2. **New Endpoint**: `/api/webhooks/sanity` - This is the recommended endpoint for new setups.

Both endpoints provide identical functionality and process webhooks in the same way. You can use either endpoint based on your existing configuration.

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
   - URL: `https://your-app-url.com/api/webhooks/sanity` (new) or `https://your-app-url.com/api/sanity-webhook` (legacy)
   - Dataset: `production` (or whichever dataset you're using)
   - Filter: `_type in ["playerProfile", "newsArticle", "fanOfMonth", "sponsor", "matchGallery", "match"]`
   - Projection: Include the fields you need (minimum: `{_id, _type, _rev}`)
   - Secret: Generate a secure random string and set it as both the webhook secret and the `SANITY_WEBHOOK_SECRET` environment variable

## Webhook Payload Structure

The webhook sends a JSON payload with the following structure:

```json
{
  "_type": "playerProfile",          // Document type
  "_id": "abc123",                   // Sanity document ID
  "operation": "update",             // Operation type: create, update, or delete
  "_rev": "rev123",                  // Document revision
  "document": {                      // The actual document data (not always included)
    "_id": "abc123",
    // ... document fields
  }
}
```

## Migrating Between Webhook Endpoints

If you're currently using the legacy endpoint (`/api/sanity-webhook`) and want to migrate to the new endpoint (`/api/webhooks/sanity`):

1. Create a new webhook in Sanity pointing to the new endpoint
2. Test the new webhook to ensure it's processing events correctly
3. Once confirmed, you can delete the old webhook

Both endpoints will continue to be supported, so there's no urgency to migrate.

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
- **No processing occurring**: Check application logs to see if the webhook is being received but failing during processing.

## Environment-Specific Webhook URLs

The admin interface in the application will automatically generate the correct webhook URL based on your current environment:

- Local development: Uses your local URL (e.g., `http://localhost:3000`)
- GitHub Codespaces: Uses the Codespaces URL (e.g., `https://your-codespace-name.github.dev`)
- Preview/Production: Uses your deployment URL (e.g., `https://your-app.lovable.app` or your custom domain)

Always use the URL shown in the admin interface when configuring webhooks for your current environment.

## Implementing New Handlers

To add support for a new document type:

1. Update the filter in your webhook configuration to include the new document type
2. Add a new case in the `processSanityWebhook` function in `utils/sync/SanityToSupabaseSync.ts`
3. Implement the appropriate sync logic for the new document type
