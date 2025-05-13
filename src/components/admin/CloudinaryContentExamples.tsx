"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileCode } from 'lucide-react';

export default function CloudinaryContentExamples() {
  return (
    <div className="space-y-6">
      <Alert className="mb-6">
        <FileCode className="h-4 w-4 mr-2" />
        <AlertDescription>
          This page demonstrates real-world Cloudinary implementations from the Banks o' Dee FC website.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-md overflow-hidden border">
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-medium">PlayerImage Component</h3>
            <p className="text-sm text-gray-600 mt-1">
              Specialized component for player profile images with face detection.
            </p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="aspect-[3/4] rounded overflow-hidden border">
                <img 
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,g_face,y_30,ar_3:4/face_center.jpg" 
                  alt="Player card" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded overflow-hidden border">
                <img 
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,g_face,ar_1:1/face_center.jpg" 
                  alt="Player thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-full overflow-hidden border">
                <img 
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,g_face,ar_1:1,r_max/face_center.jpg" 
                  alt="Player avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Implementation Highlights:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Face detection with vertical offset</li>
                <li>• Default fallback silhouette for missing images</li>
                <li>• Error handling for failed loads</li>
                <li>• Multiple size variants (card, thumbnail, avatar)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="rounded-md overflow-hidden border">
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-medium">NewsImage Component</h3>
            <p className="text-sm text-gray-600 mt-1">
              Specialized component for news article images with text overlay.
            </p>
          </div>
          <div className="p-4">
            <div className="space-y-3 mb-4">
              <div className="aspect-video rounded overflow-hidden border">
                <img 
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,g_auto:subject,ar_16:9/sample.jpg" 
                  alt="News card" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[21/9] rounded overflow-hidden border relative">
                <img 
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,ar_21:9,g_auto/l_gradient:horizontal:00105A:transparent,o_60/sample.jpg" 
                  alt="News hero" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 text-white font-bold">
                  <div className="text-xs">Club News</div>
                  <div className="text-sm">Latest Match Report</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Implementation Highlights:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Subject-based focus for better composition</li>
                <li>• Gradient overlay for text readability</li>
                <li>• Different aspect ratios for different contexts</li>
                <li>• Automatic format and quality optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mt-6">
        <h3 className="font-medium mb-3">Image Component Code Patterns</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="text-sm font-medium">Player Image Pattern</h4>
            <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`export function PlayerImage({ image, size = 'md', alt, ...props }) {
  // Early return with fallback if no image
  if (!image || !image.public_id) {
    return <DefaultPlayerSilhouette size={size} {...props} />;
  }
  
  // Different size configurations
  const sizes = {
    sm: { width: 100, height: 133 },  // 3:4 aspect
    md: { width: 240, height: 320 },  // 3:4 aspect
    lg: { width: 360, height: 480 },  // 3:4 aspect
  };
  
  const { width, height } = sizes[size] || sizes.md;
  
  // Build Cloudinary URL with player-specific transformations
  const transformations = [
    // Face detection with vertical positioning adjustment
    'g_auto:face,y_30',
    // Set aspect ratio to 3:4 (portrait)
    \`c_fill,w_\${width},h_\${height}\`,
    // Additional quality and formatting options
    'q_auto,f_auto'
  ].join(',');
  
  const imageUrl = \`https://res.cloudinary.com/\${env.cloudinary.cloudName}/image/upload/\${transformations}/\${image.public_id}\`;
  
  return (
    <img 
      src={imageUrl} 
      alt={alt || 'Player photo'} 
      className={\`player-image player-image-\${size}\`}
      width={width}
      height={height}
      onError={handleImageError}
      {...props}
    />
  );
}`}
            </pre>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <h4 className="text-sm font-medium">Hero Image Pattern with Gradient</h4>
            <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`export function HeroImage({ image, alt, ...props }) {
  // Early return with fallback if no image
  if (!image || !image.public_id) {
    return <DefaultHeroBackground {...props} />;
  }
  
  // Build Cloudinary URL with hero-specific transformations
  const transformations = [
    // Cinematic aspect ratio
    'c_fill,ar_21:9',
    // Navy blue gradient overlay for text readability
    'l_gradient:horizontal:00105A:transparent,o_60',
    // Quality and format optimization
    'q_auto,f_auto'
  ].join(',');
  
  const imageUrl = \`https://res.cloudinary.com/\${env.cloudinary.cloudName}/image/upload/\${transformations}/\${image.public_id}\`;
  
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt={alt || 'Hero image'} 
        className="w-full h-auto object-cover"
        onError={handleImageError}
        {...props}
      />
      {props.children && (
        <div className="absolute bottom-0 left-0 p-6">
          {props.children}
        </div>
      )}
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
