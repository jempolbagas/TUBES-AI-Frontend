"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/dashboard/hero-section";
import { TabContainer } from "@/components/dashboard/tab-container";
import { PredictionResult } from "@/components/dashboard/prediction-result";
import { AqiLegend } from "@/components/dashboard/aqi-legend";
import { usePrediction } from "@/hooks/use-prediction";
import { WeatherInput } from "@/types";

export default function Home() {
  const { data, isLoading, error, predict, clear } = usePrediction();
  const [activePredictorTab, setActivePredictorTab] = useState("predict");

  const handlePredictTomorrow = () => {
    predict("tomorrow");
  };

  const handlePredictManual = (formData: WeatherInput) => {
    predict("manual", formData);
  };

  const handlePredictDate = (dateStr: string) => {
    predict("date", dateStr);
  };

  const handleTabChange = (newTab: string) => {
    setActivePredictorTab(newTab);
    clear(); // Clear old results when switching tabs to avoid confusion
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text-primary selection:bg-accent-green/20 selection:text-accent-green">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow pb-16">
        {/* Title and Badge Header */}
        <HeroSection />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controllers: Tab Panel & Forms (Col Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <TabContainer
              activePredictorTab={activePredictorTab}
              setActivePredictorTab={handleTabChange}
              onPredictTomorrow={handlePredictTomorrow}
              onPredictManual={handlePredictManual}
              onPredictDate={handlePredictDate}
              isLoading={isLoading}
              predictionData={data}
            />
          </div>

          {/* Results: Gauge and Health Recommendations (Col Span 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <PredictionResult data={data} isLoading={isLoading} error={error} />
            <AqiLegend />
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
