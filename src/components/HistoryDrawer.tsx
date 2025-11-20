"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getHistoricalEventsGroupedByCategory,
  getCountryByCode,
} from "@/lib/database";
import { HistoricalEvent, Country } from "@/lib/types";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  countryCode: string;
  year: number;
}

interface EventCategory {
  id: string;
  label: string;
  icon: string;
  events: HistoricalEvent[];
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  countryName,
  countryCode,
  year,
}: HistoryDrawerProps) {
  // Track which category is expanded
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Track which event is selected
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null
  );

  // State for event categories with data from database
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([
    { id: "war", label: "Wars & Conflicts", icon: "⚔️", events: [] },
    { id: "revolution", label: "Revolutions", icon: "✊", events: [] },
    { id: "discovery", label: "Discoveries", icon: "🔬", events: [] },
    {
      id: "natural_disaster",
      label: "Natural Disasters",
      icon: "🌪️",
      events: [],
    },
    { id: "politics", label: "Politics", icon: "🏛️", events: [] },
    { id: "social", label: "Social Changes", icon: "👥", events: [] },
    { id: "economics", label: "Economics", icon: "💰", events: [] },
    { id: "culture", label: "Culture & Arts", icon: "🎨", events: [] },
    { id: "religion", label: "Religion", icon: "🕌", events: [] },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // State for country general information
  const [countryData, setCountryData] = useState<Country | null>(null);

  // Helper function to format year as BCE/CE
  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    }
    return `${year} CE`;
  };

  // Fetch events from database when drawer opens or country changes
  useEffect(() => {
    if (isOpen && countryCode) {
      // Reset selected event and expanded category when country changes
      setSelectedEvent(null);
      setExpandedCategory(null);

      loadHistoricalEvents();
      loadCountryData();
    }
  }, [isOpen, countryCode]);

  const loadHistoricalEvents = async () => {
    setIsLoading(true);
    try {
      // Fetch ALL events for this country (no year range filter)
      const groupedEvents = await getHistoricalEventsGroupedByCategory(
        countryCode
        // No year range parameter - this fetches ALL events
      );

      // Update event categories with fetched data
      const newCategories = [
        {
          id: "war",
          label: "Wars & Conflicts",
          icon: "⚔️",
          events: groupedEvents.war || [],
        },
        {
          id: "revolution",
          label: "Revolutions",
          icon: "✊",
          events: groupedEvents.revolution || [],
        },
        {
          id: "discovery",
          label: "Discoveries",
          icon: "🔬",
          events: groupedEvents.discovery || [],
        },
        {
          id: "natural_disaster",
          label: "Natural Disasters",
          icon: "🌪️",
          events: groupedEvents.natural_disaster || [],
        },
        {
          id: "politics",
          label: "Politics",
          icon: "🏛️",
          events: groupedEvents.politics || [],
        },
        {
          id: "social",
          label: "Social Changes",
          icon: "👥",
          events: groupedEvents.social || [],
        },
        {
          id: "economics",
          label: "Economics",
          icon: "💰",
          events: groupedEvents.economics || [],
        },
        {
          id: "culture",
          label: "Culture & Arts",
          icon: "🎨",
          events: groupedEvents.culture || [],
        },
        {
          id: "religion",
          label: "Religion",
          icon: "🕌",
          events: groupedEvents.religion || [],
        },
      ];

      setEventCategories(newCategories);
    } catch (error) {
      console.error("❌ Error loading historical events:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const loadCountryData = async () => {
    try {
      const data = await getCountryByCode(countryCode);

      if (data) {
        setCountryData(data);
      } else {
        console.warn("⚠️ No country data found for", countryCode);
      }
    } catch (error) {
      console.error("❌ Error loading country data:", error);
    }
  };

  useEffect(() => {}, [isOpen, countryName]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999998,
          animation: "fadeIn 0.3s ease-out",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "white",
          zIndex: 999999,
          animation: "slideUp 0.3s ease-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with Close Button */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Close Button - Top Left */}
          <Button
            onClick={onClose}
            variant="outline"
            style={{
              width: "40px",
              height: "40px",
              padding: 0,
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            ✕
          </Button>

          {/* Title */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1e293b",
                margin: 0,
              }}
            >
              {countryName}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                margin: "4px 0 0 0",
              }}
            >
              Complete Historical Timeline
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* LEFT SIDEBAR - Categories */}
          <div
            style={{
              width: "320px",
              backgroundColor: "#f8fafc",
              borderRight: "1px solid #e2e8f0",
              overflowY: "auto",
              padding: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "16px",
                paddingLeft: "8px",
              }}
            >
              Event Categories
            </h3>

            {/* Category List */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    color: "#64748b",
                  }}
                >
                  Loading events...
                </div>
              ) : (
                eventCategories.map((category) => (
                  <div
                    key={category.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                    }}
                  >
                    {/* Category Header - Click to expand/collapse */}
                    <button
                      onClick={() => {
                        // Toggle: if already expanded, collapse. Otherwise expand.
                        setExpandedCategory(
                          expandedCategory === category.id ? null : category.id
                        );
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "24px" }}>
                          {category.icon}
                        </span>
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#1e293b",
                            }}
                          >
                            {category.label}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            {category.events.length} event
                            {category.events.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                      {/* Arrow indicator */}
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "12px",
                          transition: "transform 0.2s",
                          transform:
                            expandedCategory === category.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Event List - Only shown when expanded */}
                    {expandedCategory === category.id && (
                      <div
                        style={{
                          borderTop: "1px solid #e2e8f0",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        {category.events.length === 0 ? (
                          <div
                            style={{
                              padding: "16px",
                              fontSize: "13px",
                              color: "#64748b",
                              textAlign: "center",
                            }}
                          >
                            No events in this category yet
                          </div>
                        ) : (
                          <div style={{ padding: "8px" }}>
                            {category.events.map((event) => (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                style={{
                                  width: "100%",
                                  padding: "12px",
                                  display: "block",
                                  textAlign: "left",
                                  backgroundColor:
                                    selectedEvent?.id === event.id
                                      ? "#fef3c7"
                                      : "transparent",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  marginBottom: "4px",
                                  transition: "background-color 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedEvent?.id !== event.id) {
                                    e.currentTarget.style.backgroundColor =
                                      "#f8fafc";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedEvent?.id !== event.id) {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#1e293b",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {event.title}
                                </div>
                                <div
                                  style={{ fontSize: "12px", color: "#64748b" }}
                                >
                                  {formatYear(event.year)}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT CONTENT - Event Details */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "32px",
            }}
          >
            {selectedEvent ? (
              // Show selected event details
              <div>
                <div
                  style={{
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    {selectedEvent.title}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#f59e0b",
                      }}
                    >
                      📅 {formatYear(selectedEvent.year)}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#64748b",
                        backgroundColor: "#f1f5f9",
                        padding: "4px 12px",
                        borderRadius: "12px",
                      }}
                    >
                      {eventCategories.find(
                        (c) => c.id === selectedEvent.category
                      )?.label || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Event Description */}
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "24px",
                    marginBottom: "24px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "12px",
                    }}
                  >
                    Description
                  </h3>
                  <p
                    style={{
                      color: "#475569",
                      lineHeight: "1.7",
                      fontSize: "15px",
                    }}
                  >
                    {selectedEvent.description ||
                      "No description available for this event yet. This information will be added as the database is populated."}
                  </p>
                </div>

                {/* Key Information */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "24px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "16px",
                    }}
                  >
                    Key Information
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                        }}
                      >
                        Country
                      </div>
                      <div style={{ fontSize: "15px", color: "#1e293b" }}>
                        {countryName} ({countryCode})
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                        }}
                      >
                        Year
                      </div>
                      <div style={{ fontSize: "15px", color: "#1e293b" }}>
                        {formatYear(selectedEvent.year)}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                        }}
                      >
                        Category
                      </div>
                      <div style={{ fontSize: "15px", color: "#1e293b" }}>
                        {eventCategories.find(
                          (c) => c.id === selectedEvent.category
                        )?.label || "Unknown"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Historical Significance */}
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    borderRadius: "12px",
                    padding: "24px",
                    border: "1px solid #fbbf24",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#92400e",
                      marginBottom: "12px",
                    }}
                  >
                    💡 Historical Context
                  </h3>
                  <p
                    style={{
                      color: "#78350f",
                      lineHeight: "1.7",
                      fontSize: "15px",
                    }}
                  >
                    This event occurred in {formatYear(selectedEvent.year)} and
                    is part of {countryName}'s{" "}
                    {eventCategories
                      .find((c) => c.id === selectedEvent.category)
                      ?.label.toLowerCase() || "history"}
                    . Additional context and significance information will be
                    added as the database is expanded.
                  </p>
                </div>
              </div>
            ) : (
              // Show country general information when no event selected
              <div>
                {/* Country Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "32px",
                    paddingBottom: "24px",
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  {/* Flag */}
                  {countryData?.flag_url ? (
                    <img
                      src={countryData.flag_url}
                      alt={`${countryName} flag`}
                      style={{
                        width: "120px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #e2e8f0",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "120px",
                        height: "80px",
                        background: "#f1f5f9",
                        borderRadius: "8px",
                        border: "2px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                      }}
                    >
                      🏴
                    </div>
                  )}

                  {/* Country Name */}
                  <div>
                    <h2
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#1e293b",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      {countryName}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#64748b",
                          backgroundColor: "#f1f5f9",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {countryCode}
                      </span>
                      {countryData?.region && (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#64748b",
                            backgroundColor: "#f1f5f9",
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontWeight: "500",
                          }}
                        >
                          📍 {countryData.region}
                        </span>
                      )}
                      {countryData?.current_capital && (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#64748b",
                            backgroundColor: "#f1f5f9",
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontWeight: "500",
                          }}
                        >
                          🏛️ {countryData.current_capital}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* General Information */}
                {countryData?.general_information ? (
                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      padding: "24px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      📖 General Information
                    </h3>
                    <p
                      style={{
                        color: "#475569",
                        lineHeight: "1.8",
                        fontSize: "15px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {countryData.general_information}
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "#fef3c7",
                      borderRadius: "12px",
                      padding: "24px",
                      border: "1px solid #fbbf24",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#78350f",
                        lineHeight: "1.7",
                        fontSize: "15px",
                      }}
                    >
                      👈 Select a category from the sidebar to explore
                      historical events for {countryName}.
                    </p>
                  </div>
                )}

                {/* Quick Stats */}
                {countryData && (
                  <div
                    style={{
                      marginTop: "24px",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {countryData.current_population && (
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "12px",
                          padding: "20px",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            marginBottom: "8px",
                          }}
                        >
                          Population
                        </div>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#1e293b",
                          }}
                        >
                          {countryData.current_population.toLocaleString()}
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "20px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "8px",
                        }}
                      >
                        Historical Events
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#f59e0b",
                        }}
                      >
                        {eventCategories.reduce(
                          (sum, cat) => sum + cat.events.length,
                          0
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
