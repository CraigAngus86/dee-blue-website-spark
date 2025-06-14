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

export function MobileLocationMap() {
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
        duration: 1500
      });
    }
  }, []);

  useEffect(() => {
    if (!isMapboxAvailable()) {
      setMapError('Map service temporarily unavailable');
      return;
    }

    if (!mapContainer.current || mapRef.current) return;

    try {
      // Fixed: Use same pattern as desktop - single argument
      mapRef.current = createMap(mapContainer.current);
      
      if (mapRef.current) {
        mapRef.current.on('load', () => {
          try {
            setIsLoaded(true);
            addStadiumMarkers(mapRef.current);
            addNavigationControls(mapRef.current);
            addGeolocationControl(mapRef.current);
          } catch (error) {
            console.error('Error adding map controls:', error);
            setMapError('Failed to load map features');
          }
        });

        mapRef.current.on('error', (e) => {
          console.error('Map error:', e);
          setMapError('Map failed to load properly');
        });
      }
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
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
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{
          minHeight: '400px',
          borderRadius: '0.5rem',
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
              <div className="w-16 h-16 border-4 border-[#C5E7FF] border-t-[#FFD700] rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <h3 className="text-white text-lg font-bold mb-2">Loading Spain Park</h3>
            <p className="text-[#C5E7FF] text-sm mt-2 opacity-80">Professional navigation experience loading...</p>
          </div>
        </div>
      )}

      {/* NO BUTTONS - Removed for mobile simplicity */}
      
      {/* Compact branding badge - Smaller for mobile */}
      {isLoaded && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg z-30 border border-[#C5E7FF]">
          <p className="text-[#00105A] font-bold text-xs">BANKS O' DEE FC</p>
          <p className="text-[#6b7280] text-xs">Spain Park Stadium</p>
        </div>
      )}
    </div>
  );
}
