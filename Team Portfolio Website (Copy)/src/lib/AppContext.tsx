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
  navigationHistory: Page[];
  goBack: () => void;
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
  const [navigationHistory, setNavigationHistory] = useState<Page[]>(['home']);

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

  // Enhanced setCurrentPage that manages navigation history
  const setCurrentPageWithHistory = (page: Page) => {
    setCurrentPage(page);
    setNavigationHistory(prev => {
      // Don't add duplicate consecutive pages
      if (prev[prev.length - 1] !== page) {
        return [...prev, page];
      }
      return prev;
    });
  };

  // Go back function
  const goBack = () => {
    setNavigationHistory(prev => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        const previousPage = newHistory[newHistory.length - 1];
        setCurrentPage(previousPage);
        return newHistory;
      }
      return prev;
    });
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Get the page from the URL hash or use home as default
      const hash = window.location.hash.slice(1);
      const pageFromHash = hash as Page || 'home';
      
      if (pageFromHash !== currentPage) {
        setCurrentPage(pageFromHash);
        setNavigationHistory(prev => {
          // Don't add duplicate consecutive pages
          if (prev[prev.length - 1] !== pageFromHash) {
            return [...prev, pageFromHash];
          }
          return prev;
        });
      }
    };

    // Handle mouse button 4 (back button)
    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 3) { // Mouse button 4 (back button)
        event.preventDefault();
        goBack();
      }
    };

    // Update URL when page changes
    const updateUrl = (page: Page) => {
      window.history.pushState({ page }, '', `#${page}`);
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('mouseup', handleMouseUp);

    // Update URL when currentPage changes
    updateUrl(currentPage);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentPage]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        currentPage,
        setCurrentPage: setCurrentPageWithHistory,
        selectedProfileId,
        setSelectedProfileId,
        selectedProjectId,
        setSelectedProjectId,
        navigationHistory,
        goBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
