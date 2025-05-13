"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ZapIcon, MousePointerClick, Clock, RefreshCw } from 'lucide-react';
import TestCard from '../components/TestCard';

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

export default function PerformanceTestPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PerformanceResult[]>([]);
  
  // Test page load performance
  const testPagePerformance = async () => {
    setLoading(true);
    
    try {
      // Define pages to test
      const pagesToTest = [
        '/',                // Home page
        '/team',            // Team page
        '/news',            // News page
        '/fixtures',        // Fixtures page
        '/commercial'       // Commercial page
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
      <h2 className="text-2xl font-bold mb-6">Performance Monitoring Tools</h2>
      
      <TestCard 
        title="Page Load Performance Test" 
        description="Measure the loading performance of key pages"
        icon={ZapIcon}
      >
        <div className="mb-6">
          <Button
            onClick={testPagePerformance}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running Tests...</>
            ) : (
              <><ZapIcon className="mr-2 h-4 w-4" /> Test Page Load Performance</>
            )}
          </Button>
        </div>
        
        {results.length > 0 && (
          <div>
            <div className="overflow-x-auto rounded border mb-6">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium">Page</th>
                    <th className="text-left py-3 px-4 font-medium">Time (ms)</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const perfCategory = getPerformanceCategory(result.timing.duration);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <a href={result.url} className="text-blue-600 hover:underline">
                            {result.url === '/' ? 'Home' : result.url}
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
            
            <div className="mt-6 relative">
              <h3 className="font-medium mb-3">Performance Graph</h3>
              {results.map((result, index) => (
                result.success && (
                  <div key={index} className="mb-4">
                    <div className="flex items-center">
                      <span className="text-xs w-16 text-right mr-2 text-gray-700">
                        {result.url === '/' ? 'Home' : result.url}
                      </span>
                      <div className="flex-1 h-6 relative">
                        <div className="w-full bg-gray-200 rounded h-6"></div>
                        <div 
                          className={`absolute inset-0 rounded h-6 ${
                            result.timing.duration < 1000 ? 'bg-green-500' :
                            result.timing.duration < 2000 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, (result.timing.duration / 3000) * 100)}%` }}
                        >
                          <span className="ml-2 text-xs text-white leading-6">{result.timing.duration} ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-medium text-blue-800 mb-2">About This Test</h3>
          <p className="text-sm text-blue-700">
            This tool measures the time it takes to fetch each page. It doesn't include time for browser rendering, JavaScript execution, or hydration - only network time.
          </p>
          <p className="text-sm text-blue-700 mt-2">
            For more comprehensive performance testing, use browser DevTools or tools like Lighthouse.
          </p>
        </div>
      </TestCard>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TestCard 
          title="Additional Performance Tools" 
          description="Other tools for monitoring performance"
          icon={RefreshCw}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              These tools can help you identify and fix performance issues:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li><strong>Chrome DevTools</strong>: Network tab for detailed request analysis</li>
              <li><strong>Lighthouse</strong>: For overall performance scoring</li>
              <li><strong>WebPageTest</strong>: For more detailed performance analysis</li>
              <li><strong>Next.js Analytics</strong>: For monitoring Core Web Vitals</li>
            </ul>
          </div>
        </TestCard>
        
        <TestCard 
          title="Performance Improvement Tips" 
          description="Ways to improve site performance"
          icon={ZapIcon}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Consider these techniques to improve performance:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li><strong>Image Optimization</strong>: Use proper Cloudinary transformations</li>
              <li><strong>Caching</strong>: Implement proper caching strategies</li>
              <li><strong>Code Splitting</strong>: Use Next.js automatic code splitting</li>
              <li><strong>Reduce JavaScript</strong>: Use Server Components where possible</li>
              <li><strong>API Optimization</strong>: Minimize data transfer in API calls</li>
            </ul>
          </div>
        </TestCard>
      </div>
    </div>
  );
}
