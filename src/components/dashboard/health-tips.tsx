"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/i18n";
import { getAqiCategory } from "@/lib/aqi-utils";

interface HealthTipsProps {
  aqi: number;
}

export function HealthTips({ aqi }: HealthTipsProps) {
  const { t } = useTranslation();
  const category = getAqiCategory(aqi);

  const tips = t.healthTips[category] || [];

  const getIcon = () => {
    if (aqi <= 100) {
      return <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }
    return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
  };

  return (
    <div className="space-y-3">
      <h4 className="font-heading text-sm font-bold text-text-primary flex items-center gap-1.5">
        {getIcon()}
        <span>{t.results.recommendations}</span>
      </h4>
      <ul className="space-y-2">
        {tips.map((tip: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-accent-green shrink-0 fill-accent-green/10" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
