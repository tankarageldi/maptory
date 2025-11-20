import { supabase } from "./supabase";
import { Country, HistoricalEvent } from "./types";

/**
 * Fetch all countries from the database
 * @returns Array of all countries with their data
 */
export async function getAllCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch a single country by its country code
 * @param countryCode - 3-letter ISO country code (e.g., 'USA', 'GBR')
 * @returns Country data or null if not found
 */
export async function getCountryByCode(
  countryCode: string
): Promise<Country | null> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("country_code", countryCode)
    .single();

  if (error) {
    console.error(`Error fetching country ${countryCode}:`, error);
    return null;
  }

  return data;
}

/**
 * Search countries by name
 * @param searchTerm - Partial name to search for
 * @returns Array of matching countries
 */
export async function searchCountries(searchTerm: string): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .ilike("name", `%${searchTerm}%`)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error searching countries:", error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch historical events for a specific country
 * @param countryCode - 3-letter ISO country code
 * @param yearRange - Optional: fetch events within a range [startYear, endYear]
 * @returns Array of historical events for the country
 */
export async function getHistoricalEvents(
  countryCode: string,
  yearRange?: [number, number]
): Promise<HistoricalEvent[]> {
  let query = supabase
    .from("historical_events")
    .select("*")
    .eq("country_code", countryCode)
    .order("year", { ascending: false });

  // If year range provided, filter by it
  if (yearRange) {
    const [startYear, endYear] = yearRange;
    query = query.gte("year", startYear).lte("year", endYear);
  }

  const { data, error } = await query;

  if (error) {
    console.error(
      `Error fetching historical events for ${countryCode}:`,
      error
    );
    return [];
  }

  return data || [];
}

/**
 * Fetch historical events for a specific country and category
 * @param countryCode - 3-letter ISO country code
 * @param category - Event category (war, revolution, discovery, etc.)
 * @param yearRange - Optional: fetch events within a range [startYear, endYear]
 * @returns Array of historical events for the country in that category
 */
export async function getHistoricalEventsByCategory(
  countryCode: string,
  category: string,
  yearRange?: [number, number]
): Promise<HistoricalEvent[]> {
  let query = supabase
    .from("historical_events")
    .select("*")
    .eq("country_code", countryCode)
    .eq("category", category)
    .order("year", { ascending: false });

  // If year range provided, filter by it
  if (yearRange) {
    const [startYear, endYear] = yearRange;
    query = query.gte("year", startYear).lte("year", endYear);
  }

  const { data, error } = await query;

  if (error) {
    console.error(
      `Error fetching ${category} events for ${countryCode}:`,
      error
    );
    return [];
  }

  return data || [];
}

/**
 * Group historical events by category for a specific country
 * @param countryCode - 3-letter ISO country code
 * @param yearRange - Optional: fetch events within a range [startYear, endYear]
 * @returns Object with events grouped by category
 */
export async function getHistoricalEventsGroupedByCategory(
  countryCode: string,
  yearRange?: [number, number]
): Promise<Record<string, HistoricalEvent[]>> {
  const events = await getHistoricalEvents(countryCode, yearRange);

  // Group events by category
  const grouped: Record<string, HistoricalEvent[]> = {
    war: [],
    revolution: [],
    discovery: [],
    natural_disaster: [],
    politics: [],
    social: [],
    economics: [],
    culture: [],
    religion: [],
  };

  events.forEach((event) => {
    // Normalize category: lowercase and replace spaces with underscores
    const normalizedCategory = event.category
      .toLowerCase()
      .replace(/\s+/g, "_");

    if (grouped[normalizedCategory]) {
      grouped[normalizedCategory].push(event);
    } else {
      // Log unknown categories for debugging
      console.warn(
        `Unknown category: "${event.category}" (normalized: "${normalizedCategory}")`
      );
    }
  });

  return grouped;
}
