"use client";

import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n";

export function HeroSection() {
  const { t } = useTranslation();

  const handleScrollToDashboard = () => {
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-12 md:py-16">
      {/* Decorative leaf/wind blobs in background */}
      <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-accent-green/5 blur-3xl" />
      <div className="absolute top-1/2 right-0 h-72 w-72 rounded-full bg-accent-sage/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center max-w-3xl px-4">
        {/* City Location Badge */}
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 px-3.5 py-1.5 text-xs font-semibold text-accent-green">
          <MapPin className="h-4 w-4 fill-accent-green/10" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
          <span className="bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-text-primary leading-relaxed font-semibold mb-8 max-w-2xl">
          {t.hero.subtitle}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleScrollToDashboard}
          className="group inline-flex items-center gap-2 rounded-full bg-accent-green hover:bg-accent-green-light text-primary-foreground px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-accent-green/20 hover:shadow-accent-green/35 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <span>{t.hero.cta}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div
        onClick={handleScrollToDashboard}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-text-primary hover:text-accent-green select-none cursor-pointer transition-colors"
      >
        <span className="font-semibold">{t.hero.scrollHint}</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-accent-green" />
      </div>
    </div>
  );
}
