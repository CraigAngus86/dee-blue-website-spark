/**
 * World-class marker system with proper containment
 */
import mapboxgl from 'mapbox-gl';
import { STADIUM_COORDINATES, MAP_COLORS } from './client';

interface MarkerConfig {
  coordinates: [number, number];
  title: string;
  icon: string;
  description: string;
  directions?: string;
}

const MARKER_CONFIGS: MarkerConfig[] = [
  {
    coordinates: STADIUM_COORDINATES.MAIN_ENTRANCE,
    title: 'Spain Park Stadium',
    icon: '🏟️',
    description: 'Home of Banks o\' Dee FC since 1902',
    directions: 'Main entrance on Abbotswell Road'
  },
  {
    coordinates: STADIUM_COORDINATES.MAIN_PARKING,
    title: 'Main Car Park',
    icon: '🅿️',
    description: '200 spaces available on match days',
    directions: 'Enter via Abbotswell Road'
  },
  {
    coordinates: STADIUM_COORDINATES.OVERFLOW_PARKING,
    title: 'Overflow Parking',
    icon: '🚗',
    description: 'Additional parking for busy matches',
    directions: 'Follow signs from main car park'
  },
  {
    coordinates: STADIUM_COORDINATES.BUS_STOP_ABBOTSWELL,
    title: 'Bus Stop - Abbotswell Road',
    icon: '🚌',
    description: 'Services: 17, 19',
    directions: '5 minute walk to stadium'
  },
  {
    coordinates: STADIUM_COORDINATES.BUS_STOP_WELLINGTON,
    title: 'Bus Stop - Wellington Road',
    icon: '🚌',
    description: 'Services: 11, 13, 17',
    directions: '7 minute walk to stadium'
  }
];

// Create world-class styled marker element
function createMarkerElement(config: MarkerConfig): HTMLElement {
  const el = document.createElement('div');
  el.className = 'stadium-marker';
  
  // Main marker with gradient background
  el.innerHTML = `
    <div class="marker-container" style="
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, ${MAP_COLORS.accent} 0%, #f1c40f 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    ">
      <span style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));">
        ${config.icon}
      </span>
      <div class="marker-pulse" style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: ${MAP_COLORS.accent};
        opacity: 0.3;
        animation: pulse 2s infinite;
        z-index: -1;
      "></div>
    </div>
  `;
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.3); opacity: 0; }
      100% { transform: scale(1); opacity: 0; }
    }
    
    .stadium-marker:hover .marker-container {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
  `;
  
  if (!document.querySelector('#marker-styles')) {
    style.id = 'marker-styles';
    document.head.appendChild(style);
  }
  
  return el;
}

// Create world-class popup
function createPopup(config: MarkerConfig): mapboxgl.Popup {
  const popupContent = `
    <div style="
      font-family: 'Inter', sans-serif;
      padding: 4px;
      max-width: 250px;
    ">
      <h3 style="
        margin: 0 0 8px 0;
        color: ${MAP_COLORS.primary};
        font-size: 18px;
        font-weight: 700;
      ">${config.title}</h3>
      <p style="
        margin: 0 0 8px 0;
        color: ${MAP_COLORS.gray[700]};
        font-size: 14px;
        line-height: 1.4;
      ">${config.description}</p>
      ${config.directions ? `
        <p style="
          margin: 0;
          color: ${MAP_COLORS.navy[500]};
          font-size: 13px;
          font-style: italic;
        ">📍 ${config.directions}</p>
      ` : ''}
    </div>
  `;
  
  return new mapboxgl.Popup({
    offset: 30,
    className: 'stadium-popup',
    maxWidth: '280px',
    closeButton: true,
    closeOnClick: false
  }).setHTML(popupContent);
}

export function addStadiumMarkers(map: mapboxgl.Map): mapboxgl.Marker[] {
  const markers: mapboxgl.Marker[] = [];
  
  // Add custom popup styling
  const popupStyle = document.createElement('style');
  popupStyle.textContent = `
    .stadium-popup {
      font-family: 'Inter', sans-serif !important;
    }
    .stadium-popup .mapboxgl-popup-content {
      background: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      border: 2px solid ${MAP_COLORS.secondary};
    }
    .stadium-popup .mapboxgl-popup-close-button {
      color: ${MAP_COLORS.gray[500]};
      font-size: 20px;
      padding: 4px 8px;
    }
    .stadium-popup .mapboxgl-popup-close-button:hover {
      color: ${MAP_COLORS.primary};
      background: ${MAP_COLORS.gray[100]};
    }
    .stadium-popup .mapboxgl-popup-tip {
      border-top-color: ${MAP_COLORS.secondary};
    }
  `;
  
  if (!document.querySelector('#popup-styles')) {
    popupStyle.id = 'popup-styles';
    document.head.appendChild(popupStyle);
  }
  
  // Create markers
  MARKER_CONFIGS.forEach((config) => {
    const el = createMarkerElement(config);
    const popup = createPopup(config);
    
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'center'
    })
      .setLngLat(config.coordinates)
      .setPopup(popup)
      .addTo(map);
    
    markers.push(marker);
  });
  
  return markers;
}
