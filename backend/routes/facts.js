import express from 'express';
import { facts } from '../data/facts.js';

const router = express.Router();

// GET /api/facts - Get all Halloween facts
router.get('/', (req, res) => {
  res.json(facts);
});

// GET /api/facts/:id - Get fact by ID
router.get('/:id', (req, res) => {
  const factId = parseInt(req.params.id);
  const fact = facts.find(f => f.id === factId);

  if (!fact) {
    return res.status(404).json({
      error: 'Fact Not Found',
      message: 'This ancient knowledge has been lost to time...'
    });
  }

  res.json(fact);
});

// GET /api/facts/random/:count - Get random facts
router.get('/random/:count?', (req, res) => {
  const count = parseInt(req.params.count) || 1;
  const shuffled = [...facts].sort(() => 0.5 - Math.random());
  const randomFacts = shuffled.slice(0, Math.min(count, facts.length));

  res.json(randomFacts);
});

export default router;