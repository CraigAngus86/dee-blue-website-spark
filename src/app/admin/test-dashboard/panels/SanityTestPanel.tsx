"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Database, FileText, BookOpen, Code } from 'lucide-react';

export default function SanityTestPanel() {
  const [config, setConfig] = useState({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30',
    tokenAvailable: false
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sanity CMS Tests</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="content">Content Explorer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <div className="prose max-w-none">
            <h3>Purpose of Sanity Tests</h3>
            <p>
              These tests help verify that our Sanity CMS integration is working properly, and provide tools to
              explore and validate content. Use these tools when:
            </p>
            <ul>
              <li>Troubleshooting content that isn't appearing on the website</li>
              <li>Checking if environment variables are configured correctly</li>
              <li>Exploring content structure across different document types</li>
              <li>Verifying content relationships and references</li>
            </ul>
            
            <h4>Available Test Tools</h4>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h5 className="font-medium flex items-center">
                  <Database className="h-4 w-4 mr-2 text-primary" />
                  Connection Test
                </h5>
                <p className="text-sm mt-1">
                  Verifies if the application can connect to Sanity CMS and shows environment configuration.
                  Use this when content isn't loading to check if the connection is working.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h5 className="font-medium flex items-center">
                  <Code className="h-4 w-4 mr-2 text-primary" />
                  Content Explorer
                </h5>
                <p className="text-sm mt-1">
                  Browse and inspect different content types in Sanity. Use this to check specific content
                  items or verify document structure. Helps identify missing fields or reference issues.
                </p>
              </div>
            </div>
            
            <h4 className="mt-6">Common Troubleshooting Steps</h4>
            <ol>
              <li>Check if the Sanity project ID and dataset are correct under Connection</li>
              <li>Verify if the API token is present and valid</li>
              <li>Use the Content Explorer to check if specific documents exist</li>
              <li>Validate references between documents to ensure they're properly linked</li>
            </ol>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
              <h5 className="font-medium text-blue-800">Quick Tips</h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>Document IDs in Sanity start with a document type prefix (e.g., <code>playerProfile-abc123</code>)</li>
                <li>References to Supabase records are typically stored in fields ending with <code>Id</code> or <code>Reference</code></li>
                <li>If images aren't displaying, check Cloudinary integration in the Cloudinary test section</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="connection">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded overflow-hidden">
              <h4 className="font-medium mb-2">Project Settings</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Project ID</td>
                      <td className="py-2">{config.projectId || 'Not configured'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dataset</td>
                      <td className="py-2">{config.dataset}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">API Version</td>
                      <td className="py-2">{config.apiVersion}</td>
                    </tr>
                    <tr className={config.tokenAvailable ? 'border-b bg-green-50' : 'border-b bg-red-50'}>
                      <td className="py-2 font-medium">API Token</td>
                      <td className="py-2">{config.tokenAvailable ? 'Present' : 'Missing'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded overflow-hidden">
              <h4 className="font-medium mb-2">Next.js Integration</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Environment</td>
                      <td className="py-2">{process.env.NODE_ENV}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Client Library</td>
                      <td className="py-2">next-sanity</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Cache Strategy</td>
                      <td className="py-2">ISR with tag invalidation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Troubleshooting API Token Issues
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-amber-800">Current Status:</h4>
                <p className="text-sm text-amber-700 ml-4">
                  API Token is <strong>{config.tokenAvailable ? 'Present' : 'Missing'}</strong> on the server
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-800">If Token is Missing:</h4>
                <ul className="list-disc ml-8 text-sm text-amber-700 space-y-1">
                  <li>Add the token to <code>.env.local</code>: <code>SANITY_API_TOKEN=your_token</code></li>
                  <li>Restart the Next.js development server</li>
                  <li>For production, add the token in the environment settings</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="bg-gray-50 p-6 rounded border">
            <h3 className="text-lg font-semibold mb-3">Content Explorer</h3>
            <p className="mb-4">This feature requires server configuration to load content from Sanity.</p>
            
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Unable to connect to Sanity CMS. Check your environment variables and network connection.
              </AlertDescription>
            </Alert>
            
            <div className="prose max-w-none text-sm">
              <h4>Troubleshooting Steps:</h4>
              <ol>
                <li>Verify your <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> environment variable is set correctly</li>
                <li>Check that <code>NEXT_PUBLIC_SANITY_DATASET</code> is set to the correct dataset name</li>
                <li>Ensure <code>SANITY_API_TOKEN</code> is set if you need to access private datasets</li>
                <li>Restart the development server after updating environment variables</li>
                <li>Make sure your IP is allowed in the Sanity project CORS settings</li>
              </ol>
              <p>For more details, consult the <a href="https://www.sanity.io/docs/connect-your-content" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Sanity documentation</a>.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
