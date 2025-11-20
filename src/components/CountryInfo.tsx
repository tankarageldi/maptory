"use client";

import { Button } from "@/components/ui/button";

interface CountryInfoProps {
  countryName: string;
  countryCode: string;
  year: number;
  flagUrl?: string;
  capital?: string;
  population?: number;
  region?: string;
  onExplore: () => void;
  isLoading?: boolean;
}

export default function CountryInfo({
  countryName,
  countryCode,
  year,
  flagUrl,
  capital,
  population,
  region,
  onExplore,
  isLoading = false,
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
      {/* Loading State */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #f3f4f6",
              borderTop: "3px solid #f59e0b",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: "12px", color: "#64748b", fontSize: "14px" }}>
            Loading country data...
          </p>
        </div>
      ) : (
        <>
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
                  width: "48px",
                  height: "36px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "1px solid #e2e8f0",
                }}
              />
            ) : (
              <div
                style={{
                  width: "48px",
                  height: "36px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
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
                  fontFamily: "monospace",
                }}
              >
                {countryCode}
              </div>
            </div>
          </div>

          {/* Country Details from Supabase */}
          <div
            style={{
              marginBottom: "12px",
              padding: "12px",
              background: "white",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            {capital && (
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Capital
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#1e293b",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  {capital}
                </div>
              </div>
            )}

            {population && (
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Population (2025)
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#1e293b",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  {population.toLocaleString()}
                </div>
              </div>
            )}

            {region && (
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Region
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#1e293b",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  {region}
                </div>
              </div>
            )}
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
                {year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`}
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
        </>
      )}

      {/* CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
