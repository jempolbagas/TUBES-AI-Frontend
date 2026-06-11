"use client";

import React from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { useTranslation } from "@/i18n";
import { PredictionResponse } from "@/types";
import { ShimmerButton } from "@/components/animated/shimmer-button";
import { WeatherMetrics } from "./weather-metrics";

interface PredictTabProps {
  onPredict: () => void;
  isLoading: boolean;
  predictionData: PredictionResponse | null;
}

export function PredictTab({ onPredict, isLoading, predictionData }: PredictTabProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
          {t.predictTab.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {t.predictTab.subtitle}
        </p>
      </div>

      <div className="flex justify-center sm:justify-start">
        <ShimmerButton
          onClick={onPredict}
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[220px]"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>{t.predictTab.loadingText.slice(0, 25)}...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>{t.predictTab.btnText}</span>
            </>
          )}
        </ShimmerButton>
      </div>

      {predictionData?.weather_data && (
        <div className="space-y-4 pt-4 border-t border-border/60">
          <h4 className="font-heading text-sm font-bold text-text-primary">
            {t.predictTab.referenceDate}:{" "}
            <span className="font-sans font-semibold text-accent-green">
              {predictionData.reference_date}
            </span>
          </h4>
          <WeatherMetrics data={predictionData.weather_data} />
        </div>
      )}
    </div>
  );
}
