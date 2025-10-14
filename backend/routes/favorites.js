import express from 'express';

const router = express.Router();

// In-memory storage for favorites (in production, use a database)
let userFavorites = new Set();

// GET /api/favorites - Get user's favorite recipes
router.get('/', (req, res) => {
  res.json(Array.from(userFavorites));
});

// POST /api/favorites - Add/remove recipe from favorites
router.post('/', (req, res) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Recipe ID is required to cast this spell...'
    });
  }

  const recipeIdNum = parseInt(recipeId);

  if (userFavorites.has(recipeIdNum)) {
    userFavorites.delete(recipeIdNum);
    res.json({
      message: 'Recipe removed from your dark collection',
      action: 'removed',
      recipeId: recipeIdNum,
      favorites: Array.from(userFavorites)
    });
  } else {
    userFavorites.add(recipeIdNum);
    res.json({
      message: 'Recipe added to your cursed favorites',
      action: 'added',
      recipeId: recipeIdNum,
      favorites: Array.from(userFavorites)
    });
  }
});

// DELETE /api/favorites/:id - Remove specific recipe from favorites
router.delete('/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);

  if (!userFavorites.has(recipeId)) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'This recipe is not in your cursed collection...'
    });
  }

  userFavorites.delete(recipeId);

  res.json({
    message: 'Recipe banished from your favorites',
    recipeId,
    favorites: Array.from(userFavorites)
  });
});

export default router;