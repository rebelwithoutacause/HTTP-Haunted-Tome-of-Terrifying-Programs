import express from 'express';
import { recipes } from '../data/recipes.js';

const router = express.Router();

// GET /api/recipes - Get all recipes
router.get('/', (req, res) => {
  const { category, difficulty, search } = req.query;

  let filteredRecipes = [...recipes];

  // Filter by category
  if (category && category !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
  }

  // Filter by difficulty
  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
  }

  // Search functionality
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
  }

  res.json(filteredRecipes);
});

// GET /api/recipes/:id - Get recipe by ID
router.get('/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return res.status(404).json({
      error: 'Recipe Not Found',
      message: 'This recipe has vanished into the shadow realm...'
    });
  }

  res.json(recipe);
});

// GET /api/recipes/category/:category - Get recipes by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryRecipes = recipes.filter(recipe => recipe.category === category);

  if (categoryRecipes.length === 0) {
    return res.status(404).json({
      error: 'Category Not Found',
      message: 'No spells found in this grimoire section...'
    });
  }

  res.json(categoryRecipes);
});

// GET /api/recipes/random/:count - Get random recipes
router.get('/random/:count?', (req, res) => {
  const count = parseInt(req.params.count) || 3;
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  const randomRecipes = shuffled.slice(0, Math.min(count, recipes.length));

  res.json(randomRecipes);
});

export default router;