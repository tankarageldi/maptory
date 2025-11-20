"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
// import Timeline from "@/components/Timeline"; // Commented out
import { CountrySearch } from "@/components/CountrySearch";
import HistoryDrawer from "@/components/HistoryDrawer";

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
  const [selectedYear, setSelectedYear] = useState(2025);

  // State for selected country
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    name: string;
    flagUrl?: string;
  } | null>(null);

  // State for drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleCountrySearch = (countryCode: string, countryName: string) => {
    // When a country is selected from search, select it
    console.log("🔍 Search selected:", countryName, countryCode);

    setSelectedCountry({
      code: countryCode,
      name: countryName,
      flagUrl: undefined,
    });

    // TODO: Zoom globe to this country
    // You'll need to add a method to WorldMap to programmatically zoom to a country
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    console.log("Year changed to:", year);
  };

  const handleExplore = () => {
    if (selectedCountry) {
      console.log(
        "Opening drawer for:",
        selectedCountry.name,
        "in year",
        selectedYear
      );
      setIsDrawerOpen(true);
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

      {/* Country Search (top left) */}
      <CountrySearch
        onCountrySelect={handleCountrySearch}
        selectedCountryCode={selectedCountry?.code || ""}
        onExplore={handleExplore}
      />

      {/* History Drawer */}
      {selectedCountry && (
        <HistoryDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          countryName={selectedCountry.name}
          countryCode={selectedCountry.code}
          year={selectedYear}
        />
      )}
    </main>
  );
}
