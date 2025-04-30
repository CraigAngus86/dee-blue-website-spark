
import { useState, useCallback } from 'react';
import { CloudinaryService, CloudinaryUploadResult } from '@/lib/cloudinary/service';
import { ContentType } from '@/lib/cloudinary/metadata';

interface UploadOptions {
  contentType: ContentType;
  entityId: string;
  type?: 'profile' | 'action' | 'featured' | 'logo' | 'content';
  index?: number;
  metadata?: Record<string, any>;
  tags?: string[];
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: Error | null;
  result: CloudinaryUploadResult | null;
}

/**
 * Custom hook for uploading files to Cloudinary
 * @returns Upload controls and state
 */
export function useCloudinaryUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    result: null,
  });

  /**
   * Upload a file to Cloudinary
   * @param file File to upload
   * @param options Upload options
   */
  const uploadFile = useCallback(
    async (file: File, options: UploadOptions): Promise<CloudinaryUploadResult | null> => {
      if (!file) {
        setState(prev => ({
          ...prev,
          error: new Error('No file provided'),
        }));
        return null;
      }
      
      try {
        setState({
          isUploading: true,
          progress: 0,
          error: null,
          result: null,
        });
        
        // Simulate progress updates (in a real implementation this would come from the upload API)
        const progressInterval = setInterval(() => {
          setState(prev => ({
            ...prev,
            progress: Math.min(prev.progress + 10, 90), // Cap at 90% until complete
          }));
        }, 300);
        
        // Upload the file
        const result = await CloudinaryService.uploadMedia(
          file,
          options.contentType,
          options.entityId,
          {
            type: options.type,
            index: options.index,
            metadata: options.metadata,
            tags: options.tags,
          }
        );
        
        clearInterval(progressInterval);
        
        setState({
          isUploading: false,
          progress: 100,
          error: null,
          result,
        });
        
        return result;
      } catch (error) {
        clearInterval(progressInterval);
        
        setState({
          isUploading: false,
          progress: 0,
          error: error instanceof Error ? error : new Error('Unknown upload error'),
          result: null,
        });
        
        return null;
      }
    },
    []
  );
  
  /**
   * Reset the upload state
   */
  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      result: null,
    });
  }, []);
  
  return {
    uploadFile,
    reset,
    ...state,
  };
}
