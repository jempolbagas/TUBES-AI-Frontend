"use client";

import React from "react";
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  AlertCircle,
  Wind
} from "lucide-react";
import { useTranslation } from "@/i18n";
import { getAqiCategory, getAqiColor } from "@/lib/aqi-utils";
import { cn } from "@/lib/utils";

interface HealthTipsProps {
  aqi: number;
}

export function HealthTips({ aqi }: HealthTipsProps) {
  const { t, lang } = useTranslation();
  const category = getAqiCategory(aqi);
  const aqiColor = getAqiColor(aqi);

  const tips = t.healthTips[category] || [];

  // Define labels based on language
  const labels = lang === "en" 
    ? ["Outdoor Activity", "Personal Protection", "Health Advisory"]
    : ["Aktivitas Outdoor", "Proteksi Diri", "Saran Kesehatan"];

  // Select icons and background colors based on category/index
  const getCardTheme = (index: number) => {
    const isUnhealthy = aqi > 100;
    
    // Map index to specific icon, text color and bg/border color classes
    if (index === 0) {
      return {
        icon: <Activity className="h-4 w-4" />,
        colorClass: isUnhealthy ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400",
        bgClass: isUnhealthy ? "bg-amber-500/10 border-amber-500/20" : "bg-emerald-500/10 border-emerald-500/20",
      };
    } else if (index === 1) {
      return {
        icon: isUnhealthy ? <AlertCircle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />,
        colorClass: isUnhealthy ? "text-rose-600 dark:text-rose-400" : "text-teal-600 dark:text-teal-400",
        bgClass: isUnhealthy ? "bg-rose-500/10 border-rose-500/20" : "bg-teal-500/10 border-teal-500/20",
      };
    } else {
      return {
        icon: <Wind className="h-4 w-4" />,
        colorClass: isUnhealthy ? "text-purple-600 dark:text-purple-400" : "text-blue-600 dark:text-blue-400",
        bgClass: isUnhealthy ? "bg-purple-500/10 border-purple-500/20" : "bg-blue-500/10 border-blue-500/20",
      };
    }
  };

  const getHeaderIcon = () => {
    if (aqi <= 100) {
      return <ShieldCheck className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
    }
    return <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-heading text-sm font-bold text-text-primary flex items-center gap-2">
        <div className="p-1 rounded-lg bg-bg-secondary border border-border/60 flex items-center justify-center">
          {getHeaderIcon()}
        </div>
        <span>{t.results.recommendations}</span>
      </h4>
      <div className="flex flex-col gap-3">
        {tips.map((tip: string, idx: number) => {
          const theme = getCardTheme(idx);
          return (
            <div 
              key={idx} 
              className="group relative flex items-start gap-3.5 p-3.5 rounded-2xl border border-border/40 bg-bg-secondary/40 dark:bg-bg-primary/40 transition-all duration-300 hover:border-accent-green/25 hover:bg-white/45 dark:hover:bg-bg-secondary/45 hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Subtle hover background gradient glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                style={{ background: `linear-gradient(180deg, ${aqiColor}03 0%, transparent 100%)` }}
              />
              
              <div className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110",
                theme.colorClass,
                theme.bgClass
              )}>
                {theme.icon}
              </div>

              <div className="relative z-10 flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted leading-none">
                  {labels[idx] || labels[2]}
                </span>
                <p className="text-xs font-semibold text-text-secondary leading-relaxed mt-1">
                  {tip}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
