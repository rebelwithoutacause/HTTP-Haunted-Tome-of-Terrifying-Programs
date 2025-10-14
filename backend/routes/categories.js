import express from 'express';
import { categories } from '../data/categories.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// GET /api/categories/:id - Get category by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.find(c => c.id === id);

  if (!category) {
    return res.status(404).json({
      error: 'Category Not Found',
      message: 'This category has been cursed away...'
    });
  }

  res.json(category);
});

export default router;