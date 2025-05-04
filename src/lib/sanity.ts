
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { cloudinary } from "./cloudinary";

// Configure Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gxtptap2",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21",
  useCdn: process.env.NODE_ENV === "production",
});

// Configure Sanity image builder
const builder = imageUrlBuilder(client);

/**
 * Get image URL from Sanity image reference
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Transform a Cloudinary public ID to a full URL
 * @param publicId Cloudinary public ID
 * @param options Transformation options
 */
export function cloudinaryUrlFor(publicId: string, options: any = {}) {
  if (!publicId) return "";
  
  const { width, height, crop = "fill", quality = "auto" } = options;
  
  // Create transformation string
  const transformations = [];
  
  if (width || height) {
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`c_${crop}`);
  }
  
  transformations.push(`q_${quality}`);
  
  // Build URL using the Cloudinary SDK
  return cloudinary
    .image(publicId)
    .addTransformation(transformations.join(","))
    .toURL();
}

/**
 * Helper function to get a Cloudinary URL from a Sanity Cloudinary image object
 */
export function getCloudinaryUrl(image: any, options: any = {}) {
  if (!image || !image.asset || !image.asset.public_id) return "";
  return cloudinaryUrlFor(image.asset.public_id, options);
}

/**
 * Fetch data from Sanity
 */
export async function fetchSanity<T = any>(query: string, params = {}): Promise<T> {
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity query error:", error);
    throw new Error(`Sanity query failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
