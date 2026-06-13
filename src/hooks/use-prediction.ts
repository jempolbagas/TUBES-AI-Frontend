"use client";

import { useState } from "react";
import { PredictionResponse, WeatherInput } from "@/types";
import { predictTomorrow, predictManual, predictDate } from "@/lib/api";

export function usePrediction() {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<{
    type: "tomorrow" | "manual" | "date";
    inputData?: WeatherInput | string;
  } | null>(null);

  const runPrediction = async (
    type: "tomorrow" | "manual" | "date",
    inputData?: WeatherInput | string
  ) => {
    setIsLoading(true);
    setError(null);

    if (
      type === "tomorrow" ||
      (type === "manual" && inputData && typeof inputData !== "string") ||
      (type === "date" && typeof inputData === "string")
    ) {
      setLastRequest({ type, inputData });
    }

    const startTime = Date.now();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      let resultPromise: Promise<PredictionResponse>;
      if (type === "tomorrow") {
        resultPromise = predictTomorrow();
      } else if (type === "manual") {
        if (!inputData || typeof inputData === "string") {
          throw new Error("Invalid input data for manual prediction");
        }
        resultPromise = predictManual(inputData);
      } else if (type === "date") {
        if (typeof inputData !== "string") {
          throw new Error("Invalid date for historical prediction");
        }
        resultPromise = predictDate(inputData);
      } else {
        throw new Error("Unknown prediction type");
      }

      const [result] = await Promise.all([resultPromise, delayPromise]);
      setData(result);
    } catch (err: unknown) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 3000) {
        await new Promise((resolve) => setTimeout(resolve, 3000 - elapsedTime));
      }
      setError(err instanceof Error ? err.message : "Failed to fetch prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const retryPrediction = () => {
    if (lastRequest) {
      runPrediction(lastRequest.type, lastRequest.inputData);
    }
  };

  const clearPrediction = () => {
    setData(null);
    setError(null);
    setLastRequest(null);
  };

  return {
    data,
    isLoading,
    error,
    predict: runPrediction,
    retry: retryPrediction,
    clear: clearPrediction,
  };
}
