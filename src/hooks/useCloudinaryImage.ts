
import { useState, useEffect } from 'react';

// Simplified interface for CloudinaryImage
interface CloudinaryImage {
  url: string;
  getWidth: () => number | null;
  getHeight: () => number | null;
  getCrop: () => string | null;
}

// Simplified CloudinaryService
class CloudinaryService {
  createImage(url: string): CloudinaryImage {
    return {
      url,
      getWidth: () => null,
      getHeight: () => null,
      getCrop: () => null,
    };
  }
}

// Singleton instance
const cloudinaryService = new CloudinaryService();

const useCloudinaryImage = (imageUrl: string) => {
  const [image, setImage] = useState<CloudinaryImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      setImage(null);
      return;
    }

    try {
      const cloudinaryImage = cloudinaryService.createImage(imageUrl);
      setImage(cloudinaryImage);
      setLoading(false);
    } catch (err) {
      console.error('Error creating Cloudinary image:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
    }
  }, [imageUrl]);

  const getWidth = () => {
    return image?.getWidth() || 0;
  };

  const getHeight = () => {
    return image?.getHeight() || 0;
  };

  const getCrop = () => {
    return image?.getCrop() || 'fill';
  };

  return {
    image,
    loading,
    error,
    getWidth,
    getHeight,
    getCrop,
  };
};

export default useCloudinaryImage;
