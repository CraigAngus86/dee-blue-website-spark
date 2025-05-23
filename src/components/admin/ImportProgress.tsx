
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, HelpCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ImportStats {
  total: number;
  processed: number;
  created: number;
  updated: number;
  failed: number;
  errors?: Record<string, string>;
}

interface ImportProgressProps {
  stats: ImportStats;
  isImporting: boolean;
  showDetails?: boolean;
}

export const ImportProgress: React.FC<ImportProgressProps> = ({ 
  stats, 
  isImporting,
  showDetails = false
}) => {
  const { total, processed, created, updated, failed, errors = {} } = stats;
  const percentComplete = total > 0 ? Math.round((processed / total) * 100) : 0;
  const [showErrors, setShowErrors] = useState(true);
  
  const totalErrors = Object.keys(errors).length;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Processing {processed} of {total}</span>
        <span>{percentComplete}%</span>
      </div>
      
      <Progress value={percentComplete} className="h-2" />
      
      <div className="flex justify-between text-sm mt-4">
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Created: {created}
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          Updated: {updated}
        </span>
        <span className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Failed: {failed}
        </span>
      </div>
      
      {isImporting && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing records...</span>
        </div>
      )}
      
      {showDetails && failed > 0 && totalErrors > 0 && (
        <div className="mt-4 border rounded-md overflow-hidden">
          <div 
            className="bg-muted p-2 flex justify-between items-center cursor-pointer"
            onClick={() => setShowErrors(!showErrors)}
          >
            <h4 className="text-sm font-semibold">
              Error Details ({totalErrors})
            </h4>
            <Button variant="ghost" size="sm">
              {showErrors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
          
          {showErrors && (
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-1 px-2 text-left">Record</th>
                    <th className="py-1 px-2 text-left">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(errors).map(([key, message]) => (
                    <tr key={key} className="border-t">
                      <td className="py-1 px-2 font-mono">{key}</td>
                      <td className="py-1 px-2 text-red-500">{message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
