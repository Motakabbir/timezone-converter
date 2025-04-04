import { Metadata } from "next";

const metadata: Metadata = {
  title: "Time Zone Converter | World Clock & Meeting Planner",
  description: "A modern time zone converter and time-related utility app with world clock, meeting planner, and daylight saving time adjustment",
  keywords: ["time zone converter", "world clock", "meeting planner", "daylight saving time", "time utility"],
  metadataBase: new URL("https://timezone-converter.vercel.app"),
  authors: [{ name: "Timezone Converter Team" }],
  openGraph: {
    title: "Time Zone Converter | World Clock & Meeting Planner",
    description: "A modern time zone converter and time-related utility app with world clock, meeting planner, and daylight saving time adjustment",
    url: "https://timezone-converter.vercel.app",
    siteName: "Timezone Converter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time Zone Converter | World Clock & Meeting Planner",
    description: "A modern time zone converter and time-related utility app with world clock, meeting planner, and daylight saving time adjustment",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default metadata;