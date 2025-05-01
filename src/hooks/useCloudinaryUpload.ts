
"use client";

import { useState } from 'react';
import { CloudinaryMetadata } from '@/lib/cloudinary/metadata';

interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  originalFilename: string;
  format: string;
  width: number;
  height: number;
}

interface UploadError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Custom hook for uploading images to Cloudinary
 * Must be client-side as it uses browser File API and FormData
 */
export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<UploadError | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  /**
   * Upload a file to Cloudinary
   */
  const uploadFile = async (file: File, metadata: CloudinaryMetadata): Promise<UploadResult | null> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', metadata.contentType);
      
      if (metadata.entityId) {
        formData.append('entityId', metadata.entityId);
      }
      
      if (metadata.type) {
        formData.append('type', metadata.type);
      }
      
      if (metadata.tags && metadata.tags.length > 0) {
        formData.append('tags', metadata.tags.join(','));
      }
      
      if (metadata.metadata) {
        formData.append('metadata', JSON.stringify(metadata.metadata));
      }

      // Create a mock progress tracker
      const mockProgressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);

      // In a real implementation, we'd call an actual API endpoint
      // This is a placeholder for future implementation
      console.log('Uploading to Cloudinary:', { file, metadata });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(mockProgressInterval);
      setProgress(100);

      // Mock result
      const mockResult: UploadResult = {
        publicId: `${metadata.contentType}/${metadata.entityId || 'unknown'}`,
        url: URL.createObjectURL(file),
        secureUrl: URL.createObjectURL(file),
        originalFilename: file.name,
        format: file.name.split('.').pop() || 'jpg',
        width: 800,
        height: 600
      };

      setResult(mockResult);
      return mockResult;
    } catch (err) {
      console.error('Error uploading file to Cloudinary:', err);
      const uploadError: UploadError = {
        message: 'Failed to upload image',
        details: err
      };
      setError(uploadError);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Reset the upload state
   */
  const reset = () => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  };

  return { uploadFile, isUploading, progress, error, result, reset };
}
