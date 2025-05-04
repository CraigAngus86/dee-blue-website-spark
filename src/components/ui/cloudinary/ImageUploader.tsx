
"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  contentType: string; // e.g., 'playerProfile'
  entityId: string;    // e.g., UUID or document ID
  type?: string;       // e.g., 'profile', 'action'
  onSuccess: (result: UploadResult) => void;
  className?: string;
  allowedTypes?: string[];
  maxSizeMB?: number;
}

interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
}

export default function ImageUploader({
  contentType,
  entityId,
  type = 'default',
  onSuccess,
  className = '',
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB = 5
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`File type not supported. Please use: ${allowedTypes.join(', ')}`);
      toast({
        title: "Invalid file type",
        description: `Please upload one of these formats: ${allowedTypes.map(t => t.replace('image/', '')).join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB`);
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive"
      });
      return;
    }
    
    setError(null);
    setIsUploading(true);
    setProgress(10);
    
    try {
      // Create a preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', contentType);
      formData.append('entityId', entityId);
      formData.append('type', type);
      formData.append('tags', [contentType, type].join(','));
      
      // Metadata
      const metadata = {
        contentType,
        entityId,
        uploadType: type
      };
      formData.append('metadata', JSON.stringify(metadata));
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 200);
      
      // Upload file
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }
      
      const result = await response.json();
      
      setProgress(100);
      setIsUploading(false);
      
      toast({
        title: "Upload successful",
        description: "Image has been uploaded successfully",
      });
      
      onSuccess(result);
    } catch (err) {
      setIsUploading(false);
      setProgress(0);
      
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };
  
  const handleReset = () => {
    setPreview(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      <input
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={isUploading}
      />
      
      {/* Preview area */}
      {preview && (
        <div className="relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          {!isUploading && (
            <button 
              onClick={handleReset}
              className="absolute top-2 right-2 rounded-full bg-white/80 p-1 hover:bg-white"
            >
              <X size={16} />
            </button>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 w-5/6 flex flex-col items-center">
                <p className="text-sm font-medium mb-2">Uploading...</p>
                <Progress value={progress} className="w-full h-2" />
                <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
              </div>
            </div>
          )}
          
          {progress === 100 && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <Check className="text-green-500" size={24} />
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Upload button */}
      {!preview && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-32 border-dashed flex flex-col items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload size={24} />
          <span className="text-sm font-medium">Upload Image</span>
          <span className="text-xs text-gray-500">
            {allowedTypes.map(t => t.replace('image/', '.')).join(', ')} (Max {maxSizeMB}MB)
          </span>
        </Button>
      )}
      
      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {/* Controls when preview is active */}
      {preview && !isUploading && progress !== 100 && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleReset}
          >
            Change
          </Button>
          <Button
            type="button"
            variant="default"
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
