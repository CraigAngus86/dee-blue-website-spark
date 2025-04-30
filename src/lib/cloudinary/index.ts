
// Re-export all Cloudinary utilities
export * from './config';
export * from './metadata';
export * from './upload';
export * from './transform';

// Export the cloudinary instance as default
import { cloudinary } from './config';
export default cloudinary;
