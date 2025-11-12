import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Testing Supabase connection...");
console.log("URL:", supabaseUrl);
console.log("Key (first 20 chars):", supabaseKey?.substring(0, 20) + "...");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in environment variables!");
  console.log("\nMake sure you have these in your .env.local file:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your-url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Try to query the countries table
    const { data, error } = await supabase.from("countries").select("count");

    if (error) {
      console.error("❌ Connection failed:", error);
      process.exit(1);
    }

    console.log("✅ Connection successful!");
    console.log("📊 Current countries in database:", data);
    process.exit(0);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  }
}

testConnection();
