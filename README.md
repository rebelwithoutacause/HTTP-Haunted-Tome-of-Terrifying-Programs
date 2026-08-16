# HTTP-Haunted-Tome-of-Terrifying-Programs

## The Spirit of Halloween

A Halloween-themed web application featuring cursed recipes, classic horror movies, and ancient mysteries. Fully static, built with React and Vite, with a dark VHS-inspired atmosphere (scanlines, dripping blood, lightning) and a full language switcher.

Live site: https://rebelwithoutacause.github.io/HTTP-Haunted-Tome-of-Terrifying-Programs/

## Features

- **28 Cursed Recipes** across 5 categories (Cookies, Drinks, Pies, Mains, Snacks)
- **50 Classic Horror Movies** with posters, ratings, and descriptions, linked to IMDb
- **20 Ancient Halloween Mysteries** with in-depth historical and folkloric details
- **Full language switcher** - English, Bulgarian, Russian, and German, with all recipes, movies, and mysteries fully translated
- **Favorites system** for recipes, saved in the browser
- **Category filtering** for recipes
- **Atmosphere effects** - VHS scanlines, a REC indicator, random lightning/thunder, and animated blood drips
- **Fully static** - no backend or database; all data is bundled at build time

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** for development and production builds
- **Tailwind CSS** compiled at build time via PostCSS
- **Lucide React** for icons
- **GitHub Actions** for automated build and deployment to GitHub Pages

## Project Structure

```
HTTP-Haunted-Tome-of-Terrifying-Programs/
├── .github/workflows/
│   └── deploy.yml            # Builds and deploys to gh-pages on every push to main
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main application component and all views
│   │   ├── main.jsx          # React entry point
│   │   ├── i18n.js           # UI string translations (EN/BG/RU/DE) and language switcher logic
│   │   ├── tailwind.css      # Tailwind entry point
│   │   └── data/
│   │       ├── recipes.js, recipes.bg.js, recipes.ru.js, recipes.de.js
│   │       ├── movies.js, movies.bg.js, movies.ru.js, movies.de.js
│   │       ├── facts.js, facts.bg.js, facts.ru.js, facts.de.js
│   │       └── categories.js, categories.bg.js, categories.ru.js, categories.de.js
│   ├── public/posters/       # Movie poster images
│   ├── index.html            # HTML template, fonts, and atmosphere CSS
│   ├── vite.config.js        # Vite configuration (base path for GitHub Pages)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)

### Development

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at http://localhost:3001.

### Production Build

```bash
cd frontend
npm install
npm run build
```

Output is written to `frontend/dist`.

## Deployment

Deployment is fully automated. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the frontend and publishes `frontend/dist` to the `gh-pages` branch. GitHub Pages serves the site from that branch. No manual build or deploy steps are needed.

## Adding Content

### Adding a Recipe
Add an entry to `frontend/src/data/recipes.js` (and the matching translated entry, same `id`, in `recipes.bg.js`, `recipes.ru.js`, `recipes.de.js`), following the existing object shape (`id`, `title`, `category`, `time`, `difficulty`, `image`, `rating`, `description`, `ingredients`, `instructions`). `category` and `difficulty` values must stay in English across all languages since they're used as internal keys.

### Adding a Movie
Add an entry to `frontend/src/data/movies.js` (and the translated `description` field in the other three language files, same `id`). Place the poster image in `frontend/public/posters/` and reference it by filename in the `poster` field. Movie titles are kept in the original language across all translations.

### Adding a Mystery
Add an entry to `frontend/src/data/facts.js` (and the translated `title`, `fact`, and `details` fields in the other three language files, same `id`).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Recipe inspirations from various Halloween cooking sources
- Classic horror movie collection and descriptions
- Celtic and international Halloween history and folklore
- Movie posters from their respective film studios

---

*May your kitchen be filled with delicious darkness and your code be bug-free.*
