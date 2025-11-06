export interface Country {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  created_at?: string;
}

export interface HistoricalEvent {
  id: string;
  country_id: string;
  title: string;
  description: string;
  year: number;
  date?: string;
  category: string;
  image_url?: string;
  youtube_url?: string;
  created_at?: string;
}
