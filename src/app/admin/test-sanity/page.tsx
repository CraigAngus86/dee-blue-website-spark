
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { SanityTestClient } from '@/components/admin/SanityTestClient';

// This is now a server component - get environment variables directly
async function getSanityConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30',
    tokenAvailable: !!process.env.SANITY_API_TOKEN
  };
}

export default async function TestSanityPage() {
  // Fetch server-side config
  const config = await getSanityConfig();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Connection Test</h1>
      
      {/* Client component for interactive test functionality */}
      <SanityTestClient initialConfig={config} />
      
      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-md">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Troubleshooting Token Issues
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-amber-800">Environment Status:</h3>
            <p className="text-sm text-amber-700 ml-4">
              API Token is currently shown as <strong>{config.tokenAvailable ? 'Present' : 'Missing'}</strong> on the server
            </p>
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Possible Solutions:</h3>
            <ul className="list-disc ml-8 text-sm text-amber-700 space-y-1">
              <li>Verify the token is correctly set in <code>.env.local</code> file</li>
              <li>Ensure the Next.js server has been restarted after updating environment variables</li>
              <li>Check that environment variables are properly formatted (no spaces around equals sign)</li>
              <li>If using Vercel, ensure environment variables are set in project settings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Next.js Client/Server Component Notes:</h3>
            <ul className="list-disc ml-8 text-sm text-amber-700 space-y-1">
              <li>Server-only environment variables (like API tokens) are only accessible in:</li>
              <li className="ml-4">- Server Components</li>
              <li className="ml-4">- API Routes</li>
              <li className="ml-4">- Server Actions</li>
              <li>Client Components can only access variables prefixed with NEXT_PUBLIC_</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
