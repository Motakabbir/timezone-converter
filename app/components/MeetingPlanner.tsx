'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlus, faTimes, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

// List of common time zones
const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',      // Eastern Time
  'America/Chicago',       // Central Time
  'America/Denver',        // Mountain Time
  'America/Los_Angeles',   // Pacific Time
  'Europe/London',         // GMT/BST
  'Europe/Paris',          // Central European Time
  'Europe/Berlin',         // Central European Time
  'Asia/Tokyo',            // Japan Standard Time
  'Asia/Shanghai',         // China Standard Time
  'Asia/Kolkata',          // Indian Standard Time
  'Australia/Sydney',      // Australian Eastern Time
  'Pacific/Auckland',      // New Zealand Time
];

type Participant = {
  id: string;
  name: string;
  timezone: string;
};

type TimeSlot = {
  hour: number;
  minute: number;
};

const BUSINESS_HOURS = {
  start: { hour: 9, minute: 0 },  // 9:00 AM
  end: { hour: 17, minute: 0 }    // 5:00 PM
};

export default function MeetingPlanner() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newName, setNewName] = useState('');
  const [newTimezone, setNewTimezone] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingDuration, setMeetingDuration] = useState(60); // minutes
  const [suggestedTimes, setSuggestedTimes] = useState<{time: string, suitable: boolean}[]>([]);
  
  // Initialize with user's timezone
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setNewTimezone(userTimezone);
    
    // Set default date to tomorrow
    const tomorrow = DateTime.now().plus({ days: 1 });
    setMeetingDate(tomorrow.toFormat('yyyy-MM-dd'));
    
    // Add current user as first participant
    setParticipants([{
      id: '1',
      name: 'Me',
      timezone: userTimezone
    }]);
  }, []);
  
  const addParticipant = () => {
    if (!newName || !newTimezone) return;
    
    setParticipants(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        timezone: newTimezone
      }
    ]);
    
    setNewName('');
  };
  
  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };
  
  const findSuitableTimes = () => {
    if (!meetingDate || participants.length === 0) return;
    
    const date = DateTime.fromISO(meetingDate);
    const times: {time: string, suitable: boolean}[] = [];
    
    // Check each hour of the day
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) { // Check 30-minute intervals
        const baseTime = date.set({ hour, minute });
        let isSuitable = true;
        
        // Check if this time works for all participants
        for (const participant of participants) {
          const localTime = baseTime.setZone(participant.timezone);
          const localHour = localTime.hour;
          const localMinute = localTime.minute;
          
          // Check if time is within business hours for this participant
          const isWithinBusinessHours = 
            (localHour > BUSINESS_HOURS.start.hour || 
             (localHour === BUSINESS_HOURS.start.hour && localMinute >= BUSINESS_HOURS.start.minute)) &&
            (localHour < BUSINESS_HOURS.end.hour || 
             (localHour === BUSINESS_HOURS.end.hour && localMinute <= BUSINESS_HOURS.end.minute));
          
          if (!isWithinBusinessHours) {
            isSuitable = false;
            break;
          }
          
          // Check if meeting would extend beyond business hours
          const meetingEndTime = localTime.plus({ minutes: meetingDuration });
          const endHour = meetingEndTime.hour;
          const endMinute = meetingEndTime.minute;
          
          const endIsWithinBusinessHours = 
            (endHour < BUSINESS_HOURS.end.hour || 
             (endHour === BUSINESS_HOURS.end.hour && endMinute <= BUSINESS_HOURS.end.minute));
          
          if (!endIsWithinBusinessHours) {
            isSuitable = false;
            break;
          }
        }
        
        times.push({
          time: baseTime.toFormat('HH:mm'),
          suitable: isSuitable
        });
      }
    }
    
    setSuggestedTimes(times);
  };
  
  const formatTimeForParticipant = (time: string, timezone: string) => {
    try {
      const dateTime = DateTime.fromISO(`${meetingDate}T${time}:00`, { zone: 'UTC' });
      const localTime = dateTime.setZone(timezone);
      return localTime.toFormat('HH:mm');
    } catch (error) {
      console.error('Error formatting time:', error);
      return '--:--';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
        Meeting Planner
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Meeting Settings */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Meeting Details</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meeting Date
              </label>
              <input
                type="date"
                id="meetingDate"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="meetingDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (minutes)
              </label>
              <select
                id="meetingDuration"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            
            <button
              onClick={findSuitableTimes}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Find Suitable Times
            </button>
          </div>
        </div>
        
        {/* Participants */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Participants</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Participant Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              
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
              
              <button
                onClick={addParticipant}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Participant
              </button>
            </div>
            
            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
              {participants.map((participant) => (
                <div 
                  key={participant.id} 
                  className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded-md shadow-sm"
                >
                  <div>
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300 ml-2">
                      ({participant.timezone.replace('_', ' ')})
                    </span>
                  </div>
                  {participant.id !== '1' && (
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove participant"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Suggested Times */}
      {suggestedTimes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Suggested Meeting Times</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    UTC Time
                  </th>
                  {participants.map((participant) => (
                    <th key={participant.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {participant.name}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {suggestedTimes
                  .filter((_, index) => index % 2 === 0) // Show only hourly slots to reduce clutter
                  .map((slot, index) => (
                    <tr key={index} className={slot.suitable ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {slot.time}
                      </td>
                      {participants.map((participant) => (
                        <td key={participant.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {formatTimeForParticipant(slot.time, participant.timezone)}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {slot.suitable ? (
                          <span className="text-green-600 dark:text-green-400 flex items-center">
                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                            Suitable
                          </span>
                        ) : (
                          <span className="text-red-500 dark:text-red-400">
                            Outside business hours
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Business hours are considered to be 9:00 AM - 5:00 PM in each participant's local time zone.</p>
          </div>
        </div>
      )}
    </div>
  );
}