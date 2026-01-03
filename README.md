# Talent IQ Monorepo

Monorepo project using Yarn Workspaces with Client and Server applications.

## Project Structure

```
talent_iq_application/
├── apps/
│   ├── client/          # Vite + React + RTK Query + TailwindCSS + Shadcn
│   └── server/          # NodeJS + Express + PostgreSQL
├── packages/            # Shared packages
├── docker-compose.yml   # Docker configuration
└── package.json         # Root package.json
```

## Tech Stack

### Client
- Vite
- React 18
- React Router DOM
- Redux Toolkit + RTK Query
- TailwindCSS
- Shadcn UI
- Axios

### Server
- NodeJS
- Express
- PostgreSQL

## Getting Started

### Prerequisites
- Node.js 20+
- Yarn
- Docker & Docker Compose (optional)

### Installation

```bash
# Install dependencies
yarn install
```

### Database Setup

#### Option 1: Using Docker (Recommended)

```bash
# Start PostgreSQL database in Docker
yarn db:up

# Check database logs
yarn db:logs

# Stop database
yarn db:down
```

#### Option 2: Local PostgreSQL

If you have PostgreSQL installed locally, ensure it's running and update `apps/server/.env` with your credentials.

### Development

```bash
# Make sure database is running first (Option 1: yarn db:up)

# Run both client and server
yarn dev

# Or run individually
yarn client    # Client runs on http://localhost:5173
yarn server    # Server runs on http://localhost:3001
```

### Docker

```bash
# Start all services (including database)
docker-compose up

# Build and start
docker-compose up --build

# Stop services
docker-compose down
```

## Available Scripts

- `yarn dev` - Start both client and server in development mode
- `yarn client` - Start client only
- `yarn server` - Start server only
- `yarn build` - Build both applications
- `yarn lint` - Run linting for all packages
- `yarn format` - Format code for all packages
- `yarn db:up` - Start PostgreSQL in Docker
- `yarn db:down` - Stop PostgreSQL
- `yarn db:logs` - View PostgreSQL logs
- `docker:up` - Start Docker containers
- `docker:down` - Stop Docker containers
- `docker:build` - Rebuild Docker containers

## Environment Variables

### Client (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

### Server (.env)
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/talent_iq
CORS_ORIGIN=http://localhost:5173
```
