import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { zh } from './zh';

export type Language = 'en' | 'zh';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => undefined,
  toggleLanguage: () => undefined,
  t: (text: string) => text,
});

const STORAGE_KEY = 'bella-language';

const readInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'zh' || stored === 'en') return stored;
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    document.documentElement.dataset.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);
  const toggleLanguage = useCallback(
    () => setLanguageState((current) => (current === 'en' ? 'zh' : 'en')),
    [],
  );

  const t = useCallback(
    (text: string) => {
      if (language === 'en' || !text) return text;
      const exact = zh[text];
      if (exact) return exact;
      const trimmed = text.trim();
      return zh[trimmed] ?? text;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

/** Convenience hook: returns just the translate function. */
export const useT = () => useContext(LanguageContext).t;
