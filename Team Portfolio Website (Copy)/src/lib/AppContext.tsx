import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Page } from './types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('no');
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    
    if (savedLanguage) setLanguageState(savedLanguage);
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        currentPage,
        setCurrentPage,
        selectedProfileId,
        setSelectedProfileId,
        selectedProjectId,
        setSelectedProjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
