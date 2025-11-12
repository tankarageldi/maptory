import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// Initialize Supabase client
// Replace these with your actual Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in environment variables!");
  console.log("\nMake sure you have these in your .env.local file:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your-url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function populateCountries() {
  console.log("🌍 Fetching country data from REST Countries API...");

  try {
    // Step 1: Fetch all countries with ONLY the fields we need (max 10 fields allowed)
    // We're requesting: cca3 (country code), name, flags, capital, population, region
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,population,region"
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch countries data: ${response.status} ${response.statusText}`
      );
    }

    const countriesData = await response.json();
    console.log(`✅ Fetched ${countriesData.length} countries`);

    // Step 2: Transform the data to match our database schema
    const formattedCountries = countriesData.map((country: any) => {
      // Some data validation and fallbacks
      const countryCode = country.cca3;
      const name = country.name?.common || "Unknown";
      const flagUrl = country.flags?.svg || country.flags?.png || null;
      const capital = Array.isArray(country.capital)
        ? country.capital[0]
        : null;
      const population = country.population || 0;
      const region = country.region || null;

      return {
        country_code: countryCode,
        name: name,
        flag_url: flagUrl,
        current_capital: capital,
        current_population: population,
        region: region,
      };
    });

    console.log("📝 Sample country data:");
    console.log(JSON.stringify(formattedCountries[0], null, 2));
    console.log(`\n📊 Total countries to insert: ${formattedCountries.length}`);

    // Step 3: Insert data into Supabase in batches
    // Supabase recommends batch inserts of 1000 or less
    console.log("\n💾 Inserting countries into Supabase...");

    const batchSize = 100;
    let insertedCount = 0;

    for (let i = 0; i < formattedCountries.length; i += batchSize) {
      const batch = formattedCountries.slice(i, i + batchSize);

      const { data, error } = await supabase.from("countries").insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
        throw error;
      }

      insertedCount += batch.length;
      console.log(
        `   ✓ Inserted ${insertedCount}/${formattedCountries.length} countries`
      );
    }

    console.log(`\n✅ Successfully inserted ${insertedCount} countries!`);
    return insertedCount;
  } catch (error) {
    console.error("❌ Error populating countries:", error);
    throw error;
  }
}

// Run the script
populateCountries()
  .then((count) => {
    console.log(`\n🎉 Database population complete! Added ${count} countries.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Failed to populate database:", error);
    process.exit(1);
  });
