# Dual Cookbook Client

A React + TypeScript SPA for a small family cookbook app: browse, search, and manage recipes organized into categories, with Google sign-in gating create/edit actions. The UI is in Ukrainian.

Pairs with the [`dual-cookbook-server`](https://github.com/DaerBR/dual-cookbook-server) Express/MongoDB API.

## Stack

- **Framework:** React 19 + TypeScript, built with Vite
- **Routing:** React Router v8
- **State:** Redux Toolkit (`auth`, `categories`, `recipes` slices)
- **Styling:** Emotion (`css` prop) with a central design system (`src/styles/theme.ts`)
- **Forms:** React Hook Form + Zod resolvers
- **HTTP:** Axios, cookie-based sessions (`withCredentials: true`)
- **UI extras:** Sonner (toasts), FontAwesome icons, react-select, `@dnd-kit/react` (drag-and-drop ingredient reordering)
- **Backend:** Node JS (Express), `https://dual-cookbook-server.onrender.com` — see that repo for the API

## Getting started

```bash
pnpm install
pnpm dev        # start dev server on http://localhost:5174
```

By default the app talks to the deployed backend. To point at a different API (e.g. a local server), add a `.env.local`:

```
VITE_BASE_API_URL=http://localhost:PORT
```

## Scripts

```bash
pnpm dev        # start dev server on port 5174
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm preview    # preview production build
pnpm updates    # interactive dependency update check (npm-check-updates)
```

There are no automated tests. A pre-commit hook (husky + lint-staged) runs ESLint (`--fix`) and Prettier on staged `.ts`/`.tsx` files.

## Features

- **Recipes** — browse (paginated table/list), search, view details, create/edit/delete (protected)
- **Categories** — browse all categories, view a single category's recipes, create/edit/delete (protected)
- **Auth** — Google OAuth via popup window; the server posts the authenticated user back via `postMessage`, which `AuthEventListener` catches and dispatches into the Redux store
- **Drag-and-drop** — reorder ingredient fields when creating/editing a recipe

## Architecture

**API layer** (`src/api/apiRequest.ts`): a shared Axios instance with `withCredentials: true` for cookie-based sessions. The response interceptor that redirects to `/` on `401`/`403` and to `/not-found` on `404` is registered at module scope (not inside a component) so it's guaranteed to be attached before any page's on-mount fetch can fire. `useApiNavigate` (called once, in `App.tsx`) just keeps the interceptor's `navigate` reference pointed at the live router instance.

**Auth flow**: `AuthEventListener` (rendered in `Header` when logged out) opens the Google OAuth flow in a popup and listens for the `GOOGLE_AUTH_SUCCESS` message, dispatching `setUserData` to the store. `ProtectedRoute` reads auth state and redirects unauthenticated users away from protected routes (create/edit recipe, create/edit category).

**Redux store** (`src/store/`): three slices — `auth`, `categories`, `recipes` — plus async thunks per domain (`src/store/thunks/`). Use `useAppDispatch` / `useAppSelector` from `src/store/hooks/hooks.ts` (not the raw `react-redux` hooks). `useThunk` (`src/store/hooks/useThunk.ts`) wraps thunk dispatching with local loading/error state.

**Styling**: Emotion's `css` prop (via `jsxImportSource: '@emotion/react'` in `vite.config.ts`). The design system (colors, typography, breakpoints, spacing, shadows) lives in `src/styles/theme.ts`; access it via `useAppTheme()` from `src/styles/hooks.ts`, not `useTheme()` directly.

**Component structure**:
- `src/components/atoms/` — primitive UI components (Button, Typography, TextInput, Select, Modal, Pagination, etc.)
- `src/components/` — composed feature components (Header, RecipeCard, Form, ProtectedRoute, etc.)
- `src/pages/` — one directory per route; each page may have a `modals/` subdirectory for page-specific modals

Each component lives in its own directory: `ComponentName.tsx`, `index.ts` (re-export), and optionally `styles.ts`, `hooks.ts`, `types.ts`, `constants.ts`.

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Homepage | |
| `/categories` | AllCategories | |
| `/category/:id` | SingleCategory | |
| `/search` | Search | |
| `/recipe/:id` | SingleRecipe | |
| `/create-new-recipe` | CreateRecipe | ✅ |
| `/edit-recipe/:id` | EditRecipe | ✅ |
| `/create-new-category` | CreateCategory | ✅ |
| `/edit-category/:id` | EditCategory | ✅ |
| `*` | ErrorPage (404) | |

## Backend API (dual-cookbook-server)

Express 5 + MongoDB (Mongoose), Google OAuth via Passport with cookie sessions. Interactive docs are served by the API itself:

- Swagger UI: `GET /api/docs`
- OpenAPI JSON: `GET /api/docs.json`

Endpoints used by this client:

- `GET /auth/google`, `GET /auth/google/callback` — OAuth handshake, completes via `postMessage` to the opener window
- `GET /api/current_user` — current session user
- `GET /api/logout` — end session
- `GET/POST /api/recipes`, `GET/PUT/DELETE /api/recipes/:id` — recipes CRUD (write ops require a session)
- `GET /api/categories` (paginated), `GET /api/categories/all`, `POST /api/categories`, `PUT/DELETE /api/categories/:id` — categories CRUD (write ops require a session)
- `GET /health` — health check

## ESLint / code conventions

- **Imports**: external packages first, then internal paths (`import/first: absolute-first`); a blank line is required after imports.
- **TypeScript naming**: type parameters prefixed with `T` (e.g. `TData`); all type/interface names PascalCase; interface members ordered alphabetically.
- **No `console.log`** — only `console.warn/error/info/debug` are allowed.
- **No `++`/`--`** operators (`no-plusplus`).
- **No underscore-prefixed names** except the `_` ignore pattern for unused variables/args.
- **Arrow body style**: omit braces when the body is a single expression.
- **`no-param-reassign`** is enforced — don't mutate function parameters (except inside Redux Toolkit reducers using Immer).
- Prettier config: single quotes, trailing commas, 120-char print width, LF line endings.

Created by Gennadii Guliakov (https://github.com/DaerBR), 2026.
