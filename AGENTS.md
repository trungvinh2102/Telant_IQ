# Talent IQ - Agent Coding Guidelines

This document provides guidelines for agentic coding assistants working on the Talent IQ monorepo.

---

## Project Structure

```
apps/
├── client/    # Vite + React + RTK Query + TailwindCSS + Shadcn
└── server/    # NodeJS + Express + PostgreSQL
packages/
└── shared/    # Shared packages (currently empty)
```

---

## Essential Commands

### Development
```bash
# Start both client and server
yarn dev

# Start individually
yarn client          # Client: http://localhost:5173
yarn server          # Server: http://localhost:3001

# Start database (Docker)
yarn db:up
yarn db:down
yarn db:logs
```

### Build & Quality
```bash
# Build both apps
yarn build

# Linting
yarn lint                    # All workspaces
yarn workspace client lint   # Client only
yarn workspace server lint   # Server only

# Formatting
yarn format                  # All workspaces
yarn workspace client format # Client only
yarn workspace server format # Server only

# Docker
docker-compose up            # Start full stack
docker-compose down          # Stop all services
```

### Testing
**Note**: No test framework is currently configured. When adding tests, use Vitest for client and Jest for server. Add test scripts to package.json.

---

## Code Style Guidelines

### Imports & Organization
- **Client (ES Modules)**: Use `import/export` syntax, type: "module" in package.json
- **Server (CommonJS)**: Use `import/export` with TypeScript compilation to CommonJS
- Order external libs first, then internal modules
- Use path aliases in client: `@/`, `@components/`, `@pages/`, `@store/`, `@utils/`, `@types/`, `@hooks/`
- Absolute imports over relative where possible (client)

### Formatting (Prettier)
- Semi-colons: required
- Quotes: double quotes (`"`)
- Trailing commas: ES5 style
- Tab width: 2 spaces
- Print width: 80 characters
- Arrow function parentheses: avoid unless needed (`x => x` not `(x) => x`)
- Line endings: LF (not CRLF)

### TypeScript
- **Strict mode**: enabled in both workspaces
- **Client**: ES2020 target, moduleResolution: "bundler"
- **Server**: ES2020 target, moduleResolution: "node"
- Use explicit types over `any` (use `unknown` if type is unknown)
- Use `export type` for type-only exports
- Interface for object shapes, type for unions/primitives

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`, `useAuth.ts`)
- **Functions/Variables**: camelCase (`getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserData`, `ApiResponse<T>`)
- **Files**: kebab-case for utilities, PascalCase for components

### Error Handling
- **Server**: Use Express error middleware, wrap async route handlers in try/catch
- **Client**: Use RTK Query error states, implement error boundaries
- Log errors with context: `console.error('[server] ❌ Error:', error.message)`
- Provide helpful error messages with emojis for readability
- Exit on fatal server errors (`process.exit(1)`)

### React Patterns
- Use functional components with hooks
- Default export for components: `export default function Component() {}`
- Named exports for utilities/types: `export const helper = () => {}`
- Use RTK Query for API calls, avoid fetch/axios directly in components
- Redux hooks: `useAppDispatch`, `useAppSelector` (pre-typed from store/hooks.ts)
- Class names with Tailwind: `className="flex items-center justify-center"`

### Express Patterns
- Use TypeScript types for req/res: `(req: Request, res: Response) => {}`
- Middleware order: helmet → cors → compression → express.json → routes → errorHandler
- Database queries via pool from `src/config/database.ts`
- Route structure: separate route files, export Express Router
- Async route handlers: wrap in try/catch or use error handling middleware

### Logging Conventions
- **Server logs**: Prefix with `[server]` emoji + message
  - `[server] 🚀 Starting Talent IQ Server...`
  - `[server] ✅ Database connected successfully`
  - `[server] ❌ Error: description`
  - `[server] GET /api/users 200 - 45ms`
- **Client logs**: Prefix with `[client]` emoji + message (Vite plugin handles this)
- Avoid console.log in production code; use proper logging libraries if needed

### ESLint Rules
- **Client**: `@typescript-eslint/recommended`, `react-hooks/recommended`, `react-refresh` plugin
- **Server**: `@typescript-eslint/recommended`, `no-console` disabled (for logging)
- Treat warnings as errors in CI/CD: `--max-warnings 0`
- Fix lint issues before committing

### Shadcn UI Components
- Add components: `cd apps/client && npx shadcn-ui@latest add <component>`
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Components are in `apps/client/src/components/ui/`
- Follow existing patterns for usage

### Environment Variables
- **Client**: Prefixed with `VITE_`, accessible via `import.meta.env.VITE_*`
- **Server**: Standard process.env, defined in `apps/server/.env`
- Never commit `.env` files (add to `.gitignore`)
- Use `.env.example` as template

### Docker Guidelines
- Use `docker-compose.yml` for multi-service orchestration
- Database runs in separate container with health checks
- Server depends on postgres with healthcheck condition
- Build context is root directory, Dockerfiles in respective app folders
- Never commit `node_modules` or build artifacts to images

---

## Before Committing
1. Run `yarn lint` and fix all errors/warnings
2. Run `yarn format` to ensure consistent formatting
3. Run `yarn build` to verify TypeScript compilation
4. Test changes locally with `yarn dev`
5. Add descriptive commit messages following conventional commits (optional but recommended)
