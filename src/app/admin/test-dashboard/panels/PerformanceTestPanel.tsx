"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, BarChart, Clock, ZapIcon } from 'lucide-react';

interface PerformanceResult {
  url: string;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
  success: boolean;
  error?: string;
}

export default function PerformanceTestPanel() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PerformanceResult[]>([]);
  
  // Test page load performance
  const testPagePerformance = async () => {
    setLoading(true);
    
    try {
      // Define pages to test
      const pagesToTest = [
        '/',                     // Home page
        '/team',                 // Team page
        '/news',                 // News page
        '/fixtures',             // Fixtures page
        '/commercial'            // Commercial page
      ];
      
      const testResults: PerformanceResult[] = [];
      
      for (const page of pagesToTest) {
        try {
          const start = performance.now();
          const url = window.location.origin + page;
          
          // Fetch the page
          const response = await fetch(url);
          
          // Wait for response to complete
          await response.text();
          
          const end = performance.now();
          
          testResults.push({
            url: page,
            timing: {
              start,
              end,
              duration: Math.round(end - start)
            },
            success: response.ok
          });
        } catch (error) {
          testResults.push({
            url: page,
            timing: {
              start: 0,
              end: 0,
              duration: 0
            },
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          });
        }
      }
      
      setResults(testResults);
    } catch (error) {
      console.error("Performance test error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const getPerformanceCategory = (duration: number) => {
    if (duration < 500) return { label: "Excellent", color: "text-green-600" };
    if (duration < 1000) return { label: "Good", color: "text-emerald-600" };
    if (duration < 2000) return { label: "Average", color: "text-amber-600" };
    if (duration < 3000) return { label: "Slow", color: "text-orange-600" };
    return { label: "Very Slow", color: "text-red-600" };
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Performance Monitoring Tools</h2>
      
      <div className="mb-6">
        <Button
          onClick={testPagePerformance}
          disabled={loading}
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running Performance Tests...</>
          ) : (
            <><ZapIcon className="mr-2 h-4 w-4" /> Test Page Load Performance</>
          )}
        </Button>
      </div>
      
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Page Load Performance Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Page</th>
                    <th className="text-left py-3 px-4">Time (ms)</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const perfCategory = getPerformanceCategory(result.timing.duration);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <a href={result.url} className="text-blue-600 hover:underline">
                            {result.url}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          {result.success ? `${result.timing.duration} ms` : 'Failed'}
                        </td>
                        <td className="py-3 px-4">
                          {result.success ? (
                            <span className="text-green-600">Success</span>
                          ) : (
                            <span className="text-red-600">Failed</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {result.success && (
                            <span className={perfCategory.color}>
                              {perfCategory.label}
                            </span>
                          )}
                          {!result.success && result.error && (
                            <span className="text-xs text-red-600">{result.error}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Performance Graph
                  </span>
                </div>
              </div>
              {results.map((result, index) => (
                result.success && (
                  <div key={index} className="mb-4">
                    <div className="flex items-center">
                      <span className="text-xs w-24 text-right mr-2 text-gray-700">{result.url}</span>
                      <div className="flex-1 h-4 relative">
                        <div className="w-full bg-gray-200 rounded h-4"></div>
                        <div 
                          className="absolute inset-0 bg-blue-500 rounded h-4"
                          style={{ width: `${Math.min(100, (result.timing.duration / 3000) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs ml-2 text-gray-700">{result.timing.duration} ms</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
