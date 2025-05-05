
import React, { useCallback, useState } from 'react';
import { Button, Card, Text, Stack, Spinner, Box } from '@sanity/ui';
import { FormField, set, unset } from 'sanity';
import { useId } from 'react';

/**
 * CloudinaryImageInput component for Sanity Studio
 * Provides direct image upload to Cloudinary with preview
 */
const CloudinaryImageInput = React.forwardRef((props, ref) => {
  const { 
    type,         // Schema type
    value,        // Current field value
    readOnly,     // If field is not editable
    placeholder,  // Placeholder text
    markers,      // Field markers (errors, validation)
    presence,     // Presence information (users looking at this field)
    compareValue, // Value to check for dirty state
    onFocus,      // Called when field receives focus
    onBlur,       // Called when field loses focus
    onChange,     // Method to call when field should be updated
  } = props;
  
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Get options from schema - handle defaults if not provided
  const uploadPreset = type.options?.preset || 'player-upload';
  const folderPath = type.options?.folderPath || 'banksofdeefc/people';
  
  // Get document information for context
  const documentId = props.document?._id?.replace('drafts.', '') || 'unknown';
  const documentType = props.document?._type || 'unknown';
  const fieldName = type.name;
  
  // Handle file selection and upload
  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      setIsUploading(true);
      setUploadError(null);
      setPreviewUrl(null);
      
      try {
        // Create form data for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('contentType', documentType);
        formData.append('entityId', documentId);
        formData.append('type', fieldName);
        formData.append('uploadPreset', uploadPreset);
        formData.append('tags', [documentType, fieldName].join(','));
        
        // Add metadata
        const metadata = {
          sanityDocId: documentId,
          sanityDocType: documentType,
          sanityFieldName: fieldName,
        };
        formData.append('metadata', JSON.stringify(metadata));
        
        // Use the same API route that the test page uses
        const response = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `Upload failed with status: ${response.status}`);
        }
        
        // Parse the result
        const result = await response.json();
        console.log('Cloudinary upload successful:', result);
        
        // Create temporary preview
        setPreviewUrl(result.secureUrl);
        
        // Update the Sanity value
        const cloudinaryValue = {
          asset: {
            url: result.secureUrl,
            public_id: result.publicId,
          },
          alt: file.name || 'Image',
        };
        
        // Trigger change in the Sanity form - updated for Sanity v3
        onChange(set(cloudinaryValue));
        
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        setUploadError(error.message || 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, documentId, documentType, fieldName, uploadPreset]
  );
  
  // Handle remove button click
  const handleRemove = useCallback(() => {
    // Updated for Sanity v3
    onChange(unset());
    setPreviewUrl(null);
  }, [onChange]);
  
  // Get the preview URL (from stored value or temporary preview)
  const imageUrl = (value?.asset?.url || previewUrl);
  
  return (
    <FormField
      title={type.title}
      description={type.description}
      __unstable_markers={markers}
      __unstable_presence={presence}
      compareValue={compareValue}
      id={inputId}
    >
      <Stack space={3}>
        {/* Preview current image if available */}
        {imageUrl && (
          <Card padding={3} border radius={2}>
            <Box style={{ position: 'relative' }}>
              <img 
                src={imageUrl} 
                alt={value?.alt || 'Preview'} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px', 
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              {!readOnly && (
                <Button 
                  mode="ghost" 
                  tone="critical" 
                  onClick={handleRemove}
                  style={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8
                  }}
                >
                  Remove
                </Button>
              )}
            </Box>
            {value?.alt && (
              <Text size={1} style={{ marginTop: '8px' }}>
                Alt: {value.alt}
              </Text>
            )}
          </Card>
        )}
        
        {/* Upload UI */}
        {!readOnly && (
          <Stack space={2}>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '12px',
                borderRadius: '4px',
                width: '100%'
              }}
            />
            
            {isUploading && (
              <Card padding={3} radius={2} tone="primary">
                <Stack space={3} style={{ alignItems: 'center' }}>
                  <Spinner />
                  <Text>Uploading to Cloudinary...</Text>
                </Stack>
              </Card>
            )}
            
            {uploadError && (
              <Card padding={3} radius={2} tone="critical">
                <Text size={1}>{uploadError}</Text>
              </Card>
            )}
          </Stack>
        )}
        
        {/* Help text */}
        <Text size={1} style={{ color: '#666' }}>
          Images are processed via Cloudinary for optimization and delivery
        </Text>
      </Stack>
    </FormField>
  );
});

export default CloudinaryImageInput;
