
"use client";

import React, { useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { ContentType } from '@/lib/cloudinary/metadata';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SponsorLogoUploaderProps {
  sponsorId: string;
  sponsorName: string;
  onComplete?: (imageData: { publicId: string, secureUrl: string, variant: string }) => void;
  className?: string;
}

const SponsorLogoUploader: React.FC<SponsorLogoUploaderProps> = ({
  sponsorId,
  sponsorName,
  onComplete,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('dark');
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
      contentType: ContentType.SPONSOR,
      entityId: sponsorId,
      type: logoVariant,
      metadata: {
        sponsorName,
        logoVariant,
        altText: `${sponsorName} ${logoVariant} logo`,
      },
      tags: ['sponsor', 'logo', logoVariant]
    });
    
    if (uploadResult && onComplete) {
      onComplete({
        publicId: uploadResult.publicId,
        secureUrl: uploadResult.secureUrl,
        variant: logoVariant
      });
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setLogoVariant(value as 'light' | 'dark');
    reset();
    setSelectedFile(null);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Upload Sponsor Logo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Logo variant selector */}
          <Tabs value={logoVariant} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dark">Dark Background</TabsTrigger>
              <TabsTrigger value="light">Light Background</TabsTrigger>
            </TabsList>
            <TabsContent value="dark">
              <p className="text-sm text-gray-500 mt-2">Logo for display on dark backgrounds</p>
            </TabsContent>
            <TabsContent value="light">
              <p className="text-sm text-gray-500 mt-2">Logo for display on light backgrounds</p>
            </TabsContent>
          </Tabs>
          
          {/* File selection */}
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
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
          
          <div className={`p-4 rounded flex items-center justify-center ${logoVariant === 'dark' ? 'bg-gray-800' : 'bg-gray-100 border border-gray-200'}`}>
            <p className={`text-sm ${logoVariant === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {logoVariant === 'dark' ? 'Dark background preview' : 'Light background preview'}
            </p>
          </div>
          
          {/* Upload button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Logo'}
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
                <p className="text-sm">{logoVariant} logo has been uploaded</p>
              </div>
            </div>
          )}
          
          {/* Image preview */}
          {result && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <div className={`p-6 rounded flex items-center justify-center ${logoVariant === 'dark' ? 'bg-gray-800' : 'bg-gray-100 border border-gray-200'}`}>
                <img 
                  src={result.secureUrl} 
                  alt="Uploaded logo" 
                  className="max-h-32 max-w-full"
                />
              </div>
            </div>
          )}
          
          {/* Reset button after success */}
          {result && (
            <Button variant="outline" onClick={reset} className="mt-2">
              Upload Another Logo Variant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorLogoUploader;
