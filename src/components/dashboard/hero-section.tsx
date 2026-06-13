"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Wind, Brain, Database, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence, type Transition } from "motion/react";
import { useTranslation } from "@/i18n";
import { predictTomorrow } from "@/lib/api";
import { LiveAqiCard } from "./live-aqi-card";
import { PredictionResponse } from "@/types";

// ─── Floating Particle Field ───────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.08,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-green"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -24, 0], x: [0, 8, -6, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          } as Transition}
        />
      ))}
    </div>
  );
}

// ─── Stat Pill ─────────────────────────────────────────────────────────────
interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white/8 dark:bg-white/5 border border-border/60 dark:border-white/10 backdrop-blur-sm px-4 py-2.5 hover:border-accent-green/30 transition-colors duration-300">
      <span className="text-accent-green shrink-0">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
          {label}
        </span>
        <span className="text-xs font-bold text-text-primary">{value}</span>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl w-full animate-pulse border border-border/80 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-border/50 rounded-full" />
        <div className="h-5 w-16 bg-border/50 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="h-32 w-40 bg-border/30 rounded-full" />
        <div className="h-6 w-24 bg-border/50 rounded-full mt-2" />
        <div className="h-4 w-3/4 bg-border/40 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-border/50 pt-5">
        <div className="h-16 bg-border/40 rounded-2xl" />
        <div className="h-16 bg-border/40 rounded-2xl" />
        <div className="h-16 bg-border/40 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Shared transition helper ───────────────────────────────────────────────
function makeTransition(
  duration: number,
  ease: "easeOut" | "easeIn" | "easeInOut",
  delay?: number
): Transition {
  return { duration, ease, delay };
}

// ─── Hero Section ───────────────────────────────────────────────────────────
export function HeroSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const [liveData, setLiveData] = useState<PredictionResponse | null>(null);
  const [isLiveLoading, setIsLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    predictTomorrow()
      .then((res) => {
        if (active && res) setLiveData(res);
      })
      .catch((err) => {
        console.error("Failed to fetch live AQI for hero:", err);
        if (active) setLiveError(err instanceof Error ? err.message : "Gagal memuat data AQI.");
      })
      .finally(() => {
        if (active) setIsLiveLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleScrollToDashboard = () => {
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const noMotion = shouldReduceMotion;

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-8 md:py-14 min-h-[calc(100vh-80px)]">
      {/* Ambient particles */}
      <ParticleField />

      {/* Large decorative blobs */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent-green/6 blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-accent-sage/8 blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-warm/5 blur-[80px] pointer-events-none" aria-hidden />

      <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7">

            {/* City Badge */}
            <motion.div
              initial={{ opacity: 0, x: noMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={makeTransition(0.5, "easeOut", 0.0)}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/25 bg-accent-green/8 px-4 py-1.5 text-xs font-bold text-accent-green backdrop-blur-sm shadow-sm shadow-accent-green/10">
                <MapPin className="h-3.5 w-3.5 fill-accent-green/20 animate-pulse" />
                <span>{t.hero.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block animate-ping" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: noMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={makeTransition(0.65, "easeOut", 0.08)}
              className="space-y-1"
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight leading-[1.05]">
                <span className="block bg-gradient-to-br from-accent-green via-[#76C182] to-accent-green-light bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(91,160,102,0.3)]">
                  {t.hero.title.split(" ").slice(0, 3).join(" ")}
                </span>
                <span className="block text-text-primary mt-1">
                  {t.hero.title.split(" ").slice(3).join(" ")}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: noMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={makeTransition(0.6, "easeOut", 0.16)}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: noMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={makeTransition(0.6, "easeOut", 0.24)}
              className="flex flex-wrap gap-2.5 justify-center lg:justify-start"
            >
              <StatPill icon={<Brain className="h-3.5 w-3.5" />} label="Model Accuracy" value="≥ 97.8% R²" />
              <StatPill icon={<Database className="h-3.5 w-3.5" />} label="Training Data" value="3+ Years" />
              <StatPill icon={<Wind className="h-3.5 w-3.5" />} label="Data Source" value="Open-Meteo" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: noMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={makeTransition(0.6, "easeOut", 0.32)}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                id="hero-cta-button"
                onClick={handleScrollToDashboard}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent-green hover:bg-accent-green-light text-primary-foreground px-7 py-3.5 text-sm font-bold shadow-lg shadow-accent-green/25 hover:shadow-accent-green/40 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green cursor-pointer"
              >
                {/* Shimmer overlay */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  aria-hidden
                />
                <span>{t.hero.cta}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToDashboard}
                className="text-sm font-semibold text-text-secondary hover:text-accent-green transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                {t.hero.scrollHint}
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Floating AQI Card ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: noMotion ? 0 : 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={makeTransition(0.7, "easeOut", 0.35)}
            className="lg:col-span-5 w-full flex justify-center items-center"
          >
            {/* Floating hover animation wrapper */}
            <motion.div
              className="w-full max-w-sm relative"
              animate={noMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" } as Transition}
            >
              {/* Glow halo behind card */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl scale-105 pointer-events-none opacity-60"
                style={{ background: "radial-gradient(ellipse at center, rgba(91,160,102,0.15) 0%, transparent 70%)" }}
                aria-hidden
              />

              <AnimatePresence mode="wait">
                {isLiveLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingSkeleton />
                  </motion.div>
                ) : liveData?.weather_data ? (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={makeTransition(0.5, "easeOut")}
                  >
                    <LiveAqiCard
                      aqi={Math.round(liveData.weather_data.aqi)}
                      weatherData={liveData.weather_data}
                      categoryLabel={liveData.category_label}
                      description={liveData.description}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6 rounded-2xl border border-red-500/20 text-center w-full bg-gradient-to-b from-white/95 to-bg-secondary/80 dark:from-bg-secondary/95 dark:to-bg-primary/90 space-y-2"
                  >
                    <p className="text-sm font-bold text-red-500">
                      Gagal memuat data AQI real-time.
                    </p>
                    {liveError && (
                      <p className="text-xs text-text-muted leading-relaxed">
                        {liveError}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────────── */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={handleScrollToDashboard}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={makeTransition(0.5, "easeOut", 1.2)}
        aria-label={t.hero.scrollHint}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted group-hover:text-accent-green transition-colors">
          {t.hero.scrollHint}
        </span>
        {/* Animated scroll capsule */}
        <div className="relative w-6 h-10 rounded-full border-2 border-text-muted/40 group-hover:border-accent-green/60 transition-colors flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-accent-green"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" } as Transition}
          />
        </div>
      </motion.button>
    </div>
  );
}
