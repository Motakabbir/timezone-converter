import { getTimezoneCoordinates } from './weather';

// Average speeds in kilometers per hour for different transportation modes
const TRANSPORT_SPEEDS = {
  plane: 800, // Commercial aircraft average speed
  train: 250, // High-speed train average
  car: 90,   // Highway driving average
  bus: 70,    // Interstate bus average
  bike: 20,   // Cycling average
  foot: 5     // Walking average
};

// Interface for distance and travel time data
export interface TravelInfo {
  distance: number;      // Distance in kilometers
  travelTimes: {
    plane: number;       // Time in hours
    train: number;
    car: number;
    bus: number;
    bike: number;
    foot: number;
  };
}

// Calculate distance between two points using Haversine formula
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance);
}

// Convert degrees to radians
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Calculate travel times for different modes of transportation
function calculateTravelTimes(distance: number): {
  plane: number;
  train: number;
  car: number;
  bus: number;
  bike: number;
  foot: number;
} {
  return {
    plane: Math.round((distance / TRANSPORT_SPEEDS.plane) * 10) / 10,
    train: Math.round((distance / TRANSPORT_SPEEDS.train) * 10) / 10,
    car: Math.round((distance / TRANSPORT_SPEEDS.car) * 10) / 10,
    bus: Math.round((distance / TRANSPORT_SPEEDS.bus) * 10) / 10,
    bike: Math.round((distance / TRANSPORT_SPEEDS.bike) * 10) / 10,
    foot: Math.round((distance / TRANSPORT_SPEEDS.foot) * 10) / 10
  };
}

// Get travel information between two timezones
export function getTravelInfo(fromTimezone: string, toTimezone: string): TravelInfo | null {
  const fromCoords = getTimezoneCoordinates(fromTimezone);
  const toCoords = getTimezoneCoordinates(toTimezone);

  if (!fromCoords || !toCoords) {
    console.error('Could not find coordinates for one or both timezones');
    return null;
  }

  const distance = calculateHaversineDistance(
    fromCoords.lat,
    fromCoords.lon,
    toCoords.lat,
    toCoords.lon
  );

  return {
    distance,
    travelTimes: calculateTravelTimes(distance)
  };
}