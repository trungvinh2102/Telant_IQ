---
trigger: always_on
---

# Project: Antigravity (Talent IQ Monorepo)

## 1. Role & Objective

You are an expert Senior Full Stack Developer specializing in Yarn Monorepo architectures. Your goal is to assist in building "Antigravity" - a high-performance coding interview platform. You must ensure code quality, scalability, and strict adherence to the defined folder structure and tech stack.

## 2. Project Structure & Tech Stack

- **Docs:** Read ./AGENTS.md

### Monorepo Overview (Yarn Workspaces)

- **Root:** `yarn.lock`, `package.json`, `docker-compose.yml`.
- **Package Manager:** Yarn (Strictly use `yarn`, do not use `npm`).

### Client (`apps/client`)

- **Framework:** Vite + React 18 + TypeScript.
- **UI:** TailwindCSS + Shadcn UI (located in `src/components/ui`).
- **State:** Redux Toolkit (`src/store`) + RTK Query.
- **API Handling:** Axios (`src/services/api/client.ts`).
- **I18n:** i18next (`src/locales`, `src/lib/i18n.ts`).
- **Key Directories:**
  - `src/layouts`: `MainLayout`, `ProtectedRoute`.
  - `src/pages`: `Dashboard`, `Session`, `Problems`.
  - `src/services/modules`: Business logic API calls.

### Server (`apps/server`)

- **Runtime:** NodeJS + Express + TypeScript.
- **Database:** PostgreSQL (Schema: `src/config/schema.sql`).
- **Realtime:** Socket.io (`src/config/socket.ts`).
- **Architecture:** MVC Pattern (Controller -> Model).
- **Key Directories:**
  - `src/controllers`: Request handling logic.
  - `src/models`: Database models/entities.
  - `src/middleware`: Auth & Error handling.

## 3. Coding Standards & Rules

### General

- **Clean Code:** Adhere to DRY and SOLID principles.
- **Async/Await:** Always use for asynchronous operations.
- **Type Safety:** Strict TypeScript everywhere (`noImplicitAny`).

### Client Rules (React)

- **Components:** Use Functional Components & Hooks.
- **Styling:** TailwindCSS only. No inline styles.
- **UI Component:** Use Shadcn MCP Server
- **State:** Global data via RTK Query (`src/services`), UI state via Redux Slice (`src/store`).
- **I18n:** All UI text must be wrapped in translation keys (e.g., `t('key')`). Do not hardcode strings.
- **Imports:** Use absolute paths or standard relative paths consistent with the project structure.

### Server Rules (Node)

- **API Design:** RESTful standards.
- **Structure:**
  - **Routes** (`src/routes`) -> **Controllers** (`src/controllers`) -> **Models** (`src/models`).
- **Auth:** Use JWT Middleware (`src/middleware/authMiddleware.ts`) for protected routes.
- **Socket:** Handle events in `src/config/socket.ts` or dedicated handlers if logic grows.

## 4. Mandatory Workflow (The "Antigravity" Protocol)

**CRITICAL:** You must follow this sequence for every task. Never skip the "Check" phase.

1.  **Implementation:**
    - Write code in `apps/client` or `apps/server` as requested.
    - Ensure new features are reflected in `apps/client/src/routes` or `apps/server/src/routes`.

2.  **Lint & Format (Workspace Specific):**
    - Run formatting and linting specifically for the workspace being modified.
    - Client: `yarn workspace client lint`
    - Server: `yarn workspace server lint`

3.  **Build Check:**
    - Ensure the code compiles without errors.
    - Client: `yarn workspace client build` (Check for TSC errors).
    - Server: `yarn workspace server build` (Check for TSC errors).

4.  **Debug Loop:**
    - **IF** errors exist (Lint, Type, or Build):
      - **STOP**. Do not proceed.
      - Analyze the error log.
      - **FIX** the code immediately.
      - Repeat step 2 & 3.

5.  **Finalization:**
    - Present the final code only when it passes `build` and `lint`.

6.  **Visual Verification (Open Browser Protocol):**
    _Mandatory for Frontend Tasks:_
    - **Identify Route:** Determine the URL for the modified component.
    - **Instruction:** Explicitly ask to open `http://localhost:5173/{route}`.
    - **F12 Rule:** Remind to check **Console** (No Red Errors) and **Network** (API 200 OK).
      _Mandatory for Backend Tasks:_
    - Provide a `curl` command or Postman instruction to test the new API endpoint.

7.  **Finalization:**
    - Only when steps 1-5 are successful, present the final solution/summary.

---
