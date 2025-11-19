# 🎮 Pokemon Browser - Frontend Assessment

> A modern, responsive web application for browsing and exploring Pokemon data from the [PokeAPI](https://pokeapi.co/). Built as a front-end assessment project demonstrating best practices in React development, TypeScript, state management, and testing.

<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" width="200" />
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://bucolic-sunburst-553517.netlify.app/)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/astromar96/pokemon-browser)
</div>

## 📊 Overview

This project is a **responsive Pokemon browser** built with **React + TypeScript** that demonstrates clean architecture, modern React patterns, and production-ready code quality. The application includes:

- ✅ **Dual List Views**: Pagination and Load More implementations
- ✅ **Dedicated Detail Pages**: Comprehensive Pokemon information display
- ✅ **Proper State Handling**: Loading states, error boundaries, and retry mechanisms
- ✅ **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ✅ **Production Ready**: Deployed and tested with comprehensive test coverage

## 🎯 Features

### Core Requirements ✅

#### 1. Pokemon List Views

**Pagination View** (`/pokemon/paginated`)
- ✅ Grid view of Pokemon cards (name + sprite)
- ✅ Pagination controls with page numbers
- ✅ Next/Previous navigation buttons
- ✅ URL state management (shareable links)
- ✅ Loading skeletons during data fetch
- ✅ Error handling with retry option

**Load More View** (`/pokemon/infinite`)
- ✅ Grid view of Pokemon cards (name + sprite)
- ✅ Load More button implementation for manual pagination
- ✅ Avoids duplicates and state conflicts
- ✅ Loading indicators for next batch (skeleton loaders)
- ✅ Progress indicator showing current count vs total
- ✅ End-of-list indicator when all Pokemon are loaded
- ✅ Scroll to top button for better navigation

#### 2. Detail Page (`/pokemon/:id`)

- ✅ **Separate route** (not a modal or drawer)
- ✅ **Name**: Displayed prominently with Pokemon ID
- ✅ **Sprite**: High-quality Pokemon image
- ✅ **Height**: Displayed in meters
- ✅ **Weight**: Displayed in kilograms
- ✅ **Types**: Color-coded type badges
- ✅ **Bonus Features**: Base stats, abilities, base experience (exceeds requirements)

#### 3. State Handling

- ✅ **Loading States**: 
  - Skeleton loaders for list views
  - Detailed skeleton for detail page
  - Smooth transitions
- ✅ **Error Handling**:
  - Error boundaries for React component errors
  - API error messages with user-friendly text
  - Retry buttons on all error states
  - Image fallback handling

#### 4. Responsiveness

- ✅ **Mobile**: Optimized grid layouts (1 column)
- ✅ **Tablet**: Adaptive layouts (2-3 columns)
- ✅ **Desktop**: Full grid layouts (4-5 columns)
- ✅ **Breakpoints**: Tailwind CSS responsive utilities
- ✅ **Touch-friendly**: Appropriate button sizes and spacing

#### 5. Code Quality

- ✅ **Modular Components**: Separated by concern (API, views, components, utilities)
- ✅ **Type Safety**: Full TypeScript implementation with strict mode
- ✅ **Testability**: 
  - Unit tests for API functions and utilities
  - Component tests with React Testing Library
  - E2E tests with Cypress
- ✅ **Separation of Concerns**:
  - API layer (`src/api/`)
  - Component layer (`src/components/`)
  - Page layer (`src/pages/`)
  - Utility layer (`src/lib/`)

#### 6. Git Usage

- ✅ Clean, meaningful commit history
- ✅ Descriptive commit messages
- ✅ Logical feature organization

#### 7. Deployment

- ✅ **Netlify Configuration**: Ready for deployment
- ✅ **Docker Support**: Containerized deployment option
- ✅ **Build Optimization**: Production-ready builds

### Bonus Features (Optional) ✅

- ✅ **React Query (TanStack Query)**: Server state management with caching
- ✅ **Error Boundaries**: Graceful runtime error handling
- ✅ **React Suspense**: Declarative loading states
- ⚠️ **React Server Components**: Not applicable (client-side app)

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - UI library with React Compiler
- **TypeScript 5.9** - Type-safe development (mandatory requirement)
- **Vite 7** - Fast build tool and dev server

### Routing & State Management
- **React Router DOM 7** - Client-side routing
- **TanStack Query (React Query) 5** - Server state management, caching, and synchronization

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **SASS** - Additional styling capabilities
- **Tailwind Animate** - Animation utilities

### UI Components
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management

### Testing
- **Vitest 4** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Cypress 15** - End-to-end testing

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - Type-aware linting rules
- **PostCSS & Autoprefixer** - CSS processing

### Deployment
- **Docker** - Containerized deployment
- **Nginx** - Production web server
- **Netlify** - Static site hosting (configured)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 9+ (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/astromar96/pokemon-browser.git
   cd pokemon-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:run` | Run tests once (CI mode) |
| `npm run cypress:open` | Open Cypress Test Runner |
| `npm run cypress:run` | Run E2E tests headlessly |
| `npm run e2e` | Alias for `cypress:run` |

## 📁 Project Structure

```
pokemon-browser/
├── src/
│   ├── api/                    # API layer
│   │   ├── pokemon.ts         # API functions and types
│   │   ├── usePokemon.ts      # React Query hooks
│   │   └── __tests__/         # API tests
│   ├── components/             # React components
│   │   ├── pagination/        # Pagination components
│   │   ├── pokemon-detail/    # Detail page components
│   │   ├── shared/            # Reusable components
│   │   └── ui/                # Base UI components
│   ├── pages/                  # Page components
│   │   ├── Pokemon/           # List layout
│   │   ├── PokemonPaginated/  # Paginated view
│   │   ├── PokemonInfinite/  # Infinite scroll view
│   │   └── PokemonDetail/    # Detail page
│   ├── lib/                   # Utility functions
│   │   ├── pokemon-utils.ts  # Pokemon-specific utilities
│   │   └── utils.ts          # General utilities
│   ├── test/                  # Test utilities
│   ├── App.tsx                # Root component with routing
│   └── main.tsx               # Application entry point
├── cypress/                    # E2E tests
│   ├── e2e/                   # Test specs
│   ├── fixtures/              # Test data
│   └── support/               # Cypress configuration
├── public/                     # Static assets
├── dist/                       # Production build output
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── netlify.toml                # Netlify deployment config
└── vite.config.ts             # Vite configuration
```

## 🔗 API Integration

The application uses the [PokeAPI](https://pokeapi.co/) v2:

- **Base URL**: `https://pokeapi.co/api/v2`
- **Endpoints Used**:
  - `GET /pokemon?limit=10&offset=0` - List Pokemon with pagination
  - `GET /pokemon/{id}` - Get Pokemon details

All API calls are abstracted in `src/api/pokemon.ts` with proper TypeScript types and error handling.

## 🧪 Testing

### Unit & Integration Tests
Tests are written using Vitest and React Testing Library:

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once (for CI)
npm run test:run
```

### End-to-End Tests
E2E tests are written using Cypress:

```bash
# Open Cypress Test Runner (interactive)
npm run cypress:open

# Run E2E tests headlessly
npm run cypress:run
```

**Note**: Make sure the dev server is running (`npm run dev`) before running E2E tests.

### Test Coverage
- **Unit Tests**: API functions, utility functions, and React hooks
- **Component Tests**: Individual component behavior and rendering
- **E2E Tests**: User flows, navigation, and integration scenarios

## 🌐 Deployment

### Netlify
The project is configured for Netlify deployment with:
- Automatic builds from the `dist` directory
- SPA routing support (all routes redirect to `index.html`)
- Proper MIME types for JavaScript assets

**Deployment Steps**:
1. Build the project: `npm run build`
2. Deploy the `dist` directory to Netlify
3. Configure redirects (already in `netlify.toml`)

⚠️ **Note**: There is currently an issue with the CI/CD automated deployment to Netlify via GitHub Actions. Manual deployment is recommended until the issue is resolved. The CI workflow (`.github/workflows/ci.yml`) is configured but may require troubleshooting of Netlify authentication tokens or site configuration.

### Other Platforms
The built application in the `dist` directory can be deployed to any static hosting service:
- **Vercel** - Zero-config deployment
- **Cloudflare Pages** - Fast global CDN
- **GitHub Pages** - Free hosting for public repos
- **AWS S3 + CloudFront** - Enterprise hosting

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t pokemon-browser .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

3. **Access the application**
   Navigate to `http://localhost:3000`

## 🏗️ Architecture & Design Decisions

### Data Fetching Strategy
- **React Query** is used for all server state management
- Automatic caching, background refetching, and request deduplication
- Optimistic updates for better perceived performance
- Suspense integration for declarative loading states

### State Management
- **URL State**: Pagination state is stored in URL parameters for shareability
- **Server State**: Managed by React Query (caching, synchronization)
- **Local State**: Component-level state using React hooks

### Performance Optimizations
1. **Code Splitting**: Route-based code splitting with React.lazy
2. **Image Optimization**: Lazy loading with native `loading="lazy"` attribute
3. **Query Caching**: React Query caches API responses automatically
4. **Memoization**: Strategic use of React.memo and useMemo where beneficial

### Error Handling
- **Error Boundaries**: Catches React component errors gracefully
- **API Error Handling**: User-friendly error messages with retry options
- **Image Error Handling**: Fallback UI for failed image loads

### Accessibility
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly

## 📝 Implementation Notes

### Load More View Implementation

The "Load More" view uses a **button-based approach** that allows users to manually load more Pokemon. The implementation includes:

- ✅ **Load More Button**: Calls `fetchNextPage()` when clicked
- ✅ **Loading State**: Button shows "Loading..." and is disabled while fetching
- ✅ **End Detection**: Button is hidden when all Pokemon have been loaded
- ✅ **Progress Indicator**: Shows current count vs total Pokemon count
- ✅ **Scroll to Top**: Floating button appears after scrolling down 300px
- ✅ **Skeleton Loading**: Shows loading skeletons for the next batch while fetching

The button-based approach gives users explicit control over when to load more content, which can be more accessible and predictable than automatic infinite scroll.

## ✅ Submission Checklist

- ✅ Pixel-perfect layout matching reference designs
- ✅ Fully responsive across desktop, tablet, and mobile
- ✅ Pagination view implemented with controls
- ✅ Load More view implemented (button-based pagination)
- ✅ Dedicated detail page functional and styled
- ✅ Loading and error states handled properly
- ✅ Code is modular and easy to test
- ✅ Publicly deployed with a working live link
- ✅ GitHub repo is public with meaningful commit history

## 🔍 Requirements Compliance

### Required Features
- ✅ React + TypeScript (mandatory)
- ✅ Two list views (Pagination + Load More)
- ✅ Detail page with required fields (Name, Sprite, Height, Weight, Types)
- ✅ Loading states
- ✅ Error handling with retry
- ✅ Responsive design
- ✅ Modular, testable code structure
- ✅ Git with meaningful commits
- ✅ Deployment configuration

### Bonus Features
- ✅ React Query for data fetching and caching
- ✅ React Suspense for loading states
- ✅ Error Boundaries for runtime error handling
- ⚠️ React Server Components (not applicable for client-side app)

## 📚 Additional Resources

- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This is an assessment project, but if you'd like to suggest improvements:

1. Ensure all tests pass
2. Follow the existing code style
3. Add tests for new features
4. Update documentation as needed

## 📄 License

This project is created as part of a front-end assessment.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- [Pokemon Company](https://www.pokemon.com/) for the Pokemon franchise

---

## 🔗 Links

- **🔗 Live Preview URL**: [https://bucolic-sunburst-553517.netlify.app/](https://bucolic-sunburst-553517.netlify.app/)
- **🔗 GitHub Repository URL**: [https://github.com/astromar96/pokemon-browser](https://github.com/astromar96/pokemon-browser)

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
