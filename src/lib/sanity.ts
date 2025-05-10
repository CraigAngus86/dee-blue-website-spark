// Updated sanity.ts with new environment variables
import { env } from '@/lib/env';
import imageUrlBuilder from '@sanity/image-url';
import { cloudinary } from "./cloudinary";

// Create a builder for Sanity image URLs
const builder = imageUrlBuilder({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
});

// Function to generate image URLs from Sanity
export function urlFor(source: any) {
  return builder.image(source);
}

// Function to generate Cloudinary URLs
export function cloudinaryUrlFor(publicId: string, options: any = {}) {
  return cloudinary
    .image(publicId)
    .toURL();
}

// Function to convert a Sanity image to a Cloudinary URL
export function imageUrlFor(image: any, options: any = {}) {
  if (!image?.asset?.public_id) {
    return urlFor(image).url();
  }
  
  return cloudinaryUrlFor(image.asset.public_id, options);
}
