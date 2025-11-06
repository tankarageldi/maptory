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
// This creates a unique color for each country based on its name
// Same country always gets the same color
// ========================================
function getCountryColor(countryName: string): string {
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Limit hue to 0-60 (reds to yellows)
  const hue = Math.abs(hash % 60);

  return `hsl(${hue}, 70%, 50%)`;
}

// ========================================
// HELPER FUNCTION: Calculate Country Center
// Used for zooming camera to a country when clicked
// ========================================
/**
 * Get country center from properties if available
 * Falls back to bounding box calculation
 * @param country - The GeoJSON country feature
 * @returns {lat, lng} coordinates of the center
 */
function getCountryCenter(country: any) {
  const props = country.properties;

  // Check if the GeoJSON already has center coordinates
  // Different files use different property names
  if (props.LAT && props.LONG) {
    return { lat: props.LAT, lng: props.LONG };
  }

  if (props.LABEL_Y && props.LABEL_X) {
    return { lat: props.LABEL_Y, lng: props.LABEL_X };
  }

  // Fallback: Calculate bounding box center
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
// Determines how far to zoom based on country size
// Bigger countries need more distance to fit in view
// ========================================
function getZoomAltitude(country: any): number {
  const geometry = country.geometry;

  // Calculate bounding box dimensions
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

  // Calculate span (size) of country
  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const maxSpan = Math.max(latSpan, lngSpan);

  // Calculate appropriate altitude
  // Small countries (islands): zoom close (altitude ~0.5)
  // Large countries (Russia, Canada): zoom far (altitude ~2.5)
  const altitude = 1.5; // Adjust divisor for sensitivity

  return altitude;
}

// ========================================
// COMPONENT
// ========================================
export default function WorldMap({ onCountryClick }: WorldMapProps) {
  // ========================================
  // STATE
  // ========================================

  // Store all country features from GeoJSON
  const [countries, setCountries] = useState({ features: [] });

  // Track which country is currently hovered (for highlighting)
  const [hoverD, setHoverD] = useState<any>(null);

  // Reference to the Globe component (for controlling camera)
  const globeEl = useRef<any>(null);

  // ========================================
  // LOAD COUNTRY DATA ON MOUNT
  // ========================================
  useEffect(() => {
    console.log("🌍 Loading country data...");

    // Fetch GeoJSON file from public folder
    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Loaded", data.features.length, "countries");
        setCountries(data);
      })
      .catch((err) => console.error("❌ Error loading countries:", err));
  }, []);

  // ========================================
  // INITIALIZE GLOBE SETTINGS
  // ========================================
  useEffect(() => {
    if (globeEl.current) {
      // Set initial camera position
      globeEl.current.pointOfView({ altitude: 2.5 });

      // Enable auto-rotation
      const controls = globeEl.current.controls();
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = 0.35;

      console.log("🎥 Globe initialized");
    }
  }, []);

  // ========================================
  // EVENT HANDLER: Country Click
  // Zooms to country and notifies parent component
  // ========================================
  const handleCountryClick = (country: any) => {
    if (country && country.properties) {
      const countryCode = country.properties.ISO_A2;
      const countryName = country.properties.ADMIN;

      console.log("🖱️ Clicked:", countryName);

      // Notify parent component
      if (onCountryClick) {
        onCountryClick(countryCode, countryName);
      }

      // Zoom camera to country
      if (globeEl.current) {
        // Calculate center point of country
        const { lat, lng } = getCountryCenter(country);

        // Calculate appropriate zoom distance
        const altitude = getZoomAltitude(country);

        console.log(
          `📍 Zooming to: ${countryName} at (${lat.toFixed(2)}, ${lng.toFixed(
            2
          )}) altitude: ${altitude.toFixed(2)}`
        );

        // Animate camera to country
        // Parameters: { lat, lng, altitude }, duration_in_ms
        globeEl.current.pointOfView(
          { lat, lng, altitude },
          1500 // 1.5 seconds smooth animation
        );
      }
    }
  };

  // ========================================
  // COLOR FUNCTION: Determine Country Color
  // Returns different color for each country
  // Brighter when hovered
  // ========================================
  const getPolygonColor = (country: any) => {
    // Get country name
    const countryName = country.properties.ADMIN || "Unknown";

    // Generate base color for this country
    const baseColor = getCountryColor(countryName);

    // If this country is hovered, return a brighter gold color
    if (country === hoverD) {
      return "#fbbf24"; // Gold/amber for hover
    }

    // Otherwise return the country's unique color
    return baseColor;
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <Globe
      ref={globeEl}
      // ====================================
      // GLOBE APPEARANCE
      // ====================================

      // Earth texture (night view with city lights)
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      // Space background with stars
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // ====================================
      // COUNTRY POLYGONS
      // ====================================

      // Array of country features to render
      polygonsData={countries.features}
      // Height of each country polygon
      // Hovered countries are taller (0.12) than others (0.06)
      polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
      // Color of country top surface (unique per country)
      polygonCapColor={getPolygonColor}
      // Color of country side walls (semi-transparent)
      polygonSideColor={() => "rgba(0, 0, 0, 0.3)"}
      // Color of country borders
      polygonStrokeColor={() => "#111"}
      // Tooltip shown on hover
      polygonLabel={({ properties }: any) => `
        <b>${properties.ADMIN}</b> <br />
        <i>${properties.ISO_A2}</i>
      `}
      // ====================================
      // INTERACTION EVENTS
      // ====================================

      // Called when mouse enters/leaves a country
      onPolygonHover={setHoverD}
      // Called when country is clicked
      onPolygonClick={handleCountryClick}
      // ====================================
      // ANIMATION SETTINGS
      // ====================================

      // Duration for polygon animations (hover effects)
      // 300ms = smooth and responsive
      polygonsTransitionDuration={300}
    />
  );
}
