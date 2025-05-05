
import React, { useState, useEffect } from 'react';
import { Stack, Card, Text, Button, Dialog, Box } from '@sanity/ui';
import { FormField } from '@sanity/base';
import { useId } from '@reach/auto-id';

// This component creates a nice interface for the Cloudinary image upload
export const CloudinaryImageInput = React.forwardRef((props, ref) => {
  const { type, value, onChange, onFocus, onBlur } = props;
  const [showDialog, setShowDialog] = useState(false);
  const inputId = useId();
  
  const handleImageSelect = (imageData) => {
    onChange({
      _type: type.name,
      asset: {
        url: imageData.url,
        public_id: imageData.public_id
      },
      alt: imageData.alt || '',
      caption: imageData.caption || ''
    });
    setShowDialog(false);
  };
  
  const handleClear = () => {
    onChange(undefined);
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
      <Stack space={3}>
        {value?.asset?.url ? (
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={3}>
              <div style={{ maxWidth: '100%', position: 'relative' }}>
                <img 
                  src={value.asset.url} 
                  alt={value.alt || ''} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    objectFit: 'contain',
                    borderRadius: '4px'
                  }} 
                />
              </div>
              
              <Stack space={2}>
                {value.alt && (
                  <Text size={1} weight="semibold">
                    Alt: {value.alt}
                  </Text>
                )}
                
                {value.caption && (
                  <Text size={1}>
                    Caption: {value.caption}
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
                  onClick={() => setShowDialog(true)} 
                  style={{ flex: 1 }}
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
          <Button 
            text="Upload image" 
            tone="primary" 
            onClick={() => setShowDialog(true)} 
            icon={UploadIcon} 
          />
        )}
        
        {showDialog && (
          <Dialog 
            id="cloudinary-uploader-dialog"
            header="Upload Image"
            width={1} // makes it full width
            onClose={() => setShowDialog(false)}
          >
            <Box padding={4}>
              <Text>
                Use the Cloudinary uploader to select or upload an image.
                The Cloudinary uploader will appear in a separate window.
              </Text>
              <Button 
                text="Open Media Library" 
                tone="primary" 
                onClick={() => {
                  // This would typically trigger the Cloudinary widget
                  // For demo purposes, we'll just simulate a selection
                  setTimeout(() => {
                    handleImageSelect({
                      url: 'https://res.cloudinary.com/demo/image/upload/sample',
                      public_id: 'sample',
                      alt: 'Sample Image',
                      caption: 'This is a sample image'
                    });
                  }, 1000);
                }} 
              />
            </Box>
          </Dialog>
        )}
      </Stack>
    </FormField>
  );
});

// Simple upload icon component
const UploadIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default CloudinaryImageInput;
