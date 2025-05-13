"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Database, Key, TableProperties } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function SupabaseTestPanel() {
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [tablesList, setTablesList] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  
  // Test basic connection
  const testConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('teams').select('count');
      
      if (error) throw error;
      
      setConnectionStatus({
        success: true,
        message: 'Successfully connected to Supabase',
        details: {
          timestamp: new Date().toISOString(),
          data
        }
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
  
  // List all tables
  const fetchTables = async () => {
    setTableLoading(true);
    try {
      // Get table list from Postgres metadata
      const { data, error } = await supabase
        .rpc('get_tables')
        .select('*');
      
      if (error) throw error;
      
      // Extract table names
      const tables = Array.isArray(data) 
        ? data.map(table => table.table_name) 
        : [];
      
      setTablesList(tables);
      
      if (tables.length > 0) {
        setSelectedTable(tables[0]);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      setTablesList([]);
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
    } finally {
      setTableLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Supabase Integration Tests</h2>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connection Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button 
                onClick={testConnection}
                disabled={loading}
                className="mr-3"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Connection...</>
                ) : (
                  <><Database className="mr-2 h-4 w-4" /> Test Supabase Connection</>
                )}
              </Button>
              
              <Button 
                onClick={fetchTables}
                disabled={tableLoading}
                variant="outline"
              >
                {tableLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Tables...</>
                ) : (
                  <><TableProperties className="mr-2 h-4 w-4" /> List Database Tables</>
                )}
              </Button>
            </div>
            
            {connectionStatus && (
              <div className={`p-4 rounded border ${connectionStatus.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="mb-2">
                  <span className="font-medium">Status:</span> {connectionStatus.success ? 'Connected' : 'Failed'}
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-medium">Message:</span> {connectionStatus.message}
                </div>
                <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-auto max-h-40">
                  {JSON.stringify(connectionStatus.details || connectionStatus.error || {}, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
        
        {tablesList.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Table Explorer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Table:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tablesList.map(table => (
                    <Button
                      key={table}
                      size="sm"
                      variant={selectedTable === table ? "default" : "outline"}
                      onClick={() => fetchTableData(table)}
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
              ) : selectedTable && tableData.length > 0 ? (
                <div className="rounded border overflow-auto max-h-64">
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
                            <td key={j} className="px-3 py-2 text-xs text-gray-500">
                              {typeof value === 'object'
                                ? JSON.stringify(value).substring(0, 50)
                                : String(value).substring(0, 50)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : selectedTable ? (
                <div className="text-center p-4 text-gray-500">
                  No data found in table
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
