
"use client";

import React, { useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { ContentType } from '@/lib/cloudinary/metadata';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, isUploading, progress, error, result, reset } = useCloudinaryUpload();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    await uploadFile(selectedFile, {
      contentType: ContentType.OTHER,
      entityId: 'test-upload',
      type: 'test',
      metadata: {
        altText: 'Test upload',
        description: 'Testing Cloudinary upload functionality'
      },
      tags: ['test', 'debug']
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Cloudinary Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
            className="w-full"
          />
        </div>
        
        {selectedFile && (
          <div className="text-sm">
            Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
          </div>
        )}
        
        {isUploading && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-center">{Math.round(progress)}%</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md">
            <p className="font-bold">Error:</p>
            <p>{error.message}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-green-50 text-green-800 p-3 rounded-md">
            <p className="font-bold">Upload successful!</p>
            <p className="text-xs break-all">URL: {result.secureUrl}</p>
            <p className="text-xs break-all">ID: {result.publicId}</p>
            <div className="mt-2">
              <img 
                src={result.secureUrl} 
                alt="Uploaded image" 
                className="max-h-48 max-w-full mx-auto"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
        </Button>
        
        {result && (
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
