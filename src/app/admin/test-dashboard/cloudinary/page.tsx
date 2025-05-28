import { 
  Upload, 
  Image, 
  Sparkles, 
  BookOpen, 
  Code 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestCard from '../components/TestCard';
import CloudinaryTransformations from '@/components/admin/CloudinaryTransformations';
import CloudinaryContentExamples from '@/components/admin/CloudinaryContentExamples';

export default function CloudinaryTestPage() {
  // Get Cloudinary config from env
  const cloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Cloudinary Tests</h2>
      
      <Tabs defaultValue="guide">
        <TabsList className="mb-4">
          <TabsTrigger value="guide">Guide</TabsTrigger>
          <TabsTrigger value="transformations">Transformations</TabsTrigger>
          <TabsTrigger value="content">Content Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guide">
          <TestCard 
            title="Cloudinary Integration Guide" 
            description="Key information about our Cloudinary setup"
            icon={BookOpen}
          >
            <div className="prose max-w-none">
              <h3>Cloudinary Integration Overview</h3>
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
              
              <h4 className="mt-6">Configuration Status</h4>
              <ul>
                <li>
                  <strong>Cloud Name:</strong> {cloudinaryConfig.cloudName || 'Not configured'}
                </li>
                <li>
                  <strong>API Key:</strong> {cloudinaryConfig.hasApiKey ? 'Present' : 'Missing'}
                </li>
                <li>
                  <strong>API Secret:</strong> {cloudinaryConfig.hasApiSecret ? 'Present' : 'Missing'}
                </li>
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
          </TestCard>
        </TabsContent>
        
        <TabsContent value="transformations">
          <TestCard 
            title="Cloudinary Transformations" 
            description="Explore and test transformation parameters"
            icon={Sparkles}
          >
            <CloudinaryTransformations cloudName={cloudinaryConfig.cloudName} />
          </TestCard>
        </TabsContent>
        
        <TabsContent value="content">
          <TestCard 
            title="Content Components" 
            description="Real-world Cloudinary usage examples"
            icon={Code}
          >
            <CloudinaryContentExamples />
          </TestCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
