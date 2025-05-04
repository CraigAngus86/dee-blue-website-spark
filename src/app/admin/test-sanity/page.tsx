
"use client";

import React, { useState, useEffect } from 'react';
import { testSanityConnection } from '@/lib/sanity/sanity-simple';
import { testMinimalSanityConnection } from '@/lib/sanity/test-connection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function TestSanityPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testType, setTestType] = useState<'client' | 'minimal'>('client');
  
  useEffect(() => {
    runTest('client');
  }, []);
  
  async function runTest(type: 'client' | 'minimal') {
    setLoading(true);
    setTestType(type);
    
    try {
      const testResult = type === 'client' 
        ? await testSanityConnection()
        : await testMinimalSanityConnection();
      
      setResult(testResult);
    } catch (error) {
      setResult({
        success: false,
        message: `Test threw an error: ${error instanceof Error ? error.message : String(error)}`,
        error
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Connection Test</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          onClick={() => runTest('client')} 
          disabled={loading && testType === 'client'}
          variant={testType === 'client' ? "default" : "outline"}
        >
          {loading && testType === 'client' ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Client...</>
          ) : (
            'Test Sanity Client'
          )}
        </Button>
        
        <Button 
          onClick={() => runTest('minimal')} 
          disabled={loading && testType === 'minimal'}
          variant={testType === 'minimal' ? "default" : "outline"}
        >
          {loading && testType === 'minimal' ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Minimal...</>
          ) : (
            'Test Minimal Fetch'
          )}
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className={`${result?.success ? 'border-green-200' : 'border-red-200'}`}>
          <CardHeader className={`${result?.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <CardTitle className="flex items-center gap-2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : result?.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Connection Status: {loading ? 'Testing...' : (result?.success ? 'Connected' : 'Failed')}
            </CardTitle>
            <CardDescription>
              {result?.message || 'Testing Sanity connection...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result?.error && (
              <div className="mb-6 p-4 bg-red-50 rounded border border-red-200">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Error Details
                </h3>
                <pre className="text-sm whitespace-pre-wrap bg-white p-3 rounded border">
                  {JSON.stringify(result.error, null, 2)}
                </pre>
              </div>
            )}
            
            {!loading && (
              <div>
                <h3 className="font-semibold mb-2">Connection Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Project Settings</h4>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Project ID</td>
                          <td className="py-2">{process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Dataset</td>
                          <td className="py-2">{process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">API Version</td>
                          <td className="py-2">{testType === 'client' ? 'v2021-10-21' : '2021-10-21'}</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">API Token</td>
                          <td className="py-2">{process.env.SANITY_API_TOKEN ? 'Present' : 'Missing'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Test Configuration</h4>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Test Method</td>
                          <td className="py-2">{testType === 'client' ? 'Sanity Client' : 'Direct Fetch API'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Test Query</td>
                          <td className="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            *[_type == "sanity.imageAsset"][0...1]
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Using Auth</td>
                          <td className="py-2">{process.env.SANITY_API_TOKEN ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {result?.data && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Response Data Sample</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-xs bg-gray-50 p-3 rounded border">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex justify-between">
            <p className="text-sm text-gray-600">
              {testType === 'client' ? 
                'Using @sanity/client library' : 
                'Using direct fetch API without client library'
              }
            </p>
            <Button asChild variant="outline">
              <a href="/admin/sync">Return to Admin</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
