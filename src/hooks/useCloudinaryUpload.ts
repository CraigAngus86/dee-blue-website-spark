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
 * Custom hook for uploading images to Cloudinary via our secure API route
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
      
      if (metadata.contentType) {
        formData.append('contentType', metadata.contentType);
      }
      
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
      
      // Progress simulation - we don't have real progress from fetch
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      // Make request to our API route
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }
      
      const data = await response.json();
      setProgress(100);
      
      // Set result
      setResult(data);
      return data;
    } catch (err) {
      console.error('Error uploading file to Cloudinary:', err);
      const uploadError: UploadError = {
        message: err instanceof Error ? err.message : 'Failed to upload image',
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