"use client";

import React from "react";
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

interface WeatherMetricsProps {
  data: WeatherInput;
}

export function WeatherMetrics({ data }: WeatherMetricsProps) {
  const { t } = useTranslation();

  const metrics = [
    {
      icon: <Gauge className="h-5 w-5" />,
      label: t.metrics.currentAqi,
      value: data.aqi,
      unit: "AQI",
    },
    {
      icon: <Thermometer className="h-5 w-5" />,
      label: t.metrics.temperature_mean,
      value: data.temperature_2m_mean,
      unit: "°C",
    },
    {
      icon: <ThermometerSnowflake className="h-5 w-5" />,
      label: t.metrics.temperature_min,
      value: data.temperature_2m_min,
      unit: "°C",
    },
    {
      icon: <CloudRain className="h-5 w-5" />,
      label: t.metrics.precipitation,
      value: data.precipitation_sum,
      unit: "mm",
    },
    {
      icon: <Wind className="h-5 w-5" />,
      label: t.metrics.windSpeed,
      value: data.wind_speed_10m_mean,
      unit: "km/h",
    },
    {
      icon: <Droplets className="h-5 w-5" />,
      label: t.metrics.humidity,
      value: data.relative_humidity_2m_mean,
      unit: "%",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: t.metrics.pressure,
      value: data.surface_pressure_mean,
      unit: "hPa",
    },
    {
      icon: <Cloud className="h-5 w-5" />,
      label: t.metrics.cloudCover,
      value: data.cloud_cover_mean,
      unit: "%",
    },
    {
      icon: <Sun className="h-5 w-5" />,
      label: t.metrics.radiation,
      value: data.shortwave_radiation_sum,
      unit: "MJ/m²",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {metrics.map((m, idx) => (
        <MetricCard
          key={idx}
          icon={m.icon}
          label={m.label}
          value={m.value}
          unit={m.unit}
        />
      ))}
    </div>
  );
}
