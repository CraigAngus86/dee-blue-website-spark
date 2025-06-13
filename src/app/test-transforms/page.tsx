"use client";
import React, { useState } from 'react';

export default function TestTransforms() {
  const publicId = 'image_673bbf7e11ad3_vgkxdk';
  const format = 'jpg';
  
  // Different gravity options to test
  const gravityOptions = [
    { label: 'Auto', value: 'g_auto' },
    { label: 'Auto:Subject', value: 'g_auto:subject' },
    { label: 'Auto:Faces', value: 'g_auto:faces' },
    { label: 'Auto:Face', value: 'g_auto:face' },
    { label: 'Face', value: 'g_face' },
    { label: 'Faces', value: 'g_faces' },
    { label: 'Auto:Person', value: 'g_auto:person' },
    { label: 'Custom', value: 'g_custom' }
  ];
  
  // Different aspect ratios to test
  const aspectRatios = [
    { label: '21:9 (Hero Desktop)', value: 'ar_21:9' },
    { label: '16:9 (Card/Modal)', value: 'ar_16:9' },
    { label: '4:3 (Hero Mobile)', value: 'ar_4:3' },
    { label: '1:1 (Square)', value: 'ar_1:1' },
    { label: '3:4 (Portrait)', value: 'ar_3:4' }
  ];
  
  const [selectedGravity, setSelectedGravity] = useState('g_auto:faces');
  const [selectedAspect, setSelectedAspect] = useState('ar_21:9');
  
  const buildUrl = (gravity: string, aspect: string, width: number = 800) => {
    return `https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fill,${gravity},${aspect},w_${width},q_auto:good,f_auto/${publicId}.${format}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#00105A]">Cloudinary Transform Test</h1>
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Gravity (Focus Point)</label>
              <select 
                value={selectedGravity}
                onChange={(e) => setSelectedGravity(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {gravityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
              <select 
                value={selectedAspect}
                onChange={(e) => setSelectedAspect(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {aspectRatios.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-sm font-mono break-all">
              {buildUrl(selectedGravity, selectedAspect)}
            </p>
          </div>
        </div>
        
        {/* Main Test Image */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Selected Transform</h2>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={buildUrl(selectedGravity, selectedAspect, 1200)}
              alt="Test transform"
              className="w-full"
            />
          </div>
        </div>
        
        {/* Comparison Grid */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Comparison - Different Gravities with {selectedAspect}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gravityOptions.map(gravity => (
              <div key={gravity.value} className="border rounded-lg p-2">
                <h3 className="text-sm font-medium mb-2">{gravity.label}</h3>
                <div className="relative overflow-hidden rounded">
                  <img 
                    src={buildUrl(gravity.value, selectedAspect, 600)}
                    alt={gravity.label}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Square Test Specifically */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">1:1 Square Test (Should Focus on Left Player)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['g_auto', 'g_auto:faces', 'g_face', 'g_custom'].map(gravity => (
              <div key={gravity} className="border rounded-lg p-2">
                <h3 className="text-sm font-medium mb-2">{gravity}</h3>
                <div className="relative aspect-square overflow-hidden rounded">
                  <img 
                    src={buildUrl(gravity, 'ar_1:1', 400)}
                    alt={gravity}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            If custom face detection is working, g_custom or g_face should focus on the left player in the 1:1 crop.
          </p>
        </div>
      </div>
    </div>
  );
}
