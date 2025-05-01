
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Ensure we have an environment variable validation function
const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Get project credentials from environment variables with validation
const projectId = requireEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

// Create a client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// Create a preview client with lower cache time
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
});

// Helper function to switch between normal client and preview
export const getClient = (preview = false) => (preview ? previewClient : client);

// Set up image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlFor = (source: any) => {
  return builder.image(source);
};

// Function to get all documents of a specific type
export async function getAllDocuments(type: string) {
  try {
    const documents = await client.fetch(`*[_type == "${type}"]`);
    return documents;
  } catch (error) {
    console.error(`Error fetching ${type} documents:`, error);
    return [];
  }
}

// Function to get a single document by ID
export async function getDocumentById(type: string, id: string) {
  try {
    const document = await client.fetch(`*[_type == "${type}" && _id == "${id}"][0]`);
    return document;
  } catch (error) {
    console.error(`Error fetching ${type} document with ID ${id}:`, error);
    return null;
  }
}

// Function to get a document by slug
export async function getDocumentBySlug(type: string, slug: string) {
  try {
    const document = await client.fetch(
      `*[_type == "${type}" && slug.current == "${slug}"][0]`
    );
    return document;
  } catch (error) {
    console.error(`Error fetching ${type} document with slug ${slug}:`, error);
    return null;
  }
}
