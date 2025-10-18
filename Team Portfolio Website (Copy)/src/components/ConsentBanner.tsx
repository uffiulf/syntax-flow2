import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { translations } from '../lib/translations';

interface ConsentBannerProps {
  language: 'no' | 'en';
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    necessary: true, // Always true - required for site functionality
    analytics: false,
    marketing: false,
  });

  const t = translations[language];

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('consent-given');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const updateConsentMode = (analytics: boolean, marketing: boolean) => {
    // Update Google Consent Mode
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    const newSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsentSettings(newSettings);
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-settings', JSON.stringify(newSettings));
    updateConsentMode(true, true);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newSettings = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsentSettings(newSettings);
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-settings', JSON.stringify(newSettings));
    updateConsentMode(false, false);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('consent-given', 'true');
    localStorage.setItem('consent-settings', JSON.stringify(consentSettings));
    updateConsentMode(consentSettings.analytics, consentSettings.marketing);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleToggleSetting = (setting: keyof typeof consentSettings) => {
    if (setting === 'necessary') return; // Can't disable necessary cookies
    setConsentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'en' ? 'Cookie Consent' : 'Informasjonskapsler'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'
                      : 'Vi bruker informasjonskapsler for å forbedre din opplevelse, vise tilpasset innhold og analysere trafikken vår. Ved å klikke "Godta alle" samtykker du til vår bruk av informasjonskapsler.'
                    }
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="flex-1">
                  {language === 'en' ? 'Accept All' : 'Godta alle'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(true)}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Customize' : 'Tilpass'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRejectAll}
                  className="flex-1"
                >
                  {language === 'en' ? 'Reject All' : 'Avvis alle'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Cookie Settings' : 'Innstillinger for informasjonskapsler'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Necessary Cookies' : 'Nødvendige informasjonskapsler'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Required for the website to function properly'
                          : 'Påkrevd for at nettsiden skal fungere riktig'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium">
                      {language === 'en' ? 'Always Active' : 'Alltid aktiv'}
                    </span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Cookie className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Analytics Cookies' : 'Analyse informasjonskapsler'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Help us understand how visitors interact with our website'
                          : 'Hjelper oss å forstå hvordan besøkende samhandler med nettsiden vår'
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={consentSettings.analytics ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleSetting('analytics')}
                  >
                    {consentSettings.analytics 
                      ? (language === 'en' ? 'On' : 'På') 
                      : (language === 'en' ? 'Off' : 'Av')
                    }
                  </Button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Marketing Cookies' : 'Markedsføring informasjonskapsler'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Used to deliver personalized advertisements'
                          : 'Brukes til å levere tilpassede annonser'
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={consentSettings.marketing ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleSetting('marketing')}
                  >
                    {consentSettings.marketing 
                      ? (language === 'en' ? 'On' : 'På') 
                      : (language === 'en' ? 'Off' : 'Av')
                    }
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveSettings} className="flex-1">
                  {language === 'en' ? 'Save Settings' : 'Lagre innstillinger'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  {language === 'en' ? 'Cancel' : 'Avbryt'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Extend window type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
