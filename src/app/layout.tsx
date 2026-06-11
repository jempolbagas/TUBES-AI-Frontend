import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n";

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
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <LanguageProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
