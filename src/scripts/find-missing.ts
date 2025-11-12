import fs from "fs";

// Read your GeoJSON file
const geojson = JSON.parse(fs.readFileSync("public/2025.geojson", "utf-8"));

console.log("🔍 Finding countries with -99 or missing ISO codes...\n");

const problemCountries: string[] = [];

geojson.features.forEach((country: any) => {
  const props = country.properties;
  const iso_a3 = props.ISO_A3;
  const countryName = props.ADMIN || props.NAME;

  if (!iso_a3 || iso_a3 === "-99" || iso_a3 === "UNKNOWN") {
    problemCountries.push(countryName);
    console.log(`❌ ${countryName}`);
    console.log(`   ISO_A3: ${iso_a3}`);
    console.log(`   ADM0_A3: ${props.ADM0_A3}`);
    console.log(`   SOV_A3: ${props.SOV_A3}`);
    console.log(`   ISO_A3_EH: ${props.ISO_A3_EH}`);
    console.log("");
  }
});

console.log(`\n📊 Total problem countries: ${problemCountries.length}`);
console.log("\nCountries that need mapping:");
console.log(problemCountries.join(", "));
