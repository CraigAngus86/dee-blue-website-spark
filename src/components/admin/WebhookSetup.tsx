
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, CheckCircle2 } from 'lucide-react';

export function WebhookSetup() {
  const [copied, setCopied] = useState(false);
  const [webhookId, setWebhookId] = useState('');
  
  // URL for the webhook
  const webhookUrl = `${window.location.origin}/api/webhooks/sanity`;
  
  // Command for creating webhook with GROQ filter
  const createWebhookCommand = `
sanity hook create
  --name "Sync to Supabase"
  --description "Sync Sanity content to Supabase database"
  --dataset production
  --project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'}
  --url "${webhookUrl}"
  --filter "_type in ['playerProfile', 'sponsor', 'match']"
  `;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sanity Webhook Setup</CardTitle>
        <CardDescription>
          Configure a webhook in Sanity Studio to sync content to Supabase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Webhook URL</p>
          <div className="flex">
            <Input value={webhookUrl} readOnly className="font-mono text-sm" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2" 
              onClick={() => copyToClipboard(webhookUrl)}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">CLI Command</p>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
              {createWebhookCommand}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(createWebhookCommand)}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Existing Webhook ID</p>
          <div className="flex">
            <Input 
              value={webhookId} 
              onChange={(e) => setWebhookId(e.target.value)} 
              placeholder="Enter webhook ID if you've already created one"
              className="text-sm"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Setup instructions:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Install the Sanity CLI: <code>npm install -g @sanity/cli</code></li>
            <li>Log in to Sanity: <code>sanity login</code></li>
            <li>Run the command above to create the webhook</li>
            <li>Note the webhook ID and store it above for future reference</li>
          </ol>
        </div>
      </CardFooter>
    </Card>
  );
}
