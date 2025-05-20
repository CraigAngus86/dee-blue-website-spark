"use client";
import React, { useState } from 'react';
import { MatchGalleryModal } from '@/features/galleries';

export default function GalleryTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [matchId, setMatchId] = useState('');
  const [useMatchId, setUseMatchId] = useState(false);
  
  // Sample matchId to test with (you can replace with an actual match ID from your database)
  const sampleMatchId = '402fccd1-5b8d-4fe3-b21a-96e34e207370';
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gallery Modal Test Page</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Test Controls</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              <input
                type="radio"
                className="mr-2"
                checked={!useMatchId}
                onChange={() => setUseMatchId(false)}
              />
              Test with Gallery ID
            </label>
            {!useMatchId && (
              <input
                type="text"
                value={galleryId}
                onChange={(e) => setGalleryId(e.target.value)}
                placeholder="Enter Sanity Gallery ID"
                className="w-full p-2 border rounded"
              />
            )}
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">
              <input
                type="radio"
                className="mr-2"
                checked={useMatchId}
                onChange={() => setUseMatchId(true)}
              />
              Test with Match ID
            </label>
            {useMatchId && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  placeholder="Enter Supabase Match ID"
                  className="w-full p-2 border rounded"
                />
                <div className="text-sm text-gray-600">
                  <button 
                    className="text-blue-600 hover:underline"
                    onClick={() => setMatchId(sampleMatchId)}
                  >
                    Use sample match ID
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#001C8C] transition-colors"
          >
            Open Gallery Modal
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Testing Instructions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select whether to test using a Gallery ID or Match ID</li>
          <li>Enter a valid ID or use the sample match ID</li>
          <li>Click "Open Gallery Modal" to test the modal</li>
          <li>Verify that the gallery loads correctly</li>
          <li>Test navigation, thumbnails, and sharing functionality</li>
          <li>Test keyboard navigation (arrow keys for navigation, ESC to close)</li>
          <li>Test responsiveness on different screen sizes</li>
        </ol>
      </div>
      
      {/* Render the gallery modal */}
      <MatchGalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        galleryId={!useMatchId ? galleryId : undefined}
        matchId={useMatchId ? matchId : undefined}
      />
    </div>
  );
}
