import TimeZoneConverter from "./components/TimeZoneConverter";
import AdSense from "./components/AdSense";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <TimeZoneConverter />
        <AdSense
          adSlot="1234567890"
          adFormat="horizontal"
          style={{ minHeight: '90px', marginTop: '2rem' }}
        />
      </main>
    </div>
  );
}
