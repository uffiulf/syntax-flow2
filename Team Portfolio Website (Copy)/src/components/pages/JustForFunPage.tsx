import React, { useState, useEffect } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Laugh, RefreshCw, Cat, User, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

interface RandomUser {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  phone: string;
}

interface BoredActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

const HTTP_STATUS_CODES = [
  { code: 200, label: 'OK' },
  { code: 201, label: 'Created' },
  { code: 204, label: 'No Content' },
  { code: 301, label: 'Moved Permanently' },
  { code: 400, label: 'Bad Request' },
  { code: 401, label: 'Unauthorized' },
  { code: 403, label: 'Forbidden' },
  { code: 404, label: 'Not Found' },
  { code: 418, label: "I'm a teapot" },
  { code: 500, label: 'Internal Server Error' },
  { code: 502, label: 'Bad Gateway' },
  { code: 503, label: 'Service Unavailable' },
];

export const JustForFunPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<number>(200);
  const [catImageLoading, setCatImageLoading] = useState<boolean>(true);
  const [randomUser, setRandomUser] = useState<RandomUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>('');
  const [boredActivity, setBoredActivity] = useState<BoredActivity | null>(null);
  const [activityLoading, setActivityLoading] = useState<boolean>(false);
  const [activityError, setActivityError] = useState<string>('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      
      const data: DadJoke = await response.json();
      setJoke(data.joke);
    } catch (err) {
      setError(language === 'en' 
        ? 'Failed to load joke. Please try again.' 
        : 'Kunne ikke laste vits. Vennligst prøv igjen.');
      console.error('Error fetching joke:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomUser = async () => {
    setUserLoading(true);
    setUserError('');
    try {
      const response = await fetch('https://randomuser.me/api/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      setRandomUser(data.results[0]);
    } catch (err) {
      setUserError(language === 'en' 
        ? 'Failed to load user. Please try again.' 
        : 'Kunne ikke laste bruker. Vennligst prøv igjen.');
      console.error('Error fetching user:', err);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchBoredActivity = async () => {
    setActivityLoading(true);
    setActivityError('');
    try {
      const response = await fetch('https://apis.scrimba.com/bored/api/activity');
      
      if (!response.ok) {
        throw new Error('Failed to fetch activity');
      }
      
      const data: BoredActivity = await response.json();
      setBoredActivity(data);
    } catch (err) {
      setActivityError(language === 'en' 
        ? 'Failed to load activity. Please try again.' 
        : 'Kunne ikke laste aktivitet. Vennligst prøv igjen.');
      console.error('Error fetching activity:', err);
    } finally {
      setActivityLoading(false);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchJoke();
    fetchRandomUser();
    fetchBoredActivity();
  }, []);

  const handleRandomStatus = () => {
    const randomIndex = Math.floor(Math.random() * HTTP_STATUS_CODES.length);
    setSelectedStatus(HTTP_STATUS_CODES[randomIndex].code);
    setCatImageLoading(true);
  };

  const handleStatusSelect = (code: number) => {
    setSelectedStatus(code);
    setCatImageLoading(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Laugh className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl mb-4">{t.fun.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.fun.subtitle}
          </p>
        </div>

        {/* Joke Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="italic font-bold text-[20px]">Dad jokes</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchJoke}
                disabled={loading}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            {loading ? (
              <div className="w-full space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={fetchJoke} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {t.fun.tryAgain}
                </Button>
              </div>
            ) : (
              <p className="text-center leading-relaxed text-[16px]">
                {joke}
              </p>
            )}
          </CardContent>
        </Card>

        {/* HTTP Cat Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="italic font-bold text-[20px] mb-2">{t.fun.httpCats}</h2>
                <p className="text-sm text-muted-foreground">{t.fun.httpCatsSubtitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRandomStatus}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Cat className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Status Code Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {HTTP_STATUS_CODES.map((status) => (
                <Button
                  key={status.code}
                  variant={selectedStatus === status.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusSelect(status.code)}
                  className={selectedStatus === status.code ? 'bg-primary text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground'}
                >
                  {status.code}
                </Button>
              ))}
            </div>

            {/* Cat Image */}
            <div className="relative rounded-lg overflow-hidden bg-muted">
              {catImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-full h-[400px]" />
                </div>
              )}
              <img
                src={`https://http.cat/${selectedStatus}`}
                alt={`HTTP ${selectedStatus} Cat`}
                className="w-full h-auto"
                onLoad={() => setCatImageLoading(false)}
                onError={() => setCatImageLoading(false)}
              />
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="text-lg">
                  {selectedStatus} - {HTTP_STATUS_CODES.find(s => s.code === selectedStatus)?.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Random User Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="italic font-bold text-[20px] mb-2">{t.fun.randomUser}</h2>
                <p className="text-sm text-muted-foreground">{t.fun.randomUserSubtitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchRandomUser}
                disabled={userLoading}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <User className={`h-5 w-5 ${userLoading ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {userLoading ? (
              <div className="flex items-start gap-4">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            ) : userError ? (
              <div className="text-center">
                <p className="text-destructive mb-4">{userError}</p>
                <Button onClick={fetchRandomUser} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {t.fun.tryAgain}
                </Button>
              </div>
            ) : randomUser ? (
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={randomUser.picture.large} alt={`${randomUser.name.first} ${randomUser.name.last}`} />
                  <AvatarFallback>
                    {randomUser.name.first[0]}{randomUser.name.last[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl">
                      {randomUser.name.title} {randomUser.name.first} {randomUser.name.last}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📧 {randomUser.email}</p>
                    <p>📞 {randomUser.phone}</p>
                    <p>📍 {randomUser.location.street.number} {randomUser.location.street.name}, {randomUser.location.city}, {randomUser.location.state}, {randomUser.location.country}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Bored Activity Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="italic font-bold text-[20px] mb-2">{t.fun.boredActivity}</h2>
                <p className="text-sm text-muted-foreground">{t.fun.boredActivitySubtitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchBoredActivity}
                disabled={activityLoading}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Lightbulb className={`h-5 w-5 ${activityLoading ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="min-h-[150px] flex items-center justify-center">
            {activityLoading ? (
              <div className="w-full space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : activityError ? (
              <div className="text-center">
                <p className="text-destructive mb-4">{activityError}</p>
                <Button onClick={fetchBoredActivity} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {t.fun.tryAgain}
                </Button>
              </div>
            ) : boredActivity ? (
              <div className="w-full space-y-4">
                <p className="text-lg text-center leading-relaxed">
                  {boredActivity.activity}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">
                    {t.fun.type}: {boredActivity.type}
                  </Badge>
                  <Badge variant="secondary">
                    {t.fun.participants}: {boredActivity.participants}
                  </Badge>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>{t.fun.poweredBy}</p>
          <p>HTTP Cats powered by http.cat</p>
          <p>Random User powered by randomuser.me</p>
          <p>Bored API powered by apis.scrimba.com</p>
        </div>
      </div>
    </div>
  );
};
