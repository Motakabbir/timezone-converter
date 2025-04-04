import { getTimezoneCoordinates } from './weather';

export interface MapCoordinates {
  lat: number;
  lon: number;
}

// Get coordinates for a timezone using the existing weather utility
export function getMapCoordinates(timezone: string): MapCoordinates | null {
  return getTimezoneCoordinates(timezone);
}