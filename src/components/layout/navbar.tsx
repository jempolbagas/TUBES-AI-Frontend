"use client";

import React from "react";
import { Leaf, Globe } from "lucide-react";
import { useTranslation, Language } from "@/i18n";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { lang, setLang, t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-green/10 text-accent-green">
              <Leaf className="h-5 w-5 fill-accent-green/20" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
              {t.nav.brand}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-text-secondary" />
            <div className="flex rounded-md bg-bg-secondary p-0.5 border border-border">
              <button
                onClick={() => setLang("id")}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-white text-accent-green shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("en")}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-white text-accent-green shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
