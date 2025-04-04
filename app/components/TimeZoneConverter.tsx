'use client';

import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faClock, faCalendarDay, faCloud, faTemperatureHigh, faTint, faWind, faPlane, faTrain, faCar, faBus, faBicycle, faPersonWalking, faLandmark, faHistory, faMap } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { getMapCoordinates, MapCoordinates } from '../utils/map';
import { DateTime } from 'luxon';

import { getAvailableTimezones } from '../utils/timezones';
import { getWeatherForTimezone, WeatherData } from '../utils/weather';
import { getTravelInfo, TravelInfo } from '../utils/distance';
import { getLandmarkInfo, LandmarkInfo } from '../utils/landmarks';

export default function TimeZoneConverter() {
  // Initialize timezones state
  const [availableTimeZones, setAvailableTimeZones] = useState<string[]>([]);

  // Load available timezones on component mount
  useEffect(() => {
    const timezones = getAvailableTimezones();
    setAvailableTimeZones(timezones);
  }, []);

  const [sourceTime, setSourceTime] = useState('');
  const [sourceDate, setSourceDate] = useState('');
  const [sourceTimeZone, setSourceTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetTimeZone, setTargetTimeZone] = useState('Europe/London');
  const [convertedTime, setConvertedTime] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [landmarkInfo, setLandmarkInfo] = useState<LandmarkInfo | null>(null);
  // Dynamically import the Map component to avoid SSR issues with Leaflet
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-lg" />
  });

  const [isLoading, setIsLoading] = useState({
    weather: false,
    travel: false,
    landmarks: false,
    map: false
  });

  const [mapCoordinates, setMapCoordinates] = useState<MapCoordinates | null>(null);
  const [isDST, setIsDST] = useState({ source: false, target: false });

  const [sourceSearch, setSourceSearch] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetSearch, setTargetSearch] = useState('Europe/London');
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [targetDropdownOpen, setTargetDropdownOpen] = useState(false);

  // Filter timezones based on search input with null checks
  const filteredSourceTimezones = availableTimeZones?.filter(tz =>
    tz.toLowerCase().includes(sourceSearch?.toLowerCase() || '')
  ) || [];
  const filteredTargetTimezones = availableTimeZones?.filter(tz =>
    tz.toLowerCase().includes(targetSearch?.toLowerCase() || '')
  ) || [];

  // Set default date and time on component mount
  useEffect(() => {
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().substring(0, 5)); // HH:MM format
    
    // Try to get user's time zone
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTimeZone) {
        setSourceTimeZone(userTimeZone);
      }
    } catch (error) {
      console.error('Could not detect user timezone:', error);
    }
    
    // Initial conversion
    handleConversion();
  }, []);
  
  // Check for DST whenever time zones change
  useEffect(() => {
    checkDaylightSavingTime();
  }, [sourceTimeZone, targetTimeZone, sourceDate]);
  
  // Perform the conversion whenever inputs change
  useEffect(() => {
    if (sourceDate && sourceTime) {
      handleConversion();
      fetchWeatherData();
      updateTravelInfo();
      updateLandmarkInfo();
      updateMapCoordinates();
    }
  }, [sourceDate, sourceTime, sourceTimeZone, targetTimeZone]);

  const updateMapCoordinates = () => {
    setIsLoading(prev => ({ ...prev, map: true }));
    try {
      const coordinates = getMapCoordinates(targetTimeZone);
      setMapCoordinates(coordinates);
    } finally {
      setIsLoading(prev => ({ ...prev, map: false }));
    }
  };

  const updateTravelInfo = () => {
    setIsLoading(prev => ({ ...prev, travel: true }));
    try {
      const travel = getTravelInfo(sourceTimeZone, targetTimeZone);
      setTravelInfo(travel);
    } finally {
      setIsLoading(prev => ({ ...prev, travel: false }));
    }
  };

  const updateLandmarkInfo = () => {
    setIsLoading(prev => ({ ...prev, landmarks: true }));
    try {
      const landmarks = getLandmarkInfo(targetTimeZone);
      setLandmarkInfo(landmarks);
    } finally {
      setIsLoading(prev => ({ ...prev, landmarks: false }));
    }
  };

  const fetchWeatherData = async () => {
    setIsLoading(prev => ({ ...prev, weather: true }));
    try {
      const weather = await getWeatherForTimezone(targetTimeZone);
      setWeatherData(weather);
    } finally {
      setIsLoading(prev => ({ ...prev, weather: false }));
    }
  };
  
  const checkDaylightSavingTime = () => {
    if (!sourceDate) return;
    
    try {
      const sourceDT = DateTime.fromISO(`${sourceDate}T12:00:00`, { zone: sourceTimeZone });
      const targetDT = DateTime.fromISO(`${sourceDate}T12:00:00`, { zone: targetTimeZone });
      
      setIsDST({
        source: sourceDT.isInDST,
        target: targetDT.isInDST
      });
    } catch (error) {
      console.error('Error checking DST:', error);
    }
  };
  
  const handleConversion = () => {
    if (!sourceDate || !sourceTime) return;
    
    try {
      // Create DateTime object from input
      const sourceDT = DateTime.fromISO(`${sourceDate}T${sourceTime}:00`, { zone: sourceTimeZone });
      
      if (!sourceDT.isValid) {
        setConvertedTime('Invalid date/time');
        return;
      }
      
      // Convert to target timezone
      const targetDT = sourceDT.setZone(targetTimeZone);
      
      // Calculate time difference
      const diffInHours = targetDT.diff(sourceDT, ['hours', 'minutes']).toObject();
      const hourDiff = Math.floor(diffInHours.hours || 0);
      const minuteDiff = Math.floor(diffInHours.minutes || 0);
      
      // Determine day difference
      const dayDiff = targetDT.day - sourceDT.day;
      let dayInfo = '';
      if (dayDiff === 1 || (dayDiff === -30 && targetDT.day === 1)) {
        dayInfo = ' (Next day)';
      } else if (dayDiff === -1 || (dayDiff === 30 && sourceDT.day === 1)) {
        dayInfo = ' (Previous day)';
      }
      
      // Format the result with a more readable date format
      const formattedDate = targetDT.toFormat('EEEE, MMMM d, yyyy');
      const formattedTime = targetDT.toFormat('HH:mm:ss');
      const offsetInfo = targetDT.toFormat('ZZZZ');
      
      // Build time difference string
      let diffString = '';
      if (hourDiff !== 0 || minuteDiff !== 0) {
        diffString = `${Math.abs(hourDiff)}h ${Math.abs(minuteDiff)}m ${hourDiff >= 0 ? 'ahead' : 'behind'}`;
      }
      
      setConvertedTime(
        `${formattedDate}\n${formattedTime} ${offsetInfo}${dayInfo}${diffString ? `\n${diffString}` : ''}`
      );
    } catch (error) {
      console.error('Conversion error:', error);
      setConvertedTime('Error converting time');
    }
  };
  
  const swapTimeZones = () => {
    setSourceTimeZone(targetTimeZone);
    setTargetTimeZone(sourceTimeZone);
  };

  const handleKeyDown = (e: React.KeyboardEvent, timezones: string[], currentValue: string, setValue: (value: string) => void) => {
    if (e.key === 'Enter' && timezones.length > 0) {
      setValue(timezones[0]);
      e.preventDefault();
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100 dark:border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <FontAwesomeIcon icon={faClock} className="text-blue-500" />
        <span>Time Zone Converter</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Source Time Zone */}
        <div className="space-y-5 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDay} className="text-blue-500" />
            Source
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="sourceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                id="sourceDate"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="sourceTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time
              </label>
              <input
                type="time"
                id="sourceTime"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="sourceTimeZone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Zone
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search time zone..."
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  onFocus={() => setSourceDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setSourceDropdownOpen(false), 200)}
                  onKeyDown={(e) => handleKeyDown(e, filteredSourceTimezones, sourceTimeZone, setSourceTimeZone)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition duration-200"
                  aria-label="Search time zones"
                  aria-controls="sourceTimeZoneList"
                  role="combobox"
                  aria-expanded={sourceDropdownOpen}
                  aria-autocomplete="list"
                />
                {sourceDropdownOpen && (
                  <div 
                    id="sourceTimeZoneList"
                    className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
                    role="listbox"
                  >
                    {filteredSourceTimezones.map((tz) => {
                      const dt = DateTime.now().setZone(tz);
                      const offset = dt.toFormat('ZZ');
                      return (
                        <button
                          key={tz}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${tz === sourceTimeZone ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                          onClick={() => {
                            setSourceTimeZone(tz);
                            setSourceSearch(tz);
                            setSourceDropdownOpen(false);
                          }}
                          role="option"
                          aria-selected={tz === sourceTimeZone}
                        >
                          {tz.replace('_', ' ')} (UTC{offset}) {tz === sourceTimeZone && isDST.source ? '(DST)' : ''}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={swapTimeZones}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          aria-label="Swap time zones"
        >
          <FontAwesomeIcon icon={faExchangeAlt} className="text-lg" />
        </button>

        {/* Target Time Zone */}
        <div className="space-y-5 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FontAwesomeIcon icon={faHistory} className="text-blue-500" />
            Target
          </h3>

          <div>
            <label htmlFor="targetTimeZone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Zone
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search time zone..."
                value={targetSearch}
                onChange={(e) => setTargetSearch(e.target.value)}
                onFocus={() => setTargetDropdownOpen(true)}
                onBlur={() => setTimeout(() => setTargetDropdownOpen(false), 200)}
                onKeyDown={(e) => handleKeyDown(e, filteredTargetTimezones, targetTimeZone, setTargetTimeZone)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition duration-200"
                aria-label="Search time zones"
                aria-controls="targetTimeZoneList"
                role="combobox"
                aria-expanded={targetDropdownOpen}
                aria-autocomplete="list"
              />
              {targetDropdownOpen && (
                <div
                  id="targetTimeZoneList"
                  className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
                  role="listbox"
                >
                  {filteredTargetTimezones.map((tz) => {
                    const dt = DateTime.now().setZone(tz);
                    const offset = dt.toFormat('ZZ');
                    return (
                      <button
                        key={tz}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${tz === targetTimeZone ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                        onClick={() => {
                          setTargetTimeZone(tz);
                          setTargetSearch(tz);
                          setTargetDropdownOpen(false);
                        }}
                        role="option"
                        aria-selected={tz === targetTimeZone}
                      >
                        {tz.replace('_', ' ')} (UTC{offset}) {tz === targetTimeZone && isDST.target ? '(DST)' : ''}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {convertedTime && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Converted Time:</h4>
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-mono">{convertedTime}</pre>
            </div>
          )}

          {/* Weather Information */}
          {weatherData && !isLoading.weather && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCloud} className="text-blue-500" />
                Weather
              </h4>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faTemperatureHigh} className="text-blue-500" />
                  Temperature: {weatherData.temperature}°C
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faTint} className="text-blue-500" />
                  Humidity: {weatherData.humidity}%
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faWind} className="text-blue-500" />
                  Wind: {weatherData.windSpeed} km/h
                </p>
              </div>
            </div>
          )}

          {/* Travel Information */}
          {travelInfo && !isLoading.travel && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Travel Information</h4>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                 <FontAwesomeIcon icon={faPlane} className="text-blue-500" />
                  Flight: {travelInfo.travelTimes.plane} hours
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faTrain} className="text-blue-500" />
                  Train: {travelInfo.travelTimes.train} hours
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faCar} className="text-blue-500" />
                  Car: {travelInfo.travelTimes.car} hours
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faBus} className="text-blue-500" />
                  Bus: {travelInfo.travelTimes.bus} hours
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faBicycle} className="text-blue-500" />
                  Bicycle: {travelInfo.travelTimes.bike} hours
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faPersonWalking} className="text-blue-500" />
                  Walking: {travelInfo.travelTimes.foot} hours
                </p>
              </div>
            </div>
          )}

          {/* Map Section */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faMap} className="text-blue-500" />
              Location Map
            </h4>
            {isLoading.map ? (
              <Skeleton className="h-64 w-full rounded-lg" />
            ) : mapCoordinates ? (
              <Map timezone={targetTimeZone} coordinates={mapCoordinates} />
            ) : (
              <div className="h-64 w-full rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Map not available for this timezone
              </div>
            )}
          </div>

          {/* Landmark Information */}
          {landmarkInfo && !isLoading.landmarks && (
            <div className="mt-6 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <FontAwesomeIcon icon={faLandmark} className="mr-2" />
                  Cultural & Historical Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Famous Places</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.famousPlaces.map((place, index) => (
                          <li key={index}>{place}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Cultural Significance</h4>
                      <p>{landmarkInfo.culturalSignificance}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Historical Facts</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.historicalFacts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Population</h4>
                      <p>{landmarkInfo.population}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Architecture</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.architecture.map((style, index) => (
                          <li key={index}>{style}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Museums</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.museums.map((museum, index) => (
                          <li key={index}>{museum}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Natural Attractions</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.naturalAttractions.map((attraction, index) => (
                          <li key={index}>{attraction}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Modern Landmarks</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.modernLandmarks.map((landmark, index) => (
                          <li key={index}>{landmark}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Religious Places</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.religiousPlaces.map((place, index) => (
                          <li key={index}>{place}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Seasonal Events</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.seasonalEvents.map((event, index) => (
                          <li key={index}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading States */}
          {(isLoading.weather || isLoading.travel || isLoading.landmarks) && (
            <div className="space-y-4">
              {isLoading.weather && <Skeleton className="h-32" />}
              {isLoading.travel && <Skeleton className="h-48" />}
              {isLoading.landmarks && <Skeleton className="h-32" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
