
import React from 'react';
import ResponsiveImage from '@/components/ui/image/ResponsiveImage';
import OptimizedImage from '@/components/ui/image/OptimizedImage';
import { getOptimizedImageUrl, transformImage } from '@/lib/ImageUtils';

/**
 * Comprehensive examples of image components and utilities
 */
const ImageExamples: React.FC = () => {
  // Basic responsive image
  const BasicExample = () => (
    <ResponsiveImage
      src="/assets/images/news/News1.jpg"
      alt="Basic example"
      aspectRatio="16/9"
      className="w-full"
    />
  );

  // Lazy loaded image with blur-up
  const LazyLoadExample = () => (
    <ResponsiveImage
      src="/assets/images/team/Squad1.jpg"
      alt="Lazy loaded example"
      blurhash={true}
      loading="lazy"
    />
  );

  // Image with transformations
  const TransformationExample = () => (
    <OptimizedImage
      src="/assets/images/players/headshot_dummy.jpg"
      alt="Transformed image"
      transforms={{
        grayscale: true,
        blur: 5,
        brightness: 110
      }}
    />
  );

  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Basic Responsive Image</h2>
        <BasicExample />
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {`<ResponsiveImage
  src="/assets/images/news/News1.jpg"
  alt="Basic example"
  aspectRatio="16/9"
  className="w-full"
/>`}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Lazy Loading with Blur-up</h2>
        <LazyLoadExample />
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {`<ResponsiveImage
  src="/assets/images/team/Squad1.jpg"
  alt="Lazy loaded example"
  blurhash={true}
  loading="lazy"
/>`}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Image Transformations</h2>
        <TransformationExample />
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {`<OptimizedImage
  src="/assets/images/players/headshot_dummy.jpg"
  alt="Transformed image"
  transforms={{
    grayscale: true,
    blur: 5,
    brightness: 110
  }}
/>`}
        </pre>
      </section>
    </div>
  );
};

export default ImageExamples;
