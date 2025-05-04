
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  tokenAvailable: boolean;
};

type TestResult = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export function SanityTestClient({ initialConfig }: { initialConfig: SanityConfig }) {
  const [loading, setLoading] = useState({
    client: false,
    minimal: false
  });
  const [results, setResults] = useState<{
    client?: TestResult;
    minimal?: TestResult;
  }>({});
  const [testType, setTestType] = useState<'client' | 'minimal'>('client');
  const [config, setConfig] = useState<SanityConfig>(initialConfig);
  
  async function runTest(type: 'client' | 'minimal') {
    setLoading(prev => ({ ...prev, [type]: true }));
    setTestType(type);
    
    try {
      const response = await fetch(`/api/sanity-test?type=${type}`);
      const data = await response.json();
      
      // Update config from API response
      if (data.environmentInfo) {
        setConfig({
          projectId: data.environmentInfo.projectId,
          dataset: data.environmentInfo.dataset,
          apiVersion: data.environmentInfo.apiVersion,
          tokenAvailable: data.tokenAvailable
        });
      }
      
      // Set test result
      setResults(prev => ({
        ...prev,
        [type]: type === 'client' ? data.clientTest : data.minimalTest
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [type]: {
          success: false,
          message: `Test threw an error: ${error instanceof Error ? error.message : String(error)}`,
          error
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  }

  useEffect(() => {
    // Run client test initially
    runTest('client');
  }, []);
  
  const currentResult = results[testType];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button 
        onClick={() => runTest('client')} 
        disabled={loading.client}
        variant={testType === 'client' ? "default" : "outline"}
      >
        {loading.client ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Client...</>
        ) : (
          'Test Sanity Client'
        )}
      </Button>
      
      <Button 
        onClick={() => runTest('minimal')} 
        disabled={loading.minimal}
        variant={testType === 'minimal' ? "default" : "outline"}
      >
        {loading.minimal ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Minimal...</>
        ) : (
          'Test Minimal Fetch'
        )}
      </Button>
      
      <div className="grid gap-6 w-full">
        <Card className={`${currentResult?.success ? 'border-green-200' : 'border-red-200'}`}>
          <CardHeader className={`${currentResult?.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <CardTitle className="flex items-center gap-2">
              {loading[testType] ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : currentResult?.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Connection Status: {loading[testType] ? 'Testing...' : (currentResult?.success ? 'Connected' : 'Failed')}
            </CardTitle>
            <CardDescription>
              {currentResult?.message || 'Testing Sanity connection...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {currentResult?.error && (
              <div className="mb-6 p-4 bg-red-50 rounded border border-red-200">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Error Details
                </h3>
                <pre className="text-sm whitespace-pre-wrap bg-white p-3 rounded border">
                  {JSON.stringify(currentResult.error, null, 2)}
                </pre>
              </div>
            )}
            
            {!loading[testType] && (
              <div>
                <h3 className="font-semibold mb-2">Connection Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Project Settings</h4>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Project ID</td>
                          <td className="py-2">{config.projectId}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Dataset</td>
                          <td className="py-2">{config.dataset}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">API Version</td>
                          <td className="py-2">{testType === 'client' ? 'v2021-10-21' : '2021-10-21'}</td>
                        </tr>
                        <tr className={config.tokenAvailable ? 'border-b bg-green-50' : 'border-b bg-red-50'}>
                          <td className="py-2 font-medium">API Token</td>
                          <td className="py-2 flex items-center gap-2">
                            {config.tokenAvailable ? (
                              <><CheckCircle className="h-4 w-4 text-green-600" /> Present</>
                            ) : (
                              <><AlertTriangle className="h-4 w-4 text-amber-600" /> Missing</>
                            )}
                          </td>
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
                          <td className="py-2">{config.tokenAvailable ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {currentResult?.data && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Response Data Sample</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-xs bg-gray-50 p-3 rounded border">
                    {JSON.stringify(currentResult.data, null, 2)}
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
