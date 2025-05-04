
import React from 'react';
import TestUploader from '@/components/ui/cloudinary/TestUploader';

export default function TestCloudinaryPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-8 text-center">Cloudinary Upload Test</h1>
      <TestUploader />
    </div>
  );
}
