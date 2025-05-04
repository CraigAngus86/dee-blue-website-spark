
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowDownUp, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { importPlayersToSanity, importSponsorsToSanity } from '@/utils/sync/SupabaseToSanitySync';

interface SyncResult {
  created: number;
  updated: number;
  failed: number;
}

export function SyncAdmin() {
  const [loading, setLoading] = useState({
    players: false,
    sponsors: false,
  });
  
  const [results, setResults] = useState<{
    players?: SyncResult;
    sponsors?: SyncResult;
  }>({});
  
  const [error, setError] = useState<string | null>(null);
  
  const importPlayers = async () => {
    setLoading({ ...loading, players: true });
    setError(null);
    
    try {
      const result = await importPlayersToSanity();
      setResults({ ...results, players: result });
    } catch (err) {
      setError(`Error importing players: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading({ ...loading, players: false });
    }
  };
  
  const importSponsors = async () => {
    setLoading({ ...loading, sponsors: true });
    setError(null);
    
    try {
      const result = await importSponsorsToSanity();
      setResults({ ...results, sponsors: result });
    } catch (err) {
      setError(`Error importing sponsors: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading({ ...loading, sponsors: false });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sanity-Supabase Sync</h2>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 flex items-start gap-2">
          <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Import Players</CardTitle>
            <CardDescription>
              Import player data from Supabase to Sanity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              This will create or update player profiles in Sanity based on the data in Supabase.
              Existing players will be updated with the latest data from Supabase.
            </p>
            
            {loading.players && (
              <div className="space-y-2">
                <Progress value={50} />
                <p className="text-xs text-center">Importing players...</p>
              </div>
            )}
            
            {results.players && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Created: {results.players.created}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                    Updated: {results.players.updated}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Failed: {results.players.failed}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="default" 
              onClick={importPlayers} 
              disabled={loading.players}
            >
              <ArrowDownUp className="mr-2 h-4 w-4" />
              {loading.players ? 'Importing...' : 'Import Players'}
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
              Existing sponsors will be updated with the latest data from Supabase.
            </p>
            
            {loading.sponsors && (
              <div className="space-y-2">
                <Progress value={50} />
                <p className="text-xs text-center">Importing sponsors...</p>
              </div>
            )}
            
            {results.sponsors && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Created: {results.sponsors.created}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                    Updated: {results.sponsors.updated}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Failed: {results.sponsors.failed}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="default" 
              onClick={importSponsors} 
              disabled={loading.sponsors}
            >
              <ArrowDownUp className="mr-2 h-4 w-4" />
              {loading.sponsors ? 'Importing...' : 'Import Sponsors'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
