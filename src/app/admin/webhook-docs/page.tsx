
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WebhookDocsPage() {
  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Sanity Webhook Documentation</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Overview</CardTitle>
            <CardDescription>
              How Sanity webhooks sync data to our Supabase database
            </CardDescription>
          </CardHeader>
          <CardContent className="prose">
            <p>
              Our application uses webhooks from Sanity CMS to keep the Supabase database in sync with content changes.
              When content is created, updated, or deleted in Sanity, a webhook notification is sent to our application.
            </p>
            
            <h3>Supported Webhook Endpoints</h3>
            <p>We support two webhook endpoint formats:</p>
            <ul>
              <li><strong>Legacy endpoint</strong>: <code>/api/sanity-webhook</code></li>
              <li><strong>New endpoint</strong>: <code>/api/webhooks/sanity</code></li>
            </ul>
            <p>
              Both endpoints provide identical functionality. The legacy endpoint is maintained for 
              backward compatibility, while the new endpoint follows a more structured API pattern.
            </p>
            
            <h3>Webhook Authentication</h3>
            <p>
              Webhooks are authenticated using a shared secret. The <code>SANITY_WEBHOOK_SECRET</code> 
              environment variable must be set to the same value configured in the Sanity webhook settings.
            </p>
            
            <h3>Supported Document Types</h3>
            <p>Currently, we support syncing the following document types:</p>
            <ul>
              <li><code>playerProfile</code> - Player information</li>
              <li><code>sponsor</code> - Sponsorship information</li>
              <li><code>match</code> - Match details</li>
              <li><code>newsArticle</code> - News content</li>
              <li><code>fanOfMonth</code> - Fan of the month features</li>
              <li><code>matchGallery</code> - Match photo galleries</li>
            </ul>
            
            <h3>Webhook Payload Structure</h3>
            <p>The webhook sends a JSON payload with the following structure:</p>
            <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "_type": "playerProfile",          // Document type
  "_id": "abc123",                   // Sanity document ID
  "operation": "update",             // Operation type: create, update, or delete
  "_rev": "rev123",                  // Document revision
  "document": {                      // The actual document data (not always included)
    "_id": "abc123",
    // ... document fields
  }
}`}
            </pre>
            
            <h3>Testing Webhooks</h3>
            <p>To test webhooks locally:</p>
            <ol>
              <li>Use ngrok to expose your local server: <code>ngrok http 3000</code></li>
              <li>Create a temporary webhook in Sanity pointing to your ngrok URL</li>
              <li>Make changes to documents in Sanity to trigger the webhook</li>
              <li>Check your application logs for webhook processing information</li>
            </ol>
            
            <h3>Troubleshooting</h3>
            <ul>
              <li><strong>401 Unauthorized</strong>: Check that the <code>SANITY_WEBHOOK_SECRET</code> environment variable matches the secret set in Sanity.</li>
              <li><strong>Webhook not triggering</strong>: Verify the document type is included in the filter and that you're making changes to documents that match the filter.</li>
              <li><strong>Missing data</strong>: Check the projection in your webhook configuration to ensure all required fields are included.</li>
            </ul>
            
            <p>
              For more detailed information, refer to the <code>docs/SANITY_WEBHOOK_INTEGRATION.md</code> file
              in the project repository.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
