"use client";

import React from "react";
import { Leaf, Globe, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const { lang, setLang, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="w-full border border-border/40 bg-background/70 dark:bg-bg-card/75 backdrop-blur-lg shadow-lg rounded-2xl pointer-events-auto px-4 sm:px-6 lg:px-8">
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

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-text-secondary" />
              <div className="flex rounded-md bg-bg-secondary p-0.5 border border-border">
                <button
                  onClick={() => setLang("id")}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    lang === "id"
                      ? "bg-card text-accent-green shadow-sm dark:bg-bg-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-card text-accent-green shadow-sm dark:bg-bg-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="rounded-md bg-bg-secondary p-1.5 border border-border text-text-secondary hover:text-text-primary cursor-pointer transition-all"
              aria-label="Toggle theme"
              data-testid="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" data-testid="sun-icon" />
              ) : (
                <Moon className="h-4 w-4" data-testid="moon-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
