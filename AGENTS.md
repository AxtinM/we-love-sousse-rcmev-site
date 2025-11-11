# Agent Guidelines for We Love Sousse

## Build/Lint/Test Commands
- `npm run dev` - Start all services via Docker Compose (requires .env.local file)
- `npm run dev:logs` - View logs from all services
- `npm run logs:web` / `npm run logs:cms` - View logs for specific service
- `npm run build` - Build and start all services via Docker
- `npm run down` - Stop all Docker services
- Web app (local): `cd apps/web && npm run dev|build|lint`
- CMS (local): `cd apps/cms && npm run dev|build`
- No test suite currently configured

## Architecture
- Monorepo structure without workspaces (dependencies installed separately in each app)
- Docker Compose setup for development (web on port 3000, CMS on port 1337)
- Next.js 15 frontend (`apps/web`) + Strapi 5 CMS (`apps/cms`)
- Each app has isolated node_modules to prevent dependency hoisting conflicts
- Environment-aware API URLs: internal Docker network (cms:1337) for SSR, public URL for client-side

## Code Style

### TypeScript
- Strict mode enabled for web (`apps/web`), relaxed for CMS (`apps/cms`)
- Use explicit types for function parameters and return values
- Interface naming: PascalCase (e.g., `Article`, `StrapiResponse<T>`)
- Prefer `interface` over `type` for object shapes

### Imports
- Use `@/` alias for web app imports (e.g., `import { api } from '@/lib/api'`)
- Group imports: external packages first, then internal modules
- React imports: `'use client'` directive at top of client components

### Naming Conventions
- Components: PascalCase (e.g., `ArticlesSection.tsx`)
- Files: kebab-case for routes/API (e.g., `contact/route.ts`), PascalCase for components
- Functions: camelCase (e.g., `getStrapiURL`, `fetchArticles`)
- Constants: UPPER_SNAKE_CASE for env vars, camelCase for others

### Error Handling
- Use try-catch blocks with console.warn/error for logging
- Return fallback values (e.g., empty arrays, null) instead of throwing
- API errors should include context: `${response.status} ${response.statusText} on ${url}`
- Validate required fields early in API routes with 400 status

### Styling
- TailwindCSS with custom theme (emerald/teal/cyan gradients)
- Responsive classes: mobile-first, use `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Animation: Framer Motion for page animations, Tailwind for simple transitions
