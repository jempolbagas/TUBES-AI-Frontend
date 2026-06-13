"use client";

import React from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Info,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  RefreshCw
} from "lucide-react";
import { useTranslation } from "@/i18n";
import { PredictionResponse } from "@/types";
import {
  getAqiBgColorClass,
  getAqiCategory,
  getAqiTextColorClass,
  getAqiColor
} from "@/lib/aqi-utils";
import { HealthTips } from "./health-tips";
import { NumberTicker } from "@/components/animated/number-ticker";
import { cn } from "@/lib/utils";
import { AiThinkingLoader } from "./ai-thinking-loader";

interface PredictionResultProps {
  data: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

// ─── Radial 240-degree speedometer gauge ──────────────────────────────────────
function AqiGaugeSVG({ aqi, color }: { aqi: number; color: string }) {
  const VW = 200;
  const VH = 150;
  const cx = 100;
  const cy = 95;
  const r = 72;
  const stroke = 10;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const describeArc = (startDeg: number, endDeg: number) => {
    const sx = cx + r * Math.cos(toRad(startDeg));
    const sy = cy + r * Math.sin(toRad(startDeg));
    const ex = cx + r * Math.cos(toRad(endDeg));
    const ey = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  // 240° speedometer style: starts at 150° (bottom-left) and ends at 390° (bottom-right)
  const cappedAqi = Math.min(Math.max(aqi, 0), 300);
  const sweepDeg = (cappedAqi / 300) * 240;
  const trackPath = describeArc(150, 390);
  const progPath = sweepDeg > 0 ? describeArc(150, 150 + sweepDeg) : null;

  // Needle tip dot
  const needleDeg = 150 + sweepDeg;
  const needleX = cx + r * Math.cos(toRad(needleDeg));
  const needleY = cy + r * Math.sin(toRad(needleDeg));

  // Ticks at 0, 50, 100, 150, 200, 300
  const tickValues = [0, 50, 100, 150, 200, 300];
  const tickAngles = tickValues.map((v) => 150 + (v / 300) * 240);
  const INNER = r - 6;
  const OUTER = r + 4;
  const LABEL_R = r + 15;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: 220, display: "block" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="pred-gauge-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <filter id="pred-gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background track */}
      <path
        d={trackPath}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        className="text-border/30 dark:text-border/20"
      />

      {/* Coloured progress arc */}
      {progPath && (
        <path
          d={progPath}
          fill="none"
          stroke="url(#pred-gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          filter="url(#pred-gauge-glow)"
          style={{ transition: "all 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
      )}

      {/* Tick marks and labels */}
      {tickAngles.map((angle, i) => {
        const rad = toRad(angle);
        const val = tickValues[i];

        // Coordinates for tick line
        const x1 = cx + INNER * Math.cos(rad);
        const y1 = cy + INNER * Math.sin(rad);
        const x2 = cx + OUTER * Math.cos(rad);
        const y2 = cy + OUTER * Math.sin(rad);

        // Coordinates for tick label
        const lx = cx + LABEL_R * Math.cos(rad);
        const ly = cy + LABEL_R * Math.sin(rad);

        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="text-text-muted/40 dark:text-text-muted/30"
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[8px] font-bold fill-text-muted/70 dark:fill-text-muted/60"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Glowing tip indicator */}
      {progPath && (
        <circle
          cx={needleX}
          cy={needleY}
          r={5}
          fill={color}
          style={{
            filter: `drop-shadow(0 0 5px ${color})`,
            transition: "all 1.2s cubic-bezier(0.22,1,0.36,1)"
          }}
        />
      )}
    </svg>
  );
}

export function PredictionResult({ data, isLoading, error, onRetry }: PredictionResultProps) {
  const { t, lang } = useTranslation();

  if (error) {
    return (
      <div className="glass-card p-6 sm:p-7 rounded-3xl border-red-500/20 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
          {t.results.error}
        </h3>
        <p className="text-sm text-text-secondary max-w-sm mb-2">{error}</p>
        <p className="text-xs text-text-muted max-w-sm mb-6">{t.results.details}: {error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="group inline-flex items-center gap-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 hover:border-red-500/40 text-red-600 dark:text-red-400 font-bold text-xs tracking-wide px-5 py-2.5 shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
            <span>{lang === "en" ? "Try Again" : "Coba Lagi"}</span>
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return <AiThinkingLoader />;
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-card p-8 rounded-3xl border-dashed border-2 border-border/50 flex flex-col items-center justify-center text-center h-full min-h-[350px]"
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
  const aqiColor = getAqiColor(data.predicted_aqi);
  const textColorClass = getAqiTextColorClass(category);
  const badgeBgClass = getAqiBgColorClass(category);

  const title = lang === "en" ? data.category_label.en : data.category_label.id;
  const desc = lang === "en" ? data.description.en : data.description.id;

  // Glow colour per category
  const glowMap: Record<string, string> = {
    good: "shadow-aqi-good/20",
    moderate: "shadow-aqi-moderate/20",
    unhealthySensitive: "shadow-aqi-sensitive/20",
    unhealthy: "shadow-aqi-unhealthy/20",
    veryUnhealthy: "shadow-aqi-very-unhealthy/25",
    hazardous: "shadow-aqi-hazardous/30",
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "good":
        return <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "moderate":
        return <Info className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />;
      default:
        return <AlertTriangle className="h-3.5 w-3.5" />;
    }
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
        "relative glass-card p-6 sm:p-7 rounded-3xl h-full flex flex-col gap-6",
        "bg-gradient-to-b from-white/92 to-bg-secondary/75 dark:from-bg-secondary/92 dark:to-bg-primary/85",
        "shadow-2xl transition-all duration-500",
        "border border-white/60 dark:border-white/8",
        glowMap[category] ?? "shadow-accent-green/15"
      )}
    >
      {/* Top-right ambient glow blob */}
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40 blur-3xl pointer-events-none transition-colors duration-700 animate-pulse"
        style={{ background: `radial-gradient(circle, ${aqiColor}35 0%, transparent 70%)` }}
        aria-hidden
      />

      {/* ── Header ── */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          {/* AI active pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-accent-green"
            />
            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green"
            />
          </span>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-accent-green animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase">
              {lang === "en" ? "AI FORECAST SYSTEM" : "SISTEM PREDIKSI AI"}
            </span>
          </div>
        </div>
        {data.prediction_date && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-text-secondary bg-bg-secondary border border-border/60 px-2.5 py-1 rounded-lg">
            <Calendar className="h-3.5 w-3.5 text-accent-green" />
            <span>{data.prediction_date}</span>
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col justify-evenly flex-1 gap-4"
      >
        {/* Gauge Container */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[240px] shrink-0 relative flex items-center justify-center mx-auto"
        >
          <AqiGaugeSVG aqi={data.predicted_aqi} color={aqiColor} />

          {/* Centered AQI text inside the gauge */}
          <div className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className={cn("text-4xl font-black font-heading tracking-tighter tabular-nums", textColorClass)}>
              <NumberTicker value={data.predicted_aqi} />
            </span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest -mt-0.5">
              AQI
            </span>
          </div>
        </motion.div>

        {/* Text Details & Recommendations */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col justify-between w-full gap-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">
                {t.results.categoryLabel}
              </span>

              {/* Category Pill with Icon */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black tracking-wide shadow-sm border transition-colors duration-500",
                  badgeBgClass
                )}
              >
                {getCategoryIcon(category)}
                <span>{title}</span>
              </span>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Refactored health tips component rendering custom cards */}
          <HealthTips aqi={data.predicted_aqi} />

          {/* ── Weather Inputs strip ── */}
          {data.weather_data && (
            <div className="space-y-2.5 pt-3 border-t border-border/60">
              <span className="text-[9px] uppercase tracking-widest font-black text-text-muted">
                {lang === "en" ? "Forecast Weather Inputs" : "Faktor Meteorologi Input"}
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {/* Temperature */}
                <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-bg-secondary/35 border border-border/40 hover:border-accent-green/20 transition-all duration-300">
                  <Thermometer className="h-4 w-4 text-orange-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-text-muted uppercase leading-none">
                      {lang === "en" ? "Temp" : "Suhu"}
                    </span>
                    <span className="text-xs font-black text-text-primary mt-0.5">
                      {Math.round(data.weather_data.temperature_2m_mean * 10) / 10}°C
                    </span>
                  </div>
                </div>
                {/* Humidity */}
                <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-bg-secondary/35 border border-border/40 hover:border-accent-green/20 transition-all duration-300">
                  <Droplets className="h-4 w-4 text-blue-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-text-muted uppercase leading-none">
                      {lang === "en" ? "Humid" : "Kelemb"}
                    </span>
                    <span className="text-xs font-black text-text-primary mt-0.5">
                      {Math.round(data.weather_data.relative_humidity_2m_mean)}%
                    </span>
                  </div>
                </div>
                {/* Wind Speed */}
                <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-bg-secondary/35 border border-border/40 hover:border-accent-green/20 transition-all duration-300">
                  <Wind className="h-4 w-4 text-teal-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-text-muted uppercase leading-none">
                      {lang === "en" ? "Wind" : "Angin"}
                    </span>
                    <span className="text-xs font-black text-text-primary mt-0.5">
                      {Math.round(data.weather_data.wind_speed_10m_mean * 10) / 10}
                      <span className="text-[9px] font-medium text-text-muted"> km/h</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
