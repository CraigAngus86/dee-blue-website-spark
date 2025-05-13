"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCw, 
  Loader2, 
  BookOpen, 
  GitMerge, 
  Search, 
  Activity,
  Database,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowDown,
  CheckSquare
} from 'lucide-react';
import TestCard from '../components/TestCard';
import ResultsViewer from '../components/ResultsViewer';
import { useToast } from "@/components/ui/use-toast";

export default function CrossSystemTestPage() {
  const { toast } = useToast();
  
  // Reference Testing tab state
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<'sanity-to-supabase' | 'supabase-to-sanity'>('sanity-to-supabase');
  const [sourceId, setSourceId] = useState('');
  const [result, setResult] = useState<any>(null);
  
  // Reference Explorer tab state
  const [explorerLoading, setExplorerLoading] = useState(false);
  const [documentType, setDocumentType] = useState('player');
  const [references, setReferences] = useState<any[]>([]);
  
  // Sync Monitoring tab state
  const [syncEvents, setSyncEvents] = useState<any[]>([]);
  const [syncLoading, setSyncLoading] = useState(false);
  
  // Data Integrity tab state
  const [integrityTests, setIntegrityTests] = useState<any[]>([]);
  const [integrityLoading, setIntegrityLoading] = useState(false);
  const [integrityResults, setIntegrityResults] = useState<any | null>(null);
  
  // Load initial data
  useEffect(() => {
    // Set example source IDs based on direction
    if (direction === 'sanity-to-supabase') {
      setSourceId('playerProfile-abc123');
    } else {
      setSourceId('player-456');
    }
    
    // Load initial reference data
    fetchReferenceExamples();
    
    // Load sync events
    fetchSyncEvents();
    
    // Load integrity tests
    loadIntegrityTests();
  }, []);

  // Document types for the reference explorer
  const documentTypes = {
    player: { name: 'Player', system: 'Sanity', linkedTo: 'Supabase players' },
    team: { name: 'Team', system: 'Sanity', linkedTo: 'Supabase teams' },
    match: { name: 'Match', system: 'Sanity', linkedTo: 'Supabase matches' },
    newsArticle: { name: 'News Article', system: 'Sanity', linkedTo: 'Various' }
  };
  
  // Placeholder references for the explorer
  const referenceExamples = {
    player: [
      {
        id: 'playerProfile-abc123',
        title: 'John Smith',
        type: 'playerProfile',
        system: 'Sanity',
        linkedId: 'player-456',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-10T14:30:00Z',
        status: 'synced'
      },
      {
        id: 'playerProfile-def456',
        title: 'Sarah Johnson',
        type: 'playerProfile',
        system: 'Sanity',
        linkedId: 'player-789',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-12T09:15:00Z',
        status: 'synced'
      },
      {
        id: 'playerProfile-ghi789',
        title: 'Michael Brown',
        type: 'playerProfile',
        system: 'Sanity',
        linkedId: 'player-101',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-13T11:45:00Z',
        status: 'error'
      }
    ],
    team: [
      {
        id: 'team-abc123',
        title: 'First Team',
        type: 'team',
        system: 'Sanity',
        linkedId: 'team-456',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-11T10:20:00Z',
        status: 'synced'
      }
    ],
    match: [
      {
        id: 'match-abc123',
        title: 'Home vs Away Team',
        type: 'match',
        system: 'Sanity',
        linkedId: 'match-456',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-12T16:45:00Z',
        status: 'synced'
      }
    ],
    newsArticle: [
      {
        id: 'newsArticle-abc123',
        title: 'Latest Win Report',
        type: 'newsArticle',
        system: 'Sanity',
        linkedId: 'match-789',
        linkedSystem: 'Supabase',
        lastSync: '2025-05-13T08:30:00Z',
        status: 'synced'
      }
    ]
  };
  
  // Simulate loading references
  const fetchReferenceExamples = () => {
    setExplorerLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setReferences(referenceExamples[documentType as keyof typeof referenceExamples] || []);
      setExplorerLoading(false);
    }, 800);
  };
  
  // Handle document type change in explorer
  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
    setReferences([]);
    setExplorerLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setReferences(referenceExamples[value as keyof typeof referenceExamples] || []);
      setExplorerLoading(false);
    }, 800);
  };
  
  // Handle reference testing
  const testReference = async () => {
    if (!sourceId) {
      toast({
        variant: 'destructive',
        title: 'Missing ID',
        description: 'Please enter a source ID to test reference resolution'
      });
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate a successful result
      if (direction === 'sanity-to-supabase') {
        setResult({
          success: true,
          source: 'sanity',
          target: 'supabase',
          sourceId: sourceId,
          resolved: true,
          targetId: `player-${Math.floor(Math.random() * 1000)}`,
          resolution_path: [
            { system: 'Sanity', step: 'lookup', id: sourceId },
            { system: 'Sanity', step: 'extract_ref', field: 'supabaseId' },
            { system: 'Supabase', step: 'verify', success: true }
          ],
          sourceData: {
            _id: sourceId,
            _type: 'playerProfile',
            firstName: 'John',
            lastName: 'Doe',
            playerPosition: 'midfielder',
            jerseyNumber: 10
          },
          targetData: {
            id: `player-${Math.floor(Math.random() * 1000)}`,
            first_name: 'John',
            last_name: 'Doe',
            position: 'midfielder',
            jersey_number: 10
          }
        });
      } else {
        setResult({
          success: true,
          source: 'supabase',
          target: 'sanity',
          sourceId: sourceId,
          resolved: true,
          targetId: `playerProfile-${Math.floor(Math.random() * 1000)}`,
          resolution_path: [
            { system: 'Supabase', step: 'lookup', id: sourceId },
            { system: 'Sanity', step: 'query', filter: `supabaseId == "${sourceId}"` },
            { system: 'Sanity', step: 'verify', success: true }
          ],
          sourceData: {
            id: sourceId,
            first_name: 'Jane',
            last_name: 'Smith',
            position: 'forward',
            jersey_number: 9
          },
          targetData: {
            _id: `playerProfile-${Math.floor(Math.random() * 1000)}`,
            _type: 'playerProfile',
            firstName: 'Jane',
            lastName: 'Smith',
            playerPosition: 'forward',
            jerseyNumber: 9
          }
        });
      }
      
      toast({
        title: 'Reference Resolution Successful',
        description: `Successfully resolved reference from ${direction === 'sanity-to-supabase' ? 'Sanity to Supabase' : 'Supabase to Sanity'}`
      });
    } catch (error) {
      console.error('Reference test error:', error);
      setResult({
        success: false,
        source: direction === 'sanity-to-supabase' ? 'sanity' : 'supabase',
        target: direction === 'sanity-to-supabase' ? 'supabase' : 'sanity',
        sourceId: sourceId,
        resolved: false,
        error: 'Failed to resolve reference'
      });
      
      toast({
        variant: 'destructive',
        title: 'Reference Resolution Failed',
        description: 'Could not resolve the reference between systems'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch sync event history
  const fetchSyncEvents = () => {
    setSyncLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Sample sync events
      const sampleEvents = [
        {
          id: 'sync-123',
          timestamp: '2025-05-13T14:30:00Z',
          sourceSystem: 'Sanity',
          targetSystem: 'Supabase',
          documentType: 'playerProfile',
          documentId: 'playerProfile-abc123',
          operation: 'update',
          status: 'success',
          duration: 245
        },
        {
          id: 'sync-124',
          timestamp: '2025-05-13T13:45:00Z',
          sourceSystem: 'Sanity',
          targetSystem: 'Supabase',
          documentType: 'newsArticle',
          documentId: 'newsArticle-def456',
          operation: 'create',
          status: 'success',
          duration: 180
        },
        {
          id: 'sync-125',
          timestamp: '2025-05-13T12:15:00Z',
          sourceSystem: 'Sanity',
          targetSystem: 'Supabase',
          documentType: 'matchGallery',
          documentId: 'matchGallery-ghi789',
          operation: 'update',
          status: 'error',
          duration: 320,
          error: 'Reference resolution failed'
        },
        {
          id: 'sync-126',
          timestamp: '2025-05-13T11:30:00Z',
          sourceSystem: 'Sanity',
          targetSystem: 'Supabase',
          documentType: 'playerProfile',
          documentId: 'playerProfile-jkl012',
          operation: 'delete',
          status: 'success',
          duration: 150
        },
        {
          id: 'sync-127',
          timestamp: '2025-05-13T10:45:00Z',
          sourceSystem: 'Sanity',
          targetSystem: 'Supabase',
          documentType: 'team',
          documentId: 'team-mno345',
          operation: 'update',
          status: 'success',
          duration: 210
        }
      ];
      
      setSyncEvents(sampleEvents);
      setSyncLoading(false);
    }, 800);
  };
  
  // Load data integrity tests
  const loadIntegrityTests = () => {
    // Sample integrity tests
    const tests = [
      {
        id: 'integrity-1',
        name: 'Player References',
        description: 'Verify that all player profiles in Sanity have corresponding entries in Supabase',
        source: 'sanity',
        target: 'supabase',
        documentType: 'playerProfile',
        field: 'supabaseId'
      },
      {
        id: 'integrity-2',
        name: 'Team References',
        description: 'Verify that all teams in Sanity have corresponding entries in Supabase',
        source: 'sanity',
        target: 'supabase',
        documentType: 'team',
        field: 'supabaseId'
      },
      {
        id: 'integrity-3',
        name: 'News Article Match References',
        description: 'Verify that match references in news articles point to valid matches',
        source: 'sanity',
        target: 'supabase',
        documentType: 'newsArticle',
        field: 'matchReference'
      },
      {
        id: 'integrity-4',
        name: 'Match Team References',
        description: 'Verify that team references in matches point to valid teams',
        source: 'sanity',
        target: 'sanity',
        documentType: 'match',
        field: 'teams[]._ref'
      }
    ];
    
    setIntegrityTests(tests);
  };
  
  // Run data integrity tests
  const runIntegrityTests = async () => {
    setIntegrityLoading(true);
    setIntegrityResults(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate test results
      const results = integrityTests.map(test => {
        const passRate = Math.random();
        const totalReferences = Math.floor(Math.random() * 50) + 10;
        const validReferences = Math.floor(totalReferences * passRate);
        const invalidReferences = totalReferences - validReferences;
        const samples = [];
        
        // Add sample invalid references if any
        if (invalidReferences > 0) {
          for (let i = 0; i < Math.min(invalidReferences, 3); i++) {
            samples.push({
              sourceId: `${test.documentType}-sample${i}`,
              issue: 'Reference not found in target system',
              field: test.field
            });
          }
        }
        
        return {
          id: test.id,
          name: test.name,
          passed: invalidReferences === 0,
          totalReferences,
          validReferences,
          invalidReferences,
          samples
        };
      });
      
      setIntegrityResults({
        timestamp: new Date().toISOString(),
        passed: results.every(r => r.passed),
        results
      });
      
      toast({
        title: results.every(r => r.passed) ? 'All Integrity Tests Passed!' : 'Some Integrity Tests Failed',
        description: `${results.filter(r => r.passed).length} of ${results.length} tests passed`
      });
    } catch (error) {
      console.error('Integrity test error:', error);
      
      toast({
        variant: 'destructive',
        title: 'Integrity Test Error',
        description: 'An error occurred while running integrity tests'
      });
    } finally {
      setIntegrityLoading(false);
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
      <h2 className="text-2xl font-bold mb-6">Cross-System Integration Tests</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="reference-testing">Reference Testing</TabsTrigger>
          <TabsTrigger value="reference-explorer">Reference Explorer</TabsTrigger>
          <TabsTrigger value="sync-monitoring">Sync Monitoring</TabsTrigger>
          <TabsTrigger value="data-integrity">Data Integrity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <TestCard 
            title="Cross-System Architecture Guide" 
            description="Understanding the hybrid architecture of Banks o' Dee FC"
            icon={BookOpen}
          >
            <div className="prose max-w-none">
              <h3>Hybrid Architecture Overview</h3>
              <p>
                The Banks o' Dee FC website implements a hybrid architecture that combines structured operational 
                data from Supabase with flexible editorial content from Sanity CMS, all integrated into a Next.js 
                frontend with Cloudinary for media management.
              </p>
              
              <div className="not-prose border border-gray-200 rounded-md p-4 my-4 bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center space-x-4 w-full">
                    {/* Sanity CMS */}
                    <div className="bg-amber-100 p-3 rounded-md border border-amber-200 w-36">
                      <div className="font-medium">Sanity CMS</div>
                      <div className="text-xs mt-1 text-gray-600">Editorial Content</div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-0.5 bg-gray-300"></div>
                      <div className="text-xs mt-1">References</div>
                    </div>
                    
                    {/* Supabase */}
                    <div className="bg-green-100 p-3 rounded-md border border-green-200 w-36">
                      <div className="font-medium">Supabase</div>
                      <div className="text-xs mt-1 text-gray-600">Operational Data</div>
                    </div>
                  </div>
                  
                  {/* Arrow down */}
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs">Integration</div>
                  </div>
                  
                  {/* Next.js */}
                  <div className="bg-blue-100 p-3 rounded-md border border-blue-200 w-72">
                    <div className="font-medium">Next.js Frontend</div>
                    <div className="text-xs mt-1 text-gray-600">Server & Client Components</div>
                  </div>
                  
                  {/* Arrow down */}
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs">Media</div>
                  </div>
                  
                  {/* Cloudinary */}
                  <div className="bg-purple-100 p-3 rounded-md border border-purple-200 w-48">
                    <div className="font-medium">Cloudinary</div>
                    <div className="text-xs mt-1 text-gray-600">Media Management</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
                <h4 className="text-amber-800 mt-0 mb-2">Data Responsibility Division</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-amber-800 font-medium">Sanity CMS (Editorial Content)</h5>
                    <ul className="mt-1 text-amber-700">
                      <li>Player and staff profiles</li>
                      <li>News articles and blog content</li>
                      <li>Match reports and analysis</li>
                      <li>Stadium information and history</li>
                      <li>Fan of the month features</li>
                      <li>Photo galleries</li>
                      <li>Commercial partnerships</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-amber-800 font-medium">Supabase (Operational Data)</h5>
                    <ul className="mt-1 text-amber-700">
                      <li>Match fixtures and results</li>
                      <li>League tables and standings</li>
                      <li>Competition structure and seasons</li>
                      <li>Fan polls and voting</li>
                      <li>Commercial bookings and transactions</li>
                      <li>User accounts and authentication</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h4>Cross-System References</h4>
              <p>
                The hybrid architecture relies on cross-system references to maintain relationships 
                between content in different systems. These references are primarily unidirectional:
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Database className="h-4 w-4 mr-2 text-primary" />
                    Sanity → Supabase References
                  </h5>
                  <p className="text-sm mt-1">
                    Sanity documents contain fields that reference Supabase records by ID. For example, 
                    a player profile in Sanity might include a <code>supabaseId</code> field that references 
                    the corresponding player record in Supabase.
                  </p>
                  <pre className="mt-2 p-3 text-xs bg-gray-100 rounded">
{`// Example Sanity document with Supabase reference
{
  "_id": "playerProfile-abc123",
  "_type": "playerProfile",
  "firstName": "John",
  "lastName": "Smith",
  "supabaseId": "player-456"  // Reference to Supabase record
}`}
                  </pre>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <GitMerge className="h-4 w-4 mr-2 text-primary" />
                    Reference Resolution
                  </h5>
                  <p className="text-sm mt-1">
                    The application resolves cross-system references by looking up the referenced 
                    record in the target system and combining the data. This happens primarily in:
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>Server components fetching data from multiple sources</li>
                    <li>API routes handling webhook events</li>
                    <li>Synchronization processes between systems</li>
                  </ul>
                  <pre className="mt-2 p-3 text-xs bg-gray-100 rounded">
{`// Example reference resolution function
async function getPlayerWithProfile(playerId) {
  // Step 1: Fetch from Supabase
  const playerData = await supabase
    .from('people')
    .select('*')
    .eq('id', playerId)
    .single();
  
  // Step 2: Fetch from Sanity using the Supabase ID
  const playerProfile = await sanityClient.fetch(\`
    *[_type == "playerProfile" && supabaseId == $playerId][0]
  \`, { playerId });
  
  // Step 3: Combine the data
  return {
    ...playerData,
    profile: playerProfile
  };
}`}
                  </pre>
                </div>
              </div>
              
              <h4>Data Synchronization</h4>
              <p>
                When content is updated in one system, it may need to be synchronized with the other system. 
                This happens through webhook-driven processes:
              </p>
              <ol>
                <li>Content is updated in Sanity CMS</li>
                <li>Sanity sends a webhook notification to the application</li>
                <li>The webhook handler processes the update</li>
                <li>If needed, the handler updates the corresponding data in Supabase</li>
              </ol>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                <h5 className="font-medium text-blue-800">Common Cross-System Issues</h5>
                <ul className="list-disc ml-5 mt-2 text-sm text-blue-700 space-y-1">
                  <li><strong>Missing References</strong>: A document references a non-existent record in another system</li>
                  <li><strong>Stale References</strong>: References that point to outdated or deleted content</li>
                  <li><strong>Synchronization Failures</strong>: Updates that fail to propagate between systems</li>
                  <li><strong>Inconsistent Data</strong>: Related data that becomes out of sync between systems</li>
                </ul>
              </div>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="reference-testing">
          <TestCard 
            title="Reference Resolution Testing" 
            description="Test cross-system reference resolution between Sanity and Supabase"
            icon={GitMerge}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-3">Test Reference Resolution</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test how references are resolved between Sanity and Supabase by providing a source ID.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Resolution Direction:</label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={direction === 'sanity-to-supabase' ? 'default' : 'outline'}
                        onClick={() => {
                          setDirection('sanity-to-supabase');
                          setSourceId('playerProfile-abc123');
                          setResult(null);
                        }}
                      >
                        Sanity → Supabase
                      </Button>
                      <Button
                        size="sm"
                        variant={direction === 'supabase-to-sanity' ? 'default' : 'outline'}
                        onClick={() => {
                          setDirection('supabase-to-sanity');
                          setSourceId('player-456');
                          setResult(null);
                        }}
                      >
                        Supabase → Sanity
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {direction === 'sanity-to-supabase' ? 'Sanity Document ID:' : 'Supabase Record ID:'}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder={direction === 'sanity-to-supabase' ? 'e.g., playerProfile-abc123' : 'e.g., player-456'}
                        value={sourceId}
                        onChange={(e) => setSourceId(e.target.value)}
                        disabled={loading}
                      />
                      <Button
                        onClick={testReference}
                        disabled={loading || !sourceId}
                      >
                        {loading ? (
                          <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Testing...</>
                        ) : (
                          <><RefreshCw className="h-4 w-4 mr-2" /> Test Reference</>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a {direction === 'sanity-to-supabase' ? 'Sanity document ID' : 'Supabase record ID'} to test reference resolution
                    </p>
                  </div>
                </div>
              </div>
              
              {result && (
                <div className={`p-4 rounded-md border ${
                  result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className="text-lg font-medium mb-3">Resolution Results</h3>
                  
                  <div className="space-y-4">
                    {/* Result summary */}
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium">
                        {result.success ? 'Reference successfully resolved' : 'Reference resolution failed'}
                      </span>
                    </div>
                    
                    {/* Resolution details */}
                    {result.success && (
                      <div className="mt-4">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          {/* Source system */}
                          <div className={`p-3 rounded-md border ${
                            result.source === 'sanity' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
                          }`}>
                            <div className="font-medium">{result.source === 'sanity' ? 'Sanity' : 'Supabase'}</div>
                            <div className="text-xs mt-1 text-gray-600">ID: {result.sourceId}</div>
                          </div>
                          
                          {/* Arrow */}
                          <div className="flex flex-col items-center">
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </div>
                          
                          {/* Target system */}
                          <div className={`p-3 rounded-md border ${
                            result.target === 'sanity' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
                          }`}>
                            <div className="font-medium">{result.target === 'sanity' ? 'Sanity' : 'Supabase'}</div>
                            <div className="text-xs mt-1 text-gray-600">ID: {result.targetId}</div>
                          </div>
                        </div>
                        
                        {/* Resolution path */}
                        {result.resolution_path && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Resolution Path:</h4>
                            <div className="space-y-2">
                              {result.resolution_path.map((step: any, i: number) => (
                                <div key={i} className="text-xs p-2 border rounded bg-gray-50 flex items-start">
                                  <div className="flex-shrink-0 w-20 font-medium">{step.system}:</div>
                                  <div className="flex-1">
                                    <span className="font-medium">{step.step}</span>
                                    {step.field && <span> - field: <code>{step.field}</code></span>}
                                    {step.filter && <span> - filter: <code>{step.filter}</code></span>}
                                    {step.success !== undefined && (
                                      <span className={step.success ? 'text-green-600' : 'text-red-600'}>
                                        {' '}{step.success ? '✓' : '✗'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Source and target data comparison */}
                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Source Data:</h4>
                            <pre className="text-xs p-3 bg-gray-100 rounded overflow-auto max-h-48">
                              {JSON.stringify(result.sourceData, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Target Data:</h4>
                            <pre className="text-xs p-3 bg-gray-100 rounded overflow-auto max-h-48">
                              {JSON.stringify(result.targetData, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Error details */}
                    {!result.success && result.error && (
                      <div className="bg-red-100 p-3 rounded">
                        <h4 className="text-sm font-medium text-red-800 mb-1">Error:</h4>
                        <p className="text-sm text-red-700">{result.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="reference-explorer">
          <TestCard 
            title="Reference Explorer" 
            description="Explore and visualize cross-system references"
            icon={Search}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-3">Browse Cross-System References</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore references between Sanity and Supabase for different document types.
                </p>
                
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Document Type:</label>
                    <Select
                      value={documentType}
                      onValueChange={handleDocumentTypeChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(documentTypes).map(([value, type]) => (
                          <SelectItem key={value} value={value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={fetchReferenceExamples}
                    disabled={explorerLoading}
                    variant="outline"
                  >
                    {explorerLoading ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading...</>
                    ) : (
                      <><Search className="h-4 w-4 mr-2" /> Refresh</>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">
                    {documentTypes[documentType as keyof typeof documentTypes]?.name || 'Document'} References
                  </h3>
                  <div className="text-sm text-gray-500">
                    {references.length} references found
                  </div>
                </div>
                
                {explorerLoading ? (
                  <div className="p-12 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : references.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source ID / Title</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked To</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Synced</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {references.map((ref, i) => (
                          <tr key={i} className={ref.status === 'error' ? 'bg-red-50' : 'hover:bg-gray-50'}>
                            <td className="px-3 py-2">
                              <div className="text-sm font-medium">{ref.title}</div>
                              <div className="text-xs text-gray-500 font-mono">{ref.id}</div>
                            </td>
                            <td className="px-3 py-2 text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                ref.system === 'Sanity' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {ref.system}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <div className="text-xs font-mono">{ref.linkedId}</div>
                              <div className="text-xs text-gray-500">{ref.linkedSystem}</div>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-500">
                              {formatDate(ref.lastSync)}
                            </td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                ref.status === 'synced' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {ref.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>No references found for this document type</p>
                  </div>
                )}
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  <span className="font-medium">Note:</span> In development mode, reference data is simulated. In production, this would show actual cross-system references from the database.
                </AlertDescription>
              </Alert>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="sync-monitoring">
          <TestCard 
            title="Synchronization Monitoring" 
            description="Monitor and analyze cross-system synchronization"
            icon={Activity}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Recent Sync Activity</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchSyncEvents}
                  disabled={syncLoading}
                >
                  {syncLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Refreshing...</>
                  ) : (
                    <><Activity className="h-4 w-4 mr-2" /> Refresh</>
                  )}
                </Button>
              </div>
              
              {syncLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : syncEvents.length > 0 ? (
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systems</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {syncEvents.map((event, i) => (
                        <tr key={i} className={event.status === 'error' ? 'bg-red-50' : 'hover:bg-gray-50'}>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {formatDate(event.timestamp)}
                          </td>
                          <td className="px-3 py-2">
                            <div className="text-xs font-medium">{event.documentType}</div>
                            <div className="text-xs text-gray-500 font-mono truncate max-w-xs">
                              {event.documentId}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.operation === 'create' 
                                ? 'bg-blue-100 text-blue-800' 
                                : event.operation === 'update'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {event.operation}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center text-xs">
                              <span className={`px-2 py-1 rounded-l-full ${
                                event.sourceSystem === 'Sanity' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {event.sourceSystem}
                              </span>
                              <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />
                              <span className={`px-2 py-1 rounded-r-full ${
                                event.targetSystem === 'Sanity' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {event.targetSystem}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {event.duration}ms
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No sync events found</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Sync Performance</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Average sync times by document type and operation.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Player Profiles</span>
                        <span>185ms avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>News Articles</span>
                        <span>230ms avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Match Galleries</span>
                        <span>450ms avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Sync Status</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Overall synchronization status and error rates.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-md border">
                      <div className="text-3xl font-bold text-green-600">94%</div>
                      <div className="text-xs text-gray-500 mt-1">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-md border">
                      <div className="text-3xl font-bold text-amber-600">215</div>
                      <div className="text-xs text-gray-500 mt-1">Events Today</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-md border">
                      <div className="text-3xl font-bold text-blue-600">5</div>
                      <div className="text-xs text-gray-500 mt-1">Pending Syncs</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-md border">
                      <div className="text-3xl font-bold text-red-600">12</div>
                      <div className="text-xs text-gray-500 mt-1">Failed Syncs</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  <span className="font-medium">Note:</span> In development mode, sync data is simulated. In production, this would show actual sync events and metrics from the application.
                </AlertDescription>
              </Alert>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="data-integrity">
          <TestCard 
            title="Data Integrity Testing" 
            description="Verify data consistency across systems"
            icon={CheckSquare}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-3">Cross-System Data Integrity Tests</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Run tests to verify data consistency and reference integrity between systems.
                </p>
                
                <Button
                  onClick={runIntegrityTests}
                  disabled={integrityLoading}
                >
                  {integrityLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running Tests...</>
                  ) : (
                    <><CheckSquare className="h-4 w-4 mr-2" /> Run Integrity Tests</>
                  )}
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-medium">Available Integrity Tests</h3>
                </div>
                <div className="p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systems</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {integrityTests.map((test, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{test.name}</td>
                          <td className="px-3 py-2 text-sm">{test.description}</td>
                          <td className="px-3 py-2">
                            <div className="flex items-center text-xs">
                              <span className={`px-2 py-1 rounded-l-full ${
                                test.source === 'sanity' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {test.source === 'sanity' ? 'Sanity' : 'Supabase'}
                              </span>
                              <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />
                              <span className={`px-2 py-1 rounded-r-full ${
                                test.target === 'sanity' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {test.target === 'sanity' ? 'Sanity' : 'Supabase'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {integrityResults && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-md border ${
                    integrityResults.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Integrity Test Results</h3>
                      <div className="text-sm text-gray-500">
                        {formatDate(integrityResults.timestamp)}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${integrityResults.passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium">
                        {integrityResults.passed 
                          ? 'All tests passed successfully' 
                          : 'Some tests failed - data inconsistencies detected'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {integrityResults.results.map((result: any, i: number) => (
                      <div 
                        key={i} 
                        className={`p-4 rounded-md border ${
                          result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <h4 className="font-medium">{result.name}</h4>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                          <div className="p-2 bg-white rounded border">
                            <div className="text-lg font-bold">{result.totalReferences}</div>
                            <div className="text-xs text-gray-500">Total References</div>
                          </div>
                          <div className="p-2 bg-white rounded border">
                            <div className="text-lg font-bold text-green-600">{result.validReferences}</div>
                            <div className="text-xs text-gray-500">Valid References</div>
                          </div>
                          <div className="p-2 bg-white rounded border">
                            <div className="text-lg font-bold text-red-600">{result.invalidReferences}</div>
                            <div className="text-xs text-gray-500">Invalid References</div>
                          </div>
                        </div>
                        
                        {!result.passed && result.samples && result.samples.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium mb-2">Issue Samples:</h5>
                            <div className="space-y-2">
                              {result.samples.map((sample: any, j: number) => (
                                <div key={j} className="text-xs p-2 border rounded bg-red-100 text-red-800">
                                  <div><span className="font-medium">ID:</span> {sample.sourceId}</div>
                                  <div><span className="font-medium">Field:</span> {sample.field}</div>
                                  <div><span className="font-medium">Issue:</span> {sample.issue}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TestCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
