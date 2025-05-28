"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image, 
  Sparkles, 
  BookOpen, 
  Code, 
  Copy, 
  Check,
  FileCode
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CloudinaryTestPanel() {
  const [copied, setCopied] = useState<string | null>(null);
  
  // Copy transformation string to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cloudinary Tests</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="transformations">Transformations</TabsTrigger>
          <TabsTrigger value="content">Content Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <div className="prose max-w-none">
            <h3>Cloudinary Integration Guide</h3>
            <p>
              Cloudinary manages all media assets for the Banks o' Dee FC website. Our implementation uses 
              the Sanity CMS Cloudinary plugin rather than direct uploads, which simplifies media management.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
              <h4 className="text-amber-800 mt-0 mb-2">Key Implementation Learnings</h4>
              <ul className="mt-0 text-amber-700">
                <li>
                  <strong>Data Structure Preservation:</strong> Always preserve the full Cloudinary object 
                  structure from Sanity queries (don't flatten to just URL)
                </li>
                <li>
                  <strong>Direct Property Access:</strong> Sanity's Cloudinary plugin provides image data with 
                  direct <code>public_id</code>, <code>url</code>, and <code>secure_url</code> properties
                </li>
                <li>
                  <strong>Server-Side Transformations:</strong> Implement transformation logic in server 
                  components where possible for better performance
                </li>
                <li>
                  <strong>Content-Specific Components:</strong> Create specialized image components for 
                  different content types (PlayerImage, NewsImage, etc.)
                </li>
              </ul>
            </div>
            
            <h4>Integration Architecture</h4>
            <p>
              Our Cloudinary integration uses this approach:
            </p>
            <ol>
              <li>Content editors upload images through Sanity Studio using the Cloudinary plugin</li>
              <li>The Cloudinary plugin stores image metadata in Sanity documents</li>
              <li>Our application fetches Sanity content including Cloudinary image data</li>
              <li>Specialized components apply appropriate transformations per content type</li>
              <li>Cloudinary CDN delivers optimized images with the requested transformations</li>
            </ol>
            
            <h4>Common Issues & Solutions</h4>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h5 className="font-medium mt-0">Flattened Image Data</h5>
                <p className="text-sm mt-1 mb-0">
                  <strong>Problem:</strong> Sanity query flattens Cloudinary data to just a URL<br/>
                  <strong>Solution:</strong> Modify queries to preserve full image object structure:
                </p>
                <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`// Incorrect: flattened to URL
*[_type == "newsArticle"]{
  "mainImage": mainImage.asset->url
}

// Correct: preserves full structure
*[_type == "newsArticle"]{
  mainImage
}`}
                </pre>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h5 className="font-medium mt-0">Missing Faces in Player Images</h5>
                <p className="text-sm mt-1 mb-0">
                  <strong>Problem:</strong> Player faces not consistently centered in images<br/>
                  <strong>Solution:</strong> Add vertical offset to face detection:
                </p>
                <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`// Before: basic face detection
g_auto:face,c_fill,ar_3:4

// After: with vertical offset
g_auto:face,y_30,c_fill,ar_3:4`}
                </pre>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h5 className="font-medium mt-0">Image Loading Errors</h5>
                <p className="text-sm mt-1 mb-0">
                  <strong>Problem:</strong> Images sometimes fail to load<br/>
                  <strong>Solution:</strong> Implement proper fallbacks and error handling:
                </p>
                <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`// Example error handling in a component
<img 
  src={imageUrl} 
  alt={alt || 'Image'} 
  onError={(e) => {
    e.currentTarget.src = '/fallback.jpg';
    console.error('Image failed to load:', imageUrl);
  }}
/>`}
                </pre>
              </div>
            </div>
            
            <h4 className="mt-6">Configuration Requirements</h4>
            <ul>
              <li><code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> - Public cloud name</li>
              <li><code>CLOUDINARY_API_KEY</code> - For secure server-side operations</li>
              <li><code>CLOUDINARY_API_SECRET</code> - For secure server-side operations</li>
            </ul>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
              <h5 className="font-medium text-blue-800 mt-0 mb-2">Best Practices</h5>
              <ul className="text-sm text-blue-700 mt-0 mb-0">
                <li>Always include <code>f_auto,q_auto</code> for optimal format and quality</li>
                <li>Use consistent aspect ratios for each content type</li>
                <li>Create dedicated image components for different content types</li>
                <li>Implement error handling and fallbacks for all image components</li>
                <li>Use the Cloudinary dev tools to experiment with transformations</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transformations">
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
                        src="https://res.cloudinary.com/demo/image/upload/c_fill,g_face,y_30,ar_3:4/face_center.jpg" 
                        alt="Player transformation" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center">Player Profile</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="aspect-video rounded overflow-hidden border bg-white">
                      <img 
                        src="https://res.cloudinary.com/demo/image/upload/c_fill,g_auto:subject,ar_16:9/sample.jpg" 
                        alt="News transformation" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center">News Card</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="aspect-[21/9] rounded overflow-hidden border bg-white">
                      <img 
                        src="https://res.cloudinary.com/demo/image/upload/c_fill,ar_21:9/sample.jpg" 
                        alt="Hero transformation" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center">Hero Section</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="aspect-video rounded overflow-hidden border bg-white">
                      <img 
                        src="https://res.cloudinary.com/demo/image/upload/c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9/sports_soccer.jpg" 
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
                      src="https://res.cloudinary.com/demo/image/upload/c_fill,ar_16:9,g_auto/l_text:Arial_24_bold:Breaking%20News,co_white,g_south_east,x_5,y_5/sample.jpg" 
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
                      src="https://res.cloudinary.com/demo/image/upload/c_fill,ar_16:9,g_auto/l_gradient:horizontal:00105A:transparent,o_60/sample.jpg" 
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
                      src="https://res.cloudinary.com/demo/image/upload/c_fill,g_face,ar_1:1,r_max/face_center.jpg" 
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
        </TabsContent>
        
        <TabsContent value="content">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
