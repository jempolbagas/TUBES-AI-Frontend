export interface WeatherInput {
  aqi: number;
  temperature_2m_mean: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  wind_speed_10m_mean: number;
  relative_humidity_2m_mean: number;
  surface_pressure_mean: number;
  cloud_cover_mean: number;
  shortwave_radiation_sum: number;
}

export interface PredictionResponse {
  reference_date?: string;
  prediction_date?: string;
  weather_data?: WeatherInput;
  predicted_aqi: number;
  category: string;
  category_label: { en: string; id: string };
  description: { en: string; id: string };
  color: string;
}
