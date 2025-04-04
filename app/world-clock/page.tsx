'use client';

import WorldClock from "../components/WorldClock";
import AdSense from "../components/AdSense";

export default function WorldClockPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <WorldClock />
        <AdSense
          adSlot="1234567890"
          adFormat="horizontal"
          style={{ minHeight: '90px', marginTop: '2rem' }}
        />
      </main>
    </div>
  );
}