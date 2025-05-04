
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploader from '@/components/ui/cloudinary/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UPLOAD_PRESETS } from '@/lib/cloudinary/client';

interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
}

export default function TestUploader() {
  const [entityId, setEntityId] = useState('test-' + Math.random().toString(36).substring(2, 10));
  const [contentType, setContentType] = useState('playerProfile');
  const [uploadType, setUploadType] = useState('profile');
  const [usePreset, setUsePreset] = useState(true);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const { toast } = useToast();
  
  const handleSuccess = (result: UploadResult) => {
    setUploadResult(result);
    toast({
      title: 'Upload Successful',
      description: `Image uploaded with public ID: ${result.publicId}`,
    });
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cloudinary Upload Test</CardTitle>
          <CardDescription>
            Test the image upload functionality to Cloudinary
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entityId">Entity ID</Label>
            <Input 
              id="entityId" 
              value={entityId} 
              onChange={(e) => setEntityId(e.target.value)} 
              placeholder="Enter an entity ID"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type</Label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="playerProfile">Player Profile</option>
              <option value="newsArticle">News Article</option>
              <option value="matchGallery">Match Gallery</option>
              <option value="sponsor">Sponsor</option>
              <option value="stadium">Stadium</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="uploadType">Upload Type</Label>
            <select
              id="uploadType"
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="profile">Profile</option>
              <option value="action">Action</option>
              <option value="featured">Featured</option>
              <option value="gallery">Gallery</option>
              <option value="logo">Logo</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="usePreset"
              checked={usePreset}
              onChange={(e) => setUsePreset(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="usePreset" className="cursor-pointer">Use upload preset</Label>
          </div>
          
          <div className="mt-4">
            <ImageUploader
              contentType={contentType}
              entityId={entityId}
              type={uploadType}
              onSuccess={handleSuccess}
              uploadPreset={usePreset ? 
                contentType === 'playerProfile' ? UPLOAD_PRESETS.PLAYER : 
                contentType === 'newsArticle' ? UPLOAD_PRESETS.NEWS :
                contentType === 'matchGallery' ? UPLOAD_PRESETS.MATCH :
                UPLOAD_PRESETS.DEFAULT : undefined}
            />
          </div>
        </CardContent>
        
        {uploadResult && (
          <CardFooter className="flex-col items-start space-y-2 border-t pt-4">
            <h3 className="font-medium">Upload Result:</h3>
            <div className="bg-gray-50 p-3 rounded-md w-full overflow-auto text-sm">
              <p><strong>Public ID:</strong> {uploadResult.publicId}</p>
              <p><strong>URL:</strong> <a href={uploadResult.secureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{uploadResult.secureUrl}</a></p>
              <p><strong>Size:</strong> {uploadResult.width}x{uploadResult.height}</p>
              <p><strong>Format:</strong> {uploadResult.format}</p>
            </div>
            
            <div className="mt-4">
              <img 
                src={uploadResult.secureUrl} 
                alt="Uploaded image" 
                className="max-w-full h-auto rounded-md border" 
                style={{ maxHeight: '200px' }}
              />
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
