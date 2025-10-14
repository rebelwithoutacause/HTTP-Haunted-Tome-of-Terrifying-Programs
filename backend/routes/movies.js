import express from 'express';
import { movies } from '../data/movies.js';

const router = express.Router();

// GET /api/movies - Get all horror movies
router.get('/', (req, res) => {
  const { year, rating, search } = req.query;

  let filteredMovies = [...movies];

  // Filter by year
  if (year) {
    filteredMovies = filteredMovies.filter(movie => movie.year === year);
  }

  // Filter by minimum rating
  if (rating) {
    const minRating = parseFloat(rating);
    filteredMovies = filteredMovies.filter(movie => parseFloat(movie.rating) >= minRating);
  }

  // Search functionality
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredMovies = filteredMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.description.toLowerCase().includes(searchTerm) ||
      movie.year.includes(searchTerm)
    );
  }

  res.json(filteredMovies);
});

// GET /api/movies/:id - Get movie by ID
router.get('/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).json({
      error: 'Movie Not Found',
      message: 'This film has been lost to the void...'
    });
  }

  res.json(movie);
});

// GET /api/movies/random/:count - Get random movies
router.get('/random/:count?', (req, res) => {
  const count = parseInt(req.params.count) || 3;
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  const randomMovies = shuffled.slice(0, Math.min(count, movies.length));

  res.json(randomMovies);
});

// GET /api/movies/top/:count - Get top-rated movies
router.get('/top/:count?', (req, res) => {
  const count = parseInt(req.params.count) || 5;
  const sorted = [...movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  const topMovies = sorted.slice(0, Math.min(count, movies.length));

  res.json(topMovies);
});

export default router;