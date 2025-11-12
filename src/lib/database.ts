import { supabase } from "./supabase";
import { Country } from "./types";

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
