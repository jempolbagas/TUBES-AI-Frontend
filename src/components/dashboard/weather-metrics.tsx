"use client";

import React, { useRef, useState } from "react";
import {
  Thermometer,
  ThermometerSnowflake,
  CloudRain,
  Wind,
  Droplets,
  Activity,
  Cloud,
  Sun,
  Gauge,
} from "lucide-react";
import { useTranslation } from "@/i18n";
import { WeatherInput } from "@/types";
import { MetricCard } from "./metric-card";

interface MetricItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
}

interface MetricDetailTranslation {
  meaning: string;
  formula: string;
  relation: string;
}

interface TranslationWithDetails {
  metricDetails: Record<string, MetricDetailTranslation>;
}

interface WeatherMetricsProps {
  data: WeatherInput;
}

export function WeatherMetrics({ data }: WeatherMetricsProps) {
  const { lang, t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState<MetricItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const metrics = [
    {
      key: "currentAqi",
      icon: <Gauge className="h-5 w-5" />,
      label: t.metrics.currentAqi,
      value: data.aqi,
      unit: "AQI",
    },
    {
      key: "temperature_mean",
      icon: <Thermometer className="h-5 w-5" />,
      label: t.metrics.temperature_mean,
      value: data.temperature_2m_mean,
      unit: "°C",
    },
    {
      key: "temperature_min",
      icon: <ThermometerSnowflake className="h-5 w-5" />,
      label: t.metrics.temperature_min,
      value: data.temperature_2m_min,
      unit: "°C",
    },
    {
      key: "precipitation",
      icon: <CloudRain className="h-5 w-5" />,
      label: t.metrics.precipitation,
      value: data.precipitation_sum,
      unit: "mm",
    },
    {
      key: "windSpeed",
      icon: <Wind className="h-5 w-5" />,
      label: t.metrics.windSpeed,
      value: data.wind_speed_10m_mean,
      unit: "km/h",
    },
    {
      key: "humidity",
      icon: <Droplets className="h-5 w-5" />,
      label: t.metrics.humidity,
      value: data.relative_humidity_2m_mean,
      unit: "%",
    },
    {
      key: "pressure",
      icon: <Activity className="h-5 w-5" />,
      label: t.metrics.pressure,
      value: data.surface_pressure_mean,
      unit: "hPa",
    },
    {
      key: "cloudCover",
      icon: <Cloud className="h-5 w-5" />,
      label: t.metrics.cloudCover,
      value: data.cloud_cover_mean,
      unit: "%",
    },
    {
      key: "radiation",
      icon: <Sun className="h-5 w-5" />,
      label: t.metrics.radiation,
      value: data.shortwave_radiation_sum,
      unit: "MJ/m²",
    },
  ];

  const openModal = (metric: MetricItem) => {
    setSelectedMetric(metric);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedMetric(null);
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((m, idx) => (
          <MetricCard
            key={idx}
            icon={m.icon}
            label={m.label}
            value={m.value}
            unit={m.unit}
            onClick={() => openModal(m)}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="rounded-2xl border border-border bg-card p-6 backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-md w-[90%] focus:outline-none glass-card mx-auto my-auto"
        data-testid="details-dialog"
      >
        {selectedMetric && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-green/10 text-accent-green">
                  {selectedMetric.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight font-heading text-text-primary">
                  {selectedMetric.label}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-text-secondary hover:text-text-primary rounded-lg p-1.5 hover:bg-bg-secondary cursor-pointer transition-all"
                aria-label="Close modal"
                data-testid="close-modal-btn"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mt-2">
              <div>
                <span className="text-xs font-bold text-text-muted block uppercase tracking-wider">
                  {lang === "id" ? "Nilai Saat Ini" : "Current Value"}
                </span>
                <span className="text-xl font-bold font-heading text-text-primary">
                  {selectedMetric.value} {selectedMetric.unit}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-text-muted block uppercase tracking-wider">
                  {lang === "id" ? "Definisi / Arti" : "Definition / Meaning"}
                </span>
                <p className="text-sm text-text-secondary mt-1">
                  {(t as unknown as TranslationWithDetails).metricDetails?.[selectedMetric.key]?.meaning}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-text-muted block uppercase tracking-wider">
                  {lang === "id" ? "Formula Ilmiah" : "Scientific Formula"}
                </span>
                <code className="text-xs bg-bg-secondary px-2 py-1 rounded text-accent-green block w-fit mt-1.5 font-mono">
                  {(t as unknown as TranslationWithDetails).metricDetails?.[selectedMetric.key]?.formula}
                </code>
              </div>

              <div>
                <span className="text-xs font-bold text-text-muted block uppercase tracking-wider">
                  {lang === "id" ? "Korelasi dengan AQI" : "Correlation with AQI"}
                </span>
                <p className="text-sm text-text-secondary mt-1">
                  {(t as unknown as TranslationWithDetails).metricDetails?.[selectedMetric.key]?.relation}
                </p>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
