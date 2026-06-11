"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "./en";
import { id } from "./id";

export type Language = "en" | "id";
export type TranslationType = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("id"); // Default to Indonesian

  useEffect(() => {
    const stored = localStorage.getItem("aqi-lang") as Language;
    if (stored === "en" || stored === "id") {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("aqi-lang", newLang);
  };

  const t = lang === "en" ? en : id;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
