
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, BookOpen } from 'lucide-react';

export function SyncDocumentation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Synchronization Documentation
        </CardTitle>
        <CardDescription>
          Understanding the synchronization process between Sanity and Supabase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Player Import Process</h3>
          <p className="text-sm text-muted-foreground">
            When you import players from Supabase to Sanity, the system performs the following steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-4">
            <li>Fetches all players from the Supabase <code>people</code> table that have a <code>player_position</code> value</li>
            <li>For each player, the system checks if a corresponding <code>playerProfile</code> document exists in Sanity using the <code>supabaseId</code> field</li>
            <li>If a matching document exists, it updates the existing document with the latest data from Supabase</li>
            <li>If no matching document exists, it creates a new <code>playerProfile</code> document in Sanity</li>
            <li>When creating a new document, it sets the <code>supabaseId</code> field to establish the cross-system reference</li>
          </ol>
        </section>

        <Alert className="bg-amber-50">
          <AlertTitle className="flex items-center gap-2">
            <InfoIcon className="h-4 w-4" />
            Common Import Issues
          </AlertTitle>
          <AlertDescription className="text-sm mt-2">
            <p className="mb-2">If imports are failing, check for the following issues:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Required fields in the Sanity schema that are missing from Supabase data</li>
              <li>Type mismatches between Supabase and Sanity (e.g., numbers vs. strings)</li>
              <li>Missing or invalid references between documents</li>
              <li>API rate limiting (try using a smaller batch size)</li>
              <li>Permissions issues with the Sanity API token</li>
            </ul>
          </AlertDescription>
        </Alert>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Webhook Synchronization Process</h3>
          <p className="text-sm text-muted-foreground">
            Changes made in Sanity are synchronized to Supabase using webhooks:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-4">
            <li>A webhook is triggered whenever a document is published in Sanity</li>
            <li>The webhook payload is sent to your application's API endpoint</li>
            <li>The system determines the document type and processes it accordingly</li>
            <li>For existing records (with a <code>supabaseId</code>), it updates the corresponding Supabase record</li>
            <li>For new records, it creates a new record in Supabase and sets the <code>sanity_id</code> field</li>
          </ol>
        </section>
        
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Troubleshooting Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
            <li>Enable <strong>Verbose Mode</strong> to see detailed error messages during imports</li>
            <li>Use <strong>Dry Run</strong> mode to test imports without making actual changes</li>
            <li>Check the browser console and server logs for detailed error information</li>
            <li>Verify that your Sanity API token has the necessary permissions</li>
            <li>Make sure the Sanity and Supabase schemas are compatible with each other</li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
