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

    // Define transformations for different sizes with adjusted gravity
    // The key change is using g_auto:face:center,y_-30 to position the face lower in the frame
    const transformations = {
      // Card view: Move face down by setting y offset to -30 (negative moves down)
      card: 'c_fill,g_auto:face,y_30,ar_1:1,w_500,h_500,q_auto:good,f_auto',
      // Modal view: Same approach for larger images
      modal: 'c_fill,g_auto:face,y_30,ar_3:4,w_800,h_1067,q_auto:good,f_auto',
      // Large view: Different aspect ratio for banners
      large: 'c_fill,g_face:center,ar_16:9,w_1200,h_675,q_auto:good,f_auto'
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
