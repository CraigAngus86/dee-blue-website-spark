
/**
 * This file contains examples of using the image utilities
 * It's for documentation purposes and not used in the application
 */
import React from "react";
import { 
  getOptimizedImageUrl, 
  generateResponsiveSrcSet, 
  transformImage,
  getBlurredThumbnailUrl,
  getPixelRatioImageUrl
} from "@/lib/ImageUtils";
import { setupCloudinaryService } from "@/lib/services/CloudinaryImageService";

/**
 * Example 1: Basic image optimization
 */
const BasicImageOptimizationExample = () => {
  const imageSrc = "/assets/images/news/News1.jpg";
  const optimizedSrc = getOptimizedImageUrl(imageSrc, {
    width: 800,
    height: 600,
    quality: 80,
    format: 'webp'
  });
  
  return <img src={optimizedSrc} alt="Example of basic optimized image" />;
};

/**
 * Example 2: Responsive images with srcSet
 */
const ResponsiveImageExample = () => {
  const imageSrc = "/assets/images/stadium/Spain Park.jpg";
  const srcSet = generateResponsiveSrcSet(imageSrc, [400, 800, 1200, 1600]);
  
  return (
    <img 
      src={getOptimizedImageUrl(imageSrc, { width: 800 })}
      srcSet={srcSet}
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt="Example of responsive image"
    />
  );
};

/**
 * Example 3: Image transformations
 */
const ImageTransformationExample = () => {
  const imageSrc = "/assets/images/players/headshot_dummy.jpg";
  
  // Apply a grayscale effect with rounded corners
  const transformedSrc = transformImage(imageSrc, {
    effect: 'grayscale',
    radius: 20,
    crop: 'fill'
  });
  
  return <img src={transformedSrc} alt="Grayscale image with rounded corners" />;
};

/**
 * Example 4: Blur-up lazy loading technique
 */
const BlurUpLazyLoadExample = () => {
  const imageSrc = "/assets/images/news/News2.jpg";
  const blurredThumbnail = getBlurredThumbnailUrl(imageSrc);
  
  return (
    <div className="relative">
      <img 
        src={blurredThumbnail} 
        className="absolute inset-0 w-full h-full blur-md scale-105" 
        alt="" 
      />
      <img 
        src={getOptimizedImageUrl(imageSrc)} 
        className="relative z-10" 
        alt="Full image that loads over the blur" 
        loading="lazy" 
      />
    </div>
  );
};

/**
 * Example 5: Setting up Cloudinary
 */
const CloudinarySetupExample = () => {
  // This would typically be in your app initialization code
  React.useEffect(() => {
    // Configure Cloudinary service
    setupCloudinaryService({
      cloudName: 'your-cloud-name',
      autoFormat: true,
      autoQuality: true
    });
  }, []);
  
  return (
    <div>
      <h2>Cloudinary Setup Complete</h2>
      <p>All image utilities will now use Cloudinary for optimization and transformations.</p>
    </div>
  );
};

/**
 * Example 6: High-DPI (Retina) Images
 */
const RetinaImageExample = () => {
  const imageSrc = "/assets/images/logos/BOD_Logo_Navy_square.png";
  
  // Create image URLs for different device pixel ratios
  const regular = getOptimizedImageUrl(imageSrc, { width: 200 });
  const retina2x = getPixelRatioImageUrl(imageSrc, 200, 2);
  const retina3x = getPixelRatioImageUrl(imageSrc, 200, 3);
  
  return (
    <img
      src={regular}
      srcSet={`${regular} 1x, ${retina2x} 2x, ${retina3x} 3x`}
      alt="High-DPI logo example"
      width={200}
    />
  );
};

/**
 * Collection of examples
 */
const ImageUtilsExamples = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Image Utilities Examples</h1>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Basic Optimization</h2>
        <BasicImageOptimizationExample />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Responsive Images</h2>
        <ResponsiveImageExample />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Image Transformations</h2>
        <ImageTransformationExample />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Blur-Up Lazy Loading</h2>
        <BlurUpLazyLoadExample />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">High-DPI (Retina) Images</h2>
        <RetinaImageExample />
      </section>
    </div>
  );
};

export default ImageUtilsExamples;
