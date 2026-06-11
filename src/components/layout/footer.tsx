"use client";

import React from "react";
import { useTranslation } from "@/i18n";
import { Leaf } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 bg-bg-secondary/40 py-8 text-center mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Leaf className="h-4 w-4 text-accent-green" />
            <span>
              &copy; {currentYear} {t.nav.brand}. {t.footer.builtBy}
            </span>
          </div>
          <p className="text-xs text-text-muted">
            {t.footer.credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
