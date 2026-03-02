import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Laugh, RefreshCw, Cat, User, Lightbulb, Gamepad2, AlertCircle, CheckCircle2, Trophy, Ghost, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';

// Sikker obfuscation helpers for localStorage
const encodeData = (data: string) => {
  try { return 'b64_' + btoa(encodeURIComponent(data)); } catch { return data; }
};
const decodeData = (encodedData: string) => {
  if (encodedData.startsWith('b64_')) {
    try { return decodeURIComponent(atob(encodedData.slice(4))); } catch { return encodedData; }
  }
  return encodedData; // Tillater eldre plaintext localStorage verdier
};

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
      return saved ? JSON.parse(decodeData(saved)) : [];
    } catch {
      localStorage.removeItem('caughtPokemon');
      return [];
    }
  });
  const [pokeBalls, setPokeBalls] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pokeBalls');
      return saved !== null ? parseInt(decodeData(saved), 10) : 10;
    } catch {
      localStorage.removeItem('pokeBalls');
      return 10;
    }
  });

  // Scoreboard / Player States
  const [playerName, setPlayerName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pokemonPlayerName');
      return saved ? decodeData(saved) : '';
    } catch {
      localStorage.removeItem('pokemonPlayerName');
      return '';
    }
  });
  const [missedPokemonCount, setMissedPokemonCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('missedPokemonCount');
      return saved !== null ? parseInt(decodeData(saved), 10) : 0;
    } catch {
      localStorage.removeItem('missedPokemonCount');
      return 0;
    }
  });

  const [isCurrentlyCaught, setIsCurrentlyCaught] = useState<boolean>(false);
  const [hasFled, setHasFled] = useState<boolean>(false);
  const [isThrowing, setIsThrowing] = useState<boolean>(false);
  const [isTeamRocketEncounter, setIsTeamRocketEncounter] = useState<boolean>(false);
  const [throwAttempts, setThrowAttempts] = useState<number>(0);
  const [pokemonGuess, setPokemonGuess] = useState<string>('');
  const [catchMessage, setCatchMessage] = useState<{ text: string, type: 'success' | 'error' | 'rocket' } | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('correctGuesses');
      return saved !== null ? parseInt(decodeData(saved), 10) : 0;
    } catch {
      localStorage.removeItem('correctGuesses');
      return 0;
    }
  });

  // Name Registration State
  const [inputName, setInputName] = useState('');

  // Quiz Mechanics & Animations
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(5.0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [spawnAnimation, setSpawnAnimation] = useState<string>('animate-fade-in');
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pokemonScore');
      return saved !== null ? parseInt(decodeData(saved), 10) : 0;
    } catch {
      localStorage.removeItem('pokemonScore');
      return 0;
    }
  });

  // Target Slider & Hitbox Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const pokemonRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderDirection, setSliderDirection] = useState(1);
  const [isSliderActive, setIsSliderActive] = useState(false);

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
    setHasFled(false);
    setThrowAttempts(0);
    setPokemonGuess('');
    setCatchMessage(null);
    setIsTimerActive(false);

    // Pick random spawn animation
    const anims = ['animate-fade-in', 'animate-zoom-in', 'animate-slide-up-fade'];
    setSpawnAnimation(anims[Math.floor(Math.random() * anims.length)]);

    try {
      let currentList = pokemonList;
      if (currentList.length === 0) {
        // Fetch list of first 649 pokemons to use for wrong answers
        const listRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649');
        if (listRes.ok) {
          const listData = await listRes.json();
          currentList = listData.results.map((p: any) => p.name);
          setPokemonList(currentList);
        }
      }

      const randomId = Math.floor(Math.random() * 649) + 1; // Gen 1-5 have best animated sprites
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }

      const data: PokemonData = await response.json();
      setPokemon(data);

      // Setup Quiz Options
      if (currentList.length > 0) {
        // Get 2 random wrong answers
        let wrong1 = currentList[Math.floor(Math.random() * currentList.length)];
        let wrong2 = currentList[Math.floor(Math.random() * currentList.length)];
        while (wrong1 === data.name) wrong1 = currentList[Math.floor(Math.random() * currentList.length)];
        while (wrong2 === data.name || wrong2 === wrong1) wrong2 = currentList[Math.floor(Math.random() * currentList.length)];

        // Shuffle options
        const options = [data.name, wrong1, wrong2];
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        setQuizOptions(options);
      } else {
        setQuizOptions([data.name, 'bulbasaur', 'charmander']); // Fallback
      }

      setTimeLeft(7.0);
      setIsTimerActive(true);

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

  const finalizeCatch = () => {
    setIsCurrentlyCaught(true);
    setCaughtPokemon(prev => {
      // Prevent duplicate captures
      if (!prev.some(p => p.id === pokemon?.id)) {
        return [...prev, pokemon!];
      }
      return prev;
    });
    // Play cry if available
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented by browser:', e));
    }
  };

  const handleCatchAction = (isGrassClick = false, guessParam = '') => {
    if (!pokemon || isCurrentlyCaught || hasFled || isThrowing || isTeamRocketEncounter) return;

    // Use passed guess or state guess
    const theGuess = guessParam || pokemonGuess;
    const isGuessEntry = !isGrassClick && theGuess.trim() !== '';
    const isCorrectGuess = isGuessEntry && theGuess.toLowerCase().trim() === pokemon.name.toLowerCase();

    if (isGuessEntry) {
      // Trigger throw animation
      setIsThrowing(true);
      setCatchMessage(null);
      setIsTimerActive(false); // Stop timer immediately

      setTimeout(() => {
        setIsThrowing(false); // End animation

        if (isCorrectGuess) {
          // Correct Guess
          const catchSuccessLogic = () => {
            // Calculate score based on time left
            const pointsEarned = Math.round(timeLeft * 100);
            setScore(prev => prev + pointsEarned);

            const newCorrect = correctGuesses + 1;
            let msg = `Correct! +${pointsEarned} points! You caught ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`;

            if (newCorrect > 0 && newCorrect % 5 === 0) {
              setPokeBalls(prev => prev + 1);
              msg = `Correct! +${pointsEarned} pts. +1 Bonus Pokéball for a ${newCorrect} winstreak! 🎉`;
            }
            setCorrectGuesses(newCorrect);

            // Team Rocket Check (20% steal chance on any successful catch)
            if (Math.random() < 0.20) {
              setIsTeamRocketEncounter(true);
              setMissedPokemonCount(prev => prev + 1);
              setScore(prev => Math.max(0, prev - 100)); // Lose some points
              setCatchMessage({ text: `Oh no! Team Rocket stole your ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} and 100 pts!`, type: 'rocket' });
              setHasFled(true); // Treat it as fled so they can't throw again
            } else {
              setCatchMessage({ text: msg, type: 'success' });
              finalizeCatch();
            }
          };
          catchSuccessLogic();

        } else {
          // Wrong Guess -> Flee!
          setCorrectGuesses(0);
          setHasFled(true);
          setMissedPokemonCount(prev => prev + 1);
          setScore(prev => Math.max(0, prev - 50)); // Penalty
          setCatchMessage({ text: `Wrong! It was ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}. The Pokémon fled...`, type: 'error' });
        }
      }, 1000);
    } else {
      // Throw Pokeball Logic
      if (pokeBalls > 0) {
        setIsThrowing(true); // Trigger UI wait/shake animation
        setCatchMessage(null);

        let hitboxSuccess = false;
        let sliderSuccess = false;

        // 1. Check Slider
        // Red zone is middle 20% (40-60)
        if (sliderPosition >= 40 && sliderPosition <= 60) {
          sliderSuccess = true;
        }

        // 2. Check Pokemon Hitbox
        if (grassRef.current && pokemonRef.current) {
          const grassRect = grassRef.current.getBoundingClientRect();
          const pokeRect = pokemonRef.current.getBoundingClientRect();

          const grassCenter = grassRect.left + (grassRect.width / 2);
          const pokeCenter = pokeRect.left + (pokeRect.width / 2);

          // If pokemon center is within 25% of the grass center
          const allowedMargin = grassRect.width * 0.25;
          if (Math.abs(grassCenter - pokeCenter) <= allowedMargin) {
            hitboxSuccess = true;
          }
        }

        // Wait 1.5 seconds for dramatic effect before showing result
        setTimeout(() => {
          setIsThrowing(false);
          setPokeBalls(prev => prev - 1);
          const currentAttempt = throwAttempts + 1;
          setThrowAttempts(currentAttempt);

          // Game mechanic: If you hit the green zone AND the pokemon is in frame, it's 100% chance.
          // If you only hit one, 30% chance. If you hit none, 0% chance.
          let catchSuccess = false;
          if (hitboxSuccess && sliderSuccess) {
            catchSuccess = true;
          } else if (hitboxSuccess || sliderSuccess) {
            catchSuccess = Math.random() < 0.30;
          }

          if (catchSuccess) {
            // Team Rocket Check on throw catch
            if (Math.random() < 0.20) {
              setIsTeamRocketEncounter(true);
              setMissedPokemonCount(prev => prev + 1);
              setCatchMessage({ text: `Oh no! Team Rocket appeared and stole your ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`, type: 'rocket' });
              setHasFled(true); // Run away
            } else {
              setCatchMessage({ text: `Gotcha! You caught ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`, type: 'success' });
              finalizeCatch();
            }
          } else {
            if (currentAttempt >= 3) {
              setHasFled(true);
              setMissedPokemonCount(prev => prev + 1);
              setCatchMessage({ text: `Oh no! ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} broke free and ran away!`, type: 'error' });
            } else {
              setCatchMessage({ text: `${(t.fun as any).brokeFree || 'The Pokémon broke free!'} (${currentAttempt}/3)`, type: 'error' });
            }
          }
        }, 1500); // 1.5 sec Throw Wait Time
      } else {
        setCatchMessage({ text: (t.fun as any).outOfBalls || 'Out of Pokéballs! You must guess the name.', type: 'error' });
      }
    }
  };

  // Sync states to local storage securely
  useEffect(() => {
    localStorage.setItem('caughtPokemon', encodeData(JSON.stringify(caughtPokemon)));
  }, [caughtPokemon]);

  useEffect(() => {
    localStorage.setItem('pokeBalls', encodeData(pokeBalls.toString()));
  }, [pokeBalls]);

  useEffect(() => {
    localStorage.setItem('correctGuesses', encodeData(correctGuesses.toString()));
  }, [correctGuesses]);

  useEffect(() => {
    localStorage.setItem('pokemonPlayerName', encodeData(playerName));
  }, [playerName]);

  useEffect(() => {
    localStorage.setItem('missedPokemonCount', encodeData(missedPokemonCount.toString()));
  }, [missedPokemonCount]);

  useEffect(() => {
    localStorage.setItem('pokemonScore', encodeData(score.toString()));
  }, [score]);

  // Handle Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0 && !isCurrentlyCaught && !hasFled) {
      interval = setInterval(() => {
        setTimeLeft((prev) => parseFloat((prev - 0.1).toFixed(1)));
      }, 100);
    } else if (timeLeft <= 0 && isTimerActive && !isCurrentlyCaught && !hasFled) {
      // Time ran out!
      setIsTimerActive(false);
      setHasFled(true);
      setCorrectGuesses(0);
      setMissedPokemonCount(prev => prev + 1);
      setCatchMessage({ text: 'Time ran out! The Pokémon fled!', type: 'error' });
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, isCurrentlyCaught, hasFled]);

  // Slider Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 150; // pixels per second

    const updateSlider = (time: number) => {
      if (isSliderActive && !isThrowing && !isCurrentlyCaught && !hasFled) {
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;

        setSliderPosition(prev => {
          let nextPos = prev + (speed * deltaTime * sliderDirection);
          if (nextPos >= 100) {
            setSliderDirection(-1);
            return 100;
          } else if (nextPos <= 0) {
            setSliderDirection(1);
            return 0;
          }
          return nextPos;
        });
      } else {
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(updateSlider);
    };

    animationFrameId = requestAnimationFrame(updateSlider);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSliderActive, isThrowing, isCurrentlyCaught, hasFled, sliderDirection]);

  // Activate slider when a new pokemon appears
  useEffect(() => {
    if (pokemon && !isCurrentlyCaught && !hasFled) {
      setIsSliderActive(true);
      setSliderPosition(0);
      setSliderDirection(1);
    } else {
      setIsSliderActive(false);
    }
  }, [pokemon, isCurrentlyCaught, hasFled]);

  const restartGame = () => {
    if (window.confirm("Are you sure you want to restart? This will delete all caught Pokémon and Pokéballs.")) {
      localStorage.removeItem('caughtPokemon');
      localStorage.removeItem('pokeBalls');
      localStorage.removeItem('correctGuesses');
      localStorage.removeItem('missedPokemonCount');
      setCaughtPokemon([]);
      setPokeBalls(10);
      setCorrectGuesses(0);
      setMissedPokemonCount(0);
      setPokemon(null);
      setCatchMessage(null);
    }
  };

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
            {!playerName ? (
              <div className="text-center flex flex-col justify-center items-center py-10 space-y-4">
                <Gamepad2 className="w-16 h-16 text-primary mb-2 opacity-80" />
                <h3 className="text-2xl font-bold">Velkommen, Trener!</h3>
                <p className="text-muted-foreground mb-4">Skriv inn trener-navnet ditt for å starte reisen.</p>
                <form
                  className="flex gap-2 max-w-sm w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputName.trim()) setPlayerName(inputName.trim());
                  }}
                >
                  <Input
                    placeholder="Mitt navn er..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    maxLength={15}
                    className="flex-1"
                  />
                  <Button type="submit">Start</Button>
                </form>
              </div>
            ) : pokemonLoading ? (
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
              <div className="flex flex-col w-full relative">
                {/* Scoreboard */}
                <div className="self-end mb-2 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-sm pl-4 pr-2 py-1.5 rounded-full border border-border shadow-sm flex items-center justify-end gap-4 w-fit">
                  <span className="font-bold text-sm max-w-[120px] truncate">{playerName}</span>
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold text-sm">
                    <Trophy className="w-4 h-4" /> {caughtPokemon.length}
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" /> {-missedPokemonCount}
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive" onClick={restartGame} title={(t.fun as any).restartGame || "Restart Game"}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div
                  className="relative rounded-lg overflow-hidden grass-bg border-4 border-green-800 flex items-center shadow-inner"
                  style={{ minHeight: '200px' }}
                  ref={grassRef}
                >
                  {/* Clickable Overlay */}
                  <div
                    className={`absolute inset-0 z-40 ${isCurrentlyCaught || hasFled ? 'cursor-pointer hover:bg-white/10 group' : 'cursor-default'}`}
                    onClick={() => {
                      if (isCurrentlyCaught || hasFled) {
                        fetchPokemon();
                      }
                    }}
                    title={(isCurrentlyCaught || hasFled) ? ((t.fun as any).nextPokemon || "Search for new Pokémon") : ""}
                  />

                  {/* Walking/Caught Sprite */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${isCurrentlyCaught ? 'grayscale opacity-80' : ''} ${hasFled ? 'translate-x-[400px] opacity-0 transition-transform duration-1000' : ''} ${!isCurrentlyCaught && !hasFled ? spawnAnimation : ''}`}
                    ref={pokemonRef}
                  >
                    <img
                      src={pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="h-[120px] object-contain filter drop-shadow-xl translate-y-2"
                    />
                  </div>

                  {/* Throwing Animation Overlay */}
                  {isThrowing && (
                    <div className="absolute inset-0 bg-black/10 z-[60] flex items-center justify-center animate-in fade-in duration-300 pointer-events-none">
                      <div className="w-24 h-24 rounded-full border-[6px] border-black bg-red-500 overflow-hidden relative shadow-inner throw-pokeball drop-shadow-2xl translate-y-2">
                        <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-[3px] border-black z-10"></div>
                        <div className="absolute top-1/2 w-full h-[5px] bg-black transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pokemon Info (Moved out of grass) */}
                <div className="flex flex-col items-center justify-center mt-3">
                  <h3 className="font-bold text-2xl capitalize drop-shadow-sm">{isCurrentlyCaught || hasFled ? pokemon.name : '???'}</h3>
                  <div className="flex gap-1.5 mt-1">
                    {pokemon.types.map((typeObj, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-primary/20 bg-primary/5">{typeObj.type.name}</Badge>
                    ))}
                  </div>
                </div>

                {/* Catch Game Controls */}
                <div className="mt-4 flex flex-col items-center justify-center max-w-[280px] mx-auto w-full">
                  {/* The Target Slider Minigame */}
                  {!isCurrentlyCaught && !hasFled && (
                    <div className="w-full mb-4 px-2">
                      <p className="text-xs font-bold text-muted-foreground text-center mb-1">Target Slider (Wait for middle!)</p>
                      <div className="w-full h-4 bg-muted rounded-full overflow-hidden relative border border-border" ref={sliderRef}>
                        {/* The Red/Green Target Zone (40%-60%) */}
                        <div className="absolute top-0 bottom-0 left-[40%] right-[40%] bg-red-400/50 dark:bg-red-900/50 border-x border-red-500 z-0"></div>

                        {/* The Moving Slider Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-3 bg-black dark:bg-white z-10 shadow-sm"
                          style={{ left: `calc(${sliderPosition}% - 6px)` }}
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-sm font-bold text-muted-foreground mb-4 text-center px-2">
                    {(t.fun as any).guessPrompt || "Guess the Pokémon fast!"}
                  </p>

                  {/* Timer UI Element */}
                  {isTimerActive && !isCurrentlyCaught && !hasFled && (
                    <div className="w-full flex flex-col items-center mb-4">
                      <span className={`text-2xl font-black ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                        {timeLeft.toFixed(1)}s
                      </span>
                    </div>
                  )}

                  {/* 3 Quiz Options */}
                  {!isCurrentlyCaught && !hasFled ? (
                    <div className="flex flex-col gap-4 w-full justify-center items-center px-4">
                      {quizOptions.map((opt, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="w-full capitalize font-bold h-12 text-md transition-all hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 dark:border-primary/30 shadow-sm"
                          onClick={() => {
                            setPokemonGuess(opt);
                            handleCatchAction(false, opt);
                          }}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 w-full justify-center items-center">
                      {/* Hide options when caught/fled */}
                    </div>
                  )}
                  {!isCurrentlyCaught && !hasFled ? (
                    <Button
                      onClick={() => handleCatchAction(false)}
                      disabled={isCurrentlyCaught || hasFled || isThrowing}
                      className="w-full px-4 font-bold h-14 text-lg"
                      title={(t.fun as any).throwBall || "Throw Ball"}
                      variant={pokeBalls > 0 ? "default" : "destructive"}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-current bg-red-500 overflow-hidden relative shadow-inner shrink-0 group-hover:animate-bounce">
                          <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-black z-10"></div>
                          <div className="absolute top-1/2 w-full h-px bg-black transform -translate-y-1/2"></div>
                        </div>
                        <span className="whitespace-nowrap">{(t.fun as any).throwBall || "Throw Ball"} ({pokeBalls})</span>
                      </div>
                    </Button>
                  ) : (
                    <Button
                      onClick={fetchPokemon}
                      className="w-full font-bold h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Gamepad2 className="w-5 h-5 mr-2" />
                      {(t.fun as any).nextPokemon || "Search for new Pokémon"}
                    </Button>
                  )}
                </div>

                {/* Catch Messages */}
                {catchMessage && (
                  <div className={`mt-3 p-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 shadow-sm border ${catchMessage.type === 'success' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50' : catchMessage.type === 'rocket' ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/50' : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50'}`}>
                    {catchMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : catchMessage.type === 'rocket' ? <Ghost className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {catchMessage.text}
                  </div>
                )}
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
    </div >
  );
};
