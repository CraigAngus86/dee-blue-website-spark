
import React, { useState, useCallback, useRef } from 'react';
import { Stack, Card, Text, Button, Box, Flex, Badge } from '@sanity/ui';
import { FormField } from 'sanity';
import { useId } from 'react'; // Use React's built-in useId hook
import { CheckCircle, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

// Function to determine API endpoint based on environment
const getUploadEndpoint = () => {
  // If we're in a development environment, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api/cloudinary/upload';
  }
  
  // If we have a SANITY_STUDIO_API_URL, use that
  if (process.env.SANITY_STUDIO_API_URL) {
    return `${process.env.SANITY_STUDIO_API_URL}/api/cloudinary/upload`;
  }
  
  // Default fallback - assumes same domain
  return '/api/cloudinary/upload';
};

// This component creates a nice interface for the Cloudinary image upload
export const CloudinaryImageInput = React.forwardRef((props, ref) => {
  const { type, value, onChange, onFocus, onBlur } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const inputId = useId(); // React's built-in useId hook
  const fileInputRef = React.useRef(null);
  
  // Get options from schema type if available
  const preset = type?.options?.preset || 'player-upload';
  const folderPath = type?.options?.folderPath || 'banksofdeefc/uploads';
  const entityId = props.document?._id?.replace('drafts.', '') || 'unknown';
  const contentType = props.document?._type || 'playerProfile';
  
  const reset = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };
  
  const handleUpload = useCallback(async () => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(10);
      
      // Create the payload for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', contentType);
      formData.append('entityId', entityId);
      formData.append('type', 'profile');
      
      // Add upload preset if specified
      if (preset) {
        formData.append('uploadPreset', preset);
      }
      
      // Add folder path with entity ID for better organization
      const targetFolder = `${folderPath}/person-${entityId}`;
      formData.append('folder', targetFolder);
      
      // Progress simulation (real progress isn't available from fetch API)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
      }, 200);
      
      // Use the appropriate endpoint
      const uploadEndpoint = getUploadEndpoint();
      console.log('Using upload endpoint:', uploadEndpoint);
      console.log('Upload configuration:', { contentType, entityId, preset, folder: targetFolder });
      
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'x-sanity-studio': 'true'
        }
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }
      
      const result = await response.json();
      setUploadProgress(100);
      
      // Update the Sanity field with the result
      onChange({
        _type: type.name,
        asset: {
          url: result.secureUrl,
          public_id: result.publicId
        },
        alt: file.name.split('.')[0] || 'Player image'
      });
      
      // Reset the file input after successful upload
      setTimeout(() => {
        reset();
      }, 1500);
      
    } catch (err) {
      console.error('Error uploading to Cloudinary:', err);
      setError(err.message || 'Failed to upload image');
      setIsUploading(false);
    }
  }, [file, onChange, type.name, contentType, entityId, preset, folderPath]);
  
  const handleClear = () => {
    onChange(undefined);
    reset();
  };
  
  return (
    <FormField
      title={type.title}
      description={type.description}
      __unstable_markers={props.__unstable_markers}
      __unstable_presence={props.__unstable_presence}
      __unstable_changeIndicator={props.__unstable_changeIndicator}
      inputId={inputId}
    >
      <Stack space={4}>
        {value?.asset?.url ? (
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={3}>
              <div style={{ maxWidth: '100%', position: 'relative' }}>
                <img 
                  src={value.asset.url} 
                  alt={value.alt || ''} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px', 
                    objectFit: 'contain',
                    borderRadius: '4px'
                  }} 
                />
              </div>
              
              <Stack space={2}>
                {value.alt && (
                  <Text size={1} weight="semibold">
                    Alt text: {value.alt}
                  </Text>
                )}
                
                <Text size={0} muted>
                  Cloudinary ID: {value.asset.public_id}
                </Text>
              </Stack>
              
              <Stack direction="row" space={2}>
                <Button 
                  text="Replace" 
                  tone="primary" 
                  onClick={() => onChange(undefined)} 
                  style={{ flex: 1 }}
                  icon={Upload}
                />
                <Button 
                  text="Remove" 
                  tone="critical" 
                  onClick={handleClear} 
                />
              </Stack>
            </Stack>
          </Card>
        ) : (
          <Stack space={3}>
            <input
              ref={fileInputRef}
              type="file"
              id={inputId}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              disabled={isUploading}
            />
            
            {file ? (
              <Card padding={3} radius={2} border>
                <Stack space={3}>
                  <Flex align="center" gap={2}>
                    <ImageIcon size={18} />
                    <Text weight="semibold">{file.name}</Text>
                    <Badge tone="primary" size={1}>
                      {Math.round(file.size / 1024)} KB
                    </Badge>
                  </Flex>
                  
                  {isUploading && (
                    <Box>
                      <div 
                        style={{ 
                          height: '8px', 
                          width: '100%', 
                          backgroundColor: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <div 
                          style={{
                            height: '100%',
                            width: `${uploadProgress}%`,
                            backgroundColor: uploadProgress === 100 ? '#4CAF50' : '#2276FC',
                            transition: 'width 0.2s ease'
                          }}
                        />
                      </div>
                      <Flex justify="flex-end" marginTop={2}>
                        <Text size={0} muted>{Math.round(uploadProgress)}%</Text>
                      </Flex>
                    </Box>
                  )}
                  
                  {error && (
                    <Card tone="critical" padding={3} radius={2}>
                      <Flex align="center" gap={2}>
                        <AlertCircle size={18} />
                        <Text size={1}>{error}</Text>
                      </Flex>
                    </Card>
                  )}
                  
                  <Flex gap={2}>
                    {!isUploading && (
                      <>
                        <Button 
                          text="Upload to Cloudinary" 
                          tone="primary" 
                          icon={Upload}
                          onClick={handleUpload} 
                          disabled={isUploading}
                          style={{ flex: 1 }}
                        />
                        <Button
                          text="Cancel"
                          tone="default"
                          onClick={reset}
                          disabled={isUploading}
                        />
                      </>
                    )}
                    
                    {isUploading && uploadProgress === 100 && (
                      <Flex align="center" gap={2} style={{ color: '#4CAF50' }}>
                        <CheckCircle size={18} />
                        <Text>Upload complete!</Text>
                      </Flex>
                    )}
                  </Flex>
                </Stack>
              </Card>
            ) : (
              <Flex direction="column" gap={3}>
                <Button 
                  text="Select image file" 
                  tone="primary" 
                  icon={Upload}
                  onClick={() => fileInputRef.current?.click()} 
                  style={{ width: '100%' }}
                />
                <Text size={1} muted align="center">
                  Upload images directly to Cloudinary
                </Text>
              </Flex>
            )}
          </Stack>
        )}
      </Stack>
    </FormField>
  );
});

export default CloudinaryImageInput;
