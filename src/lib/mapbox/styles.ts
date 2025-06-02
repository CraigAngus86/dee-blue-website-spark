/**
 * Custom branded map styles for Banks o' Dee FC
 */
import { MAP_COLORS } from './client';

// Custom map style configuration
export const BRANDED_MAP_STYLE = {
  version: 8,
  name: 'Banks o\' Dee FC',
  sources: {
    'mapbox': {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8'
    }
  },
  layers: [
    // Water features in brand blue
    {
      id: 'water',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'water',
      paint: {
        'fill-color': MAP_COLORS.secondary // Light blue
      }
    },
    // Land in neutral
    {
      id: 'land',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse',
      paint: {
        'fill-color': '#f8fafc'
      }
    },
    // Roads in brand navy
    {
      id: 'road',
      type: 'line',
      source: 'mapbox',
      'source-layer': 'road',
      paint: {
        'line-color': MAP_COLORS.primary,
        'line-width': 2
      }
    },
    // Buildings in neutral gray
    {
      id: 'building',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'building',
      paint: {
        'fill-color': '#e2e8f0',
        'fill-opacity': 0.8
      }
    },
    // Labels in brand navy
    {
      id: 'place-label',
      type: 'symbol',
      source: 'mapbox',
      'source-layer': 'place_label',
      layout: {
        'text-field': '{name}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      paint: {
        'text-color': MAP_COLORS.primary,
        'text-halo-color': '#ffffff',
        'text-halo-width': 1
      }
    }
  ]
};
