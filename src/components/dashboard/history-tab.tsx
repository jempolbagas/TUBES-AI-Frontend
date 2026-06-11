"use client";

import React, { useState } from "react";
import { RefreshCw, Eye } from "lucide-react";
import { useTranslation } from "@/i18n";
import { PredictionResponse } from "@/types";
import { ShimmerButton } from "@/components/animated/shimmer-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeatherMetrics } from "./weather-metrics";

interface HistoryTabProps {
  onPredict: (date: string) => void;
  isLoading: boolean;
  predictionData: PredictionResponse | null;
}

export function HistoryTab({ onPredict, isLoading, predictionData }: HistoryTabProps) {
  const { t } = useTranslation();
  
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 7);
  const formattedDefault = defaultDate.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(formattedDefault);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    onPredict(selectedDate);
  };

  // Keep it constrained to 2 days ago for Open Meteo archive reliability
  const maxDateStr = new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
          {t.historyTab.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {t.historyTab.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-4">
        <div className="space-y-1.5 w-full sm:max-w-xs">
          <Label htmlFor="history-date" className="text-xs font-bold text-text-secondary">
            {t.historyTab.dateLabel}
          </Label>
          <Input
            id="history-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={isLoading}
            max={maxDateStr}
            className="bg-white/50 border-border focus:border-accent-green hover:border-accent-sage/60 rounded-xl"
            required
          />
        </div>

        <ShimmerButton type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[200px]">
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span>{t.historyTab.btnText}</span>
        </ShimmerButton>
      </form>

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
