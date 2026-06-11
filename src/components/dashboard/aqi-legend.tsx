"use client";

import React from "react";
import { useTranslation } from "@/i18n";

export function AqiLegend() {
  const { t } = useTranslation();

  const categories = [
    { label: t.legend.good, color: "bg-[#4CAF50]" },
    { label: t.legend.moderate, color: "bg-[#FFC107]" },
    { label: t.legend.sensitive, color: "bg-[#FF9800]" },
    { label: t.legend.unhealthy, color: "bg-[#F44336]" },
    { label: t.legend.veryUnhealthy, color: "bg-[#9C27B0]" },
    { label: t.legend.hazardous, color: "bg-[#7B1FA2]" },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="font-heading text-base font-bold text-text-primary mb-4">
        {t.legend.title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`h-3 w-3 shrink-0 rounded-full ${cat.color}`} />
            <span className="text-xs font-semibold text-text-secondary">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
