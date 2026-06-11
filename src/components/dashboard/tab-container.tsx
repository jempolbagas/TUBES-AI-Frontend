"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, SlidersHorizontal, History } from "lucide-react";
import { useTranslation } from "@/i18n";
import { WeatherInput, PredictionResponse } from "@/types";
import { PredictTab } from "./predict-tab";
import { ManualTab } from "./manual-tab";
import { HistoryTab } from "./history-tab";

interface TabContainerProps {
  onPredictTomorrow: () => void;
  onPredictManual: (data: WeatherInput) => void;
  onPredictDate: (date: string) => void;
  isLoading: boolean;
  predictionData: PredictionResponse | null;
  activePredictorTab: string;
  setActivePredictorTab: (tab: string) => void;
}

export function TabContainer({
  onPredictTomorrow,
  onPredictManual,
  onPredictDate,
  isLoading,
  predictionData,
  activePredictorTab,
  setActivePredictorTab,
}: TabContainerProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: "predict", label: t.tabs.predict, icon: <Sparkles className="h-4 w-4" /> },
    { id: "manual", label: t.tabs.manual, icon: <SlidersHorizontal className="h-4 w-4" /> },
    { id: "history", label: t.tabs.history, icon: <History className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs list slider */}
      <div className="flex w-full overflow-x-auto rounded-2xl bg-bg-secondary/60 p-1.5 border border-border/80 scrollbar-none">
        <div className="flex w-full min-w-max gap-1">
          {tabs.map((tab) => {
            const isActive = activePredictorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePredictorTab(tab.id)}
                className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer flex-1 min-w-[140px] ${
                  isActive ? "text-white" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-accent-green rounded-xl -z-10 shadow-md shadow-accent-green/10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs contents panels with transition */}
      <div className="glass-card p-6 rounded-2xl min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePredictorTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {activePredictorTab === "predict" && (
              <PredictTab
                onPredict={onPredictTomorrow}
                isLoading={isLoading}
                predictionData={predictionData}
              />
            )}
            {activePredictorTab === "manual" && (
              <ManualTab onPredict={onPredictManual} isLoading={isLoading} />
            )}
            {activePredictorTab === "history" && (
              <HistoryTab
                onPredict={onPredictDate}
                isLoading={isLoading}
                predictionData={predictionData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
