export interface Country {
  country_code: string;
  id: string;
  name: string;
  flag_url: string | null;
  current_capital: string | null;
  current_population: number | null;
  region: string | null;
  created_at: string;
  updated_at: string;
}
