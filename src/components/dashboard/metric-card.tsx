"use client";

import React from "react";
import { NumberTicker } from "@/components/animated/number-ticker";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  onClick?: () => void;
}

export function MetricCard({ icon, label, value, unit, onClick }: MetricCardProps) {
  const isClickable = !!onClick;
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card bg-gradient-to-b from-white/95 to-bg-secondary/70 dark:from-bg-secondary/90 dark:to-bg-primary/50 p-4 rounded-xl flex items-center gap-4 transition-all duration-300",
        isClickable
          ? "cursor-pointer hover:scale-[1.03] active:scale-[0.97] hover:border-accent-green/30 hover:shadow-md"
          : "glass-card-hover"
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">
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
