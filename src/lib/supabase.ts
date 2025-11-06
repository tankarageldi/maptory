import { createClient } from "@supabase/supabase-js";
import { Country, HistoricalEvent } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
  return data || [];
}
// Fetch events by country and year range
export async function getEventsByCountry(
  countryId: string,
  year: number,
  range: number = 50
): Promise<HistoricalEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("country_id", countryId)
    .gte("year", year - range)
    .lte("year", year + range)
    .order("year", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}

// Fetch all events (for testing)
export async function getAllEvents(): Promise<HistoricalEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("year", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}
