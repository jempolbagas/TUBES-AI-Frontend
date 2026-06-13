"use client";

import React from "react";
import { useTranslation } from "@/i18n";
import { Leaf } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 bg-bg-secondary/40 py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand/Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
              <Leaf className="h-4 w-4 text-accent-green" />
              <span>{t.nav.brand}</span>
            </div>
            <p className="text-xs text-text-secondary">
              &copy; {currentYear}. {t.footer.builtBy}
            </p>
          </div>

          {/* Tech stack / Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mr-1">
              Powered by
            </span>
            <a 
              href="https://open-meteo.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green/20 transition-colors"
            >
              Open-Meteo API
            </a>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-bg-secondary text-text-secondary border border-border">
              Next.js 16
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-warm/15 text-accent-warm border border-accent-warm/20">
              Scikit-Learn ML
            </span>
          </div>

          {/* Credits */}
          <p className="text-xs text-text-muted text-center md:text-right max-w-xs md:max-w-none">
            {t.footer.credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
