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
    // Extract public_id directly from the image object
    const publicId = image.public_id;
    const format = image.format || 'jpg';
    
    // If public_id is missing, use fallback
    if (!publicId) {
      console.error('Missing public_id for image:', name);
      return renderFallback();
    }

    // Define transformations for different sizes with enhanced parameters
    const transformations = {
      // Card view: Enhanced with auto-responsive sizing, shadow effect and image improvement
      card: 'c_fill,g_auto:face,y_30,ar_1:1,w_auto,dpr_auto,q_auto:good,f_auto,e_improve,e_shadow',
      
      // Modal view: Enhanced with progressive loading and image improvement
      modal: 'c_fill,g_auto:face,y_30,ar_3:4,w_auto,dpr_auto,q_auto:good,f_auto,fl_progressive,e_improve',
      
      // Large view: Enhanced with progressive loading and auto improvement for banners
      large: 'c_fill,g_face:center,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,fl_progressive,e_improve'
    };

    // Construct the Cloudinary URL
    const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
    const imageUrl = `${baseUrl}/${transformations[size]}/${publicId}.${format}`;

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
