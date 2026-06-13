"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
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
    <div className="flex min-h-screen flex-col bg-transparent text-text-primary selection:bg-accent-green/20 selection:text-accent-green">
      {/* SECTION 1: Full Viewport Hero Landing Page */}
      <div className="relative flex flex-col min-h-screen pb-12">
        <Navbar />
        <div className="flex-grow flex items-center justify-center relative">
          <HeroSection />
        </div>
      </div>

      {/* SECTION 2: Interactive Predictor Dashboard */}
      <main
        id="dashboard"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow pb-16 pt-8 scroll-mt-24"
      >
        {/* Dashboard Grid with Reveal-on-Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
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
            <AqiLegend />
          </div>

          {/* Results: Gauge and Health Recommendations (Col Span 5) */}
          <div className="lg:col-span-5 h-full">
            <PredictionResult data={data} isLoading={isLoading} error={error} />
          </div>
        </motion.div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
