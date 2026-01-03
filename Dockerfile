# Root Dockerfile for building the monorepo
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build all workspaces
RUN yarn build

# Production image could be split into separate stages for client and server
