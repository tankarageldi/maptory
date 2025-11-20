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
  general_information: string | null;
}
export interface HistoricalEvent {
  id: string;
  country_code: string;
  year: number; // Negative for BCE, positive for CE
  title: string;
  description: string | null;
  category: string; // war, revolution, discovery, natural_disaster, politics, social, economics, culture
  created_at: string;
  updated_at: string;
}
