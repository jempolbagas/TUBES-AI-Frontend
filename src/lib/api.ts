import { WeatherInput, PredictionResponse } from "@/types";
import { API_BASE } from "./constants";
import { getAqiCategory, getAqiColor } from "./aqi-utils";

// ─── Jakarta coordinates for Open-Meteo ─────────────────────────────────────
const JAKARTA_LAT = -6.1818;
const JAKARTA_LON = 106.8223;

// ─── Default imputation values (Jakarta median) ─────────────────────────────
const DEFAULT_IMPUTATION: WeatherInput = {
  aqi: 75.0,
  temperature_2m_mean: 28.5,
  temperature_2m_min: 24.0,
  precipitation_sum: 0.0,
  wind_speed_10m_mean: 10.0,
  relative_humidity_2m_mean: 75.0,
  surface_pressure_mean: 1010.0,
  cloud_cover_mean: 50.0,
  shortwave_radiation_sum: 15.0,
};

// ─── AQI category metadata for building PredictionResponse ──────────────────
const CATEGORY_LABELS: Record<string, { en: string; id: string }> = {
  good: { en: "Good", id: "Baik" },
  moderate: { en: "Moderate", id: "Sedang" },
  unhealthySensitive: { en: "Unhealthy for Sensitive Groups", id: "Tidak Sehat bagi Kelompok Sensitif" },
  unhealthy: { en: "Unhealthy", id: "Tidak Sehat" },
  veryUnhealthy: { en: "Very Unhealthy", id: "Sangat Tidak Sehat" },
  hazardous: { en: "Hazardous", id: "Berbahaya" },
};

const CATEGORY_DESCRIPTIONS: Record<string, { en: string; id: string }> = {
  good: {
    en: "Air quality is satisfactory, and air pollution poses little or no risk.",
    id: "Kualitas udara memuaskan dan polusi udara tidak menimbulkan risiko berarti.",
  },
  moderate: {
    en: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    id: "Kualitas udara masih dapat diterima. Namun, mungkin ada risiko bagi sebagian orang, terutama yang sangat sensitif terhadap polusi udara.",
  },
  unhealthySensitive: {
    en: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    id: "Kelompok sensitif mungkin mengalami dampak kesehatan. Masyarakat umum kemungkinan besar tidak terpengaruh.",
  },
  unhealthy: {
    en: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    id: "Sebagian masyarakat umum mungkin mengalami dampak kesehatan; kelompok sensitif mungkin mengalami dampak yang lebih serius.",
  },
  veryUnhealthy: {
    en: "Health alert: The risk of health effects is increased for everyone.",
    id: "Peringatan kesehatan: Risiko dampak kesehatan meningkat untuk semua orang.",
  },
  hazardous: {
    en: "Health warning of emergency conditions: everyone is more likely to be affected.",
    id: "Peringatan darurat kesehatan: semua orang kemungkinan besar akan terdampak.",
  },
};

// ─── Helper: format date to YYYY-MM-DD ──────────────────────────────────────
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ─── Helper: add days to a date string ──────────────────────────────────────
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

// ─── Helper: get a daily value or fall back to default imputation ───────────
function getDailyValue(
  daily: Record<string, (number | null)[] | undefined>,
  key: string,
  fallback: number
): number {
  const list = daily[key];
  if (!list || list[0] === null || list[0] === undefined) {
    return fallback;
  }
  return list[0];
}

// ─── Helper: build PredictionResponse from backend result ───────────────────
function buildPredictionResponse(
  predictedAqi: number,
  weatherData: WeatherInput,
  referenceDate: string,
  predictionDate: string
): PredictionResponse {
  const category = getAqiCategory(predictedAqi);
  const color = getAqiColor(predictedAqi);
  const categoryLabel = CATEGORY_LABELS[category] ?? CATEGORY_LABELS.good;
  const description = CATEGORY_DESCRIPTIONS[category] ?? CATEGORY_DESCRIPTIONS.good;

  return {
    reference_date: referenceDate,
    prediction_date: predictionDate,
    weather_data: weatherData,
    predicted_aqi: Math.round(predictedAqi * 100) / 100,
    category,
    category_label: categoryLabel,
    description,
    color,
  };
}

// ─── Fetch weather & AQI data from Open-Meteo ──────────────────────────────
export async function fetchOpenMeteoData(dateStr: string): Promise<WeatherInput> {
  const targetDate = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - targetDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Choose weather endpoint based on how far back the date is
  const weatherBase =
    diffDays <= 30
      ? "https://api.open-meteo.com/v1/forecast"
      : "https://archive-api.open-meteo.com/v1/archive";

  const weatherUrl =
    `${weatherBase}?latitude=${JAKARTA_LAT}&longitude=${JAKARTA_LON}` +
    `&daily=temperature_2m_mean,temperature_2m_min,precipitation_sum,wind_speed_10m_mean,shortwave_radiation_sum,relative_humidity_2m_mean,surface_pressure_mean,cloud_cover_mean` +
    `&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;

  const aqiUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${JAKARTA_LAT}&longitude=${JAKARTA_LON}` +
    `&hourly=us_aqi&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;

  let weatherRes: Response;
  let aqiRes: Response;

  try {
    [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl, { signal: AbortSignal.timeout(10000) }),
      fetch(aqiUrl, { signal: AbortSignal.timeout(10000) }),
    ]);
  } catch (err) {
    throw new Error(
      `Gagal menghubungi server Open-Meteo. Periksa koneksi internet Anda. (${err instanceof Error ? err.message : String(err)})`
    );
  }

  if (!weatherRes.ok) {
    throw new Error(
      `Open-Meteo Weather API mengembalikan status ${weatherRes.status}. Data cuaca untuk tanggal ${dateStr} mungkin tidak tersedia.`
    );
  }
  if (!aqiRes.ok) {
    throw new Error(
      `Open-Meteo Air Quality API mengembalikan status ${aqiRes.status}. Data AQI untuk tanggal ${dateStr} mungkin tidak tersedia.`
    );
  }

  let weatherJson: { daily?: Record<string, (number | null)[]> };
  let aqiJson: { hourly?: { us_aqi?: (number | null)[] } };

  try {
    [weatherJson, aqiJson] = await Promise.all([weatherRes.json(), aqiRes.json()]);
  } catch {
    throw new Error("Gagal memproses respons dari Open-Meteo. Format data tidak valid.");
  }

  // Calculate daily average AQI from hourly data
  const hourlyAqi = aqiJson.hourly?.us_aqi ?? [];
  const validAqi = hourlyAqi.filter(
    (val): val is number => val !== null && val !== undefined
  );
  const aqiMean =
    validAqi.length > 0
      ? validAqi.reduce((sum, val) => sum + val, 0) / validAqi.length
      : DEFAULT_IMPUTATION.aqi;

  const daily = weatherJson.daily ?? {};

  return {
    aqi: Math.round(aqiMean * 100) / 100,
    temperature_2m_mean: getDailyValue(daily, "temperature_2m_mean", DEFAULT_IMPUTATION.temperature_2m_mean),
    temperature_2m_min: getDailyValue(daily, "temperature_2m_min", DEFAULT_IMPUTATION.temperature_2m_min),
    precipitation_sum: getDailyValue(daily, "precipitation_sum", DEFAULT_IMPUTATION.precipitation_sum),
    wind_speed_10m_mean: getDailyValue(daily, "wind_speed_10m_mean", DEFAULT_IMPUTATION.wind_speed_10m_mean),
    relative_humidity_2m_mean: getDailyValue(daily, "relative_humidity_2m_mean", DEFAULT_IMPUTATION.relative_humidity_2m_mean),
    surface_pressure_mean: getDailyValue(daily, "surface_pressure_mean", DEFAULT_IMPUTATION.surface_pressure_mean),
    cloud_cover_mean: getDailyValue(daily, "cloud_cover_mean", DEFAULT_IMPUTATION.cloud_cover_mean),
    shortwave_radiation_sum: getDailyValue(daily, "shortwave_radiation_sum", DEFAULT_IMPUTATION.shortwave_radiation_sum),
  };
}

// ─── Send weather data to backend for AQI prediction ────────────────────────
async function sendToPredictionAPI(weatherData: WeatherInput): Promise<number> {
  // Backend expects "AQI" (uppercase)
  const payload = {
    AQI: weatherData.aqi,
    temperature_2m_mean: weatherData.temperature_2m_mean,
    temperature_2m_min: weatherData.temperature_2m_min,
    precipitation_sum: weatherData.precipitation_sum,
    wind_speed_10m_mean: weatherData.wind_speed_10m_mean,
    relative_humidity_2m_mean: weatherData.relative_humidity_2m_mean,
    surface_pressure_mean: weatherData.surface_pressure_mean,
    cloud_cover_mean: weatherData.cloud_cover_mean,
    shortwave_radiation_sum: weatherData.shortwave_radiation_sum,
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000), // Backend on Render can cold-start
    });
  } catch (err) {
    throw new Error(
      `Gagal menghubungi server prediksi (${API_BASE}). Server mungkin sedang cold-start atau offline. (${err instanceof Error ? err.message : String(err)})`
    );
  }

  if (!res.ok) {
    throw new Error(
      `Server prediksi mengembalikan status ${res.status}. Pastikan parameter cuaca valid.`
    );
  }

  let result: { status?: string; prediksi_aqi?: number };
  try {
    result = await res.json();
  } catch {
    throw new Error("Gagal memproses respons dari server prediksi. Format data tidak valid.");
  }

  if (result.prediksi_aqi === undefined || result.prediksi_aqi === null) {
    throw new Error(
      "Server prediksi tidak mengembalikan nilai AQI. Respons: " + JSON.stringify(result)
    );
  }

  return result.prediksi_aqi;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Predict tomorrow's AQI by fetching today's weather data from Open-Meteo
 * and sending it to the prediction backend.
 */
export async function predictTomorrow(): Promise<PredictionResponse> {
  const todayStr = formatDate(new Date());
  const tomorrowStr = addDays(todayStr, 1);

  // Step 1: Fetch today's weather from Open-Meteo
  const weatherData = await fetchOpenMeteoData(todayStr);

  // Step 2: Send to backend for prediction
  const predictedAqi = await sendToPredictionAPI(weatherData);

  // Step 3: Build and return response
  return buildPredictionResponse(predictedAqi, weatherData, todayStr, tomorrowStr);
}

/**
 * Predict AQI using manually entered weather parameters.
 * No Open-Meteo call needed — data comes from user form input.
 */
export async function predictManual(data: WeatherInput): Promise<PredictionResponse> {
  const predictedAqi = await sendToPredictionAPI(data);

  return buildPredictionResponse(predictedAqi, data, "", "");
}

/**
 * Predict AQI for the day after a given historical date.
 * Fetches weather data for that date from Open-Meteo Archive/Forecast API.
 */
export async function predictDate(date: string): Promise<PredictionResponse> {
  const nextDay = addDays(date, 1);

  // Step 1: Fetch historical weather from Open-Meteo
  const weatherData = await fetchOpenMeteoData(date);

  // Step 2: Send to backend for prediction
  const predictedAqi = await sendToPredictionAPI(weatherData);

  // Step 3: Build and return response
  return buildPredictionResponse(predictedAqi, weatherData, date, nextDay);
}
