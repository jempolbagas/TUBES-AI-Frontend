"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[180px] w-full flex items-center justify-center text-text-muted text-sm animate-pulse font-medium">
      Loading Gauge...
    </div>
  ),
});

interface AqiGaugeProps {
  value: number;
}

export function AqiGauge({ value }: AqiGaugeProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[180px] w-full flex items-center justify-center text-text-muted text-sm animate-pulse font-medium">
        Loading Gauge...
      </div>
    );
  }

  // Cap display gauge values at 300
  const gaugeValue = Math.min(value, 300);

  return (
    <div className="w-full max-w-[280px] mx-auto">
      <GaugeComponent
        value={gaugeValue}
        maxValue={300}
        type="semicircle"
        arc={{
          subArcs: [
            { limit: 50, color: "#4CAF50" },
            { limit: 100, color: "#FFC107" },
            { limit: 150, color: "#FF9800" },
            { limit: 200, color: "#F44336" },
            { limit: 300, color: "#9C27B0" },
          ],
          width: 0.12,
          padding: 0.015,
        }}
        pointer={{
          type: "needle",
          color: "#3D7C47",
          length: 0.75,
          width: 12,
          animationDelay: 50,
        }}
        labels={{
          valueLabel: {
            style: {
              fontSize: "32px",
              fill: "#2D3B2D",
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: "700",
            },
            formatTextValue: () => `${Math.round(value)}`, // Show true un-capped AQI text
          },
          tickLabels: {
            type: "outer",
            hideMinMax: false,
            ticks: [
              { value: 0 },
              { value: 50 },
              { value: 100 },
              { value: 150 },
              { value: 200 },
              { value: 300 },
            ],
            style: {
              fontSize: "9px",
              fill: "#5A6B5A",
              fontWeight: "600",
            },
          },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any}
      />
    </div>
  );
}
