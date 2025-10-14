# 🎃 Spooky Grimoire - Halloween Recipes App

A full-stack Halloween recipes application featuring a React frontend and Express.js backend.

## 🦇 Features

- **28 Spooky Recipes** across 5 categories (Cookies, Drinks, Pies, Mains, Snacks)
- **Interactive UI** with Halloween-themed design and glitch effects
- **Recipe Management** with favorites, filtering, and search
- **13 Ancient Halloween Mysteries** with fascinating historical facts
- **50 Classic Horror Movies** collection with ratings and descriptions
- **Responsive Design** optimized for all devices
- **RESTful API** with proper error handling and rate limiting

## 🕷️ Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **ES6 Modules**
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Rate Limiting** for API protection
- **Morgan** for request logging

## 🏗️ Project Structure

```
spooky/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   └── main.jsx         # React entry point
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies
├── backend/                  # Express.js backend API
│   ├── routes/              # API route handlers
│   │   ├── recipes.js       # Recipe endpoints
│   │   ├── categories.js    # Category endpoints
│   │   ├── facts.js         # Facts endpoints
│   │   └── favorites.js     # Favorites endpoints
│   ├── data/                # Static data files
│   │   ├── recipes.js       # Recipe data
│   │   ├── categories.js    # Category data
│   │   └── facts.js         # Halloween facts
│   ├── server.js            # Express server setup
│   └── package.json         # Backend dependencies
├── package.json             # Root package.json with scripts
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This starts both frontend (http://localhost:3001) and backend (http://localhost:5001) servers concurrently.

### Individual Commands

- **Frontend only:** `npm run dev:frontend`
- **Backend only:** `npm run dev:backend`
- **Build frontend:** `npm run build`
- **Production backend:** `npm start`

## 🔮 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes (supports query filters)
- `GET /api/recipes/:id` - Get recipe by ID
- `GET /api/recipes/category/:category` - Get recipes by category
- `GET /api/recipes/random/:count` - Get random recipes

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Facts
- `GET /api/facts` - Get all Halloween facts
- `GET /api/facts/:id` - Get fact by ID
- `GET /api/facts/random/:count` - Get random facts

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add/remove recipe from favorites
- `DELETE /api/favorites/:id` - Remove recipe from favorites

### Movies
- `GET /api/movies` - Get all horror movies (supports query filters)
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/random/:count` - Get random movies
- `GET /api/movies/top/:count` - Get top-rated movies

### Health Check
- `GET /api/health` - API health status

## 🎭 Recipe Categories

1. **🍪 Cursed Cookies** - Witch fingers, spider cookies, ghost meringues
2. **🍷 Dark Potions** - Vampire punch, witch's brew, zombie smoothies
3. **🥧 Phantom Pies** - Eyeball pumpkin pie, graveyard mud pie
4. **🍽️ Wicked Mains** - Mummy meatloaf, spider pasta, stuffed peppers
5. **🦇 Creepy Snacks** - Mummy hot dogs, spider eggs, cheese pumpkins

## 🌙 Features

### Frontend Features
- **Glitch Effects** - Random visual glitches for spooky atmosphere
- **Favorites System** - Heart-click to save favorite recipes
- **Category Filtering** - Filter recipes by type
- **Recipe Details** - Full ingredient lists and instructions
- **Responsive Design** - Works on desktop and mobile
- **Loading States** - Smooth transitions and feedback

### Backend Features
- **Security Headers** - Helmet.js for protection
- **Rate Limiting** - Prevents API abuse
- **Error Handling** - Consistent error responses
- **CORS Support** - Configured for frontend communication
- **Request Logging** - Morgan for request tracking
- **Data Validation** - Input sanitization and validation

## 🧙‍♀️ Development

### Adding New Recipes
1. Add recipe data to `backend/data/recipes.js`
2. Ensure proper category assignment
3. Include all required fields (id, title, category, time, difficulty, etc.)

### Adding New API Endpoints
1. Create route file in `backend/routes/`
2. Import and use in `backend/server.js`
3. Follow existing error handling patterns

### Styling Changes
- Tailwind classes are used throughout
- Halloween color scheme: amber, red, gray tones
- Consistent spacing and typography

## 🕸️ Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

### Environment Variables
Create `.env` files for production:

**Backend `.env`:**
```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

**Frontend `.env`:**
```
VITE_API_URL=https://api.yourdomain.com
```

## 🎃 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🦴 Credits

- Halloween emoji icons
- Spooky recipe inspirations from various Halloween cooking sources
- Celtic Halloween history and traditions

---

*May your kitchen be filled with delicious darkness and your code be bug-free! 🕷️*