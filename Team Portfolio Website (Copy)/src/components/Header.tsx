import React, { useEffect, useState } from 'react';
import { useApp } from '../lib/AppContext';
import { translations } from '../lib/translations';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme, currentPage, setCurrentPage } = useApp();
  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t.nav.home, page: 'home' as const },
    { key: 'team', label: t.nav.team, page: 'team' as const },
    { key: 'projects', label: t.nav.projects, page: 'projects' as const },
    { key: 'fun', label: t.nav.fun, page: 'fun' as const },
    { key: 'contact', label: t.nav.contact, page: 'contact' as const },
  ];

  const handleNavClick = (page: typeof currentPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group"
              aria-label="Home"
            >
              <div className="relative w-10 h-10 group-hover:scale-105 transition-transform">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Flowing background gradient */}
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  
                  {/* Left bracket { */}
                  <path
                    d="M15 8C15 8 12 8 12 11L12 16C12 17 11 18 9 18C11 18 12 19 12 20L12 25C12 28 15 28 15 28"
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-primary transition-colors"
                  />
                  
                  {/* Right bracket } */}
                  <path
                    d="M25 8C25 8 28 8 28 11L28 16C28 17 29 18 31 18C29 18 28 19 28 20L28 25C28 28 25 28 25 28"
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-primary transition-colors"
                  />
                  
                  {/* Flow wave in the middle */}
                  <path
                    d="M17 20C18 18 19 18 20 20C21 22 22 22 23 20"
                    stroke="url(#flowGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-primary transition-colors"
                  />
                </svg>
              </div>
              <span className="hidden sm:block text-xl tracking-tight group-hover:text-primary transition-colors">
                Syntax<span className="text-primary">&</span>Flow
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative transition-colors hover:text-primary ${
                    currentPage === item.page ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Language Toggle */}
              <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'en'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('no')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'no'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  NO
                </button>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Language:</span>
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded transition-colors ${
                      language === 'en'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('no')}
                    className={`px-3 py-1 rounded transition-colors ${
                      language === 'no'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
