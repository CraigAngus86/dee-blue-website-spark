"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CloudinaryTransformationsProps {
  cloudName: string;
}

export default function CloudinaryTransformations({ cloudName }: CloudinaryTransformationsProps) {
  const [copied, setCopied] = useState<string | null>(null);
  
  // Copy transformation string to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  // Use demo cloud name if our cloud name is not configured
  const effectiveCloudName = cloudName || 'demo';
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-3">Transformation Parameters</h3>
          <p className="text-sm text-gray-600 mb-4">
            Below are the key transformation parameters used throughout the Banks o' Dee FC site.
            Click any transformation string to copy it to clipboard.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded border">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Player Images</h4>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard('g_auto:face,y_30,c_fill,ar_3:4,q_auto,f_auto', 'player')}
                >
                  {copied === 'player' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs block mt-1 text-gray-600">g_auto:face,y_30,c_fill,ar_3:4,q_auto,f_auto</code>
              <p className="text-xs mt-2 text-gray-500">Face detection with vertical offset, 3:4 aspect ratio</p>
            </div>
            
            <div className="p-3 bg-white rounded border">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">News Images</h4>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard('g_auto:subject,c_fill,ar_16:9,q_auto,f_auto', 'news')}
                >
                  {copied === 'news' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs block mt-1 text-gray-600">g_auto:subject,c_fill,ar_16:9,q_auto,f_auto</code>
              <p className="text-xs mt-2 text-gray-500">Subject detection, 16:9 aspect ratio</p>
            </div>
            
            <div className="p-3 bg-white rounded border">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Hero Images</h4>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard('c_fill,ar_21:9,q_auto,f_auto', 'hero')}
                >
                  {copied === 'hero' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs block mt-1 text-gray-600">c_fill,ar_21:9,q_auto,f_auto</code>
              <p className="text-xs mt-2 text-gray-500">Cinematic widescreen ratio for hero sections</p>
            </div>
            
            <div className="p-3 bg-white rounded border">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Match Action Shots</h4>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard('g_auto:faces,y_-20,z_1.05,c_fill,ar_16:9,q_auto,f_auto', 'match')}
                >
                  {copied === 'match' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs block mt-1 text-gray-600">g_auto:faces,y_-20,z_1.05,c_fill,ar_16:9,q_auto,f_auto</code>
              <p className="text-xs mt-2 text-gray-500">Multiple face detection with upward shift and slight zoom</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-3">Transformation Preview</h3>
          <p className="text-sm text-gray-600 mb-4">
            Examples of how our standard transformations affect image display.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="aspect-[3/4] rounded overflow-hidden border bg-white">
                <img 
                  src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,g_face,y_30,ar_3:4/face_center.jpg`}
                  alt="Player transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center">Player Profile</p>
            </div>
            
            <div className="space-y-2">
              <div className="aspect-video rounded overflow-hidden border bg-white">
                <img 
                  src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,g_auto:subject,ar_16:9/sample.jpg`}
                  alt="News transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center">News Card</p>
            </div>
            
            <div className="space-y-2">
              <div className="aspect-[21/9] rounded overflow-hidden border bg-white">
                <img 
                  src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,ar_21:9/sample.jpg`}
                  alt="Hero transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center">Hero Section</p>
            </div>
            
            <div className="space-y-2">
              <div className="aspect-video rounded overflow-hidden border bg-white">
                <img 
                  src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9/sports_soccer.jpg`}
                  alt="Match action transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center">Match Action</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-3">Special Transformations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-sm mb-2">Overlay Text on Image</h4>
            <div className="aspect-video rounded overflow-hidden border mb-2">
              <img 
                src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,ar_16:9,g_auto/l_text:Arial_24_bold:Breaking%20News,co_white,g_south_east,x_5,y_5/sample.jpg`}
                alt="Text overlay" 
                className="w-full h-full object-cover"
              />
            </div>
            <code className="text-xs block text-gray-600">
              .../l_text:Arial_24_bold:Breaking%20News,co_white,g_south_east,x_5,y_5/...
            </code>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-sm mb-2">Navy Blue Gradient Overlay</h4>
            <div className="aspect-video rounded overflow-hidden border mb-2">
              <img 
                src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,ar_16:9,g_auto/l_gradient:horizontal:00105A:transparent,o_60/sample.jpg`}
                alt="Gradient overlay" 
                className="w-full h-full object-cover"
              />
            </div>
            <code className="text-xs block text-gray-600">
              .../l_gradient:horizontal:00105A:transparent,o_60/...
            </code>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-sm mb-2">Player Image Circular Crop</h4>
            <div className="aspect-square rounded-full overflow-hidden border mb-2 mx-auto w-32">
              <img 
                src={`https://res.cloudinary.com/${effectiveCloudName}/image/upload/c_fill,g_face,ar_1:1,r_max/face_center.jpg`}
                alt="Circular crop" 
                className="w-full h-full object-cover"
              />
            </div>
            <code className="text-xs block text-gray-600">
              .../c_fill,g_face,ar_1:1,r_max/...
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
