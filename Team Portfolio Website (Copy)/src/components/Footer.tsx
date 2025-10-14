import React from 'react';
import { useApp } from '../lib/AppContext';
import { translations } from '../lib/translations';
import { Github, Linkedin, Twitter, Mail, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export const Footer: React.FC = () => {
  const { language, setLanguage, theme, setTheme, setCurrentPage } = useApp();
  const t = translations[language];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Flowing background gradient */}
                  <defs>
                    <linearGradient id="flowGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  
                  {/* Left bracket { */}
                  <path
                    d="M15 8C15 8 12 8 12 11L12 16C12 17 11 18 9 18C11 18 12 19 12 20L12 25C12 28 15 28 15 28"
                    stroke="url(#flowGradientFooter)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Right bracket } */}
                  <path
                    d="M25 8C25 8 28 8 28 11L28 16C28 17 29 18 31 18C29 18 28 19 28 20L28 25C28 28 25 28 25 28"
                    stroke="url(#flowGradientFooter)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Flow wave in the middle */}
                  <path
                    d="M17 20C18 18 19 18 20 20C21 22 22 22 23 20"
                    stroke="url(#flowGradientFooter)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl tracking-tight">
                Syntax<span className="text-primary">&</span>Flow
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {t.footer.tagline}
            </p>
            <Button variant="outline" size="sm">
              {t.footer.downloadTeamCV}
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.team}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Syntax&Flow. {t.footer.rights}.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Theme & Language Toggles */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === 'en'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('no')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === 'no'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                NO
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
