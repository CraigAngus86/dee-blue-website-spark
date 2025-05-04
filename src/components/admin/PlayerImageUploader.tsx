
"use client";

import React, { useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { ContentType } from '@/lib/cloudinary/metadata';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlayerImageUploaderProps {
  playerId: string;
  playerName: string;
  onComplete?: (imageData: { publicId: string, secureUrl: string, type: string }) => void;
  className?: string;
}

const PlayerImageUploader: React.FC<PlayerImageUploaderProps> = ({
  playerId,
  playerName,
  onComplete,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<'profile' | 'action'>('profile');
  const { uploadFile, isUploading, progress, error, result, reset } = useCloudinaryUpload();
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    // Create metadata for Cloudinary
    const uploadResult = await uploadFile(selectedFile, {
      contentType: ContentType.PLAYER,
      entityId: playerId,
      type: imageType,
      metadata: {
        playerName,
        altText: `${playerName} - ${imageType} photo`,
      },
      tags: ['player', imageType]
    });
    
    if (uploadResult && onComplete) {
      onComplete({
        publicId: uploadResult.publicId,
        secureUrl: uploadResult.secureUrl,
        type: imageType
      });
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setImageType(value as 'profile' | 'action');
    reset();
    setSelectedFile(null);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Upload Player Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Image type selector */}
          <Tabs value={imageType} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Photo</TabsTrigger>
              <TabsTrigger value="action">Action Shot</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* File selection */}
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              disabled={isUploading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/80
                disabled:opacity-50"
            />
          </div>
          
          {/* Selected file info */}
          {selectedFile && (
            <div className="text-sm text-gray-600">
              Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </div>
          )}
          
          {/* Upload button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
          </Button>
          
          {/* Progress bar */}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-xs text-gray-500 text-center">{Math.round(progress)}%</p>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="p-3 rounded bg-destructive/10 text-destructive flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Upload failed</p>
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          )}
          
          {/* Success message */}
          {result && (
            <div className="p-3 rounded bg-green-50 text-green-800 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Upload successful!</p>
                <p className="text-sm">{imageType === 'profile' ? 'Profile photo' : 'Action shot'} has been uploaded</p>
              </div>
            </div>
          )}
          
          {/* Image preview */}
          {result && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img 
                src={result.secureUrl} 
                alt="Uploaded player image" 
                className="max-h-48 rounded border border-gray-200"
              />
            </div>
          )}
          
          {/* Reset button after success */}
          {result && (
            <Button variant="outline" onClick={reset} className="mt-2">
              Upload Another Image
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerImageUploader;
