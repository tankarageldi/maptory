"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllCountries } from "@/lib/database";
import { Country } from "@/lib/types";

interface CountrySearchProps {
  onCountrySelect: (countryCode: string, countryName: string) => void;
  selectedCountryCode: string;
  onExplore: () => void;
}

export function CountrySearch({
  onCountrySelect,
  selectedCountryCode,
  onExplore,
}: CountrySearchProps) {
  const [open, setOpen] = React.useState(false);
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Sync internal value with external prop
  const value = selectedCountryCode;

  // Load countries on mount
  React.useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
      console.log("✅ Loaded", data.length, "countries for search");
    } catch (error) {
      console.error("❌ Error loading countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = countries.find((c) => c.country_code === value);

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        left: "24px",
        zIndex: 99999,
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            style={{
              width: "320px",
              height: "56px",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(251, 191, 36, 0.3)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              padding: "0 20px",
            }}
            className="hover:bg-amber-50 transition-colors"
          >
            {loading ? (
              "Loading countries..."
            ) : selectedCountry ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {selectedCountry.flag_url && (
                  <img
                    src={selectedCountry.flag_url}
                    alt={selectedCountry.name}
                    style={{
                      width: "24px",
                      height: "16px",
                      objectFit: "cover",
                      borderRadius: "2px",
                    }}
                  />
                )}
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              <span style={{ color: "#64748b" }}>
                🔍 Search for a country...
              </span>
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[320px] p-0"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(251, 191, 36, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
          }}
        >
          <Command>
            <CommandInput
              placeholder="Search country..."
              className="h-12"
              style={{ fontSize: "15px" }}
            />
            <CommandList style={{ maxHeight: "400px" }}>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.country_code}
                    value={`${country.name} ${country.country_code}`}
                    onSelect={() => {
                      const newValue =
                        country.country_code === value
                          ? ""
                          : country.country_code;
                      setOpen(false);

                      // Notify parent component
                      if (newValue) {
                        onCountrySelect(country.country_code, country.name);
                      }
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: 1,
                      }}
                    >
                      {country.flag_url && (
                        <img
                          src={country.flag_url}
                          alt={country.name}
                          style={{
                            width: "24px",
                            height: "16px",
                            objectFit: "cover",
                            borderRadius: "2px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          {country.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginTop: "2px",
                          }}
                        >
                          {country.country_code}
                          {country.region && ` • ${country.region}`}
                        </div>
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === country.country_code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Explore History Button */}
      <Button
        onClick={onExplore}
        disabled={!selectedCountry}
        style={{
          height: "56px",
          padding: "0 24px",
          background: selectedCountry ? "#f59e0b" : "#94a3b8",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: selectedCountry ? "pointer" : "not-allowed",
          boxShadow: selectedCountry
            ? "0 8px 32px rgba(245, 158, 11, 0.3)"
            : "0 4px 16px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (selectedCountry) {
            e.currentTarget.style.background = "#d97706";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(245, 158, 11, 0.4)";
          }
        }}
        onMouseLeave={(e) => {
          if (selectedCountry) {
            e.currentTarget.style.background = "#f59e0b";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(245, 158, 11, 0.3)";
          }
        }}
      >
        📚 Explore History
      </Button>
    </div>
  );
}
