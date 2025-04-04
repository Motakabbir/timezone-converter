'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getLandmarkInfo } from '../utils/landmarks';

interface MapProps {
  timezone: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export default function Map({ timezone, coordinates }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerId = 'map-container';

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerId).setView([coordinates.lat, coordinates.lon], 10);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);

      // Add a marker for the location
      L.marker([coordinates.lat, coordinates.lon])
        .addTo(mapRef.current)
        .bindPopup(timezone.replace('_', ' '));

      // Add landmark markers
      const landmarkInfo = getLandmarkInfo(timezone);
      if (landmarkInfo) {
        // Create custom icon for landmarks
        const landmarkIcon = L.divIcon({
          className: 'landmark-icon',
          html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>',
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24]
        });

        // Add markers for famous places
        landmarkInfo.famousPlaces.forEach((place, index) => {
          // Calculate offset positions around the main coordinates
          const lat = coordinates.lat + (Math.random() - 0.5) * 0.1;
          const lon = coordinates.lon + (Math.random() - 0.5) * 0.1;
          
          L.marker([lat, lon], { icon: landmarkIcon })
            .addTo(mapRef.current)
            .bindPopup(`<b>${place}</b>`);
        });
      }
    } else if (mapRef.current) {
      // Update map view when coordinates change
      mapRef.current.setView([coordinates.lat, coordinates.lon], 10);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates, timezone]);

  return (
    <div 
      id={mapContainerId} 
      className="h-64 w-full rounded-lg overflow-hidden shadow-md"
    />
  );
}