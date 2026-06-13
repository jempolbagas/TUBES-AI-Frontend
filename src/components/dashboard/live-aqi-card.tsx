"use client";

import React from "react";
import { Thermometer, Wind, Droplets } from "lucide-react";
import { useTranslation } from "@/i18n";
import { WeatherInput } from "@/types";
import { NumberTicker } from "@/components/animated/number-ticker";
import {
  getAqiCategory,
  getAqiTextColorClass,
  getAqiBgColorClass,
  getAqiColor,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
} from "@/lib/aqi-utils";
import { cn } from "@/lib/utils";

interface LiveAqiCardProps {
  aqi: number;
  weatherData: WeatherInput;
  isLoading?: boolean;
}

// ─── Radial half-donut gauge ────────────────────────────────────────────────
function AqiGaugeSVG({ aqi, color }: { aqi: number; color: string }) {
  // viewBox: 200 × 120
  // cx=100, cy=110 → arc endpoints sit at y=110 (near bottom)
  // r=88 → arc peak at y = 110 - 88 = 22 (near top, fully visible)
  // strokeWidth=12 → max bleed = 6px → bottom edge at y=116 (< 120) ✓
  const VW = 200;
  const VH = 120;
  const cx = 100;
  const cy = 110;
  const r  = 88;
  const stroke = 12;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const describeArc = (startDeg: number, endDeg: number) => {
    const sx = cx + r * Math.cos(toRad(startDeg));
    const sy = cy + r * Math.sin(toRad(startDeg));
    const ex = cx + r * Math.cos(toRad(endDeg));
    const ey = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  // Sweep 180° → 360° (arc domes upward in SVG y-down space)
  const cappedAqi  = Math.min(Math.max(aqi, 0), 300);
  const sweepDeg   = (cappedAqi / 300) * 180;
  const trackPath  = describeArc(180, 360);
  const progPath   = sweepDeg > 0 ? describeArc(180, 180 + sweepDeg) : null;

  // Needle tip
  const needleDeg = 180 + sweepDeg;
  const needleX   = cx + r * Math.cos(toRad(needleDeg));
  const needleY   = cy + r * Math.sin(toRad(needleDeg));

  // Tick marks at AQI category breakpoints
  const tickValues = [0, 50, 100, 150, 200, 300];
  const tickAngles = tickValues.map((v) => 180 + (v / 300) * 180);
  const INNER = r - 8;
  const OUTER = r + 4;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: 220, display: "block" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
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
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          style={{ transition: "all 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      )}

      {/* Tick marks */}
      {tickAngles.map((angle, i) => {
        const rad = toRad(angle);
        return (
          <line
            key={i}
            x1={cx + INNER * Math.cos(rad)}
            y1={cy + INNER * Math.sin(rad)}
            x2={cx + OUTER * Math.cos(rad)}
            y2={cy + OUTER * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="text-border/50"
          />
        );
      })}

      {/* Needle dot */}
      {progPath && (
        <circle
          cx={needleX}
          cy={needleY}
          r={6}
          fill={color}
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
      )}
    </svg>
  );
}



// ─── Weather metric mini-card ───────────────────────────────────────────────
interface WeatherMiniCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  iconBg: string;
  iconColor: string;
}
function WeatherMiniCard({ icon, label, value, iconBg, iconColor }: WeatherMiniCardProps) {
  return (
    <div className="group relative flex flex-col items-center gap-1.5 rounded-2xl border border-border/40 bg-bg-secondary/40 dark:bg-bg-primary/40 p-3 text-center transition-all duration-300 hover:border-accent-green/25 hover:bg-white/35 dark:hover:bg-bg-secondary/35 hover:-translate-y-0.5 overflow-hidden">
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-accent-green/5 to-transparent rounded-2xl" />

      <div
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
          iconBg,
          iconColor
        )}
      >
        {icon}
      </div>
      <span className="relative z-10 text-[9px] font-bold text-text-muted uppercase tracking-widest">
        {label}
      </span>
      <span className="relative z-10 text-xs font-extrabold text-text-primary">{value}</span>
    </div>
  );
}

// ─── Main Card ──────────────────────────────────────────────────────────────
export function LiveAqiCard({
  aqi,
  weatherData,
  isLoading = false,
}: LiveAqiCardProps) {
  const { t, lang } = useTranslation();

  const category = getAqiCategory(aqi);
  const aqiColor = getAqiColor(aqi);
  const textColorClass = getAqiTextColorClass(category);
  const badgeBgClass = getAqiBgColorClass(category);

  const activeLabel = CATEGORY_LABELS[category] ?? CATEGORY_LABELS.good;
  const activeDesc = CATEGORY_DESCRIPTIONS[category] ?? CATEGORY_DESCRIPTIONS.good;

  const titleText = lang === "en" ? activeLabel.en : activeLabel.id;
  const descText = lang === "en" ? activeDesc.en : activeDesc.id;

  // Glow colour per category
  const glowMap: Record<string, string> = {
    good: "shadow-aqi-good/20",
    moderate: "shadow-aqi-moderate/20",
    unhealthySensitive: "shadow-aqi-sensitive/20",
    unhealthy: "shadow-aqi-unhealthy/20",
    veryUnhealthy: "shadow-aqi-very-unhealthy/25",
    hazardous: "shadow-aqi-hazardous/30",
  };

  const currentShadow = glowMap[category] ?? "shadow-accent-green/15";

  return (
    <div
      className={cn(
        "relative glass-card rounded-3xl w-full overflow-hidden",
        "bg-gradient-to-b from-white/92 to-bg-secondary/75 dark:from-bg-secondary/92 dark:to-bg-primary/85",
        "shadow-2xl transition-all duration-500",
        "border border-white/60 dark:border-white/8",
        currentShadow
      )}
    >
      {/* Top-right ambient glow blob */}
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-50 blur-3xl pointer-events-none transition-colors duration-700 animate-pulse"
        style={{ background: `radial-gradient(circle, ${aqiColor}40 0%, transparent 70%)` }}
        aria-hidden
      />

      {/* Inner content */}
      <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-5">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Live pulse dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ backgroundColor: aqiColor }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: aqiColor }}
              />
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-text-secondary uppercase">
              {t.hero.liveAqi}
            </span>
          </div>

          <span className="text-[10px] font-semibold text-text-muted bg-bg-secondary/80 dark:bg-bg-primary/80 border border-border/60 px-2.5 py-1 rounded-lg">
            {t.hero.liveAqiLabel.split(" ").slice(-1)[0] || "Jakarta"}
          </span>
        </div>

        {/* ── Half-donut Gauge ── */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-full flex justify-center">
            <AqiGaugeSVG aqi={aqi} color={aqiColor} />

            {/* AQI number centred inside the arch */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span
                className={cn(
                  "text-4xl font-black font-heading tracking-tighter tabular-nums",
                  textColorClass
                )}
              >
                <NumberTicker value={aqi} />
              </span>
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest -mt-0.5">
                AQI
              </span>
            </div>
          </div>

          {/* Category pill */}
          <span
            className={cn(
              "inline-flex items-center rounded-full px-4 py-1 text-[11px] font-black border tracking-wide shadow-sm transition-colors duration-500",
              badgeBgClass
            )}
          >
            {titleText}
          </span>

          {/* Description */}
          <p className="text-xs text-text-secondary text-center leading-relaxed font-medium max-w-xs px-2">
            {descText}
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* ── Weather Micro-cards ── */}
        <div className="grid grid-cols-3 gap-2.5">
          <WeatherMiniCard
            icon={<Thermometer className="h-3.5 w-3.5" />}
            label={lang === "en" ? "Temp" : "Suhu"}
            value={`${Math.round(weatherData.temperature_2m_mean * 10) / 10}°C`}
            iconBg="bg-orange-500/10"
            iconColor="text-orange-500"
          />
          <WeatherMiniCard
            icon={<Droplets className="h-3.5 w-3.5" />}
            label={lang === "en" ? "Humid" : "Kelemb"}
            value={`${Math.round(weatherData.relative_humidity_2m_mean)}%`}
            iconBg="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <WeatherMiniCard
            icon={<Wind className="h-3.5 w-3.5" />}
            label={lang === "en" ? "Wind" : "Angin"}
            value={
              <>
                {Math.round(weatherData.wind_speed_10m_mean * 10) / 10}
                <span className="text-[8px] font-medium text-text-muted"> km/h</span>
              </>
            }
            iconBg="bg-teal-500/10"
            iconColor="text-teal-400"
          />
        </div>
      </div>
    </div>
  );
}
