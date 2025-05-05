
"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { importPlayers, importSponsors } from '@/app/actions/sanity-import';
import { serverEnv } from '@/lib/env';

interface ImportResult {
  created: number;
  updated: number;
  failed: number;
  errors: Record<string, string>;
  processingStats: {
    total: number;
    processed: number;
  };
}

interface SyncResult {
  created: number;
  updated: number;
  failed: number;
  errors: Record<string, string>;
  processingStats: {
    total: number;
    processed: number;
  };
}

export const SyncAdmin = () => {
  const [playersResult, setPlayersResult] = useState<SyncResult | null>(null);
  const [sponsorsResult, setSponsorsResult] = useState<SyncResult | null>(null);
  const [isImportingPlayers, setIsImportingPlayers] = useState(false);
  const [isImportingSponsors, setIsImportingSponsors] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleImportPlayers = useCallback(async () => {
    setIsImportingPlayers(true);
    setError(null);
    setProgress(0);
    
    try {
      const result = await importPlayers({
        onProgress: (stats: ImportResult) => {
          const percentage = Math.round((stats.processingStats.processed / stats.processingStats.total) * 100);
          setProgress(percentage);
        }
      });
      setPlayersResult(result);
    } catch (e: any) {
      console.error('Error importing players:', e);
      setError(e.message || 'Import failed');
    } finally {
      setIsImportingPlayers(false);
      setProgress(0);
    }
  }, []);
  
  const handleImportSponsors = useCallback(async () => {
    setIsImportingSponsors(true);
    setError(null);
    setProgress(0);
    
    try {
      const result = await importSponsors({
        onProgress: (stats: ImportResult) => {
          const percentage = Math.round((stats.processingStats.processed / stats.processingStats.total) * 100);
          setProgress(percentage);
        }
      });
      setSponsorsResult(result);
    } catch (e: any) {
      console.error('Error importing sponsors:', e);
      setError(e.message || 'Import failed');
    } finally {
      setIsImportingSponsors(false);
      setProgress(0);
    }
  }, []);
  
  return (
    <div>
      <Tabs defaultValue="players" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players">
          <Card>
            <CardContent className="grid gap-4">
              <Button onClick={handleImportPlayers} disabled={isImportingPlayers}>
                {isImportingPlayers ? 'Importing...' : 'Import Players'}
              </Button>
              
              {isImportingPlayers && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Import progress:</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{progress}%</p>
                </div>
              )}
              
              {playersResult && (
                <div>
                  <p>Created: {playersResult.created}</p>
                  <p>Updated: {playersResult.updated}</p>
                  <p>Failed: {playersResult.failed}</p>
                  {Object.keys(playersResult.errors).length > 0 && (
                    <div>
                      <p>Errors:</p>
                      <ul>
                        {Object.entries(playersResult.errors).map(([key, value]) => (
                          <li key={key}>{key}: {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sponsors">
          <Card>
            <CardContent className="grid gap-4">
              <Button onClick={handleImportSponsors} disabled={isImportingSponsors}>
                {isImportingSponsors ? 'Importing...' : 'Import Sponsors'}
              </Button>
              
              {isImportingSponsors && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Import progress:</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{progress}%</p>
                </div>
              )}
              
              {sponsorsResult && (
                <div>
                  <p>Created: {sponsorsResult.created}</p>
                  <p>Updated: {sponsorsResult.updated}</p>
                  <p>Failed: {sponsorsResult.failed}</p>
                  {Object.keys(sponsorsResult.errors).length > 0 && (
                    <div>
                      <p>Errors:</p>
                      <ul>
                        {Object.entries(sponsorsResult.errors).map(([key, value]) => (
                          <li key={key}>{key}: {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SyncAdmin;
