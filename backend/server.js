import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import recipesRouter from './routes/recipes.js';
import categoriesRouter from './routes/categories.js';
import factsRouter from './routes/facts.js';
import favoritesRouter from './routes/favorites.js';
import moviesRouter from './routes/movies.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "http://localhost:5000", "http://localhost:3001"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs (increased for development)
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Compression
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : true, // Allow all origins in development
  credentials: true
}));

// Static files - serve posters from root directory
app.use('/posters', express.static('../Posters'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎃 Welcome to the Spooky Grimoire API',
    endpoints: {
      health: '/api/health',
      recipes: '/api/recipes',
      categories: '/api/categories',
      facts: '/api/facts',
      favorites: '/api/favorites',
      movies: '/api/movies'
    },
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/facts', factsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/movies', moviesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Spooky API is alive and serving dark magic!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'This endpoint has vanished into the shadow realm...'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something wicked happened on our end...'
  });
});

app.listen(PORT, () => {
  console.log(`🎃 Spooky API is haunting port ${PORT}`);
  console.log(`🧙‍♀️ Environment: ${process.env.NODE_ENV || 'development'}`);
});