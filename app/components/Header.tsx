'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-blue-500" />
          <span>TimeZone Converter</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Converter
          </Link>
          <Link href="/world-clock" className="hover:text-blue-500 transition-colors">
            World Clock
          </Link>
          <Link href="/meeting-planner" className="hover:text-blue-500 transition-colors">
            Meeting Planner
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}