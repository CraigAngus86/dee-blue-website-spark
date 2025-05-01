
import React, { useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { ContentType } from '@/lib/cloudinary/metadata';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PlayerImage from '@/components/ui/image/PlayerImage';

interface PlayerImageUploaderProps {
  playerId: string;
  playerName: string;
  onComplete?: (imageUrl: string) => void;
  className?: string;
}

const PlayerImageUploader: React.FC<PlayerImageUploaderProps> = ({
  playerId,
  playerName,
  onComplete,
  className
}) => {
  const [imageType, setImageType] = useState<'profile' | 'action'>('profile');
  const { uploadFile, isUploading, progress, error, result, reset } = useCloudinaryUpload();
  
  // Handle file selection and upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|jpg|webp)$/)) {
      alert('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Maximum size is 5MB');
      return;
    }
    
    // Upload the file
    const uploadResult = await uploadFile(file, {
      contentType: ContentType.PLAYER,
      entityId: playerId,
      type: imageType,
      metadata: {
        playerName,
        altText: `${playerName} - ${imageType} photo`
      },
      tags: ['player', imageType]
    });
    
    if (uploadResult && onComplete) {
      onComplete(uploadResult.publicId);
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Upload Player Image</h3>
      
      {/* Image type selection */}
      <div className="flex gap-4">
        <Button
          variant={imageType === 'profile' ? "default" : "outline"}
          onClick={() => setImageType('profile')}
          disabled={isUploading}
        >
          Profile Image
        </Button>
        <Button
          variant={imageType === 'action' ? "default" : "outline"}
          onClick={() => setImageType('action')}
          disabled={isUploading}
        >
          Action Shot
        </Button>
      </div>
      
      {/* File input */}
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={isUploading}
          className="max-w-xs"
        />
      </div>
      
      {/* Upload progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <p className="text-sm text-gray-500 mt-1">Uploading: {progress}%</p>
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="text-red-500 text-sm">
          Error: {error.message}
          <Button variant="link" onClick={reset} className="ml-2 p-0 h-auto">
            Try Again
          </Button>
        </div>
      )}
      
      {/* Success preview */}
      {result && (
        <div className="space-y-2">
          <p className="text-green-500">Upload complete!</p>
          <div className="w-32">
            <PlayerImage 
              playerId={playerId} 
              name={playerName}
              type={imageType === 'profile' ? 'headshot' : 'action'} 
              size="md"
            />
          </div>
          <Button variant="outline" onClick={reset} size="sm">
            Upload Another
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlayerImageUploader;
