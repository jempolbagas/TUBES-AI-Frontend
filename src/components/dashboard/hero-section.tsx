"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/i18n";
import { TextShimmer } from "@/components/animated/text-shimmer";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden py-12 md:py-16">
      {/* Decorative leaf/wind blobs in background */}
      <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-accent-green/5 blur-3xl" />
      <div className="absolute top-1/2 right-0 h-72 w-72 rounded-full bg-accent-sage/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        {/* City Location Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 px-3 py-1 text-xs font-semibold text-accent-green">
          <MapPin className="h-3.5 w-3.5 fill-accent-green/10" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary max-w-3xl mb-4 leading-tight">
          <span className="bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
          <TextShimmer>{t.hero.subtitle}</TextShimmer>
        </p>
      </div>
    </div>
  );
}
