"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowDownUp, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Loader2,
  Info,
  Bug,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ImportProgress, ImportStats } from '@/components/admin/ImportProgress';
import { importPlayersToSanity, importSponsorsToSanity, ImportResult } from '@/utils/sync/SupabaseToSanitySync';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { testSimpleSanityConnection } from '@/lib/sanity-client-simple';

interface SyncResult {
  created: number;
  updated: number;
  failed: number;
}

export function SyncAdmin() {
  const [loading, setLoading] = useState({
    players: false,
    sponsors: false,
    test: false,
  });
  
  const [results, setResults] = useState<{
    players?: ImportResult;
    sponsors?: ImportResult;
  }>({});
  
  const [error, setError] = useState<string | null>(null);
  const [verboseMode, setVerboseMode] = useState(true); // Default to verbose mode for better error visibility
  const [dryRun, setDryRun] = useState(false);
  const [testSinglePlayerId, setTestSinglePlayerId] = useState('');
  const [debugMode, setDebugMode] = useState(true); // Default to debug mode for better troubleshooting
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [includeStaff, setIncludeStaff] = useState(true); // New option to include staff members
  
  // Test Sanity connection
  const testConnection = async () => {
    setLoading({ ...loading, test: true });
    setConnectionStatus(null);
    
    try {
      const result = await testSimpleSanityConnection();
      setConnectionStatus(result.success ? 'success' : 'failed');
      toast({
        title: result.success ? "Connection Successful" : "Connection Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setConnectionStatus('failed');
      toast({
        variant: "destructive",
        title: "Connection test failed",
        description: errorMessage,
      });
    } finally {
      setLoading({ ...loading, test: false });
    }
  };
  
  const importPlayers = async () => {
    setLoading({ ...loading, players: true });
    setError(null);
    
    try {
      // Reset previous results but keep structure
      setResults(prev => ({
        ...prev,
        players: {
          created: 0,
          updated: 0,
          failed: 0,
          errors: {},
          processingStats: {
            total: 0,
            processed: 0
          }
        }
      }));
      
      toast({
        title: "Import started",
        description: `Importing ${includeStaff ? 'players and staff' : 'players only'} from Supabase to Sanity...`,
      });
      
      const result = await importPlayersToSanity({
        onProgress: (stats) => {
          setResults(prev => ({ ...prev, players: stats }));
        },
        dryRun,
        testSinglePlayer: testSinglePlayerId || undefined,
        debug: debugMode,
        includeStaff
      });
      
      setResults(prev => ({ ...prev, players: result }));
      
      // Show success or warning message
      if (result.failed > 0) {
        setError(`Warning: ${result.failed} personnel imports failed. Check the details in verbose mode.`);
        toast({
          variant: "destructive",
          title: "Import completed with errors",
          description: `Created: ${result.created}, Updated: ${result.updated}, Failed: ${result.failed}`,
        });
      } else {
        toast({
          title: "Import successful",
          description: `Created: ${result.created}, Updated: ${result.updated}, Failed: ${result.failed}`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Error importing personnel: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Import failed",
        description: errorMessage,
      });
    } finally {
      setLoading({ ...loading, players: false });
    }
  };
  
  const importSponsors = async () => {
    setLoading({ ...loading, sponsors: true });
    setError(null);
    
    try {
      // Reset previous results but keep structure
      setResults(prev => ({
        ...prev,
        sponsors: {
          created: 0,
          updated: 0,
          failed: 0,
          errors: {},
          processingStats: {
            total: 0,
            processed: 0
          }
        }
      }));
      
      toast({
        title: "Import started",
        description: "Importing sponsor data from Supabase to Sanity...",
      });
      
      const result = await importSponsorsToSanity({
        onProgress: (stats) => {
          setResults(prev => ({ ...prev, sponsors: stats }));
        },
        dryRun,
        debug: debugMode
      });
      
      setResults(prev => ({ ...prev, sponsors: result }));
      
      // Show success or warning message
      if (result.failed > 0) {
        setError(`Warning: ${result.failed} sponsor imports failed. Check the details in verbose mode.`);
        toast({
          variant: "destructive",
          title: "Import completed with errors",
          description: `Created: ${result.created}, Updated: ${result.updated}, Failed: ${result.failed}`,
        });
      } else {
        toast({
          title: "Import successful",
          description: `Created: ${result.created}, Updated: ${result.updated}, Failed: ${result.failed}`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Error importing sponsors: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Import failed",
        description: errorMessage,
      });
    } finally {
      setLoading({ ...loading, sponsors: false });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sanity-Supabase Sync</h2>
      
      <div className="flex flex-wrap items-center gap-6 mb-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="verbose-mode" 
            checked={verboseMode} 
            onCheckedChange={setVerboseMode} 
          />
          <Label htmlFor="verbose-mode">Verbose Mode</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="dry-run" 
            checked={dryRun} 
            onCheckedChange={setDryRun} 
          />
          <Label htmlFor="dry-run">Dry Run (Preview Only)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="debug-mode" 
            checked={debugMode} 
            onCheckedChange={setDebugMode} 
          />
          <Label htmlFor="debug-mode">Debug Mode</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="include-staff" 
            checked={includeStaff} 
            onCheckedChange={setIncludeStaff} 
          />
          <Label htmlFor="include-staff">Include Staff</Label>
        </div>
      </div>
      
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Sanity Connection Test
          </CardTitle>
          <CardDescription>
            Test the connection to Sanity API before attempting imports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={testConnection} 
              disabled={loading.test}
              variant="secondary"
            >
              {loading.test ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Sanity Connection</>
              )}
            </Button>
            
            {connectionStatus && (
              <span className={`flex items-center ${connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {connectionStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-1" />
                    Connection successful
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 mr-1" />
                    Connection failed
                  </>
                )}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
      
      {debugMode && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Debug Tools
            </CardTitle>
            <CardDescription>
              Tools for diagnosing and fixing import issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-player-id">Test Single Personnel Import (by ID)</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="test-player-id" 
                  placeholder="Enter person ID" 
                  value={testSinglePlayerId}
                  onChange={(e) => setTestSinglePlayerId(e.target.value)}
                />
                <Button 
                  variant="secondary" 
                  onClick={importPlayers} 
                  disabled={loading.players || !testSinglePlayerId}
                >
                  Test
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Enter a Supabase person ID to test import for a single player or staff member.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-start gap-2">
            <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </AlertDescription>
        </Alert>
      )}
      
      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <AlertDescription className="flex items-start gap-2">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
          <div>
            Enable Verbose Mode to see detailed error messages. For large imports, use Dry Run first to preview changes without modifying data.
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Import Personnel</CardTitle>
            <CardDescription>
              Import player and staff data from Supabase to Sanity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              This will create or update player and staff profiles in Sanity based on the data in Supabase.
              {dryRun && " (Dry Run Mode: No changes will be made)"}
              {testSinglePlayerId && " (Testing single person only)"}
              {!includeStaff && " (Players only, excluding staff)"}
            </p>
            
            {results.players && (
              <ImportProgress 
                stats={{
                  total: results.players.processingStats.total,
                  processed: results.players.processingStats.processed,
                  created: results.players.created,
                  updated: results.players.updated,
                  failed: results.players.failed,
                  errors: results.players.errors
                }}
                isImporting={loading.players}
                showDetails={verboseMode}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="default" 
              onClick={importPlayers} 
              disabled={loading.players || loading.sponsors}
            >
              {loading.players ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  {dryRun ? 'Preview Import Personnel' : 'Import Personnel'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Import Sponsors</CardTitle>
            <CardDescription>
              Import sponsor data from Supabase to Sanity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              This will create or update sponsor profiles in Sanity based on the data in Supabase.
              {dryRun && " (Dry Run Mode: No changes will be made)"}
            </p>
            
            {results.sponsors && (
              <ImportProgress 
                stats={{
                  total: results.sponsors.processingStats.total,
                  processed: results.sponsors.processingStats.processed,
                  created: results.sponsors.created,
                  updated: results.sponsors.updated,
                  failed: results.sponsors.failed,
                  errors: results.sponsors.errors
                }}
                isImporting={loading.sponsors}
                showDetails={verboseMode}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="default" 
              onClick={importSponsors} 
              disabled={loading.players || loading.sponsors}
            >
              {loading.sponsors ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  {dryRun ? 'Preview Import Sponsors' : 'Import Sponsors'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
