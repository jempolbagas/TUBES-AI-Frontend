import { WeatherInput, PredictionResponse } from "@/types";

export function getMockTomorrowPrediction(): PredictionResponse {
  return {
    reference_date: new Date().toISOString().split("T")[0],
    prediction_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    weather_data: {
      aqi: 72.3,
      temperature_2m_mean: 28.5,
      temperature_2m_min: 24.1,
      precipitation_sum: 0.0,
      wind_speed_10m_mean: 10.2,
      relative_humidity_2m_mean: 75.0,
      surface_pressure_mean: 1010.5,
      cloud_cover_mean: 50.0,
      shortwave_radiation_sum: 15.3,
    },
    predicted_aqi: 78.42,
    category: "moderate",
    category_label: { en: "Moderate", id: "Sedang" },
    description: {
      en: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      id: "Kualitas udara dapat diterima. Namun, ada risiko bagi sebagian orang, terutama mereka yang sangat sensitif terhadap polusi udara.",
    },
    color: "#FFC107",
  };
}

export function getMockManualPrediction(data: WeatherInput): PredictionResponse {
  // Calculations based on meteorological logic to make simulation reactive:
  // - High starting AQI increases predicted AQI
  // - Higher wind speed decreases predicted AQI (dispersion)
  // - High temperatures increase AQI (catalyzes ozone formation)
  // - Higher precipitation decreases AQI (washout effect)
  // - High humidity aggregates PM2.5 (higher AQI)
  // - High shortwave radiation increases chemical reactions (higher AQI)
  
  let calculatedAqi = 
    data.aqi * 0.72 + 
    data.temperature_2m_mean * 1.8 - 
    data.wind_speed_10m_mean * 1.2 - 
    data.precipitation_sum * 2.5 + 
    (data.relative_humidity_2m_mean - 60) * 0.4 + 
    data.shortwave_radiation_sum * 0.6 +
    25;
  
  // Boundaries
  calculatedAqi = Math.max(0, Math.min(500, Math.round(calculatedAqi * 100) / 100));
  
  let category = "good";
  let color = "#4CAF50";
  let category_label = { en: "Good", id: "Baik" };
  let description = {
    en: "Air quality is satisfactory, and air pollution poses little or no risk.",
    id: "Kualitas udara memuaskan, dan polusi udara memiliki risiko yang sangat rendah.",
  };
  
  if (calculatedAqi > 300) {
    category = "hazardous";
    color = "#7B1FA2";
    category_label = { en: "Hazardous", id: "Berbahaya" };
    description = {
      en: "Health warning of emergency conditions: everyone is more likely to be affected.",
      id: "Peringatan kesehatan kondisi darurat: semua orang sangat mungkin terkena dampaknya.",
    };
  } else if (calculatedAqi > 200) {
    category = "veryUnhealthy";
    color = "#9C27B0";
    category_label = { en: "Very Unhealthy", id: "Sangat Tidak Sehat" };
    description = {
      en: "Health alert: everyone may experience more serious health effects.",
      id: "Peringatan kesehatan: semua orang mungkin mengalami dampak kesehatan yang lebih serius.",
    };
  } else if (calculatedAqi > 150) {
    category = "unhealthy";
    color = "#F44336";
    category_label = { en: "Unhealthy", id: "Tidak Sehat" };
    description = {
      en: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
      id: "Semua orang mungkin mulai merasakan dampak kesehatan; anggota kelompok sensitif dapat mengalami efek yang lebih serius.",
    };
  } else if (calculatedAqi > 100) {
    category = "unhealthySensitive";
    color = "#FF9800";
    category_label = { en: "Unhealthy for Sensitive Groups", id: "Tidak Sehat bagi Kelompok Sensitif" };
    description = {
      en: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      id: "Kelompok sensitif mungkin mengalami dampak kesehatan. Masyarakat umum kemungkinan besar tidak akan terpengaruh.",
    };
  } else if (calculatedAqi > 50) {
    category = "moderate";
    color = "#FFC107";
    category_label = { en: "Moderate", id: "Sedang" };
    description = {
      en: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      id: "Kualitas udara dapat diterima. Namun, ada risiko bagi sebagian orang, terutama mereka yang sangat sensitif terhadap polusi udara.",
    };
  }
  
  return {
    predicted_aqi: calculatedAqi,
    category,
    category_label,
    description,
    color,
  };
}

export function getMockDatePrediction(dateStr: string): PredictionResponse {
  // Simple deterministic hash based on date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  
  const mockAqi = 40 + (hash % 130); 
  const mockTempMean = 26 + (hash % 7); 
  const mockTempMin = 21 + (hash % 4); 
  const mockPrecip = (hash % 4 === 0) ? (hash % 12) : 0; 
  const mockWind = 6 + (hash % 14);
  const mockHumidity = 60 + (hash % 25);
  const mockPressure = 1007 + (hash % 6);
  const mockCloud = 25 + (hash % 65);
  const mockRadiation = 8 + (hash % 14);
  
  const weatherInput: WeatherInput = {
    aqi: mockAqi,
    temperature_2m_mean: mockTempMean,
    temperature_2m_min: mockTempMin,
    precipitation_sum: mockPrecip,
    wind_speed_10m_mean: mockWind,
    relative_humidity_2m_mean: mockHumidity,
    surface_pressure_mean: mockPressure,
    cloud_cover_mean: mockCloud,
    shortwave_radiation_sum: mockRadiation,
  };
  
  const nextDay = new Date(dateStr);
  nextDay.setDate(nextDay.getDate() + 1);
  
  const prediction = getMockManualPrediction(weatherInput);
  
  return {
    ...prediction,
    reference_date: dateStr,
    prediction_date: nextDay.toISOString().split("T")[0],
    weather_data: weatherInput,
  };
}
