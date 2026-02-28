import React, { useState, useEffect } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Laugh, RefreshCw, Cat, User, Lightbulb, Gamepad2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

const FALLBACK_USER: RandomUser = {
  name: { first: 'John', last: 'Doe', title: 'Mr' },
  email: 'john.doe@example.com',
  location: { street: { number: 123, name: 'Main St' }, city: 'Anytown', state: 'State', country: 'Norway' },
  picture: { large: 'https://randomuser.me/api/portraits/men/32.jpg', medium: '', thumbnail: '' },
  phone: '555-0198'
};

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

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          }
        }
      }
    }
  };
  types: { type: { name: string } }[];
  cries?: { latest: string };
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

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [pokemonLoading, setPokemonLoading] = useState<boolean>(false);
  const [pokemonError, setPokemonError] = useState<string>('');

  // Pokedex states
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonData[]>(() => {
    try {
      const saved = localStorage.getItem('caughtPokemon');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCurrentlyCaught, setIsCurrentlyCaught] = useState<boolean>(false);

  // Click counters
  const [jokeClicks, setJokeClicks] = useState<number>(0);
  const [catClicks, setCatClicks] = useState<number>(0);
  const [userClicks, setUserClicks] = useState<number>(0);
  const [activityClicks, setActivityClicks] = useState<number>(0);
  const [pokemonClicks, setPokemonClicks] = useState<number>(0);

  const fetchJoke = async () => {
    setJokeClicks(prev => prev + 1);
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
    setUserClicks(prev => prev + 1);
    setUserLoading(true);
    setUserError('');
    try {
      const response = await fetch('https://randomuser.me/api/');

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        console.warn('RandomUser API returned empty results. Using fallback data.');
        setRandomUser(FALLBACK_USER);
      } else {
        setRandomUser(data.results[0]);
      }
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
    setActivityClicks(prev => prev + 1);
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

  const fetchPokemon = async () => {
    setPokemonClicks(prev => prev + 1);
    setPokemonLoading(true);
    setPokemonError('');
    setIsCurrentlyCaught(false);
    try {
      const randomId = Math.floor(Math.random() * 649) + 1; // Gen 1-5 have best animated sprites
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }

      const data: PokemonData = await response.json();
      setPokemon(data);

      // Play cry if available
      if (data.cries?.latest) {
        const audio = new Audio(data.cries.latest);
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback prevented by browser:', e));
      }
    } catch (err) {
      setPokemonError(language === 'en'
        ? 'Failed to find Pokémon. Please try again.'
        : 'Fant ingen Pokémon. Vennligst prøv igjen.');
      console.error('Error fetching Pokemon:', err);
    } finally {
      setPokemonLoading(false);
    }
  };

  const handleCatchPokemon = () => {
    if (pokemon && !isCurrentlyCaught) {
      setIsCurrentlyCaught(true);
      setCaughtPokemon(prev => {
        // Prevent duplicate captures
        if (!prev.some(p => p.id === pokemon.id)) {
          return [...prev, pokemon];
        }
        return prev;
      });
      // Play cry if available
      if (pokemon.cries?.latest) {
        const audio = new Audio(pokemon.cries.latest);
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback prevented by browser:', e));
      }
    }
  };

  // Sync caught pokemon to local storage
  useEffect(() => {
    localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
  }, [caughtPokemon]);

  // Fetch initial data on component mount (without incrementing counters)
  useEffect(() => {
    // Fetch joke without incrementing counter
    setLoading(true);
    setError('');
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch joke');
        }
        return response.json();
      })
      .then((data: DadJoke) => {
        setJoke(data.joke);
      })
      .catch(err => {
        setError(language === 'en'
          ? 'Failed to load joke. Please try again.'
          : 'Kunne ikke laste vits. Vennligst prøv igjen.');
        console.error('Error fetching joke:', err);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch random user without incrementing counter
    setUserLoading(true);
    setUserError('');
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(data => {
        if (!data.results || data.results.length === 0) {
          console.warn('RandomUser API returned empty results in useEffect. Using fallback data.');
          setRandomUser(FALLBACK_USER);
        } else {
          setRandomUser(data.results[0]);
        }
      })
      .catch(err => {
        setUserError(language === 'en'
          ? 'Failed to load user. Please try again.'
          : 'Kunne ikke laste bruker. Vennligst prøv igjen.');
        console.error('Error fetching user:', err);
      })
      .finally(() => {
        setUserLoading(false);
      });

    // Fetch bored activity without incrementing counter
    setActivityLoading(true);
    setActivityError('');
    fetch('https://apis.scrimba.com/bored/api/activity')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch activity');
        }
        return response.json();
      })
      .then((data: BoredActivity) => {
        setBoredActivity(data);
      })
      .catch(err => {
        setActivityError(language === 'en'
          ? 'Failed to load activity. Please try again.'
          : 'Kunne ikke laste aktivitet. Vennligst prøv igjen.');
        console.error('Error fetching activity:', err);
      })
      .finally(() => {
        setActivityLoading(false);
      });
  }, []);

  const handleRandomStatus = () => {
    setCatClicks(prev => prev + 1);
    const randomIndex = Math.floor(Math.random() * HTTP_STATUS_CODES.length);
    setSelectedStatus(HTTP_STATUS_CODES[randomIndex].code);
    setCatImageLoading(true);
  };

  const handleStatusSelect = (code: number) => {
    setCatClicks(prev => prev + 1);
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
              <div className="flex items-center gap-3">
                <h2 className="italic font-bold text-[20px]">Dad jokes</h2>
                <Badge variant="secondary" className="text-sm">
                  {jokeClicks}
                </Badge>
              </div>
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
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="italic font-bold text-[20px]">{t.fun.httpCats}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {catClicks}
                  </Badge>
                </div>
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
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="italic font-bold text-[20px]">{t.fun.randomUser}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {userClicks}
                  </Badge>
                </div>
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
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="italic font-bold text-[20px]">{t.fun.boredActivity}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {activityClicks}
                  </Badge>
                </div>
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

        {/* Pokemon Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="italic font-bold text-[20px]">{(t.fun as any).pokemon || 'Wild Pokémon'}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {pokemonClicks}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{(t.fun as any).pokemonSubtitle || 'Catch a random Pokémon from the tall grass'}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchPokemon}
                disabled={pokemonLoading}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                title={(t.fun as any).catchPokemon || 'Search Grass'}
              >
                <Gamepad2 className={`h-5 w-5 ${pokemonLoading ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pokemonLoading ? (
              <div className="flex items-start gap-4 h-[150px]">
                <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                  <Skeleton className="w-16 h-16 rounded-full" />
                </div>
              </div>
            ) : pokemonError ? (
              <div className="text-center flex flex-col justify-center items-center" style={{ minHeight: '150px' }}>
                <p className="text-destructive mb-4">{pokemonError}</p>
                <Button onClick={fetchPokemon} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {t.fun.tryAgain}
                </Button>
              </div>
            ) : pokemon ? (
              <div
                className="relative rounded-lg overflow-hidden grass-bg border-4 border-green-800 flex items-center shadow-inner cursor-pointer"
                style={{ minHeight: '200px' }}
                onClick={() => {
                  if (pokemon.cries?.latest) {
                    const audio = new Audio(pokemon.cries.latest);
                    audio.volume = 0.2;
                    audio.play().catch(e => console.log(e));
                  }
                }}>
                {/* Information Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-border shadow-md z-10 w-fit">
                  <h3 className="capitalize font-bold text-lg mb-1">{pokemon.name}</h3>
                  <div className="flex gap-1">
                    {pokemon.types.map(t => (
                      <Badge key={t.type.name} variant="outline" className="text-xs">{t.type.name}</Badge>
                    ))}
                  </div>
                </div>

                {/* Walking Sprite */}
                <div
                  className="pokemon-walking absolute bottom-2 h-[100px] w-auto pointer-events-none z-20"
                >
                  <img
                    src={pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="h-full object-contain filter drop-shadow-xl"
                  />
                </div>
              </div>
            ) : (
              <div
                className="text-center flex flex-col justify-center items-center grass-bg rounded-lg border-4 border-green-800 opacity-90 cursor-pointer shadow-inner relative overflow-hidden group"
                style={{ minHeight: '150px' }}
                onClick={fetchPokemon}
              >
                <p className="mb-4 text-white font-bold drop-shadow-md text-lg z-10">{(t.fun as any).catchPokemon || 'Search Grass'}</p>
                <Button variant="secondary" className="bg-white text-black hover:bg-gray-100 z-10">{(t.fun as any).catchPokemon || 'Search Grass'}</Button>
                {/* decorative grass blades */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pokedex Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{(t.fun as any).pokedex || 'My Pokédex'}</h2>
              <Badge>{caughtPokemon.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {caughtPokemon.length === 0 ? (
              <div className="text-center p-8 bg-muted/50 rounded-lg text-muted-foreground border-2 border-dashed border-border/50">
                <Gamepad2 className="mx-auto h-8 w-8 mb-3 opacity-20" />
                <p>{(t.fun as any).emptyPokedex || 'You haven\'t caught any Pokémon yet. Click on a wild Pokémon to catch it!'}</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-2">
                {caughtPokemon.map((p, index) => (
                  <div key={`${p.id}-${index}`} className="group relative bg-muted rounded-md p-1 border border-border/50 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-400 transition-colors w-[60px] h-[60px] flex items-center justify-center cursor-help tooltip-trigger">
                    <img
                      src={p.sprites.front_default}
                      alt={p.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 capitalize">
                      {p.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Click Counter Section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">🎯 {t.fun.clickCounter}</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{jokeClicks}</div>
                <div className="text-sm text-muted-foreground">{t.fun.jokes}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{catClicks}</div>
                <div className="text-sm text-muted-foreground">{t.fun.cats}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userClicks}</div>
                <div className="text-sm text-muted-foreground">{t.fun.users}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{activityClicks}</div>
                <div className="text-sm text-muted-foreground">{t.fun.activities}</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg col-span-2 sm:col-span-4 lg:col-span-1">
                <div className="text-2xl font-bold text-primary">{pokemonClicks}</div>
                <div className="text-sm text-muted-foreground">{(t.fun as any).pokemon || 'Pokémon'}</div>
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="text-lg font-semibold">
                {t.fun.totalClicks}: <span className="text-primary">{jokeClicks + catClicks + userClicks + activityClicks + pokemonClicks}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>{t.fun.poweredBy}</p>
          <p>HTTP Cats powered by http.cat</p>
          <p>Random User powered by randomuser.me</p>
          <p>Bored API powered by apis.scrimba.com</p>
          <p>Pokémon powered by PokéAPI</p>
        </div>
      </div>
    </div>
  );
};
