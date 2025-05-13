"use client";

import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsViewerProps {
  result: {
    success: boolean;
    data?: any;
    error?: any;
    status?: number;
    message?: string;
  } | null;
  title?: string;
}

export default function ResultsViewer({ result, title = "Test Result" }: ResultsViewerProps) {
  if (!result) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className={`p-4 rounded border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="mb-2 flex items-center">
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
          )}
          <span className="font-medium">Status:</span> {result.success ? 'Success' : 'Failed'}
          {result.status && <span className="ml-2">({result.status})</span>}
        </div>
        {result.message && (
          <div className="mb-2">
            <span className="font-medium">Message:</span> {result.message}
          </div>
        )}
        <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-auto max-h-96">
          {JSON.stringify(result.data || result.error || {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
