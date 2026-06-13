"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  AlertCircle,
  Gauge,
  Thermometer,
  ThermometerSnowflake,
  CloudRain,
  Wind,
  Droplets,
  Activity,
  Cloud,
  Sun,
} from "lucide-react";
import { useTranslation } from "@/i18n";
import { WeatherInput } from "@/types";
import { ShimmerButton } from "@/components/animated/shimmer-button";
import { Label } from "@/components/ui/label";

interface ManualTabProps {
  onPredict: (data: WeatherInput) => void;
  isLoading: boolean;
}

export function ManualTab({ onPredict, isLoading }: ManualTabProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<WeatherInput>({
    aqi: 80,
    temperature_2m_mean: 28.5,
    temperature_2m_min: 24.0,
    precipitation_sum: 0.0,
    wind_speed_10m_mean: 10.0,
    relative_humidity_2m_mean: 75.0,
    surface_pressure_mean: 1010.0,
    cloud_cover_mean: 50.0,
    shortwave_radiation_sum: 15.0,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic Validation Ranges
    if (formData.aqi < 0 || formData.aqi > 500) {
      setValidationError("Current AQI must be between 0 and 500.");
      return;
    }
    if (formData.temperature_2m_mean < 5 || formData.temperature_2m_mean > 50) {
      setValidationError("Average temperature must be between 5°C and 50°C.");
      return;
    }
    if (formData.temperature_2m_min < 0 || formData.temperature_2m_min > 40) {
      setValidationError("Minimum temperature must be between 0°C and 40°C.");
      return;
    }
    if (formData.temperature_2m_min > formData.temperature_2m_mean) {
      setValidationError("Minimum temperature cannot exceed the average temperature.");
      return;
    }
    if (formData.precipitation_sum < 0 || formData.precipitation_sum > 250) {
      setValidationError("Precipitation must be between 0 mm and 250 mm.");
      return;
    }
    if (formData.wind_speed_10m_mean < 0 || formData.wind_speed_10m_mean > 120) {
      setValidationError("Wind speed must be between 0 km/h and 120 km/h.");
      return;
    }
    if (formData.relative_humidity_2m_mean < 0 || formData.relative_humidity_2m_mean > 100) {
      setValidationError("Relative humidity must be between 0% and 100%.");
      return;
    }
    if (formData.surface_pressure_mean < 900 || formData.surface_pressure_mean > 1100) {
      setValidationError("Surface pressure must be between 900 hPa and 1100 hPa.");
      return;
    }
    if (formData.cloud_cover_mean < 0 || formData.cloud_cover_mean > 100) {
      setValidationError("Cloud cover must be between 0% and 100%.");
      return;
    }
    if (formData.shortwave_radiation_sum < 0 || formData.shortwave_radiation_sum > 50) {
      setValidationError("Shortwave radiation must be between 0 and 50 MJ/m².");
      return;
    }

    onPredict(formData);
  };

  const applyPreset = (presetValues: WeatherInput) => {
    setFormData(presetValues);
    setValidationError(null);
  };

  const presets = [
    {
      id: "clean",
      label: (t.manualTab as any).presets?.clean || "Clean Breeze",
      icon: <Wind className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />,
      values: {
        aqi: 25,
        temperature_2m_mean: 26.0,
        temperature_2m_min: 22.0,
        precipitation_sum: 0.0,
        wind_speed_10m_mean: 18.0,
        relative_humidity_2m_mean: 55.0,
        surface_pressure_mean: 1012.0,
        cloud_cover_mean: 15.0,
        shortwave_radiation_sum: 22.0,
      },
    },
    {
      id: "monsoon",
      label: (t.manualTab as any).presets?.monsoon || "Monsoon Rain",
      icon: <CloudRain className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
      values: {
        aqi: 40,
        temperature_2m_mean: 24.5,
        temperature_2m_min: 21.0,
        precipitation_sum: 45.0,
        wind_speed_10m_mean: 25.0,
        relative_humidity_2m_mean: 92.0,
        surface_pressure_mean: 1004.0,
        cloud_cover_mean: 95.0,
        shortwave_radiation_sum: 4.0,
      },
    },
    {
      id: "smog",
      label: (t.manualTab as any).presets?.smog || "Severe Smog",
      icon: <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />,
      values: {
        aqi: 185,
        temperature_2m_mean: 34.0,
        temperature_2m_min: 27.5,
        precipitation_sum: 0.0,
        wind_speed_10m_mean: 3.5,
        relative_humidity_2m_mean: 50.0,
        surface_pressure_mean: 1008.0,
        cloud_cover_mean: 10.0,
        shortwave_radiation_sum: 28.0,
      },
    },
    {
      id: "sunny",
      label: (t.manualTab as any).presets?.sunny || "Sunny & Dry",
      icon: <Sun className="h-4 w-4 text-amber-500 dark:text-amber-400" />,
      values: {
        aqi: 75,
        temperature_2m_mean: 31.0,
        temperature_2m_min: 25.0,
        precipitation_sum: 0.0,
        wind_speed_10m_mean: 11.0,
        relative_humidity_2m_mean: 60.0,
        surface_pressure_mean: 1010.0,
        cloud_cover_mean: 20.0,
        shortwave_radiation_sum: 24.0,
      },
    },
  ];

  const fields = [
    { name: "aqi", label: t.manualTab.fields.aqi, min: 0, max: 500, step: 1, unit: "AQI", icon: <Gauge className="h-4.5 w-4.5" /> },
    { name: "temperature_2m_mean", label: t.manualTab.fields.tempMean, min: 5, max: 50, step: 0.1, unit: "°C", icon: <Thermometer className="h-4.5 w-4.5" /> },
    { name: "temperature_2m_min", label: t.manualTab.fields.tempMin, min: 0, max: 40, step: 0.1, unit: "°C", icon: <ThermometerSnowflake className="h-4.5 w-4.5" /> },
    { name: "precipitation_sum", label: t.manualTab.fields.precip, min: 0, max: 250, step: 0.1, unit: "mm", icon: <CloudRain className="h-4.5 w-4.5" /> },
    { name: "wind_speed_10m_mean", label: t.manualTab.fields.wind, min: 0, max: 120, step: 0.1, unit: "km/h", icon: <Wind className="h-4.5 w-4.5" /> },
    { name: "relative_humidity_2m_mean", label: t.manualTab.fields.humidity, min: 0, max: 100, step: 1, unit: "%", icon: <Droplets className="h-4.5 w-4.5" /> },
    { name: "surface_pressure_mean", label: t.manualTab.fields.pressure, min: 900, max: 1100, step: 0.1, unit: "hPa", icon: <Activity className="h-4.5 w-4.5" /> },
    { name: "cloud_cover_mean", label: t.manualTab.fields.cloud, min: 0, max: 100, step: 1, unit: "%", icon: <Cloud className="h-4.5 w-4.5" /> },
    { name: "shortwave_radiation_sum", label: t.manualTab.fields.radiation, min: 0, max: 50, step: 0.1, unit: "MJ/m²", icon: <Sun className="h-4.5 w-4.5" /> },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title and Description */}
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
          {t.manualTab.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {t.manualTab.subtitle}
        </p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Quick Preset Scenarios */}
      <div className="space-y-2.5 p-4 rounded-2xl border border-border/80 bg-bg-secondary/40">
        <span className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider block">
          {(t.manualTab as any).presets?.title || "Scenario Presets"}
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.values)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card/75 hover:bg-bg-secondary dark:bg-card/45 hover:border-accent-green/30 text-xs font-bold text-text-primary transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {preset.icon}
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => {
          const value = formData[f.name as keyof WeatherInput];
          const percent = ((value - f.min) / (f.max - f.min)) * 100;

          return (
            <div
              key={f.name}
              className="space-y-3.5 p-4 rounded-xl border border-border bg-card/45 backdrop-blur-xs flex flex-col justify-between glass-card-hover"
            >
              {/* Header: Icon + Label on left, Value Input Badge on right */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-start gap-2 text-text-secondary min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-green/10 text-accent-green mt-0.5">
                    {f.icon}
                  </div>
                  <Label
                    htmlFor={f.name}
                    className="text-[11px] sm:text-xs font-bold leading-tight cursor-pointer select-none py-1"
                  >
                    {f.label.split(" (")[0]}
                  </Label>
                </div>

                {/* Focusable pill badge input */}
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-green/5 border border-accent-green/15 focus-within:border-accent-green/45 focus-within:bg-white dark:focus-within:bg-black/35 transition-all shadow-xs shrink-0 mt-0.5">
                  <input
                    id={f.name}
                    name={f.name}
                    type="number"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={value}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-12 bg-transparent text-right font-bold text-xs text-text-primary outline-none focus:ring-0 border-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                  <span className="text-[10px] font-bold text-text-muted select-none">
                    {f.unit}
                  </span>
                </div>
              </div>

              {/* Custom styled range input */}
              <div className="relative flex items-center h-4">
                <input
                  type="range"
                  id={`${f.name}-slider`}
                  name={f.name}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={value}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full appearance-none h-1.5 rounded-full cursor-pointer outline-none transition-all duration-150 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-green [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-120 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent-green [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-120"
                  style={{
                    background: `linear-gradient(to right, var(--accent-green) 0%, var(--accent-green) ${percent}%, var(--bg-secondary) ${percent}%, var(--bg-secondary) 100%)`,
                  }}
                  aria-label={`${f.label} slider`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      <div className="flex justify-center sm:justify-start pt-2">
        <ShimmerButton type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[200px]">
          <SlidersHorizontal className="h-4 w-4" />
          <span>{t.manualTab.btnText}</span>
        </ShimmerButton>
      </div>
    </form>
  );
}
