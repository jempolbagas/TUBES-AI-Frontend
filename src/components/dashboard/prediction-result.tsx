"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertCircle, Calendar, Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n";
import { PredictionResponse } from "@/types";
import { AqiGauge } from "./aqi-gauge";
import { getAqiBgColorClass, getAqiCategory, getAqiTextColorClass } from "@/lib/aqi-utils";
import { HealthTips } from "./health-tips";
import { TextShimmer } from "@/components/animated/text-shimmer";

interface PredictionResultProps {
  data: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function PredictionResult({ data, isLoading, error }: PredictionResultProps) {
  const { t, lang } = useTranslation();

  if (error) {
    return (
      <div className="glass-card p-6 rounded-2xl border-red-500/20 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
          {t.results.error}
        </h3>
        <p className="text-sm text-text-secondary max-w-sm mb-2">{error}</p>
        <p className="text-xs text-text-muted">{t.results.details}: API Connection Timeout / Host Unreachable</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <div className="relative mb-6">
          <div className="h-20 w-20 rounded-full border-4 border-accent-sage/30 border-t-accent-green animate-spin" />
          <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-accent-green animate-pulse" />
        </div>
        <TextShimmer className="text-base font-bold text-text-primary mb-2">
          {t.predictTab.loadingText}
        </TextShimmer>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass-card p-6 rounded-2xl border-dashed border-2 border-border/50 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <div className="h-16 w-16 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted mb-4 border border-border">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
          {t.results.waiting}
        </h3>
        <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
          {t.results.waitingDesc}
        </p>
      </div>
    );
  }

  const category = getAqiCategory(data.predicted_aqi);
  const bgClass = getAqiBgColorClass(category);

  const title = lang === "en" ? data.category_label.en : data.category_label.id;
  const desc = lang === "en" ? data.description.en : data.description.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-6 rounded-2xl h-full flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          {t.results.title}
        </h3>
        {data.prediction_date && (
          <div className="flex items-center gap-1.5 text-xs text-text-secondary font-semibold bg-bg-secondary border border-border px-2.5 py-1 rounded-full">
            <Calendar className="h-3.5 w-3.5 text-accent-green" />
            <span>{data.prediction_date}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 justify-center flex-1">
        <div className="w-full max-w-[280px] shrink-0">
          <AqiGauge value={data.predicted_aqi} />
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
              {t.results.categoryLabel}
            </span>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${bgClass}`}>
                {title}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            {desc}
          </p>

          <hr className="border-border/60" />

          <HealthTips aqi={data.predicted_aqi} />
        </div>
      </div>
    </motion.div>
  );
}
