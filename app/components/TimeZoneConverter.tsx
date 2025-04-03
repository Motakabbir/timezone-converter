'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faClock, faCalendarDay, faCloud, faTemperatureHigh, faTint, faWind, faPlane, faTrain, faCar, faBus, faBicycle, faPersonWalking, faLandmark, faHistory } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

import { getAvailableTimezones } from '../utils/timezones';
import { getWeatherForTimezone, WeatherData } from '../utils/weather';
import { getTravelInfo, TravelInfo } from '../utils/distance';
import { getLandmarkInfo, LandmarkInfo } from '../utils/landmarks';

// Get available timezones including user's timezone
const AVAILABLE_TIMEZONES = getAvailableTimezones();

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceDate, setSourceDate] = useState('');
  const [sourceTimeZone, setSourceTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetTimeZone, setTargetTimeZone] = useState('Europe/London');
  const [convertedTime, setConvertedTime] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [landmarkInfo, setLandmarkInfo] = useState<LandmarkInfo | null>(null);
  const [isDST, setIsDST] = useState({ source: false, target: false });
  const [availableTimeZones] = useState<string[]>(AVAILABLE_TIMEZONES);
  const [sourceSearch, setSourceSearch] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetSearch, setTargetSearch] = useState('Europe/London');
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [targetDropdownOpen, setTargetDropdownOpen] = useState(false);

  // Filter timezones based on search input
  const filteredSourceTimezones = availableTimeZones.filter(tz =>
    tz.toLowerCase().includes(sourceSearch.toLowerCase())
  );
  const filteredTargetTimezones = availableTimeZones.filter(tz =>
    tz.toLowerCase().includes(targetSearch.toLowerCase())
  );

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
    }
  }, [sourceDate, sourceTime, sourceTimeZone, targetTimeZone]);

  const updateTravelInfo = () => {
    const travel = getTravelInfo(sourceTimeZone, targetTimeZone);
    setTravelInfo(travel);
  };

  const updateLandmarkInfo = () => {
    const landmarks = getLandmarkInfo(targetTimeZone);
    setLandmarkInfo(landmarks);
  };

  const fetchWeatherData = async () => {
    const weather = await getWeatherForTimezone(targetTimeZone);
    setWeatherData(weather);
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
        Time Zone Converter
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
        
        {/* Swap Button - Centered between panels */}
        <button
          onClick={swapTimeZones}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-full shadow-lg text-white hover:shadow-blue-500/20 hover:scale-110 transform transition-all duration-300 z-10"
          aria-label="Swap time zones"
        >
          <FontAwesomeIcon icon={faExchangeAlt} className="h-6 w-6" />
          <span className="sr-only">Swap time zones</span>
        </button>
        
        {/* Target Time Zone */}
        <div className="space-y-5 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarDay} className="text-blue-500" />
              Target
            </h3>
            <button
              onClick={swapTimeZones}
              className="md:hidden text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2"
              aria-label="Swap time zones"
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="h-5 w-5" />
              <span className="sr-only">Swap time zones</span>
            </button>
          </div>
          
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
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-200/50 dark:border-gray-600 shadow-inner">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Converted Time</h4>
                <div className="space-y-1">
                  {convertedTime.split('\n').map((line, index) => (
                    <p key={index} className="text-lg font-semibold text-gray-900 dark:text-white">{line}</p>
                  ))}
                </div>
              </div>
              
              {weatherData && (
                <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-sky-200/50 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <FontAwesomeIcon icon={faCloud} className="text-blue-500" />
                    Current Weather in {weatherData.location}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faTemperatureHigh} className="text-red-500" />
                      <span>{weatherData.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faTint} className="text-blue-500" />
                      <span>{weatherData.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faWind} className="text-green-500" />
                      <span>{weatherData.windSpeed} m/s Wind</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                        alt={weatherData.description}
                        className="w-8 h-8"
                      />
                      <span className="capitalize">{weatherData.description}</span>
                    </div>
                  </div>
                </div>
              )}

              {travelInfo && (
                <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-purple-200/50 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlane} className="text-purple-500" />
                    Travel Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faPlane} />
                      <span>By Air: {travelInfo.travelTimes.plane}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faTrain} />
                      <span>By Train: {travelInfo.travelTimes.train}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faCar} />
                      <span>By Car: {travelInfo.travelTimes.car}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faBus} />
                      <span>By Bus: {travelInfo.travelTimes.bus}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faBicycle} />
                      <span>By Bike: {travelInfo.travelTimes.bike}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faPersonWalking} />
                      <span>Walking: {travelInfo.travelTimes.foot}h</span>
                    </div>
                  </div>
                </div>
              )}

              {landmarkInfo && (
                <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50/50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-amber-200/50 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLandmark} className="text-amber-500" />
                    Local Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Famous Places</h5>
                      <div className="flex flex-wrap gap-2">
                        {landmarkInfo.famousPlaces.map((place, index) => (
                          <span key={index} className="px-3 py-1 bg-amber-100/50 dark:bg-amber-900/30 rounded-full text-sm text-gray-700 dark:text-gray-300">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Cultural Significance</h5>
                      <p className="text-gray-700 dark:text-gray-300">{landmarkInfo.culturalSignificance}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Historical Facts</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {landmarkInfo.historicalFacts.map((fact, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{fact}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Population</h5>
                        <p className="text-gray-700 dark:text-gray-300">{landmarkInfo.population}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Food & Dining</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {landmarkInfo.foodHabits.map((habit, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{habit}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Local Customs</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {landmarkInfo.localCustoms.map((custom, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{custom}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Cultural Behavior</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {landmarkInfo.culturalBehavior.map((behavior, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{behavior}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
      
      {/* DST Information */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-md shadow-sm">
        <FontAwesomeIcon icon={faCalendarDay} className="mr-2 text-blue-500" />
        <span>
          {isDST.source && `${sourceTimeZone.replace('_', ' ')} is currently in Daylight Saving Time. `}
          {isDST.target && `${targetTimeZone.replace('_', ' ')} is currently in Daylight Saving Time. `}
          {!isDST.source && !isDST.target && 'Neither time zone is currently in Daylight Saving Time.'}
        </span>
      </div>
    </div>
  );
}
