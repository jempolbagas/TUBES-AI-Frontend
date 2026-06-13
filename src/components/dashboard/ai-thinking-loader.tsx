"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Cpu } from "lucide-react";
import { useTranslation } from "@/i18n";

const thinkingTexts = {
  id: [
    "Menghubungkan ke satelit cuaca...",
    "Mengekstrak data kelembapan & suhu...",
    "Menganalisis pola angin Jakarta...",
    "Menjalankan model regresi AI...",
    "Menghitung prediksi nilai AQI...",
    "Memformulasikan rekomendasi kesehatan..."
  ],
  en: [
    "Connecting to weather satellites...",
    "Extracting humidity & temperature data...",
    "Analyzing Jakarta's wind patterns...",
    "Executing AI regression models...",
    "Calculating predicted AQI values...",
    "Formulating health recommendations..."
  ]
};

export function AiThinkingLoader() {
  const { lang } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);
  const currentTexts = thinkingTexts[lang === "en" ? "en" : "id"];

  // Cycle through different thinking statuses to simulate cognitive progression
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % currentTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentTexts.length]);

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between text-center h-full min-h-[380px] overflow-hidden relative">
      {/* Background ambient grid/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.08),transparent_70%)] pointer-events-none" />
      <div
        className="absolute -left-16 -top-16 h-36 w-36 rounded-full opacity-25 blur-3xl pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, #4ad786 0%, transparent 70%)" }}
      />

      {/* Header element to align with result card */}
      <div className="w-full flex items-center justify-center border-b border-border/40 pb-4 relative z-10">
        <div className="flex items-center gap-1">
          <Cpu className="h-3.5 w-3.5 text-accent-green animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase">
            {lang === "en" ? "AI ENGINE ACTIVE" : "ENGINE AI AKTIF"}
          </span>
        </div>
      </div>

      {/* Main futuristic animation stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-6 w-full">
        {/* Glow circles behind the core */}
        <div className="absolute w-44 h-44 rounded-full bg-accent-green/5 border border-accent-green/10 animate-ping [animation-duration:3s]" />
        <div className="absolute w-36 h-36 rounded-full bg-accent-green/10 opacity-30 blur-2xl" />

        {/* Orbiting Ring SVG */}
        <svg className="w-48 h-48 absolute" viewBox="0 0 100 100">
          {/* Inner orbit ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="rgba(74, 222, 128, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
          {/* Outer orbit ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(74, 222, 128, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="20 10 5 10"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
          {/* Rotating node on outer ring */}
          <motion.circle
            cx="50"
            cy="8"
            r="2"
            fill="#4ad786"
            style={{ originX: "50px", originY: "50px" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
        </svg>

        {/* Center brain shield container */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-bg-secondary/80 border border-accent-green/30 shadow-[0_0_20px_rgba(74,222,128,0.15)] dark:bg-bg-primary/90"
        >
          {/* Rotating CPU gears outline inside */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-2 border border-dashed border-accent-green/10 rounded-full"
          />

          <Brain className="h-10 w-10 text-accent-green" />

          {/* Floating tiny sparks */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.2 }}
            className="absolute top-2 right-2 text-accent-green/60"
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 1.1 }}
            className="absolute bottom-2 left-2 text-accent-green/60"
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic status text at the bottom */}
      <div className="w-full h-16 flex flex-col items-center justify-center relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-accent-green" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
          </span>
          <span className="text-[10px] font-bold text-accent-green tracking-wider uppercase">
            {lang === "en" ? "THINKING" : "BERPIKIR"}
          </span>
        </div>

        <div className="h-8 overflow-hidden relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-xs font-semibold text-text-secondary max-w-xs px-2"
            >
              {currentTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
