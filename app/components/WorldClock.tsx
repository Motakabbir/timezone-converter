'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlus, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

import { getAvailableTimezones } from '../utils/timezones';

// Get available timezones including user's timezone
const COMMON_TIMEZONES = getAvailableTimezones();

type ClockItem = {
  id: string;
  timezone: string;
  label: string;
};

export default function WorldClock() {
  const [clocks, setClocks] = useState<ClockItem[]>([]);
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
  const [newTimezone, setNewTimezone] = useState<string>('UTC');
  const [customLabel, setCustomLabel] = useState<string>('');
  
  // Initialize with user's timezone and a few common ones
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const initialClocks: ClockItem[] = [
      { id: '1', timezone: userTimezone, label: 'Local Time' },
      { id: '2', timezone: 'UTC', label: 'UTC' },
      { id: '3', timezone: 'America/New_York', label: 'New York' },
      { id: '4', timezone: 'Europe/London', label: 'London' },
    ];
    
    setClocks(initialClocks);
  }, []);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const addClock = () => {
    if (!newTimezone) return;
    
    const label = customLabel || newTimezone.split('/').pop()?.replace('_', ' ') || newTimezone;
    
    setClocks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        timezone: newTimezone,
        label
      }
    ]);
    
    setCustomLabel('');
  };
  
  const removeClock = (id: string) => {
    setClocks(prev => prev.filter(clock => clock.id !== id));
  };
  
  const formatTime = (timezone: string) => {
    try {
      const time = currentTime.setZone(timezone);
      return {
        time: time.toFormat('HH:mm:ss'),
        date: time.toFormat('EEE, MMM d, yyyy'),
        offset: time.toFormat('ZZZZ'),
        isDST: time.isInDST,
        isDaytime: time.hour >= 6 && time.hour < 18 // Simple day/night check
      };
    } catch (error) {
      console.error(`Error formatting time for ${timezone}:`, error);
      return {
        time: '--:--:--',
        date: '------',
        offset: '',
        isDST: false,
        isDaytime: true
      };
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-500" />
        World Clock
      </h2>
      
      {/* Add new clock */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Add Location</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <select
              value={newTimezone}
              onChange={(e) => setNewTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Custom Label (optional)"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={addClock}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Clock
          </button>
        </div>
      </div>
      
      {/* Clock grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clocks.map((clock) => {
          const { time, date, offset, isDST, isDaytime } = formatTime(clock.timezone);
          
          return (
            <div 
              key={clock.id} 
              className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeClock(clock.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove clock"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              
              <div className="flex items-center mb-2">
                <FontAwesomeIcon 
                  icon={isDaytime ? faSun : faMoon} 
                  className={`mr-2 ${isDaytime ? 'text-yellow-500' : 'text-indigo-400'}`} 
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{clock.label}</h3>
              </div>
              
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{time}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{date}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                <span>{offset}</span>
                {isDST && (
                  <span className="ml-2 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                    DST
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {clocks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No clocks added yet. Add a location to get started.
        </div>
      )}
    </div>
  );
}