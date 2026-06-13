"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertCircle, Calendar, Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n";
import { PredictionResponse } from "@/types";
import { AqiGauge } from "./aqi-gauge";
import { getAqiBgColorClass, getAqiCategory } from "@/lib/aqi-utils";
import { HealthTips } from "./health-tips";
import { cn } from "@/lib/utils";

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
        <span className="text-base font-bold text-text-primary mb-2">
          {t.predictTab.loadingText}
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-card p-8 rounded-2xl border-dashed border-2 border-border/50 flex flex-col items-center justify-center text-center h-full min-h-[350px]"
      >
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          {/* Glowing expanding pulse rings */}
          <div className="absolute inset-0 rounded-full bg-accent-green/10 animate-ping opacity-60" />
          <div className="absolute inset-2 rounded-full bg-accent-green/20 animate-pulse" />
          
          {/* Icon Container */}
          <div className="relative h-12 w-12 rounded-full bg-bg-secondary flex items-center justify-center text-accent-green border border-border shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
        
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
          {t.results.waiting}
        </h3>
        <p className="text-sm text-text-secondary max-w-xs leading-relaxed font-medium">
          {t.results.waitingDesc}
        </p>
      </motion.div>
    );
  }

  const category = getAqiCategory(data.predicted_aqi);
  const bgClass = getAqiBgColorClass(category);

  const title = lang === "en" ? data.category_label.en : data.category_label.id;
  const desc = lang === "en" ? data.description.en : data.description.id;

  const categoryColors = {
    good: "from-green-500/5 to-transparent dark:from-green-500/5",
    moderate: "from-amber-500/5 to-transparent dark:from-amber-500/5",
    unhealthySensitive: "from-orange-500/5 to-transparent dark:from-orange-500/5",
    unhealthy: "from-red-500/5 to-transparent dark:from-red-500/5",
    veryUnhealthy: "from-purple-500/5 to-transparent dark:from-purple-500/5",
    hazardous: "from-purple-800/10 to-transparent dark:from-purple-800/10",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-live="polite"
      className={cn(
        "glass-card p-6 rounded-2xl h-full flex flex-col gap-6 bg-gradient-to-br transition-all duration-500",
        categoryColors[category] || "from-transparent",
        "to-transparent"
      )}
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-6 justify-center flex-1"
      >
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-[240px] shrink-0 relative flex items-center justify-center"
        >
          {/* Ambient Glow ring behind the gauge */}
          <div className={cn(
            "absolute h-36 w-36 rounded-full blur-2xl opacity-10 animate-pulse",
            category === "good" && "bg-green-500",
            category === "moderate" && "bg-amber-500",
            category === "unhealthySensitive" && "bg-orange-500",
            category === "unhealthy" && "bg-red-500",
            category === "veryUnhealthy" && "bg-purple-500",
            category === "hazardous" && "bg-purple-900"
          )} />
          <AqiGauge value={data.predicted_aqi} />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex-1 space-y-4 w-full"
        >
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
              {t.results.categoryLabel}
            </span>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border", bgClass)}>
                {title}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            {desc}
          </p>

          <hr className="border-border/60" />

          <HealthTips aqi={data.predicted_aqi} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
