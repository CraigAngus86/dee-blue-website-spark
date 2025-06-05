/**
 * Banks o' Dee FC - World-Class Mapbox Implementation
 * Combining modern 3D-inspired styling with perfect marker containment
 */
import mapboxgl from 'mapbox-gl';

const getMapboxToken = (): string => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token) {
    console.warn('Mapbox access token not found. Map features will be disabled.');
    return '';
  }
  return token;
};

const accessToken = getMapboxToken();
if (accessToken) {
  mapboxgl.accessToken = accessToken;
}

export const SPAIN_PARK_COORDINATES: [number, number] = [-2.095406605300864, 57.129069707784545];

export const STADIUM_COORDINATES = {
  MAIN_ENTRANCE: [-2.095406605300864, 57.129069707784545],
  MAIN_PARKING: [-2.095747857524753, 57.128335967778554],
  OVERFLOW_PARKING: [-2.0945495694521856, 57.127195931949096],
  BUS_STOP_ABBOTSWELL: [-2.0957915041235875, 57.12675251292578],
  BUS_STOP_WELLINGTON: [-2.0914991990623033, 57.12892987603264],
} as const;

// Banks o' Dee FC Brand Colors with extended palette
export const MAP_COLORS = {
  // Primary brand colors
  primary: '#00105A',      // Deep Navy
  secondary: '#C5E7FF',    // Light Blue  
  accent: '#FFD700',       // Gold
  white: '#ffffff',
  
  // Extended palette for depth
  navy: {
    900: '#00041a',      // Darkest navy (almost black)
    800: '#000b33',      // Very dark navy
    700: '#00105A',      // Primary navy
    600: '#001a7a',      // Medium navy
    500: '#002499',      // Lighter navy
    400: '#0033b3',      // Light navy
    300: '#0052cc',      // Very light navy
  },
  
  // Gradient blues for water/sky effects
  blue: {
    900: '#001f3f',      // Deep ocean
    700: '#003d7a',      // Ocean
    500: '#0074b7',      // Sea
    300: '#4da6ff',      // Sky
    100: '#b3d9ff',      // Light sky
  },
  
  // Grays for urban elements
  gray: {
    900: '#1a1a1a',      // Almost black
    700: '#4a4a4a',      // Dark gray
    500: '#7a7a7a',      // Medium gray
    300: '#b3b3b3',      // Light gray
    100: '#e6e6e6',      // Very light gray
  }
} as const;

// WORLD-CLASS MODERN STYLE with depth and sophistication
const WORLD_CLASS_STYLE = {
  version: 8 as const,
  name: "Banks o Dee World Class",
  metadata: {
    "mapbox:origin": "basic-template-v1",
    "mapbox:autocomposite": true,
    "mapbox:type": "template"
  },
  sources: {
    composite: {
      url: "mapbox://mapbox.mapbox-streets-v8",
      type: "vector"
    }
  },
  sprite: "mapbox://sprites/mapbox/dark-v11",
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  layers: [
    // Background with subtle gradient effect
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": MAP_COLORS.navy[900],
        "background-opacity": 1
      }
    },
    
    // Land with gradient-like effect using multiple layers
    {
      id: "land-base",
      type: "fill",
      source: "composite",
      "source-layer": "landuse",
      paint: {
        "fill-color": MAP_COLORS.navy[800],
        "fill-opacity": 0.95
      }
    },
    
    // Parks and green spaces - subtle contrast
    {
      id: "parks",
      type: "fill",
      source: "composite",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "park"],
      paint: {
        "fill-color": MAP_COLORS.navy[700],
        "fill-opacity": 0.8
      }
    },
    
    // Water with depth effect
    {
      id: "water",
      type: "fill",
      source: "composite",
      "source-layer": "water",
      paint: {
        "fill-color": MAP_COLORS.blue[700],
        "fill-opacity": 0.9
      }
    },
    
    // Water shimmer effect (subtle highlight)
    {
      id: "water-shimmer",
      type: "fill",
      source: "composite",
      "source-layer": "water",
      paint: {
        "fill-color": MAP_COLORS.blue[500],
        "fill-opacity": [
          "interpolate", ["linear"], ["zoom"],
          13, 0,
          16, 0.3
        ]
      }
    },
    
    // Buildings - 3D effect through opacity gradients
    {
      id: "buildings-3d",
      type: "fill-extrusion",
      source: "composite",
      "source-layer": "building",
      minzoom: 13,
      paint: {
        "fill-extrusion-color": MAP_COLORS.navy[600],
        "fill-extrusion-height": [
          "interpolate", ["linear"], ["zoom"],
          13, 0,
          16, ["get", "height"]
        ],
        "fill-extrusion-opacity": 0.7
      }
    },
    
    // Building shadows for depth
    {
      id: "building-shadows",
      type: "fill",
      source: "composite",
      "source-layer": "building",
      paint: {
        "fill-color": MAP_COLORS.navy[900],
        "fill-opacity": 0.3,
        "fill-translate": [2, 2]
      }
    },
    
    // Major roads with glow effect
    {
      id: "roads-major-glow",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]],
      paint: {
        "line-color": MAP_COLORS.accent,
        "line-width": [
          "interpolate", ["exponential", 1.5], ["zoom"],
          10, 6,
          18, 20
        ],
        "line-blur": 3,
        "line-opacity": 0.3
      }
    },
    
    // Major roads
    {
      id: "roads-major",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": MAP_COLORS.blue[300],
        "line-width": [
          "interpolate", ["exponential", 1.5], ["zoom"],
          10, 2,
          18, 8
        ]
      }
    },
    
    // Minor roads
    {
      id: "roads-minor",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: ["in", ["get", "class"], ["literal", ["tertiary", "street", "service"]]],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": MAP_COLORS.navy[400],
        "line-width": [
          "interpolate", ["exponential", 1.5], ["zoom"],
          13, 0.5,
          18, 4
        ]
      }
    },
    
    // COMPLETE STREET LABELS - Major roads
    {
      id: "road-labels-major",
      type: "symbol",
      source: "composite",
      "source-layer": "road",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]],
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          10, 10,
          18, 16
        ],
        "symbol-placement": "line",
        "text-rotation-alignment": "map"
      },
      paint: {
        "text-color": MAP_COLORS.white,
        "text-halo-color": MAP_COLORS.navy[900],
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    
    // COMPLETE STREET LABELS - Minor roads
    {
      id: "road-labels-minor",
      type: "symbol",
      source: "composite",
      "source-layer": "road",
      filter: ["all",
        ["in", ["get", "class"], ["literal", ["tertiary", "street", "service"]]],
        ["!=", ["get", "type"], "service:parking_aisle"]
      ],
      minzoom: 14,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          14, 9,
          18, 14
        ],
        "symbol-placement": "line",
        "text-rotation-alignment": "map"
      },
      paint: {
        "text-color": MAP_COLORS.secondary,
        "text-halo-color": MAP_COLORS.navy[800],
        "text-halo-width": 1.5
      }
    },
    
    // PLACE LABELS - Cities, towns, neighborhoods
    {
      id: "place-labels-major",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      filter: ["in", ["get", "type"], ["literal", ["city", "town"]]],
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": [
          "step", ["zoom"],
          14, 10,
          16, 12,
          18
        ],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1
      },
      paint: {
        "text-color": MAP_COLORS.accent,
        "text-halo-color": MAP_COLORS.navy[900],
        "text-halo-width": 2
      }
    },
    
    // Neighborhood labels
    {
      id: "place-labels-minor",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      filter: ["==", ["get", "type"], "neighbourhood"],
      minzoom: 13,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          13, 10,
          17, 14
        ]
      },
      paint: {
        "text-color": MAP_COLORS.secondary,
        "text-halo-color": MAP_COLORS.navy[800],
        "text-halo-width": 1.5
      }
    },
    
    // POI Icons with smart filtering
    {
      id: "poi-icons",
      type: "symbol",
      source: "composite",
      "source-layer": "poi_label",
      filter: ["all",
        ["has", "maki"],
        ["in", ["get", "maki"], ["literal", [
          "stadium", "soccer", "park", "bus", "rail", "restaurant",
          "cafe", "bar", "hospital", "school", "college", "parking"
        ]]]
      ],
      minzoom: 14,
      layout: {
        "icon-image": [
          "case",
          ["==", ["get", "maki"], "stadium"], "stadium-15",
          ["==", ["get", "maki"], "soccer"], "soccer-15",
          ["concat", ["get", "maki"], "-15"]
        ],
        "icon-size": [
          "interpolate", ["linear"], ["zoom"],
          14, 0.8,
          18, 1.2
        ],
        "icon-allow-overlap": false
      },
      paint: {
        "icon-opacity": 0.9
      }
    },
    
    // POI Labels
    {
      id: "poi-labels",
      type: "symbol",
      source: "composite",
      "source-layer": "poi_label",
      filter: ["all",
        ["has", "name"],
        ["in", ["get", "maki"], ["literal", [
          "stadium", "soccer", "park", "bus", "rail", "restaurant",
          "cafe", "bar", "hospital", "school", "college", "parking"
        ]]]
      ],
      minzoom: 15,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        "text-size": 10,
        "text-anchor": "top",
        "text-offset": [0, 1]
      },
      paint: {
        "text-color": MAP_COLORS.gray[300],
        "text-halo-color": MAP_COLORS.navy[900],
        "text-halo-width": 1
      }
    },
    
    // Transit labels
    {
      id: "transit-labels",
      type: "symbol",
      source: "composite",
      "source-layer": "transit_stop_label",
      minzoom: 13,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-size": 11,
        "icon-image": [
          "case",
          ["==", ["get", "mode"], "bus"], "bus-15",
          ["==", ["get", "mode"], "rail"], "rail-15",
          "circle-15"
        ]
      },
      paint: {
        "text-color": MAP_COLORS.accent,
        "text-halo-color": MAP_COLORS.navy[900],
        "text-halo-width": 1.5
      }
    }
  ]
};

export const MAP_CONFIG = {
  style: WORLD_CLASS_STYLE as any,
  center: SPAIN_PARK_COORDINATES,
  zoom: 14.5,
  minZoom: 13,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
  antialias: true,
  attributionControl: false,
  logoPosition: 'bottom-right' as const,
  fadeDuration: 300
};

export const createMap = (container: string | HTMLElement) => {
  if (!accessToken) {
    throw new Error('Mapbox access token is required to create a map');
  }
  
  const map = new mapboxgl.Map({
    container,
    ...MAP_CONFIG
  });
  
  // Add subtle animation on load
  map.on('load', () => {
    map.easeTo({
      zoom: MAP_CONFIG.zoom + 0.5,
      duration: 1500,
      easing: (t) => t * (2 - t) // ease-out-quad
    });
  });
  
  return map;
};

export const isMapboxAvailable = (): boolean => {
  return !!accessToken;
};

export const addNavigationControls = (map: mapboxgl.Map) => {
  const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
    visualizePitch: true
  });
  
  map.addControl(nav, 'top-right');
  
  // Style the controls to match Banks o' Dee branding
  const navElement = document.querySelector('.mapboxgl-ctrl-group');
  if (navElement) {
    navElement.setAttribute('style', `
      background: ${MAP_COLORS.navy[700]};
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `);
  }
  
  return nav;
};

export const addGeolocationControl = (map: mapboxgl.Map) => {
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true,
    showAccuracyCircle: true
  });
  
  map.addControl(geolocate, 'top-right');
  
  return geolocate;
};
