"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function WebhookTestPanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const testWebhooks = {
    sanity: {
      player: {
        url: "/api/webhook/sanity/player",
        payload: {
          _id: "test-player-id",
          _type: "playerProfile",
          firstName: "Test",
          lastName: "Player",
          personType: "player",
          supabaseId: "test-123"
        }
      },
      general: {
        url: "/api/webhooks/sanity",
        payload: {
          _id: "test-document-id",
          _type: "newsArticle",
          title: "Test Webhook Article",
          slug: { current: "test-webhook-article" }
        }
      }
    }
  };
  
  const handleTestWebhook = async (type: "sanity.player" | "sanity.general") => {
    setLoading(true);
    setResult(null);
    
    try {
      let url: string;
      let payload: any;
      
      if (type === "sanity.player") {
        url = testWebhooks.sanity.player.url;
        payload = testWebhooks.sanity.player.payload;
      } else {
        url = testWebhooks.sanity.general.url;
        payload = testWebhooks.sanity.general.payload;
      }
      
      // Send webhook test request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      setResult({
        success: response.ok,
        status: response.status,
        data
      });
      
      if (response.ok) {
        toast({
          title: "Webhook Test Successful",
          description: `The ${type} webhook responded successfully.`
        });
      } else {
        toast({
          variant: "destructive",
          title: "Webhook Test Failed",
          description: data.error || `The ${type} webhook returned an error.`
        });
      }
    } catch (error) {
      console.error("Webhook test error:", error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      
      toast({
        variant: "destructive",
        title: "Webhook Test Failed",
        description: error instanceof Error ? error.message : "An error occurred during the test."
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Webhook Test Tools</h2>
      
      <Tabs defaultValue="sanity">
        <TabsList>
          <TabsTrigger value="sanity">Sanity Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sanity" className="py-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Webhook Test</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tests the Sanity player webhook endpoint with sample data.
                </p>
                <Button 
                  onClick={() => handleTestWebhook("sanity.player")} 
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...</>
                  ) : (
                    <>Test Player Webhook <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>General Webhook Test</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tests the general Sanity webhook endpoint with sample data.
                </p>
                <Button 
                  onClick={() => handleTestWebhook("sanity.general")} 
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...</>
                  ) : (
                    <>Test General Webhook <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Test Result</h3>
              <div className={`p-4 rounded border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="mb-2">
                  <span className="font-medium">Status:</span> {result.success ? 'Success' : 'Failed'}
                  {result.status && <span className="ml-2">({result.status})</span>}
                </div>
                <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-auto max-h-96">
                  {JSON.stringify(result.data || result.error || {}, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
