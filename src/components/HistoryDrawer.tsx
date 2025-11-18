"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  countryCode: string;
  year: number;
}

// Mock data - will be replaced with Supabase data later
const EVENT_CATEGORIES = [
  {
    id: "war",
    label: "Wars & Conflicts",
    icon: "⚔️",
    events: [
      { id: "1", title: "World War I Begins", date: "1914", category: "war" },
      { id: "2", title: "Battle of Somme", date: "1916", category: "war" },
      { id: "3", title: "Treaty of Versailles", date: "1919", category: "war" },
    ],
  },
  {
    id: "revolution",
    label: "Revolutions",
    icon: "✊",
    events: [
      {
        id: "4",
        title: "Russian Revolution",
        date: "1917",
        category: "revolution",
      },
      {
        id: "5",
        title: "October Revolution",
        date: "1917",
        category: "revolution",
      },
    ],
  },
  {
    id: "discovery",
    label: "Discoveries",
    icon: "🔬",
    events: [
      {
        id: "6",
        title: "Discovery of Penicillin",
        date: "1928",
        category: "discovery",
      },
    ],
  },
  {
    id: "natural_disaster",
    label: "Natural Disasters",
    icon: "🌪️",
    events: [],
  },
  {
    id: "politics",
    label: "Politics",
    icon: "🏛️",
    events: [],
  },
  {
    id: "social",
    label: "Social Changes",
    icon: "👥",
    events: [],
  },
  {
    id: "economics",
    label: "Economics",
    icon: "💰",
    events: [],
  },
  {
    id: "culture",
    label: "Culture & Arts",
    icon: "🎨",
    events: [],
  },
];

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
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    console.log("HistoryDrawer - isOpen:", isOpen, "Country:", countryName);
  }, [isOpen, countryName]);

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
              Historical Events - {year} CE
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
              {EVENT_CATEGORIES.map((category) => (
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
                      <span style={{ fontSize: "24px" }}>{category.icon}</span>
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
                            fontStyle: "italic",
                            textAlign: "center",
                          }}
                        >
                          No events found
                        </div>
                      ) : (
                        <div>
                          {category.events.map((event) => (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              style={{
                                width: "100%",
                                padding: "12px 16px",
                                textAlign: "left",
                                backgroundColor:
                                  selectedEvent?.id === event.id
                                    ? "#fef3c7"
                                    : "transparent",
                                border: "none",
                                borderBottom: "1px solid #e2e8f0",
                                cursor: "pointer",
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
                                {event.date}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT - Event Details */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px",
            }}
          >
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
                        📅 {selectedEvent.date}
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
                        {EVENT_CATEGORIES.find(
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
                      [This is where the full event description will appear from
                      your database. It will include details about what
                      happened, who was involved, and the historical
                      significance.]
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
                          Time Period
                        </div>
                        <div style={{ fontSize: "15px", color: "#1e293b" }}>
                          {year} CE
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
                          Event ID (Debug)
                        </div>
                        <div style={{ fontSize: "15px", color: "#1e293b" }}>
                          {selectedEvent.id}
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
                      💡 Historical Significance
                    </h3>
                    <p
                      style={{
                        color: "#78350f",
                        lineHeight: "1.7",
                        fontSize: "15px",
                      }}
                    >
                      [Information about why this event matters and its impact
                      on history will be loaded from your database here.]
                    </p>
                  </div>
                </div>
              ) : (
                // Show welcome message when no event selected
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    minHeight: "400px",
                  }}
                >
                  <div style={{ textAlign: "center", maxWidth: "400px" }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                      👈
                    </div>
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "12px",
                      }}
                    >
                      Select an Event
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#64748b",
                        lineHeight: "1.6",
                      }}
                    >
                      Click on a category in the sidebar to expand it, then
                      select an event to view its full details and historical
                      significance.
                    </p>
                  </div>
                </div>
              )}
            </div>
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
