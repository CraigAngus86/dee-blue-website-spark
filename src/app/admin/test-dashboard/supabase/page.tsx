"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  TableProperties, 
  Loader2, 
  BookOpen, 
  Code, 
  ShieldCheck,
  BarChart4,
  Radio,
  AlertCircle,
  Info
} from 'lucide-react';
import TestCard from '../components/TestCard';
import ResultsViewer from '../components/ResultsViewer';
import { supabase } from '@/lib/supabase/client';

export default function SupabaseTestPage() {
  // Connection & Tables tab state
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [tablesList, setTablesList] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableSchema, setTableSchema] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  
  // Query Workbench tab state
  const [query, setQuery] = useState<string>("SELECT * FROM match LIMIT 10;");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  
  // Data Integrity tab state
  const [integrityResult, setIntegrityResult] = useState<any>(null);
  const [integrityLoading, setIntegrityLoading] = useState(false);
  
  // Real-time tab state
  const [channel, setChannel] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [realtimeMessages, setRealtimeMessages] = useState<string[]>([]);
  const [listenTable, setListenTable] = useState<string>("match");
  
  // Test basic connection
  const testConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('teams').select('count');
      
      if (error) throw error;
      
      setConnectionStatus({
        success: true,
        message: 'Successfully connected to Supabase',
        data
      });
    } catch (error) {
      console.error('Supabase connection error:', error);
      setConnectionStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to connect to Supabase',
        error
      });
    } finally {
      setLoading(false);
    }
  };
  
  // List available tables
  const fetchTables = async () => {
    setTableLoading(true);
    try {
      // First try to get tables from metadata schema
      let tablesList: string[] = [];
      
      try {
        // Try using RPC function if available
        const { data, error } = await supabase.rpc('get_tables');
        
        if (!error && Array.isArray(data)) {
          tablesList = data.map(table => table.table_name);
        }
      } catch (error) {
        console.log('RPC method not available, trying fallback');
      }
      
      // If no tables yet, try a fallback approach - query some known tables
      if (tablesList.length === 0) {
        // Try to fetch from some common tables
        for (const table of ['teams', 'people', 'match', 'sponsors', 'league_table', 'competitions', 'seasons']) {
          try {
            const { data, error } = await supabase
              .from(table)
              .select('count')
              .limit(1);
              
            if (!error) {
              tablesList.push(table);
            }
          } catch {}
        }
      }
      
      setTablesList(tablesList);
      
      if (tablesList.length > 0) {
        setSelectedTable(tablesList[0]);
        await fetchTableData(tablesList[0]);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setTableLoading(false);
    }
  };
  
  // Fetch data from selected table
  const fetchTableData = async (tableName: string) => {
    if (!tableName) return;
    
    setTableLoading(true);
    setSelectedTable(tableName);
    
    try {
      // Fetch table schema
      const { data: schema, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', tableName)
        .order('ordinal_position');
        
      if (schemaError) throw schemaError;
      setTableSchema(schema || []);
      
      // Fetch a sample of rows from the selected table
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(10);
      
      if (error) throw error;
      
      setTableData(data || []);
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      setTableData([]);
      setTableSchema([]);
    } finally {
      setTableLoading(false);
    }
  };
  
  // Execute custom SQL query
  const executeQuery = async () => {
    setQueryLoading(true);
    setQueryError(null);
    setExecutionTime(null);
    
    try {
      const startTime = performance.now();
      
      // Execute the query
      const { data, error } = await supabase.rpc('execute_sql', {
        query_text: query
      });
      
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);
      
      if (error) throw error;
      
      setQueryResult({
        success: true,
        data: data || [],
        rowCount: Array.isArray(data) ? data.length : 0
      });
    } catch (error) {
      console.error('Query execution error:', error);
      setQueryError(error instanceof Error ? error.message : 'An error occurred during query execution');
      setQueryResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setQueryLoading(false);
    }
  };
  
  // Sample query templates
  const queryTemplates = {
    matches: "SELECT m.id, home_team.name AS home_team, away_team.name AS away_team, m.home_score, m.away_score, c.name AS competition\nFROM match m\nJOIN teams home_team ON m.home_team_id = home_team.id\nJOIN teams away_team ON m.away_team_id = away_team.id\nJOIN competitions c ON m.competition_id = c.id\nORDER BY m.date DESC\nLIMIT 10;",
    teamStats: "SELECT t.name, COUNT(m.*) AS total_matches,\n  SUM(CASE WHEN (m.home_team_id = t.id AND m.home_score > m.away_score) OR\n             (m.away_team_id = t.id AND m.away_score > m.home_score) THEN 1 ELSE 0 END) AS wins\nFROM teams t\nLEFT JOIN match m ON t.id = m.home_team_id OR t.id = m.away_team_id\nGROUP BY t.id, t.name\nORDER BY wins DESC;",
    leagueTable: "SELECT * FROM league_table\nORDER BY points DESC, goal_difference DESC\nLIMIT 10;",
    foreignKeys: "SELECT\n  tc.constraint_name,\n  tc.table_name,\n  kcu.column_name,\n  ccu.table_name AS foreign_table_name,\n  ccu.column_name AS foreign_column_name\nFROM information_schema.table_constraints AS tc\nJOIN information_schema.key_column_usage AS kcu\n  ON tc.constraint_name = kcu.constraint_name\nJOIN information_schema.constraint_column_usage AS ccu\n  ON ccu.constraint_name = tc.constraint_name\nWHERE tc.constraint_type = 'FOREIGN KEY';"
  };
  
  // Apply a query template
  const applyTemplate = (template: keyof typeof queryTemplates) => {
    setQuery(queryTemplates[template]);
  };
  
  // Test data integrity
  const testDataIntegrity = async () => {
    setIntegrityLoading(true);
    
    try {
      const tests = [
        // Test for match records with invalid team references
        {
          name: 'Match → Team References',
          query: `
            SELECT COUNT(*) AS invalid_count
            FROM match m
            LEFT JOIN teams home ON m.home_team_id = home.id
            LEFT JOIN teams away ON m.away_team_id = away.id
            WHERE home.id IS NULL OR away.id IS NULL
          `
        },
        // Test for match records with invalid competition references
        {
          name: 'Match → Competition References',
          query: `
            SELECT COUNT(*) AS invalid_count
            FROM match m
            LEFT JOIN competitions c ON m.competition_id = c.id
            WHERE c.id IS NULL AND m.competition_id IS NOT NULL
          `
        },
        // Test for league_table records with invalid team references
        {
          name: 'League Table → Team References',
          query: `
            SELECT COUNT(*) AS invalid_count
            FROM league_table lt
            LEFT JOIN teams t ON lt.team_id = t.id
            WHERE t.id IS NULL
          `
        }
      ];
      
      const results = [];
      
      for (const test of tests) {
        const { data, error } = await supabase.rpc('execute_sql', {
          query_text: test.query
        });
        
        if (error) throw error;
        
        const invalidCount = data?.[0]?.invalid_count || 0;
        
        results.push({
          name: test.name,
          passed: invalidCount === 0,
          invalidCount,
          message: invalidCount === 0 ? 
            'All references valid' : 
            `Found ${invalidCount} invalid references`
        });
      }
      
      setIntegrityResult({
        success: results.every(r => r.passed),
        tests: results
      });
      
    } catch (error) {
      console.error('Integrity test error:', error);
      setIntegrityResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIntegrityLoading(false);
    }
  };
  
  // Subscribe to table changes
  const subscribeToChanges = () => {
    if (isSubscribed) {
      // Unsubscribe from current channel
      if (channel) {
        channel.unsubscribe();
      }
      setIsSubscribed(false);
      setRealtimeMessages([]);
      setChannel(null);
      return;
    }
    
    // Create a new subscription
    const newChannel = supabase
      .channel('table-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: listenTable
        },
        (payload) => {
          const message = `${new Date().toLocaleTimeString()}: ${payload.eventType} on ${listenTable} - ID: ${(payload.new as any)?.id || (payload.old as any)?.id}`;
          setRealtimeMessages(prev => [message, ...prev].slice(0, 10));
        }
      )
      .subscribe();
    
    setChannel(newChannel);
    setIsSubscribed(true);
    setRealtimeMessages([`${new Date().toLocaleTimeString()}: Started listening to ${listenTable} table`]);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Supabase Database Tests</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="connection">Connection & Tables</TabsTrigger>
          <TabsTrigger value="query">Query Workbench</TabsTrigger>
          <TabsTrigger value="integrity">Data Integrity</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <TestCard 
            title="Supabase Database Guide" 
            description="Understanding the operational database structure"
            icon={BookOpen}
          >
            <div className="prose max-w-none">
              <h3>Database Architecture</h3>
              <p>
                Supabase serves as the operational database for Banks o' Dee FC, storing structured data 
                that requires relational integrity and real-time capabilities.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
                <h4 className="text-amber-800 mt-0 mb-2">Key Database Tables</h4>
                <ul className="mt-0 text-amber-700">
                  <li>
                    <strong>teams</strong>: Football teams with names, logos, etc.
                  </li>
                  <li>
                    <strong>competitions</strong>: Different tournaments and leagues
                  </li>
                  <li>
                    <strong>seasons</strong>: Football seasons with dates
                  </li>
                  <li>
                    <strong>match</strong>: Central match/fixture data
                  </li>
                  <li>
                    <strong>league_table</strong>: League standings
                  </li>
                  <li>
                    <strong>sponsors</strong>: Commercial partners
                  </li>
                  <li>
                    <strong>commercial_packages</strong>: Commercial offerings
                  </li>
                  <li>
                    <strong>polls/poll_options/poll_votes</strong>: Fan engagement
                  </li>
                </ul>
              </div>
              
              <h4>Database Entity Relationships</h4>
              <p>
                The database follows these key relationships:
              </p>
              <ul>
                <li><strong>Match</strong> → Teams (home and away)</li>
                <li><strong>Match</strong> → Competition</li>
                <li><strong>Match</strong> → Season</li>
                <li><strong>League Table</strong> → Team</li>
                <li><strong>League Table</strong> → Competition</li>
                <li><strong>League Table</strong> → Season</li>
                <li><strong>Poll Votes</strong> → Poll Options</li>
                <li><strong>Poll Options</strong> → Polls</li>
              </ul>
              
              <div className="p-4 bg-gray-50 rounded-md mt-6">
                <h4 className="font-medium mt-0 mb-2">Match Data Structure</h4>
                <p className="text-sm text-gray-600 mb-4">
                  The central match table contains these key fields:
                </p>
                <pre className="text-xs bg-gray-100 p-3 rounded">
{`// Match table structure
{
  id: uuid,                  // Unique identifier
  date: timestamp,           // Match date and time
  home_team_id: uuid,        // Reference to home team
  away_team_id: uuid,        // Reference to away team
  home_score: integer,       // Home team score (null if not played)
  away_score: integer,       // Away team score (null if not played)
  competition_id: uuid,      // Reference to competition
  season_id: uuid,           // Reference to season
  venue: text,               // Match venue
  status: text,              // scheduled, in_progress, completed, cancelled
  attendance: integer,       // Match attendance (if available)
  created_at: timestamp,     // Record creation timestamp
  updated_at: timestamp      // Record update timestamp
}`}
                </pre>
              </div>
              
              <h4 className="mt-6">Testing Capabilities</h4>
              <p>
                This test dashboard provides several tools to verify and debug the Supabase database:
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Database className="h-4 w-4 mr-2 text-primary" />
                    Connection & Tables
                  </h5>
                  <p className="text-sm mt-1">
                    Test connectivity to the Supabase database and explore table structure and data.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Code className="h-4 w-4 mr-2 text-primary" />
                    Query Workbench
                  </h5>
                  <p className="text-sm mt-1">
                    Execute custom SQL queries and view results with performance metrics.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                    Data Integrity
                  </h5>
                  <p className="text-sm mt-1">
                    Test referential integrity between tables and verify data consistency.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <Radio className="h-4 w-4 mr-2 text-primary" />
                    Real-time Testing
                  </h5>
                  <p className="text-sm mt-1">
                    Test Supabase's real-time subscription functionality for table changes.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="font-medium flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                    Security Testing
                  </h5>
                  <p className="text-sm mt-1">
                    Verify Row Level Security (RLS) policies and access permissions.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                <h5 className="font-medium text-blue-800">Configuration Information</h5>
                <p className="text-sm text-blue-700 mt-2">
                  The Supabase connection requires these environment variables:
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li><code>NEXT_PUBLIC_SUPABASE_URL</code> - Your Supabase project URL</li>
                  <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> - Anonymous API key</li>
                  <li><code>SUPABASE_SERVICE_ROLE_KEY</code> - Service role key (for admin operations)</li>
                </ul>
              </div>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="connection">
          <TestCard 
            title="Connection Test" 
            description="Verify the connection to Supabase database"
            icon={Database}
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <Button 
                onClick={testConnection}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...</>
                ) : (
                  <><Database className="mr-2 h-4 w-4" /> Test Connection</>
                )}
              </Button>
              
              <Button 
                onClick={fetchTables}
                disabled={tableLoading}
                variant="outline"
              >
                {tableLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                ) : (
                  <><TableProperties className="mr-2 h-4 w-4" /> List Tables</>
                )}
              </Button>
            </div>
            
            <ResultsViewer result={connectionStatus} />
          </TestCard>
          
          {tablesList.length > 0 && (
            <TestCard 
              title="Table Explorer" 
              description="Browse database tables and preview data"
              icon={TableProperties}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Table:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tablesList.map(table => (
                    <Button
                      key={table}
                      size="sm"
                      variant={selectedTable === table ? "default" : "outline"}
                      onClick={() => fetchTableData(table)}
                      disabled={tableLoading}
                    >
                      {table}
                    </Button>
                  ))}
                </div>
              </div>
              
              {tableLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  {tableSchema.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Table Schema</h3>
                      <div className="overflow-x-auto rounded border">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nullable</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tableSchema.map((column, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-3 py-2 text-xs text-gray-500">{column.column_name}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{column.data_type}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{column.is_nullable === 'YES' ? 'Yes' : 'No'}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{column.column_default || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {tableData.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Table Data</h3>
                      <div className="overflow-x-auto rounded border">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {Object.keys(tableData[0]).map(column => (
                                <th
                                  key={column}
                                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {column}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tableData.map((row, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                {Object.values(row).map((value: any, j) => (
                                  <td key={j} className="px-3 py-2 text-xs text-gray-500 max-w-xs truncate">
                                    {typeof value === 'object'
                                      ? JSON.stringify(value).substring(0, 50)
                                      : String(value || '-').substring(0, 50)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Showing {tableData.length} rows. Limit: 10 rows.
                      </p>
                    </div>
                  ) : selectedTable ? (
                    <div className="text-center p-4 text-gray-500">
                      No data found in table
                    </div>
                  ) : null}
                </div>
              )}
            </TestCard>
          )}
        </TabsContent>
        
        <TabsContent value="query">
          <TestCard 
            title="SQL Query Workbench" 
            description="Execute and test custom SQL queries against the database"
            icon={Code}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">SQL Query:</label>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => applyTemplate('matches')}
                    >
                      Matches
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => applyTemplate('teamStats')}
                    >
                      Team Stats
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => applyTemplate('leagueTable')}
                    >
                      League Table
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => applyTemplate('foreignKeys')}
                    >
                      Foreign Keys
                    </Button>
                  </div>
                </div>
                
                {/* Replace Textarea component with regular textarea */}
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full font-mono text-sm p-3 border rounded-md min-h-[120px]"
                  rows={5}
                />
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Note:</span> Queries are executed via RPC function with admin permissions.
                  </div>
                  <Button
                    onClick={executeQuery}
                    disabled={queryLoading || !query.trim()}
                  >
                    {queryLoading ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Executing...</>
                    ) : (
                      <><Code className="h-4 w-4 mr-2" /> Execute Query</>
                    )}
                  </Button>
                </div>
              </div>
              
              {queryError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    {queryError}
                  </AlertDescription>
                </Alert>
              )}
              
              {executionTime !== null && (
                <div className="text-xs text-gray-500">
                  Query executed in {executionTime.toFixed(2)}ms
                </div>
              )}
              
              {queryResult?.success && Array.isArray(queryResult.data) && queryResult.data.length > 0 && (
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(queryResult.data[0]).map(column => (
                          <th
                            key={column}
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {queryResult.data.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {Object.values(row).map((value: any, j: number) => (
                            <td key={j} className="px-3 py-2 text-xs text-gray-500 max-w-xs truncate">
                              {typeof value === 'object'
                                ? JSON.stringify(value).substring(0, 50)
                                : String(value || '-').substring(0, 50)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {queryResult?.success && Array.isArray(queryResult.data) && queryResult.data.length === 0 && (
                <div className="p-4 text-center text-gray-500 border rounded">
                  Query executed successfully, but returned no results
                </div>
              )}
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="integrity">
          <TestCard 
            title="Data Integrity Tests" 
            description="Verify referential integrity and data relationships"
            icon={BarChart4}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-3">Relational Integrity Checks</h3>
                <p className="text-sm text-gray-600 mb-4">
                  These tests verify referential integrity between key tables in the database.
                </p>
                
                <Button
                  onClick={testDataIntegrity}
                  disabled={integrityLoading}
                >
                  {integrityLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running Tests...</>
                  ) : (
                    <><BarChart4 className="h-4 w-4 mr-2" /> Run Integrity Tests</>
                  )}
                </Button>
              </div>
              
              {integrityResult && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Test Results</h3>
                  
                  {integrityResult.error ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>
                        {integrityResult.error}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-3">
                      {integrityResult.tests.map((test: any, i: number) => (
                        <div 
                          key={i} 
                          className={`p-4 rounded-md border ${test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                        >
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${test.passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <h4 className="font-medium">{test.name}</h4>
                          </div>
                          <p className="text-sm mt-1 ml-5">
                            {test.message}
                          </p>
                        </div>
                      ))}
                      
                      <div className="p-4 border rounded-md bg-gray-50">
                        <h4 className="font-medium mb-2">Overall Status</h4>
                        <div className={`p-3 rounded-md ${integrityResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
                          {integrityResult.success ? (
                            <p className="text-green-800 font-medium">All integrity tests passed successfully</p>
                          ) : (
                            <p className="text-red-800 font-medium">Some integrity tests failed - data inconsistencies detected</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="realtime">
          <TestCard 
            title="Real-time Subscription Testing" 
            description="Test Supabase's real-time functionality for table changes"
            icon={Radio}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-3">Real-time Table Listener</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This tool allows you to subscribe to real-time changes in Supabase tables.
                  Make changes in Supabase to see events appear in real-time.
                </p>
                
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Table to Monitor:</label>
                    <Input 
                      value={listenTable} 
                      onChange={(e) => setListenTable(e.target.value)} 
                      placeholder="Enter table name"
                      disabled={isSubscribed}
                    />
                  </div>
                  <Button
                    onClick={subscribeToChanges}
                    variant={isSubscribed ? "destructive" : "default"}
                  >
                    {isSubscribed ? (
                      <>Unsubscribe</>
                    ) : (
                      <><Radio className="h-4 w-4 mr-2" /> Subscribe</>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-medium">Real-time Events</h3>
                </div>
                <div className="p-4">
                  {realtimeMessages.length > 0 ? (
                    <div className="space-y-2">
                      {realtimeMessages.map((message, i) => (
                        <div key={i} className="text-sm p-2 border-b last:border-b-0">
                          {message}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {isSubscribed ? (
                        <p>Waiting for events... Make changes in Supabase to see them here.</p>
                      ) : (
                        <p>Click Subscribe to start monitoring table events</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <Alert>
                <Info className="h-4 w-4 mr-2" />
                <AlertDescription>
                  <span className="font-medium">Testing Tips:</span> To test real-time functionality, open Supabase in another window and make changes to the table you're monitoring.
                </AlertDescription>
              </Alert>
            </div>
          </TestCard>
        </TabsContent>
        
        <TabsContent value="security">
          <TestCard 
            title="Row Level Security (RLS) Testing" 
            description="Verify security policies and access permissions"
            icon={ShieldCheck}
          >
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-3">RLS Policy Information</h3>
                <p className="text-sm text-blue-700 mb-4">
                  This section will be implemented to test Row Level Security (RLS) policies in Supabase.
                </p>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li><strong>Current Status:</strong> Coming soon in a future update</li>
                  <li><strong>Planned Features:</strong> Policy visualization, role-based testing, and access verification</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="text-lg font-medium mb-3">Manual RLS Verification Steps</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Until automated testing is implemented, use these steps to verify RLS policies:
                </p>
                
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="p-3 bg-gray-50 rounded">
                    <span className="font-medium">1. Open Supabase Dashboard</span><br/>
                    Navigate to the Supabase project dashboard and select the Authentication section.
                  </li>
                  <li className="p-3 bg-gray-50 rounded">
                    <span className="font-medium">2. Create Test Users</span><br/>
                    Create test users with different roles (admin, editor, viewer, etc.).
                  </li>
                  <li className="p-3 bg-gray-50 rounded">
                    <span className="font-medium">3. Verify Table Policies</span><br/>
                    In the Table Editor, check each table's RLS policies to ensure they match expectations.
                  </li>
                  <li className="p-3 bg-gray-50 rounded">
                    <span className="font-medium">4. Test With Different Tokens</span><br/>
                    Use the SQL Editor with different user JWT tokens to test access permissions.
                  </li>
                </ol>
              </div>
            </div>
          </TestCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
