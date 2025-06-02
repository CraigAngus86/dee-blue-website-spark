"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  createMap, 
  addNavigationControls, 
  addGeolocationControl, 
  isMapboxAvailable,
  SPAIN_PARK_COORDINATES 
} from '@/lib/mapbox/client';
import { addStadiumMarkers } from '@/lib/mapbox/markers';
import { MapPin, Navigation } from 'lucide-react';

export function InteractiveStadiumMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const handleGetDirections = useCallback(() => {
    const [lng, lat] = SPAIN_PARK_COORDINATES;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  }, []);

  const handleCenterOnStadium = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: SPAIN_PARK_COORDINATES,
        zoom: 16,
        duration: 1500,
        essential: true
      });
    }
  }, []);

  useEffect(() => {
    if (!isMapboxAvailable()) {
      setMapError('Map service temporarily unavailable');
      return;
    }

    if (mapRef.current || !mapContainer.current) return;

    try {
      // Ensure Mapbox CSS is loaded
      if (!document.querySelector('#mapbox-gl-css')) {
        const link = document.createElement('link');
        link.id = 'mapbox-gl-css';
        link.rel = 'stylesheet';
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        document.head.appendChild(link);
      }
      
      mapRef.current = createMap(mapContainer.current);

      mapRef.current.on('load', () => {
        setIsLoaded(true);
        addStadiumMarkers(mapRef.current);
        addNavigationControls(mapRef.current);
        addGeolocationControl(mapRef.current);
      });

      mapRef.current.on('error', (e: any) => {
        console.error('Map error:', e);
        setMapError('Failed to load map');
      });

    } catch (error) {
      console.error('Error creating map:', error);
      setMapError('Map initialization failed');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (mapError) {
    return (
      <div className="relative h-[60vh] bg-[#e5e7eb] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
          <p className="text-[#6b7280] text-lg font-medium">Spain Park Stadium</p>
          <p className="text-[#9ca3af] text-sm">Abbotswell Road, Aberdeen AB12 3AB</p>
          <button
            onClick={handleGetDirections}
            className="mt-4 bg-[#00105A] text-white px-6 py-2 rounded-lg hover:bg-[#001a7a] transition-colors"
          >
            Get Directions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-[60vh] rounded-lg shadow-2xl"
      style={{ 
        overflow: 'hidden',
        isolation: 'isolate',
        contain: 'strict',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        maskImage: 'radial-gradient(white, black)',
        clipPath: 'inset(0 round 0.5rem)'
      }}
    >
      {/* Map Container with MAXIMUM containment */}
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ 
          minHeight: '400px',
          overflow: 'hidden',
          position: 'relative',
          contain: 'strict',
          zIndex: 1,
          clipPath: 'inset(0)'
        }}
      />
      
      {/* Map border overlay for extra containment */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '2px solid #00105A',
          borderRadius: '0.5rem',
          zIndex: 100,
          boxShadow: 'inset 0 0 20px rgba(0, 16, 90, 0.1)'
        }}
      />
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00105A] to-[#001a7a] flex items-center justify-center z-10">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C5E7FF] border-t-[#FFD700] mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🏟️</span>
              </div>
            </div>
            <p className="text-[#C5E7FF] font-bold text-lg mt-4">Loading Spain Park Map</p>
            <p className="text-[#C5E7FF] text-sm mt-2 opacity-80">Professional navigation experience loading...</p>
          </div>
        </div>
      )}

      {/* Map Controls Overlay */}
      {isLoaded && (
        <div className="absolute bottom-6 left-6 flex flex-col gap-3 z-30">
          <button
            onClick={handleGetDirections}
            className="group relative bg-gradient-to-r from-[#FFD700] to-[#f1c40f] text-[#00105A] px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-[#e6c200]"
          >
            <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <span>Get Directions</span>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={handleCenterOnStadium}
            className="group relative bg-white text-[#00105A] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-[#C5E7FF] hover:bg-[#f8fafc]"
          >
            <MapPin className="w-5 h-5 group-hover:animate-bounce" />
            <span>Center on Stadium</span>
            <div className="absolute inset-0 rounded-xl bg-[#C5E7FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>
      )}
      
      {/* Professional branding badge */}
      {isLoaded && (
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg z-30 border-2 border-[#C5E7FF]">
          <p className="text-[#00105A] font-bold text-sm">BANKS O' DEE FC</p>
          <p className="text-[#6b7280] text-xs">Spain Park Stadium</p>
        </div>
      )}
    </div>
  );
}
