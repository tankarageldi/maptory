"use client";

// ========================================
// IMPORTS
// ========================================
import { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";

// ========================================
// INTERFACES
// ========================================
interface WorldMapProps {
  onCountryClick?: (countryCode: string, countryName: string) => void;
}

// ========================================
// HELPER FUNCTION: Generate Consistent Color Per Country
// ========================================
function getCountryColor(countryName: string): string {
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 60);
  return `hsl(${hue}, 70%, 50%)`;
}

// ========================================
// HELPER FUNCTION: Calculate Country Center
// ========================================
function getCountryCenter(country: any) {
  const props = country.properties;

  if (props.LAT && props.LONG) {
    return { lat: props.LAT, lng: props.LONG };
  }

  if (props.LABEL_Y && props.LABEL_X) {
    return { lat: props.LABEL_Y, lng: props.LABEL_X };
  }

  const geometry = country.geometry;
  let minLat = 90,
    maxLat = -90,
    minLng = 180,
    maxLng = -180;

  const updateBounds = (coords: any[]) => {
    coords.forEach((coord) => {
      const lng = coord[0];
      const lat = coord[1];
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });
  };

  if (geometry.type === "Polygon") {
    updateBounds(geometry.coordinates[0]);
  } else if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach((polygon: any[]) => {
      updateBounds(polygon[0]);
    });
  }

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
}

// ========================================
// HELPER FUNCTION: Calculate Zoom Distance
// ========================================
function getZoomAltitude(country: any): number {
  const geometry = country.geometry;

  let minLat = 90,
    maxLat = -90,
    minLng = 180,
    maxLng = -180;

  const updateBounds = (coords: any[]) => {
    coords.forEach((coord) => {
      const lng = coord[0];
      const lat = coord[1];
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });
  };

  if (geometry.type === "Polygon") {
    updateBounds(geometry.coordinates[0]);
  } else if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach((polygon: any[]) => {
      updateBounds(polygon[0]);
    });
  }

  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const maxSpan = Math.max(latSpan, lngSpan);

  // Adjust altitude based on country size
  const altitude = 1.5;

  return altitude;
}

// ========================================
// COMPONENT
// ========================================
export default function WorldMap({ onCountryClick }: WorldMapProps) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState<any>(null);
  const globeEl = useRef<any>(null);

  // ========================================
  // LOAD COUNTRY DATA ON MOUNT
  // ========================================
  useEffect(() => {
    fetch("2025.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.error("Error loading countries:", err));
  }, []);

  // ========================================
  // INITIALIZE GLOBE SETTINGS
  // ========================================
  useEffect(() => {
    if (globeEl.current) {
      // Set initial camera position
      globeEl.current.pointOfView({ altitude: 2.5 });

      // Check controls
      const controls = globeEl.current.controls();
    }
  }, [countries]); // Run after countries are loaded

  // ========================================
  // EVENT HANDLER: Country Click
  // ========================================
  const handleCountryClick = (country: any) => {
    if (country && country.properties) {
      // Try multiple possible property names
      const countryCode =
        country.properties.ISO_A3 ||
        country.properties.ADM0_A3 ||
        country.properties.ISO_A2 ||
        "UNKNOWN";

      const countryName = country.properties.ADMIN || country.properties.NAME;

      // Notify parent component
      if (onCountryClick) {
        onCountryClick(countryCode, countryName);
      }

      // Zoom camera to country
      if (globeEl.current) {
        const { lat, lng } = getCountryCenter(country);
        const altitude = getZoomAltitude(country);

        // Animate camera to country
        globeEl.current.pointOfView(
          { lat, lng, altitude },
          1500 // 1.5 seconds
        );
      } else {
        console.error("globeEl.current is null - cannot zoom!");
      }
    }
  };

  // ========================================
  // COLOR FUNCTION
  // ========================================
  const getPolygonColor = (country: any) => {
    const countryName = country.properties.ADMIN || "Unknown";
    const baseColor = getCountryColor(countryName);

    if (country === hoverD) {
      return "#fbbf24";
    }

    return baseColor;
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={getPolygonColor}
      polygonSideColor={() => "rgba(0, 0, 0, 0.3)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties }: any) => `
        <b>${properties.ADMIN}</b> <br />
        <i>${properties.ISO_A3 || properties.ADM0_A3 || "N/A"}</i>
      `}
      onPolygonHover={setHoverD}
      onPolygonClick={handleCountryClick}
      polygonsTransitionDuration={300}
    />
  );
}
