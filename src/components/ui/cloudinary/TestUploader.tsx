
"use client";

import { useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { CloudinaryMetadata, ContentType } from '@/lib/cloudinary/metadata';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { publicEnv } from '@/lib/env';

const TestUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, isUploading, progress, error, result, reset } = useCloudinaryUpload();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    // Example metadata for test upload
    const metadata: CloudinaryMetadata = {
      contentType: ContentType.PLAYER,
      entityId: 'test-' + Date.now(),  // Demo ID
      tags: ['test', 'demo'],
      metadata: {
        testUpload: true,
        timestamp: Date.now()
      }
    };
    
    await uploadFile(file, metadata);
  };
  
  const handleReset = () => {
    setFile(null);
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Cloudinary Test Upload</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Configuration:</p>
        <div className="text-xs bg-gray-50 p-2 rounded border">
          <p>Cloud name: {publicEnv.getCloudinaryCloudName()}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose an image to upload
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      
      {file && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Selected file:</p>
          <p className="text-sm text-gray-500">{file.name} ({Math.round(file.size / 1024)} KB)</p>
        </div>
      )}
      
      {isUploading && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Upload progress:</p>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="font-medium">Upload failed</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}
      
      {result && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Upload successful:</p>
          <div className="p-3 bg-green-50 rounded-md border border-green-200">
            <div className="mb-2">
              <img
                src={result.secureUrl}
                alt="Uploaded image"
                className="w-full h-auto rounded-md"
              />
            </div>
            <p className="text-xs font-medium">Public ID:</p>
            <p className="text-xs text-gray-600 mb-1 break-all">{result.publicId}</p>
            <p className="text-xs font-medium">URL:</p>
            <p className="text-xs text-gray-600 break-all">{result.secureUrl}</p>
          </div>
        </div>
      )}
      
      <div className="flex gap-3">
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
        </Button>
        
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-shrink-0"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TestUploader;
