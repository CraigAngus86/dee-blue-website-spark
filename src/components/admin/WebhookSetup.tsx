
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WebhookSetup() {
  const [copied, setCopied] = useState(false);
  const [webhookId, setWebhookId] = useState('');
  const [currentWebhookTab, setCurrentWebhookTab] = useState('new');
  const [baseUrl, setBaseUrl] = useState('');
  
  // Get the base URL when component mounts
  useEffect(() => {
    // Handle different environments
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Determine the correct base URL based on the environment
      if (hostname.includes('localhost') || hostname.includes('.app.github.dev')) {
        // Local development or Codespace
        setBaseUrl(`${window.location.origin}`);
      } else if (hostname.includes('lovable.app')) {
        // Preview or production on Lovable
        setBaseUrl(`https://${window.location.host}`);
      } else {
        // Custom domain or other deployment
        setBaseUrl(`https://${window.location.host}`);
      }
    }
  }, []);
  
  // URL for the webhooks
  const legacyWebhookUrl = `${baseUrl}/api/sanity-webhook`;
  const newWebhookUrl = `${baseUrl}/api/webhooks/sanity`;
  
  // Commands for creating webhooks with GROQ filter
  const createLegacyWebhookCommand = `
sanity hook create
  --name "Sync to Supabase (Legacy)"
  --description "Sync Sanity content to Supabase database"
  --dataset production
  --project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'}
  --url "${legacyWebhookUrl}"
  --filter "_type in ['playerProfile', 'sponsor', 'match']"
  `;
  
  const createNewWebhookCommand = `
sanity hook create
  --name "Sync to Supabase"
  --description "Sync Sanity content to Supabase database"
  --dataset production
  --project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'}
  --url "${newWebhookUrl}"
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
        <Tabs defaultValue={currentWebhookTab} onValueChange={setCurrentWebhookTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Webhook Structure</TabsTrigger>
            <TabsTrigger value="legacy">Legacy Webhook Structure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4">
            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                <p className="text-sm text-amber-800">
                  This is the new webhook structure, recommended for new setups.
                  If you're already using the legacy webhook, you can continue to use it.
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">New Webhook URL</p>
              <div className="flex">
                <Input value={newWebhookUrl} readOnly className="font-mono text-sm" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => copyToClipboard(newWebhookUrl)}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">CLI Command</p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                  {createNewWebhookCommand}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(createNewWebhookCommand)}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="legacy" className="space-y-4">
            <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <p className="text-sm text-blue-800">
                  This is the legacy webhook structure. If you're already using this webhook,
                  you can continue to use it. Both webhook formats are supported.
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Legacy Webhook URL</p>
              <div className="flex">
                <Input value={legacyWebhookUrl} readOnly className="font-mono text-sm" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => copyToClipboard(legacyWebhookUrl)}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">CLI Command</p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                  {createLegacyWebhookCommand}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(createLegacyWebhookCommand)}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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
            <li>Set the <code>SANITY_WEBHOOK_SECRET</code> environment variable with a secure secret</li>
            <li>Configure the same secret in your Sanity webhook settings</li>
          </ol>
        </div>
      </CardFooter>
    </Card>
  );
}
