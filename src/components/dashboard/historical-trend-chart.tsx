"use client";

import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "@/i18n";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    fill?: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 rounded-xl border border-border shadow-md text-xs space-y-1.5 bg-card/95 backdrop-blur-xs">
        <p className="font-bold text-text-primary font-heading">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-text-secondary font-medium">
              {entry.name}:
            </span>
            <span className="font-bold text-text-primary">
              {entry.value} AQI
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function HistoricalTrendChart() {
  const { lang, t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Generate mock data for the last 7 days dynamically
  const getPastDaysData = () => {
    const baseDate = new Date();
    // Deterministic mock values
    const actualValues = [82, 95, 112, 124, 105, 89, 98];
    const predictedValues = [78, 91, 115, 120, 108, 94, 96];
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(baseDate.getDate() - i - 1);
      const formattedDate = d.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        day: "numeric",
        month: "short",
      });
      result.push({
        date: formattedDate,
        actual: actualValues[6 - i],
        predicted: predictedValues[6 - i],
      });
    }
    return result;
  };

  if (!isMounted) {
    return (
      <div className="glass-card p-6 rounded-2xl h-[350px] w-full flex items-center justify-center animate-pulse">
        <div className="text-text-muted text-sm font-medium">Loading Chart...</div>
      </div>
    );
  }

  const chartData = getPastDaysData();

  return (
    <div className="glass-card p-6 rounded-2xl w-full border border-border shadow-sm space-y-4">
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1" data-testid="chart-title">
          {t.chart.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed" data-testid="chart-desc">
          {t.chart.desc}
        </p>
      </div>

      <div className="h-[260px] w-full text-xs font-semibold">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="var(--text-muted)"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickLine={false}
              axisLine={false}
              dx={-5}
              domain={[0, 200]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--border)", opacity: 0.15 }} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 0, paddingBottom: 10 }}
            />
            <Bar
              name={t.chart.actual}
              dataKey="actual"
              barSize={24}
              fill="var(--accent-sage)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              name={t.chart.predicted}
              type="monotone"
              dataKey="predicted"
              stroke="var(--accent-green)"
              strokeWidth={3}
              dot={{ r: 4, stroke: "var(--accent-green)", strokeWidth: 1, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
