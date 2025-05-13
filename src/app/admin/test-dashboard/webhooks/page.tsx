"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Webhook, 
  Loader2, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Activity,
  CheckSquare,
  GitMerge,
  Clock,
  Code,
  AlertCircle,
  ListChecks
} from 'lucide-react';
import TestCard from '../components/TestCard';
import ResultsViewer from '../components/ResultsViewer';
import { useToast } from "@/components/ui/use-toast";

export default function WebhooksTestPage() {
  const { toast } = useToast();
  
  // Testing tab state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('player');
  const [customPayload, setCustomPayload] = useState('');
  const [showCustomPayload, setShowCustomPayload] = useState(false);
  
  // Monitoring tab state
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  
  // Validation tab state
  const [validationResult, setValidationResult] = useState<any>(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const [payloadToValidate, setPayloadToValidate] = useState('');
  const [selectedSchemaType, setSelectedSchemaType] = useState('playerProfile');
  
  // Fetch webhook logs on load
  useEffect(() => {
    fetchWebhookLogs();
  }, []);
  
  // Webhook endpoints configuration
  const webhookEndpoints = {
    player: {
      name: 'Player Webhook',
      description: 'Handles player profile updates',
      url: '/api/webhook/sanity/player',
      samplePayload: {
        _id: 'playerProfile-abc123',
        _type: 'playerProfile',
        firstName: 'John',
        lastName: 'Doe',
        personType: 'player',
        supabaseId: 'player-123'
      }
    },
    general: {
      name: 'General Webhook',
      description: 'Handles various document types',
      url: '/api/webhooks/sanity',
      samplePayload: {
        _id: 'newsArticle-xyz789',
        _type: 'newsArticle',
        title: 'Test Article',
        slug: { current: 'test-article' }
      }
    },
    legacy: {
      name: 'Legacy Webhook',
      description: 'Old webhook endpoint (deprecated)',
      url: '/api/sanity-webhook',
      samplePayload: {
        _id: 'matchGallery-def456',
        _type: 'matchGallery',
        title: 'Match Gallery Test'
      }
    }
  };
  
  // Schema types for validation
  const schemaTypes = {
    playerProfile: {
      name: 'Player Profile',
      requiredFields: ['_id', '_type', 'firstName', 'lastName', 'personType']
    },
    newsArticle: {
      name: 'News Article',
      requiredFields: ['_id', '_type', 'title', 'slug']
    },
    matchGallery: {
      name: 'Match Gallery',
      requiredFields: ['_id', '_type', 'title']
    }
  };
  
  // Handle webhook test
  const handleTestWebhook = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      // Get the endpoint configuration
      const endpoint = webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints];
      
      // Determine payload to use
      const payload = showCustomPayload && customPayload 
        ? JSON.parse(customPayload) 
        : endpoint.samplePayload;
      
      // Send webhook test request
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      // Update result and log
      setResult({
        success: response.ok,
        status: response.status,
        message: `The ${endpoint.name} ${response.ok ? 'responded successfully' : 'returned an error'}`,
        data,
        endpoint: endpoint.name,
        timestamp: new Date().toISOString()
      });
      
      // Add to logs
      setWebhookLogs(prev => [
        {
          endpoint: endpoint.name,
          url: endpoint.url,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          timestamp: new Date().toISOString(),
          payload: JSON.stringify(payload).substring(0, 100) + (JSON.stringify(payload).length > 100 ? '...' : '')
        },
        ...prev
      ].slice(0, 20));
      
      // Show toast
      if (response.ok) {
        toast({
          title: 'Webhook Test Successful',
          description: `${endpoint.name} responded with status ${response.status}`
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Webhook Test Failed',
          description: data.error || `${endpoint.name} returned status ${response.status}`
        });
      }
      
    } catch (error) {
      console.error('Webhook test error:', error);
      setResult({
        success: false,
        message: `Webhook test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      
      toast({
        variant: 'destructive',
        title: 'Webhook Test Failed',
        description: error instanceof Error ? error.message : 'An error occurred during the test'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle between sample and custom payload
  const toggleCustomPayload = () => {
    if (!showCustomPayload) {
      // Set initial custom payload based on selected endpoint
      setCustomPayload(JSON.stringify(
        webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints].samplePayload, 
        null, 
        2
      ));
    }
    setShowCustomPayload(!showCustomPayload);
  };
  
  // Handle endpoint change
  const handleEndpointChange = (value: string) => {
    setSelectedEndpoint(value);
    // Update custom payload if visible
    if (showCustomPayload) {
      setCustomPayload(JSON.stringify(
        webhookEndpoints[value as keyof typeof webhookEndpoints].samplePayload, 
        null, 
        2
      ));
    }
  };
  
  // Fetch webhook logs (simulated)
  const fetchWebhookLogs = async () => {
    setLogsLoading(true);
    
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll simulate logs
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulated logs data
      const simulatedLogs = [
        {
          endpoint: 'Player Webhook',
          url: '/api/webhook/sanity/player',
          status: 'success',
          statusCode: 200,
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          payload: '{"_id":"playerProfile-123","_type":"playerProfile","firstName":"Jane","lastName":"Smith",...}'
        },
        {
          endpoint: 'General Webhook',
          url: '/api/webhooks/sanity',
          status: 'success',
          statusCode: 200,
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          payload: '{"_id":"newsArticle-456","_type":"newsArticle","title":"Latest Match Report",...}'
        },
        {
          endpoint: 'Legacy Webhook',
          url: '/api/sanity-webhook',
          status: 'error',
          statusCode: 400,
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          payload: '{"_id":"matchGallery-789","_type":"matchGallery","title":"Weekend Match Photos",...}'
        }
      ];
      
      setWebhookLogs(prev => [...simulatedLogs, ...prev].slice(0, 20));
    } catch (error) {
      console.error('Error fetching webhook logs:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Load Logs',
        description: 'Could not retrieve webhook activity logs'
      });
    } finally {
      setLogsLoading(false);
    }
  };
  
  // Validate webhook payload
  const validatePayload = () => {
    setValidationLoading(true);
    
    try {
      // Parse the payload
      const payload = JSON.parse(payloadToValidate);
      
      // Get the schema type
      const schema = schemaTypes[selectedSchemaType as keyof typeof schemaTypes];
      
      // Validate _type field
      const typeMatch = payload._type === selectedSchemaType;
      
      // Check required fields
      const missingFields = schema.requiredFields.filter(field => {
        const fieldPath = field.split('.');
        let value = payload;
        
        for (const part of fieldPath) {
          if (value === undefined || value === null) return true;
          value = value[part];
        }
        
        return value === undefined || value === null;
      });
      
      // Check for extra fields not in the schema
      const extraFields = Object.keys(payload)
        .filter(key => !key.startsWith('_') || key === '_type' || key === '_id')
        .filter(key => !schema.requiredFields.some(field => field.split('.')[0] === key));
      
      // Create validation result
      setValidationResult({
        valid: typeMatch && missingFields.length === 0,
        typeMatch,
        missingFields,
        extraFields,
        payload
      });
      
      // Show toast with result
      if (typeMatch && missingFields.length === 0) {
        toast({
          title: 'Validation Successful',
          description: `Payload is valid for ${schema.name}`
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Validation Failed',
          description: missingFields.length > 0 
            ? `Missing required fields: ${missingFields.join(', ')}` 
            : `Type mismatch: Expected "${selectedSchemaType}"`
        });
      }
      
    } catch (error) {
      console.error('Validation error:', error);
      setValidationResult({
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON format'
      });
      
      toast({
        variant: 'destructive',
        title: 'Validation Failed',
        description: error instanceof Error ? error.message : 'Invalid JSON format'
      });
    } finally {
      setValidationLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Webhook Testing & Management</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="consolidation">Consolidation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <TestCard 
            title="Webhook Architecture Guide" 
            description="Understanding webhook integration in Banks o' Dee FC"
            icon={BookOpen}
          >
            <div className="prose max-w-none">
              <h3>Webhook Integration Overview</h3>
              <p>
                Webhooks serve as the critical integration layer between Sanity CMS and Supabase, enabling automatic 
                content synchronization and maintaining consistency across systems.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
                <h4 className="text-amber-800 mt-0 mb-2">Key Webhook Components</h4>
                <ul className="mt-0 text-amber-700">
                  <li>
                    <strong>Player Webhook</strong>: Handles player profile updates from Sanity and synchronizes with Supabase
                  </li>
                  <li>
                    <strong>General Webhook</strong>: Processes various document types from Sanity (news, sponsors, etc.)
                  </li>
                  <li>
                    <strong>Legacy Webhook</strong>: Original webhook implementation (being phased out)
                  </li>
                </ul>
              </div>
              
              <h4>Webhook Flow Architecture</h4>
              
              <div className="not-prose border border-gray-200 rounded-md p-4 my-4 bg-gray-50">
                <div className="flex items-center justify-center space-x-4 text-center">
                  {/* Sanity CMS */}
                  <div className="bg-amber-100 p-3 rounded-md border border-amber-200 w-36">
                    <div className="font-medium">Sanity CMS</div>
                    <div className="text-xs mt-1 text-gray-600">Content Updates</div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-gray-300"></div>
                    <div className="text-xs mt-1">Webhook Event</div>
                  </div>
                  
                  {/* Webhook Handler */}
                  <div className="bg-purple-100 p-3 rounded-md border border-purple-200 w-36">
                    <div className="font-medium">Webhook Handler</div>
                    <div className="text-xs mt-1 text-gray-600">Process & Route</div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-gray-300"></div>
                    <div className="text-xs mt-1">Data Sync</div>
                  </div>
                  
                  {/* Supabase */}
                  <div className="bg-green-100 p-3 rounded-md border border-green-200 w-36">
                    <div className="font-medium">Supabase</div>
                    <div className="text-xs mt-1 text-gray-600">Operational Data</div>
                  </div>
                </div>
              </div>
              
              <h4>Current Webhook Implementation</h4>
              <p>
                The project currently has three separate webhook endpoints:
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Webhook className="h-4 w-4 mr-2 text-primary" />
                    Player Webhook
                  </h5>
                  <p className="text-sm mt-1 mb-0.5">
                    <span className="font-medium">Endpoint:</span> <code>/api/webhook/sanity/player</code>
                  </p>
                  <p className="text-sm mt-0">
                    Dedicated webhook for player profile updates. Synchronizes player information from Sanity to Supabase.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Webhook className="h-4 w-4 mr-2 text-primary" />
                    General Webhook
                  </h5>
                  <p className="text-sm mt-1 mb-0.5">
                    <span className="font-medium">Endpoint:</span> <code>/api/webhooks/sanity</code>
                  </p>
                  <p className="text-sm mt-0">
                    Multi-purpose webhook that handles various document types from Sanity. Routes based on document type.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Webhook className="h-4 w-4 mr-2 text-primary" />
                    Legacy Webhook
                  </h5>
                  <p className="text-sm mt-1 mb-0.5">
                    <span className="font-medium">Endpoint:</span> <code>/api/sanity-webhook</code>
                  </p>
                  <p className="text-sm mt-0">
                    Original webhook implementation. Being phased out in favor of more specialized endpoints.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                <h5 className="font-medium text-blue-800">Webhook Authentication</h5>
                <p className="text-sm text-blue-700 mt-2">
                  All webhooks are authenticated using a shared secret that must match between Sanity webhook settings 
                  and the environment variable <code>SANITY_WEBHOOK_SECRET</code>.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Webhook requests without proper authentication are rejected with a 401 Unauthorized response.
                </p>
              </div>
              
              <h4 className="mt-6">Common Webhook Issues</h4>
              <ul>
                <li><strong>Authentication Failures</strong>: Check that <code>SANITY_WEBHOOK_SECRET</code> matches the secret in Sanity webhook configuration</li>
                <li><strong>Payload Structure</strong>: Ensure the webhook payload contains all required fields for the document type</li>
                <li><strong>Inconsistent Behavior</strong>: Verify which webhook endpoint is being used as there are multiple implementations</li>
                <li><strong>Processing Errors</strong>: Check server logs for detailed error messages if webhook handling fails</li>
              </ul>
              
              <h4>Webhook Consolidation Plan</h4>
              <p>
                To simplify maintenance and ensure consistent behavior, we're planning to consolidate all webhooks 
                into a single endpoint with improved routing logic and better error handling.
              </p>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="testing">
          <TestCard 
            title="Webhook Testing" 
            description="Test webhook endpoints with custom payloads"
            icon={Code}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2">Webhook Endpoint Selection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select a webhook endpoint to test and customize the payload if needed.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Webhook Endpoint:</label>
                    <Select
                      value={selectedEndpoint}
                      onValueChange={handleEndpointChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select endpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="player">Player Webhook</SelectItem>
                        <SelectItem value="general">General Webhook</SelectItem>
                        <SelectItem value="legacy">Legacy Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Webhook Payload:</label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={toggleCustomPayload}
                      >
                        {showCustomPayload ? 'Use Sample Payload' : 'Customize Payload'}
                      </Button>
                    </div>
                    
                    {showCustomPayload ? (
                      <textarea
                        rows={8}
                        value={customPayload}
                        onChange={(e) => setCustomPayload(e.target.value)}
                        className="font-mono text-sm w-full p-3 border rounded"
                        placeholder="Enter custom JSON payload..."
                      />
                    ) : (
                      <div className="p-3 bg-white border rounded">
                        <pre className="text-xs overflow-auto max-h-48">
                          {JSON.stringify(webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints].samplePayload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleTestWebhook}
                      disabled={loading}
                    >
                      {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...</>
                      ) : (
                        <><ArrowRight className="mr-2 h-4 w-4" /> Test Webhook</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Endpoint Information</h3>
                
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-sm">Name:</span>{' '}
                    <span className="text-sm">{webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints].name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">URL:</span>{' '}
                    <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints].url}</code>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Description:</span>{' '}
                    <span className="text-sm">{webhookEndpoints[selectedEndpoint as keyof typeof webhookEndpoints].description}</span>
                  </div>
                </div>
              </div>
              
              <ResultsViewer result={result} title="Webhook Response" />
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <TestCard 
            title="Webhook Activity Monitoring" 
            description="View recent webhook requests and responses"
            icon={Activity}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Recent Webhook Activity</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchWebhookLogs}
                  disabled={logsLoading}
                >
                  {logsLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Refreshing...</>
                  ) : (
                    <><Clock className="h-4 w-4 mr-2" /> Refresh Logs</>
                  )}
                </Button>
              </div>
              
              {webhookLogs.length > 0 ? (
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payload</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {webhookLogs.map((log, i) => (
                        <tr key={i} className={log.status === 'error' ? 'bg-red-50' : 'hover:bg-gray-50'}>
                          <td className="px-3 py-2 text-xs text-gray-500">{formatDate(log.timestamp)}</td>
                          <td className="px-3 py-2 text-xs">
                            <div className="font-medium">{log.endpoint}</div>
                            <div className="text-gray-500 text-xs">{log.url}</div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              log.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {log.statusCode} {log.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500 max-w-sm truncate">
                            <code className="text-xs">{log.payload}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : logsLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <p>No webhook activity logs available</p>
                  <p className="text-sm mt-2">Test a webhook to see activity here</p>
                </div>
              )}
              
              <Alert>
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  <span className="font-medium">Note:</span> In development mode, webhook logs are simulated. In production, real webhook requests would be logged here.
                </AlertDescription>
              </Alert>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="validation">
          <TestCard 
            title="Webhook Payload Validation" 
            description="Validate webhook payloads against expected schemas"
            icon={CheckSquare}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2">Payload Validation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Validate a webhook payload against the expected schema for a document type.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Document Type:</label>
                    <Select
                      value={selectedSchemaType}
                      onValueChange={setSelectedSchemaType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="playerProfile">Player Profile</SelectItem>
                        <SelectItem value="newsArticle">News Article</SelectItem>
                        <SelectItem value="matchGallery">Match Gallery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Payload to Validate:</label>
                    <textarea
                      rows={8}
                      value={payloadToValidate}
                      onChange={(e) => setPayloadToValidate(e.target.value)}
                      className="font-mono text-sm w-full p-3 border rounded"
                      placeholder='Enter JSON payload to validate (e.g., {"_id":"abc123","_type":"playerProfile","firstName":"John",...})'
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={validatePayload}
                      disabled={validationLoading || !payloadToValidate.trim()}
                    >
                      {validationLoading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validating...</>
                      ) : (
                        <><CheckSquare className="mr-2 h-4 w-4" /> Validate Payload</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {validationResult && (
                <div className={`p-4 rounded-md border ${
                  validationResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className="text-lg font-medium mb-3">Validation Results</h3>
                  
                  {validationResult.error ? (
                    <Alert variant="destructive" className="mb-3">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>{validationResult.error}</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${validationResult.valid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium">
                          {validationResult.valid ? 'Payload is valid' : 'Payload is invalid'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 ml-5">
                        <div className={`flex items-center ${validationResult.typeMatch ? 'text-green-700' : 'text-red-700'}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${validationResult.typeMatch ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm">
                            Document type: {validationResult.typeMatch 
                              ? `Matches expected type "${selectedSchemaType}"` 
                              : `Expected "${selectedSchemaType}" but found "${validationResult.payload?._type || 'missing'}"`}
                          </span>
                        </div>
                        
                        {validationResult.missingFields && validationResult.missingFields.length > 0 && (
                          <div className="text-red-700">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                              <span className="text-sm">Missing required fields:</span>
                            </div>
                            <ul className="list-disc ml-6 text-xs space-y-1 mt-1">
                              {validationResult.missingFields.map((field, i) => (
                                <li key={i}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {validationResult.extraFields && validationResult.extraFields.length > 0 && (
                          <div className="text-amber-700">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full mr-2 bg-amber-500"></div>
                              <span className="text-sm">Extra fields (not in schema, but allowed):</span>
                            </div>
                            <ul className="list-disc ml-6 text-xs space-y-1 mt-1">
                              {validationResult.extraFields.map((field, i) => (
                                <li key={i}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-4 border rounded-md">
                <h3 className="text-lg font-medium mb-3">Schema Requirements</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Each document type has specific required fields that must be present in the webhook payload.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Fields</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Payload</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(schemaTypes).map(([type, schema], i) => (
                        <tr key={i} className={type === selectedSchemaType ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                          <td className="px-3 py-2 text-sm font-medium">{schema.name}</td>
                          <td className="px-3 py-2">
                            <ul className="list-disc ml-4 text-xs text-gray-600 space-y-1">
                              {schema.requiredFields.map((field, j) => (
                                <li key={j}>{field}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-3 py-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                // Get sample payload based on document type
                                const endpoint = Object.values(webhookEndpoints).find(
                                  ep => ep.samplePayload._type === type
                                );
                                if (endpoint) {
                                  setPayloadToValidate(JSON.stringify(endpoint.samplePayload, null, 2));
                                  setSelectedSchemaType(type);
                                }
                              }}
                            >
                              Load Sample
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="consolidation">
          <TestCard 
            title="Webhook Consolidation Planning" 
            description="Plan for consolidating multiple webhook endpoints"
            icon={GitMerge}
          >
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="text-lg font-medium text-amber-800 mb-2">Current State Analysis</h3>
                <p className="text-sm text-amber-700 mb-4">
                  The project currently has three separate webhook endpoints with overlapping functionality.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Endpoint</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Handles</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Implementation</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-amber-200">
                      <tr>
                        <td className="px-3 py-2 text-sm font-mono text-amber-800">/api/webhook/sanity/player</td>
                        <td className="px-3 py-2 text-sm">Player profiles only</td>
                        <td className="px-3 py-2 text-sm">Direct Supabase update</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm font-mono text-amber-800">/api/webhooks/sanity</td>
                        <td className="px-3 py-2 text-sm">News, sponsors, galleries</td>
                        <td className="px-3 py-2 text-sm">Type-based routing</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm font-mono text-amber-800">/api/sanity-webhook</td>
                        <td className="px-3 py-2 text-sm">All types (legacy)</td>
                        <td className="px-3 py-2 text-sm">Basic handling</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Deprecated</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Consolidation Plan</h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-blue-500" />
                      Step 1: Create Unified Webhook Endpoint
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Create a new <code>/api/webhooks</code> endpoint with improved routing and error handling.
                    </p>
                    <div className="p-2 bg-blue-50 rounded mt-2 text-xs text-blue-700">
                      <pre className="whitespace-pre-wrap">
{`// Example implementation structure
export async function POST(req: Request) {
  // 1. Authenticate webhook request
  // 2. Extract payload and validate
  // 3. Determine document type and route to appropriate handler
  // 4. Process based on document type and operation
  // 5. Return standardized response
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-blue-500" />
                      Step 2: Implement Type-Based Handlers
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Create specialized handlers for each document type that implement the same interface.
                    </p>
                    <div className="p-2 bg-blue-50 rounded mt-2 text-xs text-blue-700">
                      <pre className="whitespace-pre-wrap">
{`// Handler interface
interface WebhookHandler {
  handle(payload: any): Promise<{success: boolean, message?: string, data?: any}>;
}

// Example implementation
const handlers: Record<string, WebhookHandler> = {
  playerProfile: { handle: handlePlayerProfile },
  newsArticle: { handle: handleNewsArticle },
  // Add handlers for other document types
};`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-blue-500" />
                      Step 3: Update Sanity Webhook Configuration
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Update Sanity webhook settings to point to the new unified endpoint.
                    </p>
                    <ol className="list-decimal ml-6 text-xs text-blue-700 space-y-1 mt-2">
                      <li>Create a new webhook in Sanity Studio pointing to <code>/api/webhooks</code></li>
                      <li>Configure the same secret for authentication</li>
                      <li>Set up appropriate document filters</li>
                      <li>Test the new webhook with various document types</li>
                    </ol>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-blue-500" />
                      Step 4: Implement Graceful Transition
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Keep existing endpoints functional during transition, but forward requests to the new implementation.
                    </p>
                    <div className="p-2 bg-blue-50 rounded mt-2 text-xs text-blue-700">
                      <pre className="whitespace-pre-wrap">
{`// Example legacy endpoint with forwarding
export async function POST(req: Request) {
  console.warn('Using deprecated webhook endpoint');
  
  // Forward to new implementation
  const result = await fetch(new URL('/api/webhooks', req.url), {
    method: 'POST',
    headers: req.headers,
    body: await req.text()
  });
  
  return result;
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <ListChecks className="h-4 w-4 mr-2 text-blue-500" />
                      Step 5: Monitor and Remove Legacy Endpoints
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      After confirming the new implementation works correctly, remove the legacy endpoints.
                    </p>
                    <ol className="list-decimal ml-6 text-xs text-blue-700 space-y-1 mt-2">
                      <li>Monitor webhook activity to ensure all requests are properly handled</li>
                      <li>Update documentation to reference only the new endpoint</li>
                      <li>Remove legacy webhook endpoints once they're no longer receiving traffic</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-lg font-medium text-green-800 mb-3">Benefits of Consolidation</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800">Simplified Maintenance</h4>
                    <ul className="list-disc ml-4 text-sm text-green-700 space-y-1 mt-1">
                      <li>Single codebase to maintain</li>
                      <li>Consistent error handling and logging</li>
                      <li>Easier to implement new features</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800">Improved Reliability</h4>
                    <ul className="list-disc ml-4 text-sm text-green-700 space-y-1 mt-1">
                      <li>Standardized authentication</li>
                      <li>Consistent payload validation</li>
                      <li>Better error reporting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800">Enhanced Monitoring</h4>
                    <ul className="list-disc ml-4 text-sm text-green-700 space-y-1 mt-1">
                      <li>Centralized webhook logging</li>
                      <li>Easier to track processing times</li>
                      <li>Simplified troubleshooting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800">Better Scalability</h4>
                    <ul className="list-disc ml-4 text-sm text-green-700 space-y-1 mt-1">
                      <li>Modular handler architecture</li>
                      <li>Easier to add new document types</li>
                      <li>Simpler deployment and scaling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TestCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
