import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="h-5 w-5 mr-2 text-blue-500" />
              TimeZone Converter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A modern time zone converter and time-related utility app with world clock, meeting planner, and daylight saving time adjustment.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-2" />
                  Time Zone Converter
                </Link>
              </li>
              <li>
                <Link href="/world-clock" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 mr-2" />
                  World Clock
                </Link>
              </li>
              <li>
                <Link href="/meeting-planner" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2" />
                  Meeting Planner
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              This application helps users convert time between different time zones, view multiple time zones simultaneously, plan meetings across time zones, and automatically adjusts for daylight saving time changes.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} TimeZone Converter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}