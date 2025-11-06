"use client";

import { Button } from "@/components/ui/button";

interface CountryInfoProps {
  countryName: string;
  countryCode: string;
  year: number; // Add year prop
  flagUrl?: string;
  onExplore: () => void;
}

export default function CountryInfo({
  countryName,
  countryCode,
  year, // Receive year
  flagUrl,
  onExplore,
}: CountryInfoProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: "240px",
        left: "24px",
        zIndex: 99999,
        width: "280px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
        border: "2px solid rgba(251, 191, 36, 0.3)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          📍 Selected
        </span>
      </div>

      {/* Country Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
          padding: "12px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Flag */}
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={`${countryName} flag`}
            style={{
              width: "40px",
              height: "30px",
              objectFit: "cover",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
            }}
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "30px",
              background: "#f1f5f9",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            🏴
          </div>
        )}

        {/* Country Name & Code */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e293b",
              lineHeight: "1.2",
            }}
          >
            {countryName}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              marginTop: "2px",
            }}
          >
            {countryCode}
          </div>
        </div>
      </div>

      {/* Year Display */}
      <div
        style={{
          marginBottom: "16px",
          padding: "10px 12px",
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          borderRadius: "8px",
          border: "1px solid #fbbf24",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "#92400e",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Time Period
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#b45309",
              marginTop: "2px",
            }}
          >
            {year} CE
          </div>
        </div>
        <div
          style={{
            fontSize: "24px",
          }}
        >
          🕰️
        </div>
      </div>

      {/* Explore Button */}
      <Button
        onClick={onExplore}
        className="w-full font-semibold shadow-md border-0"
        style={{
          background: "#f59e0b",
          color: "white",
          height: "40px",
          fontSize: "14px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#d97706";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f59e0b";
        }}
      >
        Explore History
      </Button>
    </div>
  );
}
