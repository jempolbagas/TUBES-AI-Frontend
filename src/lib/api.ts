import { WeatherInput, PredictionResponse } from "@/types";
import { API_BASE, USE_MOCK } from "./constants";
import { getMockTomorrowPrediction, getMockManualPrediction, getMockDatePrediction } from "./mock-data";

export async function predictTomorrow(): Promise<PredictionResponse> {
  if (USE_MOCK) {
    // Artificial latency for loading micro-animations
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return getMockTomorrowPrediction();
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/predict/tomorrow`, {
      signal: AbortSignal.timeout(8000), // 8 seconds timeout
    });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("API request failed, falling back to mock data:", error);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Still add small delay for smooth feel
    return getMockTomorrowPrediction();
  }
}

export async function predictManual(data: WeatherInput): Promise<PredictionResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getMockManualPrediction(data);
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("API request failed, falling back to mock data:", error);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return getMockManualPrediction(data);
  }
}

export async function predictDate(date: string): Promise<PredictionResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return getMockDatePrediction(date);
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/predict/date/${date}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`API returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("API request failed, falling back to mock data:", error);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockDatePrediction(date);
  }
}
