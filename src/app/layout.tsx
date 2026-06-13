import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n";
import { ThemeProvider } from "@/hooks/use-theme";

import { ThemedBackground } from "@/components/ui/themed-background";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jakarta AQI Predictor — AI-Powered Forecasting",
  description: "Predict tomorrow's air quality in Jakarta using real-time weather metrics and an optimized machine learning model.",
  keywords: ["AQI", "Jakarta", "Air Quality", "AI Predictor", "Weather Forecast", "Machine Learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", outfit.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('aqi-theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                     document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary relative">
        <LanguageProvider>
          <ThemeProvider>
            <TooltipProvider>
              <ThemedBackground />
              <a
                href="#dashboard"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-accent-green text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg"
              >
                Skip to content / Lompat ke konten
              </a>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
