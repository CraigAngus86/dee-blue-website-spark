"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowRight, RefreshCw } from 'lucide-react';

export default function CrossSystemTestPanel() {
  const [loading, setLoading] = useState(false);
  const [sanityId, setSanityId] = useState("");
  const [supabaseId, setSupabaseId] = useState("");
  const [result, setResult] = useState<any>(null);
  
  // Test reference resolution from Sanity to Supabase
  const testSanityToSupabase = async () => {
    if (!sanityId) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      // This would typically call a custom API route
      const response = await fetch(`/api/cross-system/sanity-to-supabase?id=${encodeURIComponent(sanityId)}`);
      const data = await response.json();
      
      setResult({
        source: "sanity",
        target: "supabase",
        id: sanityId,
        success: response.ok,
        data
      });
    } catch (error) {
      console.error("Reference resolution error:", error);
      setResult({
        source: "sanity",
        target: "supabase",
        id: sanityId,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Test reference resolution from Supabase to Sanity
  const testSupabaseToSanity = async () => {
    if (!supabaseId) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      // This would typically call a custom API route
      const response = await fetch(`/api/cross-system/supabase-to-sanity?id=${encodeURIComponent(supabaseId)}`);
      const data = await response.json();
      
      setResult({
        source: "supabase",
        target: "sanity",
        id: supabaseId,
        success: response.ok,
        data
      });
    } catch (error) {
      console.error("Reference resolution error:", error);
      setResult({
        source: "supabase",
        target: "sanity",
        id: supabaseId,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cross-System Reference Tests</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sanity → Supabase Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Test resolving references from Sanity documents to Supabase records.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter Sanity document ID"
                value={sanityId}
                onChange={(e) => setSanityId(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={testSanityToSupabase}
                disabled={!sanityId || loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supabase → Sanity Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Test resolving references from Supabase records to Sanity documents.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter Supabase record ID"
                value={supabaseId}
                onChange={(e) => setSupabaseId(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={testSupabaseToSanity}
                disabled={!supabaseId || loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Test Result</h3>
          <div className={`p-4 rounded border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="mb-2">
              <span className="font-medium">Source System:</span> {result.source}
            </div>
            <div className="mb-2">
              <span className="font-medium">Target System:</span> {result.target}
            </div>
            <div className="mb-2">
              <span className="font-medium">Status:</span> {result.success ? 'Success' : 'Failed'}
            </div>
            <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-auto max-h-96">
              {JSON.stringify(result.data || result.error || {}, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Reference Resolution Notes
        </h3>
        <p className="text-sm text-blue-700">
          Note: These tests require working API routes to function. Create <code>/api/cross-system/</code> routes that handle the resolution requests.
        </p>
      </div>
    </div>
  );
}
