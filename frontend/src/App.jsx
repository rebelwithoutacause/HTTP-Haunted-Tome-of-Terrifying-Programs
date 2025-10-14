import React, { useState, useEffect } from 'react';
import { Heart, Clock, Skull, ArrowLeft, Filter, BookOpen, Film, Star, ExternalLink } from 'lucide-react';
import axios from 'axios';

const SpookyRecipesApp = () => {
  // Main app state
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedFact, setSelectedFact] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [facts, setFacts] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, categoriesRes, factsRes, moviesRes] = await Promise.all([
          axios.get('/api/recipes'),
          axios.get('/api/categories'),
          axios.get('/api/facts'),
          axios.get('/api/movies')
        ]);

        setRecipes(recipesRes.data);
        setCategories(categoriesRes.data);
        setFacts(factsRes.data);
        setMovies(moviesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to local data if API fails
        setRecipes(allRecipes);
        setCategories(defaultCategories);
        setFacts(defaultFacts);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback data (same as original)
  const allRecipes = [
    // COOKIES (6)
    { id: 1, title: "Witch's Finger Cookies", category: 'cookies', time: 35, difficulty: 'Easy', image: '🧙‍♀️', rating: 4.7, description: 'Eerily realistic finger cookies that will make your guests squirm...', ingredients: ['Butter', 'Sugar', 'Flour', 'Almond extract', 'Sliced almonds'], instructions: ['Preheat oven to 350°F/175°C', 'Mix butter, sugar, and almond extract', 'Add flour to form dough', 'Shape into finger-like cookies', 'Press almond for fingernail', 'Bake 12–15 min until golden'] },
    { id: 2, title: "Pumpkin Spider Cookies", category: 'cookies', time: 40, difficulty: 'Medium', image: '🕷️', rating: 4.5, description: 'Spooky spider cookies that crawl off the plate...', ingredients: ['Pumpkin puree', 'Sugar', 'Flour', 'Cocoa powder', 'Chocolate chips'], instructions: ['Preheat oven to 350°F/175°C', 'Mix pumpkin puree with sugar', 'Add flour and cocoa powder', 'Shape cookies, add chocolate chips as eyes', 'Bake 12–15 min'] },
    { id: 3, title: "Graveyard Dirt Cookies", category: 'cookies', time: 60, difficulty: 'Medium', image: '🪦', rating: 4.6, description: 'Cookies that taste like they were dug up from the cemetery...', ingredients: ['Chocolate cookies', 'Oreo crumbs', 'Dark chocolate chips', 'Gummy worms'], instructions: ['Crush Oreos into fine dirt-like crumbs', 'Mix cookie dough with chocolate chips', 'Roll into balls and flatten', 'Bake at 350°F/175°C for 12 minutes', 'Roll warm cookies in Oreo crumbs', 'Top with gummy worms'] },
    { id: 4, title: "Spider Leg Gingersnaps", category: 'cookies', time: 45, difficulty: 'Easy', image: '🕸️', rating: 4.4, description: 'Crispy cookies with legs that crunch between your teeth...', ingredients: ['Ginger', 'Molasses', 'Dark brown sugar', 'Black icing', 'Pretzel sticks'], instructions: ['Mix spices and molasses', 'Form dough into spider body shapes', 'Bake at 375°F/190°C for 10 minutes', 'Cool completely before decorating', 'Use black icing to attach pretzel stick legs', 'Add icing dots for eyes'] },
    { id: 5, title: "Ghost Meringue Cookies", category: 'cookies', time: 90, difficulty: 'Hard', image: '👻', rating: 4.3, description: 'Ethereal white cookies that float like spirits...', ingredients: ['Egg whites', 'Sugar', 'Vanilla extract', 'Black chocolate chips'], instructions: ['Whip egg whites until soft peaks form', 'Gradually add sugar until stiff peaks', 'Pipe ghost shapes on parchment paper', 'Add chocolate chip eyes and mouth', 'Bake at 200°F/93°C for 3 hours until crisp'] },
    { id: 6, title: "Bat Wing Brownies", category: 'cookies', time: 55, difficulty: 'Medium', image: '🦇', rating: 4.8, description: 'Dark brownies shaped like bat wings...', ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Oreo cookies'], instructions: ['Melt chocolate and butter', 'Mix in eggs and sugar', 'Fold in flour', 'Bake at 350°F/175°C for 25 minutes', 'Cut into bat wing shapes', 'Insert Oreo halves as bodies'] },

    // DRINKS (6)
    { id: 7, title: "Bloody Vampire Punch", category: 'drinks', time: 10, difficulty: 'Easy', image: '🧛‍♂️', rating: 4.8, description: 'A crimson punch that flows like fresh vampire blood...', ingredients: ['Cranberry juice', 'Orange soda', 'Grenadine', 'Ice'], instructions: ['Mix cranberry juice and orange soda', 'Add grenadine slowly for blood effect', 'Serve with ice cubes'] },
    { id: 8, title: "Witch's Brew Punch", category: 'drinks', time: 15, difficulty: 'Easy', image: '🧙‍♀️', rating: 4.6, description: 'A bubbling green concoction that would make any witch cackle...', ingredients: ['Green apple juice', 'Lemon-lime soda', 'Gummy worms'], instructions: ['Mix apple juice and soda in a large bowl', 'Add gummy worms for creepy effect', 'Serve chilled in cauldron mugs'] },
    { id: 9, title: "Ghostly White Punch", category: 'drinks', time: 25, difficulty: 'Medium', image: '👻', rating: 4.4, description: 'A pale, ethereal punch that floats like spirits...', ingredients: ['Coconut milk', 'White grape juice', 'Vanilla ice cream', 'Club soda'], instructions: ['Blend coconut milk with vanilla ice cream', 'Add white grape juice while stirring', 'Chill mixture for 2 hours', 'Add club soda before serving', 'Float marshmallow ghosts on top'] },
    { id: 10, title: "Cauldron Bubble Punch", category: 'drinks', time: 20, difficulty: 'Easy', image: '🔮', rating: 4.7, description: 'A bubbling cauldron that fizzes with magical power...', ingredients: ['Green sherbet', 'Lemon-lime soda', 'Pineapple juice', 'Gummy eyeballs'], instructions: ['Scoop green sherbet into punch bowl', 'Mix pineapple juice with green coloring', 'Pour over sherbet and watch it foam', 'Add lemon-lime soda for bubbling', 'Float gummy eyeballs on surface'] },
    { id: 11, title: "Zombie Brain Smoothie", category: 'drinks', time: 12, difficulty: 'Easy', image: '🧠', rating: 4.2, description: 'A pink smoothie that looks disturbingly like brain matter...', ingredients: ['Strawberries', 'Banana', 'Yogurt', 'Honey', 'Pink food coloring'], instructions: ['Blend strawberries and banana until chunky', 'Add yogurt and honey for creaminess', 'Mix in pink coloring', 'Blend with ice until thick but lumpy', 'Serve in clear glasses'] },
    { id: 12, title: "Poison Apple Cider", category: 'drinks', time: 30, difficulty: 'Medium', image: '🍎', rating: 4.5, description: 'Steaming cider that bubbles with mysterious mist...', ingredients: ['Apple cider', 'Cinnamon sticks', 'Star anise', 'Red food coloring', 'Dry ice'], instructions: ['Heat apple cider with spices', 'Simmer for 20 minutes', 'Add red coloring for poison effect', 'Carefully add dry ice before serving', 'Serve while smoking'] },

    // PIES (6)
    { id: 13, title: "Eyeball Pumpkin Pie", category: 'pies', time: 60, difficulty: 'Medium', image: '👁️', rating: 4.9, description: 'A pie that stares back at you with creamy eyeball decorations...', ingredients: ['Pumpkin puree', 'Eggs', 'Sugar', 'Cinnamon', 'Pie crust', 'Whipped cream'], instructions: ['Preheat oven to 350°F/175°C', 'Mix pumpkin puree, eggs, sugar, cinnamon', 'Pour into pie crust', 'Bake 45 min', 'Decorate with whipped cream eyeballs'] },
    { id: 14, title: "Creepy Chocolate Pie", category: 'pies', time: 50, difficulty: 'Medium', image: '🍫', rating: 4.5, description: 'A dark chocolate pie that watches you with candy eyes...', ingredients: ['Chocolate', 'Cream', 'Sugar', 'Pie crust', 'Candy eyes'], instructions: ['Preheat oven to 350°F/175°C', 'Prepare chocolate filling with cream and sugar', 'Pour into crust', 'Bake 20–25 min', 'Decorate with candy eyes'] },
    { id: 15, title: "Black Widow Berry Pie", category: 'pies', time: 90, difficulty: 'Hard', image: '🕷️', rating: 4.6, description: 'A pie as dark as a widow veil with bursting berries...', ingredients: ['Blackberries', 'Blueberries', 'Dark cherry juice', 'Sugar', 'Pie crust'], instructions: ['Mix berries with sugar and black coloring', 'Let macerate for 30 minutes', 'Roll out pie crust', 'Fill with berry mixture', 'Create lattice top like spider web', 'Bake at 375°F/190°C for 50 minutes'] },
    { id: 16, title: "Skeleton Key Lime Pie", category: 'pies', time: 75, difficulty: 'Medium', image: '💀', rating: 4.3, description: 'A pale pie that unlocks citrus perfection...', ingredients: ['Key lime juice', 'Condensed milk', 'Graham crackers', 'White chocolate'], instructions: ['Crush graham crackers into dust', 'Press into pie pan and chill', 'Whisk lime juice with condensed milk', 'Pour into crust and refrigerate 4 hours', 'Grate white chocolate like bone shavings'] },
    { id: 17, title: "Graveyard Mud Pie", category: 'pies', time: 120, difficulty: 'Hard', image: '⚰️', rating: 4.7, description: 'A layered pie that looks like a freshly dug grave...', ingredients: ['Chocolate pudding', 'Oreo cookies', 'Whipped cream', 'Chocolate cake', 'Gummy worms'], instructions: ['Bake chocolate cake and cool', 'Layer cake pieces in pie dish', 'Pour chocolate pudding over cake', 'Crush Oreos into dirt', 'Spread whipped cream and top with Oreo dirt', 'Decorate with gummy worms and tombstones'] },
    { id: 18, title: "Bloody Orange Tart", category: 'pies', time: 85, difficulty: 'Medium', image: '🍊', rating: 4.4, description: 'A tart filled with blood-red citrus that oozes...', ingredients: ['Blood oranges', 'Pastry crust', 'Eggs', 'Sugar', 'Butter', 'Red food coloring'], instructions: ['Pre-bake tart shell until golden', 'Juice blood oranges and mix with eggs and sugar', 'Add butter and red coloring for blood effect', 'Pour filling into tart shell', 'Bake at 325°F/163°C for 35 minutes', 'Garnish with blood orange slices'] },

    // MAINS (5)
    { id: 19, title: "Mummy Meatloaf", category: 'mains', time: 75, difficulty: 'Medium', image: '🏺', rating: 4.6, description: 'A wrapped meatloaf that looks like an ancient Egyptian mummy...', ingredients: ['Ground beef', 'Breadcrumbs', 'Eggs', 'Onion', 'Bacon strips', 'Olive slices'], instructions: ['Mix ground beef, breadcrumbs, eggs, and onion', 'Form into mummy shape', 'Wrap bacon strips like bandages', 'Bake at 350°F/175°C for 60 minutes', 'Brush with ketchup glaze', 'Add olive slices as eyes'] },
    { id: 20, title: "Spidery Black Pasta", category: 'mains', time: 30, difficulty: 'Easy', image: '🕷️', rating: 4.4, description: 'Dark pasta that looks like it\'s crawling with spiders...', ingredients: ['Black squid ink pasta', 'Olive oil', 'Garlic', 'Cherry tomatoes', 'Black olives'], instructions: ['Cook squid ink pasta until al dente', 'Sauté garlic in olive oil', 'Add cherry tomatoes and cook until soft', 'Toss pasta with garlic tomato mixture', 'Garnish with halved black olives as spiders', 'Top with Parmesan'] },
    { id: 21, title: "Pumpkin Stuffed Peppers", category: 'mains', time: 65, difficulty: 'Medium', image: '🎃', rating: 4.7, description: 'Orange peppers carved like jack-o\'-lanterns...', ingredients: ['Orange bell peppers', 'Ground turkey', 'Rice', 'Pumpkin puree', 'Cheese'], instructions: ['Cut jack-o\'-lantern faces into peppers', 'Remove seeds and membranes', 'Brown ground turkey with onion', 'Mix cooked rice, turkey, and pumpkin puree', 'Stuff peppers and top with cheese', 'Bake at 375°F/190°C for 45 minutes'] },
    { id: 22, title: "Witch Hat Pizza", category: 'mains', time: 45, difficulty: 'Easy', image: '🧙‍♀️', rating: 4.3, description: 'Pizza cut into triangular witch hats...', ingredients: ['Pizza dough', 'Black olive tapenade', 'Mozzarella', 'Pepperoni', 'Yellow bell pepper'], instructions: ['Roll pizza dough into circle', 'Spread black olive tapenade as sauce', 'Add mozzarella and pepperoni', 'Bake at 425°F/220°C for 20 minutes', 'Cut into triangle witch hat shapes', 'Garnish with yellow pepper strips'] },
    { id: 23, title: "Graveyard Shepherd\'s Pie", category: 'mains', time: 90, difficulty: 'Hard', image: '⚰️', rating: 4.8, description: 'Shepherd\'s pie decorated like a spooky graveyard...', ingredients: ['Ground lamb', 'Mashed potatoes', 'Carrots', 'Peas', 'Onion', 'Rosemary sprigs'], instructions: ['Brown ground lamb with onion and carrots', 'Add peas and simmer 15 minutes', 'Spread meat mixture in baking dish', 'Pipe mashed potatoes in grave mounds', 'Bake at 400°F/200°C for 25 minutes', 'Insert rosemary sprigs as tombstones'] },

    // SNACKS (5)
    { id: 24, title: "Mummy Hot Dogs", category: 'snacks', time: 25, difficulty: 'Easy', image: '🌭', rating: 4.5, description: 'Hot dogs wrapped in pastry strips like ancient mummies...', ingredients: ['Hot dogs', 'Puff pastry strips', 'Mustard', 'Ketchup'], instructions: ['Cut puff pastry into thin strips', 'Wrap hot dogs with pastry like bandages', 'Leave gaps for mummy effect', 'Bake at 375°F/190°C for 15 minutes', 'Add mustard dots for eyes', 'Serve with ketchup blood'] },
    { id: 25, title: "Spider Deviled Eggs", category: 'snacks', time: 35, difficulty: 'Medium', image: '🥚', rating: 4.4, description: 'Classic deviled eggs transformed into creepy crawly spiders...', ingredients: ['Hard-boiled eggs', 'Mayonnaise', 'Mustard', 'Black olives', 'Paprika'], instructions: ['Hard boil eggs and cool completely', 'Cut eggs in half and remove yolks', 'Mix yolks with mayo, mustard, and paprika', 'Fill egg whites with yolk mixture', 'Cut black olives for spider bodies and legs'] },
    { id: 26, title: "Pumpkin Cheese Ball", category: 'snacks', time: 20, difficulty: 'Easy', image: '🎃', rating: 4.6, description: 'A cheese ball shaped and colored like a perfect pumpkin...', ingredients: ['Cream cheese', 'Cheddar cheese', 'Ranch dressing mix', 'Orange food coloring', 'Pretzel stick'], instructions: ['Mix cream cheese with shredded cheddar', 'Add ranch dressing mix and orange coloring', 'Form into pumpkin shape and chill 2 hours', 'Use knife to create pumpkin ridges', 'Insert pretzel stick as stem', 'Serve with crackers'] },
    { id: 27, title: "Witch Hats Dip Bowls", category: 'snacks', time: 15, difficulty: 'Easy', image: '🎭', rating: 4.2, description: 'Tortilla bowls filled with colorful dips like witch hats...', ingredients: ['Tortilla bowls', 'Black bean dip', 'Orange cheese', 'Guacamole', 'Sour cream'], instructions: ['Warm tortilla bowls according to package', 'Fill with black bean dip as base', 'Add layer of orange cheese dip', 'Top with guacamole for hat color', 'Dollop sour cream and garnish with chives', 'Arrange with tortilla chips'] },
    { id: 28, title: "Graveyard Hummus", category: 'snacks', time: 30, difficulty: 'Medium', image: '🪦', rating: 4.3, description: 'Layered dips arranged like a spooky graveyard scene...', ingredients: ['Hummus', 'Black bean dip', 'Pita chips', 'Carrots', 'Celery', 'Olives'], instructions: ['Spread hummus in rectangular dish', 'Create graveyard mounds with black bean dip', 'Break pita chips into tombstone shapes', 'Insert pita tombstones into hummus', 'Cut carrots and celery into bone shapes', 'Scatter olive stones around graveyard'] }
  ];

  const defaultCategories = [
    { id: 'all', name: 'All Recipes', emoji: '🍴' },
    { id: 'cookies', name: 'Cursed Cookies', emoji: '🍪' },
    { id: 'drinks', name: 'Dark Potions', emoji: '🍷' },
    { id: 'pies', name: 'Phantom Pies', emoji: '🥧' },
    { id: 'mains', name: 'Wicked Mains', emoji: '🍽️' },
    { id: 'snacks', name: 'Creepy Snacks', emoji: '🦇' }
  ];

  const defaultFacts = [
    { id: 1, title: "Ancient Origins", icon: "🌙", fact: "Halloween originated from the ancient Celtic festival of Samhain, marking the end of harvest season and the beginning of winter - when the veil between worlds was thinnest." },
    { id: 2, title: "Jack-o'-Lantern Legend", icon: "🎃", fact: "The tradition comes from Irish folklore about 'Stingy Jack,' doomed to wander with only a hollowed turnip with coal inside to light his way through eternity." },
    { id: 3, title: "Trick-or-Treat Evolution", icon: "🍭", fact: "Evolved from medieval 'souling,' where people received food in exchange for prayers for the dead. Children would go door-to-door offering songs and prayers." },
    { id: 4, title: "Black Cat Superstition", icon: "🐱", fact: "In medieval Europe, black cats were associated with witches and bad luck. However, in ancient Egypt, they were considered sacred and brought good fortune." },
    { id: 5, title: "Halloween Colors", icon: "🍂", fact: "Orange and black became Halloween's signature colors because orange represents autumn harvest and black symbolizes death and darkness." },
    { id: 6, title: "Candy Corn Creation", icon: "🌽", fact: "Candy corn was originally called 'Chicken Feed' in the 1880s. It was marketed to America's agricultural society with the slogan 'Something worth crowing for!'" }
  ];

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

  const toggleFavorite = async (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);

    // Optionally sync with backend
    try {
      await axios.post('/api/favorites', { recipeId: id });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100 flex items-center justify-center" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <div className="text-center">
          <Skull className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <p className="text-amber-100">Summoning spooky recipes...</p>
        </div>
      </div>
    );
  }

  // Fact Detail View
  if (currentView === 'fact' && selectedFact) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
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

          <div className="bg-gray-900/90 border border-amber-800/30 p-8 rounded">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{selectedFact.icon}</div>
              <h1 className="font-mono text-4xl text-amber-100 mb-4">{selectedFact.title}</h1>
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
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
              <h1 className="font-mono text-2xl text-amber-100 tracking-wider">
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
                className="bg-gray-900/80 border border-amber-800/30 p-6 hover:border-red-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer rounded group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-7xl group-hover:scale-110 transition-transform">{fact.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-mono text-lg text-amber-100 mb-3 leading-tight">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
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

          <div className="bg-gray-900/90 border border-amber-800/30 p-8 rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                <div className="relative">
                  {selectedMovie.poster && (
                    <img
                      src={`http://localhost:5000/${selectedMovie.poster}`}
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
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
              <h1 className="font-mono text-2xl text-amber-100 tracking-wider">
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
                className="bg-gray-900/80 border border-amber-800/30 p-4 hover:border-red-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer rounded group"
              >
                {movie.poster && (
                  <img
                    src={`http://localhost:5000/${movie.poster}`}
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100 p-4" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('recipes')}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-6 font-mono transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>

          <div className="bg-gray-900/90 border border-amber-800/30 p-8 rounded">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-9xl">{selectedRecipe.image}</div>
                <div>
                  <h1 className="font-mono text-3xl text-amber-100 mb-2">{selectedRecipe.title}</h1>
                  <p className="text-amber-200/80 italic text-lg">{selectedRecipe.description}</p>
                </div>
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
        {/* 80s VHS Scan Lines Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent bg-[length:100%_4px] animate-pulse"></div>
        </div>

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
                  textShadow: '0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.6), 4px 4px 0px rgba(0,0,0,0.8)',
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
              className="group relative bg-gradient-to-b from-red-900 to-red-950 border-4 border-red-600 p-8 hover:border-red-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
              style={{
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), inset 0 2px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">🍪</div>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                CURSED
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                RECIPES
              </h3>
              <p className="font-mono text-red-300 text-sm">28 WICKED DELIGHTS</p>
            </button>

            {/* Movies Button */}
            <button
              onClick={() => setCurrentView('movies')}
              className="group relative bg-gradient-to-b from-red-900 to-red-950 border-4 border-red-600 p-8 hover:border-red-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
              style={{
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), inset 0 2px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">📼</div>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                HORROR
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                CINEMA
              </h3>
              <p className="font-mono text-red-300 text-sm">50 CLASSIC FILMS</p>
            </button>

            {/* Mysteries Button */}
            <button
              onClick={() => setCurrentView('mysteries')}
              className="group relative bg-gradient-to-b from-red-900 to-red-950 border-4 border-red-600 p-8 hover:border-red-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
              style={{
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), inset 0 2px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">📖</div>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-2 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                ANCIENT
              </h3>
              <h3 className="font-mono text-2xl md:text-3xl text-amber-100 mb-3 tracking-wider font-bold"
                  style={{textShadow: '2px 2px 0px rgba(0,0,0,0.8)'}}>
                MYSTERIES
              </h3>
              <p className="font-mono text-red-300 text-sm">13 DARK SECRETS</p>
            </button>
          </div>

          {/* Warning Label - 80s Style */}
          <div className="border-2 border-red-600 bg-black/50 p-4 max-w-2xl mx-auto">
            <p className="font-mono text-red-500 text-xs md:text-sm tracking-wider">
              ⚠ WARNING: CONTAINS GRAPHIC RECIPES, SUPERNATURAL CONTENT & TERRIFYING TALES ⚠
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/20 to-black text-gray-100" style={{fontFamily: 'Times New Roman, serif', fontSize: '20pt'}}>
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
            className={`bg-gray-900/80 border border-amber-800/30 p-4 hover:border-red-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer rounded ${glitchEffect ? 'animate-pulse' : ''}`}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                className={`p-1 transition-colors ${favorites.has(recipe.id) ? 'text-red-500' : 'text-amber-500 hover:text-red-400'}`}
              >
                <Heart className="w-5 h-5" fill={favorites.has(recipe.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="text-7xl mb-3 mx-auto">{recipe.image}</div>
              <h3 className="font-mono text-lg text-amber-100 mb-2 leading-tight">{recipe.title}</h3>
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