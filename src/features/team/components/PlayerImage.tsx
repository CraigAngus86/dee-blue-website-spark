import React from 'react';

interface PlayerImageProps {
  image: any;
  name: string;
  size?: 'card' | 'modal' | 'large';
  className?: string;
}

export const PlayerImage: React.FC<PlayerImageProps> = ({ 
  image, 
  name, 
  size = 'card',
  className = ''
}) => {
  // Fallback component
  const renderFallback = () => (
    <div className={`flex items-center justify-center bg-[#00105A] ${className}`}>
      <svg 
        className="w-1/2 h-1/2 text-[#001C8C]" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );

  // If no image data
  if (!image) {
    return renderFallback();
  }

  try {
    let imageUrl = '';
    
    // Based on console logs, image has direct public_id and secure_url properties
    if (image.secure_url) {
      // Use secure URL as base and modify with transformations
      const baseUrl = image.secure_url.split('/upload/')[0] + '/upload/';
      const fileName = image.secure_url.split('/').pop().split('.')[0];
      
      // Transformations for head & shoulders framing
      const transformations = {
        card: 'c_fill,g_faces,ar_3:4,w_500,h_500,q_auto:good,f_auto',
        modal: 'c_fill,g_faces,ar_3:4,w_800,h_800,q_auto:good,f_auto',
        large: 'c_fill,g_faces,ar_3:4,w_1000,h_1000,q_auto:good,f_auto'
      };
      
      imageUrl = `${baseUrl}${transformations[size]}/${image.public_id}.${image.format || 'jpg'}`;
    } 
    // Fallback to URL if secure_url not available
    else if (image.url) {
      // Same approach with URL
      const baseUrl = image.url.split('/upload/')[0] + '/upload/';
      const fileName = image.url.split('/').pop().split('.')[0];
      
      const transformations = {
        card: 'c_fill,g_faces,ar_3:4,w_500,h_500,q_auto:good,f_auto',
        modal: 'c_fill,g_faces,ar_3:4,w_800,h_800,q_auto:good,f_auto',
        large: 'c_fill,g_faces,ar_3:4,w_1000,h_1000,q_auto:good,f_auto'
      };
      
      imageUrl = `${baseUrl}${transformations[size]}/${image.public_id}.${image.format || 'jpg'}`;
    }
    // Fallback to just public_id if neither url is available
    else if (image.public_id) {
      const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
      
      const transformations = {
        card: 'c_fill,g_faces,ar_3:4,w_500,h_500,q_auto:good,f_auto',
        modal: 'c_fill,g_faces,ar_3:4,w_800,h_800,q_auto:good,f_auto',
        large: 'c_fill,g_faces,ar_3:4,w_1000,h_1000,q_auto:good,f_auto'
      };
      
      imageUrl = `${baseUrl}/${transformations[size]}/${image.public_id}.${image.format || 'jpg'}`;
    }
    else {
      // Can't determine URL
      return renderFallback();
    }

    return (
      <img 
        src={imageUrl}
        alt={name}
        className={`object-cover w-full h-full ${className}`}
        onError={(e) => {
          console.error(`Failed to load image for ${name} from ${imageUrl}`);
          // Set fallback in case of error
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAxMDVBIi8+PHBhdGggZD0iTTUwIDI1QzQzLjEgMjUgMzcuNSAzMC42IDM3LjUgMzcuNVMzOC4xIDUwIDUwIDUwICA2MS45IDUwIDYyLjUgMzcuNSA1Ni45IDI1IDUwIDI1ek0yNSA4Ny41QzI1IDY4LjggMzAuOCA2Mi41IDUwIDYyLjVDNjkuMiA2Mi41IDc1IDY4LjggNzUgODcuNUgyNVoiIGZpbGw9IiMwMDFDOEMiLz48L3N2Zz4=';
        }}
      />
    );
  } catch (error) {
    console.error(`Error processing image for ${name}:`, error);
    return renderFallback();
  }
};

export default PlayerImage;
