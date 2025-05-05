
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function TestUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', 'test');
      formData.append('entityId', 'test-upload');
      formData.append('type', 'test');

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
      setUploadedImage(result.secureUrl);
      
      toast({
        title: "Upload successful",
        description: "Image has been uploaded to Cloudinary",
      });
    } catch (err) {
      console.error('Upload error:', err);
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
      }, 500);
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setUploadedImage(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cloudinary Upload Test</CardTitle>
          <CardDescription>
            Test direct uploads to Cloudinary via our API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File selection */}
          {!uploadedImage && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                {file && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>{file.name}</span>
                    <Badge variant="outline">{Math.round(file.size / 1024)} KB</Badge>
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4 animate-pulse" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload to Cloudinary
                  </span>
                )}
              </Button>
              
              {isUploading && (
                <div className="space-y-1">
                  <Progress value={progress} />
                  <p className="text-xs text-right text-muted-foreground">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Upload result */}
          {uploadedImage && (
            <div className="space-y-4">
              <div className="rounded-md border overflow-hidden">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded image" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="flex items-center justify-center p-2 rounded-md bg-green-50 text-green-700">
                <Check className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Upload successful</span>
              </div>
              
              <Button variant="outline" onClick={reset} className="w-full">
                Upload Another Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
