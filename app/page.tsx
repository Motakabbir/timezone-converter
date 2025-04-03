import TimeZoneConverter from "./components/TimeZoneConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <TimeZoneConverter />
      </main>
    </div>
  );
}
