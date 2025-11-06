"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Timeline from "@/components/Timeline";
import CountryInfo from "@/components/CountryInfo";

// Import WorldMap without SSR
const WorldMap = dynamic(() => import("@/components/WorldMapComponent"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
      }}
    >
      Loading Globe...
    </div>
  ),
});

export default function Home() {
  // State for selected year
  const [selectedYear, setSelectedYear] = useState(1500);

  // State for selected country
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    name: string;
    flagUrl?: string;
  } | null>(null);

  const handleCountryClick = (countryCode: string, countryName: string) => {
    // For now, set country without flag URL
    // Later: fetch flag URL from Supabase here
    setSelectedCountry({
      code: countryCode,
      name: countryName,
      flagUrl: undefined, // Will come from Supabase later
    });

    console.log("Clicked:", countryName, countryCode, "Year:", selectedYear);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    console.log("Year changed to:", year);
  };

  const handleExplore = () => {
    if (selectedCountry) {
      console.log("Exploring:", selectedCountry.name, "in year", selectedYear);
      // TODO: Open modal with historical events
      alert(`Exploring ${selectedCountry.name} in ${selectedYear}!`);
    }
  };

  return (
    <main
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Globe (background layer) */}
      <WorldMap onCountryClick={handleCountryClick} />

      {/* Timeline (top left) */}
      <Timeline year={selectedYear} onYearChange={handleYearChange} />

      {/* Country Info (below timeline, only show if country selected) */}
      {selectedCountry && (
        <CountryInfo
          countryName={selectedCountry.name}
          countryCode={selectedCountry.code}
          year={selectedYear} // Add this line
          flagUrl={selectedCountry.flagUrl}
          onExplore={handleExplore}
        />
      )}
    </main>
  );
}
