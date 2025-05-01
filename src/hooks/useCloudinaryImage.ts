
"use client";

import { useMemo } from "react";
import { transformCloudinaryImage } from "@/lib/cloudinary/transform";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";

// Initialize the Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlkpaw2a0",
  },
  url: {
    secure: true, // Force https
  },
});

interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "thumb" | "scale" | "fit";
  format?: "auto" | "webp" | "jpg" | "png";
  quality?: number;
  aspectRatio?: number;
  focus?: "auto" | "faces" | "center";
}

/**
 * A hook to generate optimized Cloudinary image URLs
 * 
 * @param publicId The Cloudinary public ID of the image
 * @param options Transformation options
 * @returns The transformed image URL and CloudinaryImage object
 */
export function useCloudinaryImage(publicId: string, options: CloudinaryImageOptions = {}) {
  const imageInstance = useMemo(() => {
    if (!publicId) return null;
    
    // Create a CloudinaryImage instance
    const cloudinaryImage = cld.image(publicId);
    
    // Apply transformations
    const transformedImage = transformCloudinaryImage(cloudinaryImage, options);
    
    return transformedImage;
  }, [publicId, options]);
  
  // Generate the URL
  const imageUrl = useMemo(() => {
    return imageInstance ? imageInstance.toURL() : "";
  }, [imageInstance]);
  
  return { 
    imageUrl, 
    imageInstance
  };
}

export default useCloudinaryImage;
