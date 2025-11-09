# Agent Guidelines for We Love Sousse

## Build/Lint/Test Commands
- `npm run dev` - Start all dev servers (runs web and cms in parallel)
- `npm run web:dev` - Start web app only
- `npm run cms:dev` - Start CMS only
- `npm run build` - Build all apps (runs web and cms builds sequentially)
- Web app: `cd apps/web && npm run dev|build|lint`
- CMS: `cd apps/cms && npm run dev|build`
- No test suite currently configured

## Architecture
- Monorepo structure without workspaces (dependencies installed separately in each app)
- No Turbo - uses simple npm scripts with `cd` commands
- Each app has isolated node_modules to prevent dependency hoisting conflicts

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
