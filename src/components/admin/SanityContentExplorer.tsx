"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { createClient } from 'next-sanity';

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  tokenAvailable: boolean;
}

export function SanityContentExplorer({ config }: { config: SanityConfig }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  
  // Fetch document types on load
  useEffect(() => {
    async function fetchDocumentTypes() {
      if (!config.projectId) {
        setError("Sanity project ID is missing. Please check your environment configuration.");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Create sanity client
        const client = createClient({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
          useCdn: false,
        });
        
        // Use a simpler query first to test connection
        const testResult = await client.fetch(`*[_type == "playerProfile"][0...1]`);
        
        // If that works, get document types
        const types = await client.fetch(
          `*[defined(_type)] {_type} | order(_type asc) | group by _type | map(g => g._type[0])`
        );
        
        setDocumentTypes(Array.isArray(types) ? types : []);
        
        if (types && Array.isArray(types) && types.length > 0) {
          setSelectedType(types[0]);
        }
      } catch (err) {
        console.error('Error fetching document types:', err);
        setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}. Check your environment variables and network connection.`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocumentTypes();
  }, [config.projectId, config.dataset, config.apiVersion]);
  
  // Fetch documents when type changes
  useEffect(() => {
    if (!selectedType) return;
    
    async function fetchDocuments() {
      setLoading(true);
      setError(null);
      
      try {
        const client = createClient({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
          useCdn: false,
        });
        
        // Fetch the first 10 documents of the selected type
        const result = await client.fetch(
          `*[_type == $type][0...10] {
            _id,
            _type,
            _createdAt,
            _updatedAt,
            title,
            name,
            "slug": slug.current,
            "hasRefs": count(*[references(^._id)]) > 0,
            "refCount": count(*[references(^._id)])
          }`,
          { type: selectedType }
        );
        
        setDocuments(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Could not fetch documents. Check the console for more details.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocuments();
  }, [selectedType, config.projectId, config.dataset, config.apiVersion]);
  
  // Manual retry function
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    
    // The useEffect will trigger again
    setTimeout(() => {
      if (selectedType) {
        // If we have a selected type, refetch documents
        const client = createClient({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
          useCdn: false,
        });
        
        client.fetch(
          `*[_type == $type][0...10] {
            _id,
            _type,
            _createdAt,
            _updatedAt,
            title,
            name,
            "slug": slug.current,
            "hasRefs": count(*[references(^._id)]) > 0,
            "refCount": count(*[references(^._id)])
          }`,
          { type: selectedType }
        ).then(result => {
          setDocuments(Array.isArray(result) ? result : []);
          setLoading(false);
        }).catch(err => {
          console.error('Error retrying fetch:', err);
          setError('Retry failed. Check your connection and try again.');
          setLoading(false);
        });
      } else {
        // Otherwise retry getting document types
        const client = createClient({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
          useCdn: false,
        });
        
        client.fetch(
          `*[defined(_type)] {_type} | order(_type asc) | group by _type | map(g => g._type[0])`
        ).then(types => {
          setDocumentTypes(Array.isArray(types) ? types : []);
          if (types && Array.isArray(types) && types.length > 0) {
            setSelectedType(types[0]);
          }
          setLoading(false);
        }).catch(err => {
          console.error('Error retrying fetch:', err);
          setError('Retry failed. Check your connection and try again.');
          setLoading(false);
        });
      }
    }, 500);
  };
  
  // Handle document type change
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };
  
  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription className="flex-1">{error}</AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetry}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              "Retry"
            )}
          </Button>
        </Alert>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Document Type:</label>
        <Select
          value={selectedType}
          onValueChange={handleTypeChange}
          disabled={loading || documentTypes.length === 0}
        >
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Select a document type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">
            {documentTypes.length} document types found
          </p>
          
          {!loading && documentTypes.length === 0 && !error && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
            >
              Refresh
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : documents.length > 0 ? (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">ID</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Title/Name</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Slug</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Updated</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Referenced By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(doc => (
                <tr key={doc._id} className="hover:bg-gray-50 text-xs">
                  <td className="px-3 py-2 whitespace-nowrap">{doc._id}</td>
                  <td className="px-3 py-2">{doc.title || doc.name || "-"}</td>
                  <td className="px-3 py-2">{doc.slug || "-"}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {doc._updatedAt ? new Date(doc._updatedAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-3 py-2">
                    {doc.hasRefs ? (
                      <span className="text-primary font-medium">{doc.refCount} references</span>
                    ) : (
                      <span className="text-gray-400">No references</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && selectedType ? (
        <div className="text-center py-8 text-gray-500">
          No {selectedType} documents found
        </div>
      ) : null}
      
      <div className="bg-gray-50 p-4 rounded mt-6">
        <h4 className="font-medium mb-2">Document Type Information</h4>
        {selectedType ? (
          <div className="text-sm">
            <p>
              <span className="font-medium">Selected Type:</span> {selectedType}
            </p>
            <p className="mt-1">
              <span className="font-medium">Documents Found:</span> {documents.length}
            </p>
            <div className="mt-3 text-gray-600">
              <p>To view more details or edit content, use the Sanity Studio:</p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.open(`https://${config.projectId}.sanity.studio/desk/${selectedType}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Sanity Studio
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a document type to see information</p>
        )}
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
        <h4 className="font-medium text-blue-800 mb-2">Troubleshooting Connection Issues</h4>
        <ul className="list-disc ml-8 text-sm text-blue-700 space-y-1">
          <li>Verify your environment variables are set correctly</li>
          <li>Ensure you have the correct project ID and dataset name</li>
          <li>Check if your API token has the necessary read permissions</li>
          <li>Try opening the <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="underline">Sanity project dashboard</a> to confirm your project access</li>
        </ul>
      </div>
    </div>
  );
}
