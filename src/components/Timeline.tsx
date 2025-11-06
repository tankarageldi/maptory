"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TimelineProps {
  year: number;
  onYearChange: (year: number) => void;
}

export default function Timeline({ year, onYearChange }: TimelineProps) {
  const [inputValue, setInputValue] = useState(year.toString());

  const handleSliderChange = (values: number[]) => {
    const newYear = values[0];
    onYearChange(newYear);
    setInputValue(newYear.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && numValue >= 1000 && numValue <= 2025) {
      onYearChange(numValue);
    } else {
      setInputValue(year.toString());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Timeline
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "#94a3b8",
          }}
        >
          1000 - 2025 CE
        </span>
      </div>

      {/* Year Input */}
      <div style={{ marginBottom: "16px" }}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputSubmit}
          placeholder="Enter year"
          style={{
            height: "48px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            background: "white",
            border: "2px solid #e2e8f0",
            color: "red",
            borderRadius: "8px",
          }}
          className="focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>

      {/* Slider */}
      <div style={{ marginBottom: "12px" }}>
        <Slider
          value={[year]}
          onValueChange={handleSliderChange}
          min={1000}
          max={2025}
          step={1}
          className="w-full"
        />
      </div>

      {/* Era Label */}
      <p
        style={{
          fontSize: "12px",
          textAlign: "center",
          color: "#64748b",
          fontStyle: "italic",
          marginBottom: "12px",
        }}
      >
        {year < 1500
          ? "⚔️ Medieval Period"
          : year < 1800
          ? "🏛️ Early Modern"
          : year < 1900
          ? "🎩 19th Century"
          : year < 2000
          ? "📻 20th Century"
          : "💻 21st Century"}
      </p>

      {/* Quick Jump Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
        }}
      >
        {[1000, 1500, 2000].map((quickYear) => (
          <button
            key={quickYear}
            onClick={() => {
              onYearChange(quickYear);
              setInputValue(quickYear.toString());
            }}
            style={{
              padding: "6px",
              fontSize: "12px",
              background: "white",
              border: "1px solid #e2e8f0",
              color: "#475569",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fef3c7";
              e.currentTarget.style.borderColor = "#f59e0b";
              e.currentTarget.style.color = "#f59e0b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#475569";
            }}
          >
            {quickYear}
          </button>
        ))}
      </div>
    </div>
  );
}
