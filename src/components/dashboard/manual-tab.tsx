"use client";

import React, { useState } from "react";
import { SlidersHorizontal, AlertCircle } from "lucide-react";
import { useTranslation } from "@/i18n";
import { WeatherInput } from "@/types";
import { ShimmerButton } from "@/components/animated/shimmer-button";
import { Input } from "@/components/ui/input";
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

  const fields = [
    { name: "aqi", label: t.manualTab.fields.aqi, min: 0, max: 500, step: 1 },
    { name: "temperature_2m_mean", label: t.manualTab.fields.tempMean, min: 5, max: 50, step: 0.1 },
    { name: "temperature_2m_min", label: t.manualTab.fields.tempMin, min: 0, max: 40, step: 0.1 },
    { name: "precipitation_sum", label: t.manualTab.fields.precip, min: 0, max: 250, step: 0.1 },
    { name: "wind_speed_10m_mean", label: t.manualTab.fields.wind, min: 0, max: 120, step: 0.1 },
    { name: "relative_humidity_2m_mean", label: t.manualTab.fields.humidity, min: 0, max: 100, step: 1 },
    { name: "surface_pressure_mean", label: t.manualTab.fields.pressure, min: 900, max: 1100, step: 0.1 },
    { name: "cloud_cover_mean", label: t.manualTab.fields.cloud, min: 0, max: 100, step: 1 },
    { name: "shortwave_radiation_sum", label: t.manualTab.fields.radiation, min: 0, max: 50, step: 0.1 },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
          {t.manualTab.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {t.manualTab.subtitle}
        </p>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.name} className="space-y-1.5">
            <Label htmlFor={f.name} className="text-xs font-bold text-text-secondary">
              {f.label}
            </Label>
            <Input
              id={f.name}
              name={f.name}
              type="number"
              min={f.min}
              max={f.max}
              step={f.step}
              value={formData[f.name as keyof WeatherInput]}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-white/50 border-border focus:border-accent-green hover:border-accent-sage/60 rounded-xl"
              required
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:justify-start">
        <ShimmerButton type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[200px]">
          <SlidersHorizontal className="h-4 w-4" />
          <span>{t.manualTab.btnText}</span>
        </ShimmerButton>
      </div>
    </form>
  );
}
