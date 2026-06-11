"use client";

import { useState } from "react";
import { PredictionResponse, WeatherInput } from "@/types";
import { predictTomorrow, predictManual, predictDate } from "@/lib/api";

export function usePrediction() {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runPrediction = async (
    type: "tomorrow" | "manual" | "date",
    inputData?: WeatherInput | string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      let result: PredictionResponse;
      if (type === "tomorrow") {
        result = await predictTomorrow();
      } else if (type === "manual") {
        if (!inputData || typeof inputData === "string") {
          throw new Error("Invalid input data for manual prediction");
        }
        result = await predictManual(inputData);
      } else if (type === "date") {
        if (typeof inputData !== "string") {
          throw new Error("Invalid date for historical prediction");
        }
        result = await predictDate(inputData);
      } else {
        throw new Error("Unknown prediction type");
      }
      setData(result);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const clearPrediction = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    predict: runPrediction,
    clear: clearPrediction,
  };
}
