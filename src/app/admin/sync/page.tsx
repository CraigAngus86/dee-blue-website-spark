
import React from 'react';
import { SyncAdmin } from '@/components/admin/SyncAdmin';
import { WebhookSetup } from '@/components/admin/WebhookSetup';
import { SyncDocumentation } from '@/components/admin/SyncDocumentation';
import { Button } from '@/components/ui/button';

export default function SyncPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Data Synchronization</h1>
      <p className="text-muted-foreground mb-8">
        Manage data synchronization between Sanity CMS and Supabase.
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Use this admin panel to manage data sync between systems.
        </p>
        <Button asChild variant="outline" size="sm">
          <a href="/admin/test-sanity" className="flex items-center gap-1">
            Sanity Connection Test
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </Button>
      </div>
      
      <div className="space-y-10">
        <WebhookSetup />
        <SyncAdmin />
        <SyncDocumentation />
      </div>
    </div>
  );
}
