import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { AlertCircle, CheckCircle2, Trophy, Ghost, RotateCcw, Gamepad2 } from 'lucide-react';

const encodeData = (data: string) => {
  try { return 'b64_' + btoa(encodeURIComponent(data)); } catch { return data; }
};
const decodeData = (encodedData: string) => {
  if (encodedData.startsWith('b64_')) {
    try { return decodeURIComponent(atob(encodedData.slice(4))); } catch { return encodedData; }
  }
  return encodedData;
};

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

interface PokemonMiniGameProps {
  language: string;
  t: any;
  onPokemonClick?: () => void;
}

export const PokemonMiniGame: React.FC<PokemonMiniGameProps> = ({ language, t, onPokemonClick }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [pokemonLoading, setPokemonLoading] = useState<boolean>(false);
  const [pokemonError, setPokemonError] = useState<string>('');

  // Pokedex states
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonData[]>(() => {
    try {
      const saved = localStorage.getItem('caughtPokemon');
      if (saved) {
        const decoded = decodeData(saved);
        // Safety check: if decoded data is too large (>200KB), clear it
        if (decoded.length > 200000) {
          console.warn('Pokédex data too large, clearing to prevent crash');
          localStorage.removeItem('caughtPokemon');
          return [];
        }
        return JSON.parse(decoded);
      }
      return [];
    } catch {
      localStorage.removeItem('caughtPokemon');
      return [];
    }
  });
  const [pokeBalls, setPokeBalls] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pokeBalls');
      if (saved !== null) {
        const val = parseInt(decodeData(saved), 10);
        return isNaN(val) ? 10 : val;
      }
      return 10;
    } catch {
      localStorage.removeItem('pokeBalls');
      return 10;
    }
  });

  // Scoreboard / Player States
  const [playerName, setPlayerName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pokemonPlayerName');
      if (saved) {
        const decoded = decodeData(saved);
        // Validate: if it looks like raw base64 or encoded junk, discard it
        if (/^[A-Za-z0-9+/=]{20,}$/.test(decoded)) return '';
        return decoded;
      }
      return '';
    } catch {
      localStorage.removeItem('pokemonPlayerName');
      return '';
    }
  });
  const [missedPokemonCount, setMissedPokemonCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('missedPokemonCount');
      if (saved !== null) {
        const val = parseInt(decodeData(saved), 10);
        return isNaN(val) ? 0 : val;
      }
      return 0;
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
      if (saved !== null) {
        const val = parseInt(decodeData(saved), 10);
        return isNaN(val) ? 0 : val;
      }
      return 0;
    } catch {
      localStorage.removeItem('correctGuesses');
      return 0;
    }
  });

  // Name Registration State
  const [inputName, setInputName] = useState('');

  // Quiz Mechanics & Animations
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(7.0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [spawnAnimation, setSpawnAnimation] = useState<string>('animate-fade-in');
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pokemonScore');
      if (saved !== null) {
        const val = parseInt(decodeData(saved), 10);
        return isNaN(val) ? 0 : val;
      }
      return 0;
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

  const fetchPokemon = async () => {
    onPokemonClick?.(); // Trigger global counter if provided
    setPokemonLoading(true);
    setPokemonError('');
    setIsCurrentlyCaught(false);
    setHasFled(false);
    setIsThrowing(false);
    setIsTeamRocketEncounter(false);
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

      const rawData = await response.json();
      const data: PokemonData = {
        id: rawData.id,
        name: rawData.name,
        sprites: {
          front_default: rawData.sprites?.front_default || '',
          versions: {
            'generation-v': {
              'black-white': {
                animated: {
                  front_default: rawData.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default || ''
                }
              }
            }
          }
        },
        types: (rawData.types || []).map((t: any) => ({ type: { name: t.type.name } })),
        cries: rawData.cries ? { latest: rawData.cries.latest } : undefined
      };

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
      setIsSliderActive(true);

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

  const restartGame = () => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete all saved data (except your name)?' : 'Er du sikker på at du vil slette all lagret data (bortsett fra navnet ditt)?')) {
      setCaughtPokemon([]);
      setPokeBalls(10);
      setScore(0);
      setCorrectGuesses(0);
      setMissedPokemonCount(0);
      setPokemon(null);
      setIsCurrentlyCaught(false);
      setHasFled(false);
      setIsThrowing(false);
      setIsTeamRocketEncounter(false);
      setCatchMessage(null);
      setIsTimerActive(false);
      setIsSliderActive(false);
      setPokemonGuess('');
      setQuizOptions([]);
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
        lastTime = time; // keep updating time to avoid jumps
      }
      animationFrameId = requestAnimationFrame(updateSlider);
    };

    animationFrameId = requestAnimationFrame(updateSlider);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSliderActive, isThrowing, isCurrentlyCaught, hasFled, sliderDirection]);

  return (
    <div className="w-full">
      {/* Pokemon Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="italic font-bold text-[20px]">{(t.fun as any).pokemon || 'Wild Pokémon'}</h2>
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
                {/* Clickable Overlay - only active when caught/fled, z-30 to not block scoreboard */}
                {(isCurrentlyCaught || hasFled) && (
                  <div
                    className="absolute inset-0 z-30 cursor-pointer hover:bg-white/10"
                    onClick={() => fetchPokemon()}
                    title={(t.fun as any).nextPokemon || "Search for new Pokémon"}
                  />
                )}

                {/* Walking/Caught Sprite */}
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${isCurrentlyCaught ? 'grayscale opacity-80' : ''} ${hasFled ? 'translate-x-[400px] opacity-0 transition-transform duration-1000' : ''} ${!isCurrentlyCaught && !hasFled ? spawnAnimation : ''}`}
                  ref={pokemonRef}
                >
                  <img
                    src={pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={`h-[120px] object-contain filter drop-shadow-xl translate-y-2 ${!isCurrentlyCaught && !hasFled ? 'animate-wander' : ''}`}
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

                {/* Catch Messages Inside Grass */}
                {catchMessage && (
                  <div className="absolute inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
                    <div className={`p-4 rounded-lg shadow-2xl border-2 opacity-95 animate-in fade-in zoom-in duration-300 max-w-[90%] ${catchMessage.type === 'success' ? 'bg-green-50 text-green-900 border-green-400 dark:bg-green-950/90 dark:text-green-200 dark:border-green-800' : catchMessage.type === 'rocket' ? 'bg-purple-50 text-purple-900 border-purple-400 dark:bg-purple-950/90 dark:text-purple-200 dark:border-purple-800' : 'bg-red-50 text-red-900 border-red-400 dark:bg-red-950/90 dark:text-red-200 dark:border-red-800'}`}>
                      <div className="flex flex-col items-center justify-center gap-2 text-center font-bold">
                        {catchMessage.type === 'success' ? <CheckCircle2 className="w-8 h-8 mb-1" /> : catchMessage.type === 'rocket' ? <Ghost className="w-8 h-8 mb-1" /> : <AlertCircle className="w-8 h-8 mb-1" />}
                        <span className="text-[15px] sm:text-lg leading-tight">{catchMessage.text}</span>
                      </div>
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
                  <div className="flex flex-col gap-6 w-full max-w-sm mx-auto justify-center items-center px-4 my-2">
                    {quizOptions.map((opt, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full capitalize font-bold h-12 text-md transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-purple-600 hover:text-white border-2 border-zinc-300 dark:border-zinc-600 shadow-sm"
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
                    className="w-full max-w-sm mx-auto font-bold h-14 text-lg bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform text-white"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    {(t.fun as any).nextPokemon || "Search for new Pokémon"}
                  </Button>
                )}
              </div>

            </div>
          ) : (
            <div
              className="text-center flex flex-col justify-center items-center grass-bg rounded-lg border-4 border-green-800 opacity-90 cursor-pointer shadow-inner relative overflow-hidden group"
              style={{ minHeight: '150px' }}
              onClick={fetchPokemon}
            >
              <p className="mb-4 text-white font-bold drop-shadow-md text-lg z-10">🌿 {language === 'en' ? 'A wild Pokémon might be hiding here...' : 'En vill Pokémon kan gjemme seg her...'}</p>
              <Button className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform text-white font-bold border-2 border-white/20 shadow-lg z-10">{(t.fun as any).catchPokemon || 'Search Grass'}</Button>
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
    </div >
  );
};
