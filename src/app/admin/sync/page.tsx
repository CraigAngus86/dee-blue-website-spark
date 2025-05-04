
import React from 'react';
import { SyncAdmin } from '@/components/admin/SyncAdmin';
import { WebhookSetup } from '@/components/admin/WebhookSetup';
import { SyncDocumentation } from '@/components/admin/SyncDocumentation';

export default function SyncPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Data Synchronization</h1>
      <p className="text-muted-foreground mb-8">
        Manage data synchronization between Sanity CMS and Supabase.
      </p>
      
      <div className="space-y-10">
        <WebhookSetup />
        <SyncAdmin />
        <SyncDocumentation />
      </div>
    </div>
  );
}
