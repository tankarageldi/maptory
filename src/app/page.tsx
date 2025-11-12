"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Timeline from "@/components/Timeline";
import CountryInfo from "@/components/CountryInfo";
import { getCountryByCode } from "@/lib/database";
import type { Country } from "@/lib/types";

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

  // State for selected country from Supabase
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Loading state
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);

  const handleCountryClick = async (
    countryCode: string,
    countryName: string
  ) => {
    console.log("🖱️ Clicked:", countryName, countryCode);

    setIsLoadingCountry(true);

    try {
      // Fetch detailed country info from Supabase
      const countryData = await getCountryByCode(countryCode);

      if (countryData) {
        setSelectedCountry(countryData);
        console.log("✅ Loaded country data from Supabase:", countryData);
      } else {
        console.warn(`⚠️ Country ${countryCode} not found in database`);
        // Fallback: create basic country object from GeoJSON data
        setSelectedCountry({
          country_code: countryCode,
          name: countryName,
          flag_url: null,
          current_capital: null,
          current_population: null,
          region: null,
          created_at: "",
          updated_at: "",
        } as Country);
      }
    } catch (error) {
      console.error("❌ Error fetching country:", error);
    } finally {
      setIsLoadingCountry(false);
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    console.log("📅 Year changed to:", year);
  };

  const handleExplore = () => {
    if (selectedCountry) {
      console.log(
        "🔍 Exploring:",
        selectedCountry.name,
        "in year",
        selectedYear
      );
      // TODO: Open modal with historical events from database
      alert(
        `Exploring ${selectedCountry.name} in ${selectedYear}!\n\nHistorical events coming soon...`
      );
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
          countryCode={selectedCountry.country_code}
          year={selectedYear}
          flagUrl={selectedCountry.flag_url || undefined}
          capital={selectedCountry.current_capital || undefined}
          population={selectedCountry.current_population || undefined}
          region={selectedCountry.region || undefined}
          onExplore={handleExplore}
          isLoading={isLoadingCountry}
        />
      )}
    </main>
  );
}
