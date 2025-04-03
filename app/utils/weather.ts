import { DateTime } from 'luxon';

// OpenWeatherMap API configuration
const WEATHER_API_BASE_URL = 'https://api.open-meteo.com/v1';

// Interface for weather data
export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

// Get coordinates for a timezone (approximate based on major city)
export const getTimezoneCoordinates = (timezone: string): { lat: number; lon: number } | null => {
  const cityMapping: Record<string, { lat: number; lon: number }> = {
    // Africa
    'Africa/Abidjan': { lat: 5.3600, lon: -4.0083 },
    'Africa/Accra': { lat: 5.6037, lon: -0.1870 },
    'Africa/Addis_Ababa': { lat: 9.0320, lon: 38.7421 },
    'Africa/Algiers': { lat: 36.7538, lon: 3.0588 },
    'Africa/Asmara': { lat: 15.3229, lon: 38.9251 },
    'Africa/Bamako': { lat: 12.6392, lon: -8.0029 },
    'Africa/Bangui': { lat: 4.3947, lon: 18.5582 },
    'Africa/Banjul': { lat: 13.4549, lon: -16.5790 },
    'Africa/Bissau': { lat: 11.8636, lon: -15.5846 },
    'Africa/Blantyre': { lat: -15.7861, lon: 35.0058 },
    'Africa/Brazzaville': { lat: -4.2634, lon: 15.2429 },
    'Africa/Bujumbura': { lat: -3.3614, lon: 29.3599 },
    'Africa/Cairo': { lat: 30.0444, lon: 31.2357 },
    'Africa/Casablanca': { lat: 33.5731, lon: -7.5898 },
    'Africa/Ceuta': { lat: 35.8894, lon: -5.3213 },
    'Africa/Conakry': { lat: 9.6412, lon: -13.5784 },
    'Africa/Dakar': { lat: 14.7167, lon: -17.4677 },
    'Africa/Dar_es_Salaam': { lat: -6.7924, lon: 39.2083 },
    'Africa/Djibouti': { lat: 11.8251, lon: 42.5903 },
    'Africa/Douala': { lat: 4.0511, lon: 9.7679 },
    'Africa/El_Aaiun': { lat: 27.1536, lon: -13.2033 },
    'Africa/Freetown': { lat: 8.4849, lon: -13.2343 },
    'Africa/Gaborone': { lat: -24.6282, lon: 25.9231 },
    'Africa/Harare': { lat: -17.8292, lon: 31.0522 },
    'Africa/Johannesburg': { lat: -26.2041, lon: 28.0473 },
    'Africa/Juba': { lat: 4.8517, lon: 31.5825 },
    'Africa/Kampala': { lat: 0.3476, lon: 32.5825 },
    'Africa/Khartoum': { lat: 15.5007, lon: 32.5599 },
    'Africa/Kigali': { lat: -1.9441, lon: 30.0619 },
    'Africa/Kinshasa': { lat: -4.4419, lon: 15.2663 },
    'Africa/Lagos': { lat: 6.5244, lon: 3.3792 },
    'Africa/Libreville': { lat: 0.4162, lon: 9.4673 },
    'Africa/Lome': { lat: 6.1375, lon: 1.2123 },
    'Africa/Luanda': { lat: -8.8147, lon: 13.2302 },
    'Africa/Lubumbashi': { lat: -11.6876, lon: 27.5026 },
    'Africa/Lusaka': { lat: -15.3875, lon: 28.3228 },
    'Africa/Malabo': { lat: 3.7523, lon: 8.7742 },
    'Africa/Maputo': { lat: -25.9692, lon: 32.5732 },
    'Africa/Maseru': { lat: -29.3167, lon: 27.4833 },
    'Africa/Mbabane': { lat: -26.3054, lon: 31.1367 },
    'Africa/Mogadishu': { lat: 2.0469, lon: 45.3182 },
    'Africa/Monrovia': { lat: 6.3004, lon: -10.7969 },
    'Africa/Nairobi': { lat: -1.2921, lon: 36.8219 },
    'Africa/Ndjamena': { lat: 12.1348, lon: 15.0557 },
    'Africa/Niamey': { lat: 13.5137, lon: 2.1098 },
    'Africa/Nouakchott': { lat: 18.0735, lon: -15.9582 },
    'Africa/Ouagadougou': { lat: 12.3714, lon: -1.5197 },
    'Africa/Porto-Novo': { lat: 6.4969, lon: 2.6283 },
    'Africa/Sao_Tome': { lat: 0.3302, lon: 6.7333 },
    'Africa/Tripoli': { lat: 32.8872, lon: 13.1913 },
    'Africa/Tunis': { lat: 36.8065, lon: 10.1815 },
    'Africa/Windhoek': { lat: -22.5609, lon: 17.0658 },

    // America
    'America/New_York': { lat: 40.7128, lon: -74.0060 },
    'America/Los_Angeles': { lat: 34.0522, lon: -118.2437 },
    'America/Chicago': { lat: 41.8781, lon: -87.6298 },
    'America/Toronto': { lat: 43.6532, lon: -79.3832 },
    'America/Vancouver': { lat: 49.2827, lon: -123.1207 },
    'America/Mexico_City': { lat: 19.4326, lon: -99.1332 },
    'America/Phoenix': { lat: 33.4484, lon: -112.0740 },
    'America/Denver': { lat: 39.7392, lon: -104.9903 },
    'America/Sao_Paulo': { lat: -23.5505, lon: -46.6333 },
    'America/Buenos_Aires': { lat: -34.6037, lon: -58.3816 },
    'America/Santiago': { lat: -33.4489, lon: -70.6693 },
    'America/Adak': { lat: 51.8800, lon: -176.6580 },
    'America/Anchorage': { lat: 61.2181, lon: -149.9003 },
    'America/Anguilla': { lat: 18.2206, lon: -63.0686 },
    'America/Antigua': { lat: 17.1274, lon: -61.8468 },
    'America/Araguaina': { lat: -7.1919, lon: -48.2029 },
    'America/Asuncion': { lat: -25.2867, lon: -57.3333 },
    'America/Atikokan': { lat: 48.7597, lon: -91.6225 },
    'America/Bahia': { lat: -12.9711, lon: -38.5108 },
    'America/Barbados': { lat: 13.1939, lon: -59.5432 },
    'America/Belize': { lat: 17.5046, lon: -88.1962 },
    'America/Bogota': { lat: 4.7110, lon: -74.0721 },
    'America/Caracas': { lat: 10.4806, lon: -66.9036 },
    'America/Costa_Rica': { lat: 9.9281, lon: -84.0907 },

    // Asia
    'Asia/Tokyo': { lat: 35.6762, lon: 139.6503 },
    'Asia/Dubai': { lat: 25.2048, lon: 55.2708 },
    'Asia/Shanghai': { lat: 31.2304, lon: 121.4737 },
    'Asia/Singapore': { lat: 1.3521, lon: 103.8198 },
    'Asia/Hong_Kong': { lat: 22.3193, lon: 114.1694 },
    'Asia/Seoul': { lat: 37.5665, lon: 126.9780 },
    'Asia/Bangkok': { lat: 13.7563, lon: 100.5018 },
    'Asia/Kolkata': { lat: 22.5726, lon: 88.3639 },
    'Asia/Jakarta': { lat: -6.2088, lon: 106.8456 },
    'Asia/Almaty': { lat: 43.2220, lon: 76.8512 },
    'Asia/Amman': { lat: 31.9454, lon: 35.9284 },
    'Asia/Baghdad': { lat: 33.3152, lon: 44.3661 },
    'Asia/Baku': { lat: 40.4093, lon: 49.8671 },
    'Asia/Beirut': { lat: 33.8938, lon: 35.5018 },
    'Asia/Dhaka': { lat: 23.8103, lon: 90.4125 },
    'Asia/Jerusalem': { lat: 31.7683, lon: 35.2137 },
    'Asia/Karachi': { lat: 24.8607, lon: 67.0011 },
    'Asia/Manila': { lat: 14.5995, lon: 120.9842 },
    'Asia/Tashkent': { lat: 41.2995, lon: 69.2401 },

    // Europe
    'Europe/London': { lat: 51.5074, lon: -0.1278 },
    'Europe/Paris': { lat: 48.8566, lon: 2.3522 },
    'Europe/Berlin': { lat: 52.5200, lon: 13.4050 },
    'Europe/Rome': { lat: 41.9028, lon: 12.4964 },
    'Europe/Madrid': { lat: 40.4168, lon: -3.7038 },
    'Europe/Amsterdam': { lat: 52.3676, lon: 4.9041 },
    'Europe/Moscow': { lat: 55.7558, lon: 37.6173 },
    'Europe/Istanbul': { lat: 41.0082, lon: 28.9784 },
    'Europe/Athens': { lat: 37.9838, lon: 23.7275 },
    'Europe/Brussels': { lat: 50.8503, lon: 4.3517 },
    'Europe/Copenhagen': { lat: 55.6761, lon: 12.5683 },
    'Europe/Dublin': { lat: 53.3498, lon: -6.2603 },
    'Europe/Helsinki': { lat: 60.1699, lon: 24.9384 },
    'Europe/Kiev': { lat: 50.4501, lon: 30.5234 },
    'Europe/Oslo': { lat: 59.9139, lon: 10.7522 },
    'Europe/Stockholm': { lat: 59.3293, lon: 18.0686 },
    'Europe/Vienna': { lat: 48.2082, lon: 16.3738 },
    'Europe/Warsaw': { lat: 52.2297, lon: 21.0122 },
    'Europe/Zurich': { lat: 47.3769, lon: 8.5417 },

    // Oceania
    'Australia/Sydney': { lat: -33.8688, lon: 151.2093 },
    'Australia/Melbourne': { lat: -37.8136, lon: 144.9631 },
    'Australia/Perth': { lat: -31.9505, lon: 115.8605 },
    'Pacific/Auckland': { lat: -36.8485, lon: 174.7633 },
    'Pacific/Fiji': { lat: -18.1416, lon: 178.4419 },
    'Pacific/Guam': { lat: 13.4443, lon: 144.7937 },
    'Pacific/Honolulu': { lat: 21.3069, lon: -157.8583 },
    'Pacific/Port_Moresby': { lat: -9.4438, lon: 147.1803 },
    'Pacific/Samoa': { lat: -13.7590, lon: -172.1046 },

    // Additional Regions
    'Atlantic/Reykjavik': { lat: 64.1265, lon: -21.8174 },
    'Indian/Maldives': { lat: 4.1755, lon: 73.5093 }
  };

  // Extract city name from timezone
  const city = timezone.split('/').pop();
  if (!city) return null;

  // Find closest matching city
  const closestMatch = Object.keys(cityMapping).find(key => 
    key.toLowerCase().includes(city.toLowerCase())
  );

  return closestMatch ? cityMapping[closestMatch] : null;
};

// Fetch weather data for a timezone
export async function getWeatherForTimezone(timezone: string): Promise<WeatherData | null> {
  const coordinates = getTimezoneCoordinates(timezone);
  if (!coordinates) {
    console.error('Could not find coordinates for timezone:', timezone);
    return null;
  }

  try {
    // Validate API URL and parameters
    const apiUrl = new URL(`${WEATHER_API_BASE_URL}/forecast`);
    apiUrl.searchParams.append('latitude', coordinates.lat.toString());
    apiUrl.searchParams.append('longitude', coordinates.lon.toString());
    apiUrl.searchParams.append('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code');
    apiUrl.searchParams.append('timezone', timezone);

    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const current = data.current;
    
    // Map WMO weather codes to descriptions and icons
    const getWeatherInfo = (code: number): { description: string; icon: string } => {
      // Simplified mapping of WMO codes to descriptions and icons
      const weatherMap: Record<number, { description: string; icon: string }> = {
        0: { description: 'Clear sky', icon: '01d' },
        1: { description: 'Mainly clear', icon: '02d' },
        2: { description: 'Partly cloudy', icon: '03d' },
        3: { description: 'Overcast', icon: '04d' },
        45: { description: 'Foggy', icon: '50d' },
        48: { description: 'Depositing rime fog', icon: '50d' },
        51: { description: 'Light drizzle', icon: '09d' },
        53: { description: 'Moderate drizzle', icon: '09d' },
        55: { description: 'Dense drizzle', icon: '09d' },
        61: { description: 'Slight rain', icon: '10d' },
        63: { description: 'Moderate rain', icon: '10d' },
        65: { description: 'Heavy rain', icon: '10d' },
        71: { description: 'Slight snow', icon: '13d' },
        73: { description: 'Moderate snow', icon: '13d' },
        75: { description: 'Heavy snow', icon: '13d' },
        95: { description: 'Thunderstorm', icon: '11d' },
      };
      return weatherMap[code] || { description: 'Unknown', icon: '03d' };
    };

    const weatherInfo = getWeatherInfo(current.weather_code);

    return {
      temperature: Math.round(current.temperature_2m),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      location: timezone.split('/').pop()?.replace('_', ' ') || timezone
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}