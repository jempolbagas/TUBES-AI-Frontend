"use client";

import React from "react";
import { NumberTicker } from "@/components/animated/number-ticker";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
}

export function MetricCard({ icon, label, value, unit }: MetricCardProps) {
  return (
    <div className="glass-card glass-card-hover p-4 rounded-xl flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-green/10 text-accent-green">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-text-secondary truncate">{label}</p>
        <div className="flex items-baseline gap-0.5 mt-1">
          <NumberTicker
            value={value}
            className="text-2xl font-bold text-text-primary tracking-tight font-heading"
          />
          <span className="text-xs font-semibold text-text-muted ml-0.5">{unit}</span>
        </div>
      </div>
    </div>
  );
}
