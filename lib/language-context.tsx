"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SupportedLanguage,
  TranslationDictionary,
  TRANSLATIONS,
} from "@/data/translations";

interface LanguageContextType {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  toggleLang: () => void;
  t: TranslationDictionary;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "kerala_furniture_lang_v1";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<SupportedLanguage>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Initialize from localStorage without visible flicker
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
      if (savedLang === "en" || savedLang === "ta") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch (e) {
      console.warn("Failed to read language preference:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Set language and synchronize with localStorage and DOM html tag
  const setLang = (newLang: SupportedLanguage) => {
    setLangState(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch (e) {
      console.warn("Failed to persist language preference:", e);
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ta" : "en");
  };

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        isHydrated,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
