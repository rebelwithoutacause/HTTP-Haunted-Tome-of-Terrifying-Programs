import React, { useState, useEffect } from 'react';
import { Heart, Clock, Skull, ArrowLeft, Filter, BookOpen, Film, Star, ExternalLink } from 'lucide-react';
import { recipes as allRecipes } from './data/recipes.js';
import { categories as defaultCategories } from './data/categories.js';
import { facts as defaultFacts } from './data/facts.js';
import { movies as allMovies } from './data/movies.js';

const FAVORITES_STORAGE_KEY = 'spooky_favorites';
const posterUrl = (poster) => `${import.meta.env.BASE_URL}${poster}`;

const SpookyRecipesApp = () => {
  // Main app state
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedFact, setSelectedFact] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
      return new Set(stored);
    } catch {
      return new Set();
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [recipes] = useState(allRecipes);
  const [categories] = useState(defaultCategories);
  const [facts] = useState(defaultFacts);
  const [movies] = useState(allMovies);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe =>
    selectedCategory === 'all' || recipe.category === selectedCategory
  );

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(newFavorites)));
  };

  // Fact Detail View
  if (currentView === 'fact' && selectedFact) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedFact(null);
              setCurrentView('mysteries');
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-6 font-mono transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Mysteries
          </button>

          <div className="bg-black/90 border border-amber-800/30 p-8 rounded">
            <div className="text-center mb-6">
              <h1 className="font-mono text-4xl text-amber-100 mb-4 tracking-wide">{selectedFact.title}</h1>
              <p className="text-amber-300/90 text-lg italic leading-relaxed">
                {selectedFact.fact}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-800/30">
              <h2 className="font-mono text-2xl text-red-400 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                The Full Story
              </h2>
              <p className="text-amber-200/90 text-base leading-relaxed whitespace-pre-line">
                {selectedFact.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mysteries List View
  if (currentView === 'mysteries') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <header className="bg-black border-b border-amber-900/50 p-4 sticky top-0 z-50">
          <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 font-mono transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-red-600" />
              <h1 className="font-mono text-2xl text-amber-100 tracking-wider flicker-text">
                ANCIENT HALLOWEEN MYSTERIES
              </h1>
            </div>
            <div className="w-32"></div>
          </div>
        </header>

        <div className="px-4 py-6">
          <p className="text-amber-400/70 font-mono text-sm mb-6 text-center">
            {facts.length} Dark Secrets from Halloween's Past - Click any mystery for the full story
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {facts.map(fact => (
              <div
                key={fact.id}
                onClick={() => {
                  setSelectedFact(fact);
                  setCurrentView('fact');
                }}
                className="bg-black/80 border border-amber-800/30 border-l-4 border-l-red-900/60 p-6 hover:border-red-700/50 hover:border-l-red-600 transition-all duration-300 hover:shadow-lg cursor-pointer rounded group"
              >
                <h3 className="font-mono text-lg text-amber-100 mb-3 leading-tight tracking-wide uppercase">
                  {fact.title}
                </h3>
                <p className="text-amber-300/80 text-sm leading-relaxed line-clamp-4">
                  {fact.fact}
                </p>
                <div className="mt-4 text-xs text-red-400 font-mono flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Read full story →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Movie Detail View
  if (currentView === 'movie' && selectedMovie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => {
              setSelectedMovie(null);
              setCurrentView('movies');
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-6 font-mono transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Horror Collection
          </button>

          <div className="bg-black/90 border border-amber-800/30 p-8 rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                <div className="relative">
                  {selectedMovie.poster && (
                    <img
                      src={posterUrl(selectedMovie.poster)}
                      alt={selectedMovie.title}
                      className="w-full rounded border-2 border-red-900/50 shadow-lg"
                      onError={(e) => {e.target.style.display = 'none'}}
                    />
                  )}
                </div>
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2">
                <h1 className="font-mono text-4xl text-amber-100 mb-4">{selectedMovie.title}</h1>

                <div className="flex items-center gap-6 mb-6 text-amber-300">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">★</span>
                    <span className="font-mono text-lg">{selectedMovie.rating}/10</span>
                  </div>
                  <div className="font-mono text-lg">{selectedMovie.year}</div>
                  <a
                    href={selectedMovie.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-600/50 hover:bg-amber-600/30 transition-all rounded"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on IMDb
                  </a>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2 className="font-mono text-xl text-red-400 mb-4 border-b border-red-900/50 pb-2">
                    📖 Plot Synopsis
                  </h2>
                  <p className="text-amber-200/90 leading-relaxed text-base">
                    {selectedMovie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Movies List View
  if (currentView === 'movies') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <header className="bg-black border-b border-amber-900/50 p-4 sticky top-0 z-50">
          <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 font-mono transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </button>
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-red-600" />
              <h1 className="font-mono text-2xl text-amber-100 tracking-wider flicker-text">
                HORROR CINEMA VAULT
              </h1>
            </div>
            <div className="w-32"></div>
          </div>
        </header>

        <div className="px-4 py-6">
          <p className="text-amber-400/70 font-mono text-sm mb-6 text-center">
            {movies.length} Classic Horror Films - Click any movie for full details
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {movies.map(movie => (
              <div
                key={movie.id}
                onClick={() => {
                  setSelectedMovie(movie);
                  setCurrentView('movie');
                }}
                className="bg-black/80 border border-amber-800/30 p-4 hover:border-red-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer rounded group"
              >
                {movie.poster && (
                  <img
                    src={posterUrl(movie.poster)}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded mb-3 border border-amber-800/30 group-hover:border-red-700/50 transition-all"
                    onError={(e) => {e.target.style.display = 'none'}}
                  />
                )}
                <h3 className="font-mono text-sm text-amber-100 mb-2 leading-tight text-center">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs text-amber-300/80 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span>{movie.rating}</span>
                  <span>•</span>
                  <span>{movie.year}</span>
                </div>
                <a
                  href={movie.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1 text-xs text-amber-400 hover:text-red-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  IMDb
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('recipes')}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-6 font-mono transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>

          <div className="bg-black/90 border border-amber-800/30 p-8 rounded">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h1 className="font-mono text-3xl text-amber-100 mb-2 tracking-wide">{selectedRecipe.title}</h1>
                <p className="text-amber-200/80 italic text-lg">{selectedRecipe.description}</p>
              </div>
              <button
                onClick={() => toggleFavorite(selectedRecipe.id)}
                className={`p-2 transition-colors ${favorites.has(selectedRecipe.id) ? 'text-red-500' : 'text-amber-500 hover:text-red-400'}`}
              >
                <Heart className="w-6 h-6" fill={favorites.has(selectedRecipe.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center gap-2 text-amber-300">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{selectedRecipe.time} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-mono">{selectedRecipe.rating}/5.0</span>
              </div>
              <div className={`flex items-center gap-2 font-mono ${
                selectedRecipe.difficulty === 'Easy' ? 'text-green-400' :
                selectedRecipe.difficulty === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                <span>{selectedRecipe.difficulty} ritual</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-mono text-xl text-red-400 mb-4 border-b border-red-900/50 pb-2">
                  🧪 Cursed Ingredients
                </h2>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-amber-200 flex items-start gap-2">
                      <span className="text-red-600 font-mono">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-mono text-xl text-red-400 mb-4 border-b border-red-900/50 pb-2">
                  📜 Dark Ritual Steps
                </h2>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index} className="text-amber-200 flex items-start gap-3">
                      <span className="text-red-600 font-mono font-bold bg-red-900/20 px-2 py-1 text-sm min-w-[24px] text-center rounded">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-red-900/30">
              <p className="text-amber-400/70 font-mono text-sm text-center italic">
                May this recipe bring darkness to your kitchen and satisfaction to your soul...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page View
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center relative overflow-hidden" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        {/* VHS scanlines, rolling top-to-bottom like an old tape */}
        <div className="absolute inset-0 pointer-events-none z-20 vhs-scanlines"></div>

        {/* VHS tracking glitch bar - flickers in at a random position during glitch bursts */}
        {glitchEffect && (
          <div
            className="absolute left-0 right-0 h-3 bg-white/10 mix-blend-overlay pointer-events-none z-20"
            style={{ top: `${Math.floor(Math.random() * 90)}%` }}
          ></div>
        )}

        {/* REC indicator, corner of the "tape" */}
        <div className="absolute top-5 left-5 md:top-8 md:left-8 flex items-center gap-2 font-mono text-red-500 text-xs md:text-sm tracking-widest z-20 pointer-events-none">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 vhs-rec-dot"></span>
          <span>REC ● 10.31.1986</span>
        </div>
        {glitchEffect && (
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 font-mono text-white/70 text-xs md:text-sm tracking-widest z-20 pointer-events-none">
            ≡≡ TRACKING
          </div>
        )}

        {/* Glitch Background */}
        <div className={`absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-amber-950/20 transition-all duration-150 ${glitchEffect ? 'scale-105 blur-sm' : ''}`}></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Title with 80s Horror Style */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Skull className={`w-16 h-16 md:w-24 md:h-24 text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all duration-150 ${glitchEffect ? 'animate-pulse scale-110' : ''}`} />
            </div>
            <h1 className={`font-mono text-5xl md:text-7xl lg:text-8xl font-bold mb-4 transition-all duration-150 ${glitchEffect ? 'blur-sm scale-105' : ''}`}
                style={{
                  textShadow: glitchEffect
                    ? '-3px 0 rgba(255,0,60,0.85), 3px 0 rgba(0,220,255,0.6), 0 0 20px rgba(220, 38, 38, 0.8), 4px 4px 0px rgba(0,0,0,0.8)'
                    : '-1px 0 rgba(255,0,60,0.35), 1px 0 rgba(0,220,255,0.25), 0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.6), 4px 4px 0px rgba(0,0,0,0.8)',
                  color: '#dc2626',
                  letterSpacing: '0.1em'
                }}>
              SPOOKY
            </h1>
            <h2 className="font-mono text-3xl md:text-5xl text-amber-400 tracking-widest"
                style={{
                  textShadow: '0 0 15px rgba(251, 191, 36, 0.6), 2px 2px 0px rgba(0,0,0,0.8)'
                }}>
              GRIMOIRE
            </h2>
            <p className="font-mono text-red-400 text-sm md:text-base mt-4 tracking-wider">
              [HORROR COLLECTION • EST. 1980]
            </p>
          </div>

          {/* Main Navigation Buttons - 80s VHS Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Recipes Button */}
            <button
              onClick={() => setCurrentView('recipes')}
              className="group relative bg-gradient-to-b from-black to-red-950/60 border-2 border-red-900/70 p-8 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
              style={{
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.06)'
              }}
            >
              <Skull className="w-16 h-16 mx-auto mb-4 text-red-700 group-hover:text-red-500 group-hover:scale-110 transition-all drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                CURSED
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                RECIPES
              </h3>
              <p className="font-mono text-red-400/80 text-sm">28 WICKED DELIGHTS</p>
            </button>

            {/* Movies Button */}
            <button
              onClick={() => setCurrentView('movies')}
              className="group relative bg-gradient-to-b from-black to-red-950/60 border-2 border-red-900/70 p-8 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
              style={{
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.06)'
              }}
            >
              <Film className="w-16 h-16 mx-auto mb-4 text-red-700 group-hover:text-red-500 group-hover:scale-110 transition-all drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                HORROR
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                CINEMA
              </h3>
              <p className="font-mono text-red-400/80 text-sm">50 CLASSIC FILMS</p>
            </button>

            {/* Mysteries Button */}
            <button
              onClick={() => setCurrentView('mysteries')}
              className="group relative bg-gradient-to-b from-black to-red-950/60 border-2 border-red-900/70 p-8 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
              style={{
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.06)'
              }}
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-red-700 group-hover:text-red-500 group-hover:scale-110 transition-all drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                ANCIENT
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                MYSTERIES
              </h3>
              <p className="font-mono text-red-400/80 text-sm">20 DARK SECRETS</p>
            </button>
          </div>

          {/* Warning Label - 80s Style */}
          <div className="border-2 border-red-900/70 bg-black/60 p-4 max-w-2xl mx-auto">
            <p className="font-mono text-red-500 text-xs md:text-sm tracking-wider">
              WARNING: CONTAINS GRAPHIC RECIPES, SUPERNATURAL CONTENT &amp; TERRIFYING TALES
            </p>
          </div>

          {/* Footer Text */}
          <p className="font-mono text-amber-600 text-xs mt-8 tracking-widest">
            WHERE CULINARY MAGIC MEETS HALLOWEEN MYSTERIES
          </p>
        </div>
      </div>
    );
  }

  // Recipes View (renamed from 'home')
  if (currentView === 'recipes') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        {/* Header */}
        <header className="bg-black border-b border-amber-900/50 p-4 sticky top-0 z-50">
          <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 font-mono transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </button>
            <div className="flex items-center gap-3">
              <Skull className="w-8 h-8 text-red-600" />
              <h1 className={`font-mono text-2xl text-amber-100 tracking-wider transition-all duration-150 ${glitchEffect ? 'blur-sm opacity-70' : ''}`}>
                SPOOKY GRIMOIRE
              </h1>
            </div>
            <div className="w-24"></div>
          </div>
        </header>

      {/* Category Tabs */}
      <div className="w-full text-center mb-4 mt-6">
        <div className="inline-flex gap-2 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-sm whitespace-nowrap transition-all border ${
                selectedCategory === category.id
                  ? 'bg-red-900/40 border-red-600/70 text-red-200'
                  : 'bg-amber-900/20 border-amber-700/50 text-amber-300 hover:border-red-700/50 hover:text-red-300'
              }`}
            >
              <span className="text-lg">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="px-4 mb-4">
        <p className="text-amber-400/70 font-mono text-sm">
          {filteredRecipes.length} cursed recipes found (Total: {recipes.length} in grimoire)
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-8">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => {
              setSelectedRecipe(recipe);
              setCurrentView('recipe');
            }}
            className={`bg-black/80 border border-amber-800/30 border-l-4 border-l-red-900/60 p-4 hover:border-red-700/50 hover:border-l-red-600 transition-all duration-300 hover:shadow-lg cursor-pointer rounded ${glitchEffect ? 'animate-pulse' : ''}`}
          >
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-mono text-lg text-amber-100 leading-tight tracking-wide">{recipe.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                className={`p-1 -mt-1 -mr-1 transition-colors shrink-0 ${favorites.has(recipe.id) ? 'text-red-500' : 'text-amber-500 hover:text-red-400'}`}
              >
                <Heart className="w-5 h-5" fill={favorites.has(recipe.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p className="text-amber-200/80 text-lg mb-3 italic">{recipe.description}</p>

            <div className="flex items-center justify-between text-base text-amber-300/80">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{recipe.time} min</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{recipe.rating}</span>
              </div>
              <div className={`px-2 py-1 text-sm border rounded ${
                recipe.difficulty === 'Easy' ? 'border-green-600/50 text-green-400' :
                recipe.difficulty === 'Medium' ? 'border-yellow-600/50 text-yellow-400' :
                'border-red-600/50 text-red-400'
              }`}>
                {recipe.difficulty}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-amber-800/30 px-4 pb-8">
        <div className="text-center text-amber-500/70 font-mono text-sm">
          <p>© 2025 Spooky Grimoire - Ancient Recipes from the Shadow Realm</p>
          <p className="mt-2 text-xs">Where culinary magic meets Halloween mysteries...</p>
        </div>
      </footer>
    </div>
  );
  }
};

export default SpookyRecipesApp;