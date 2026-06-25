# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server on port 5174
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm preview    # preview production build
```

There are no tests. Pre-commit hooks run ESLint + Prettier automatically via husky/lint-staged on staged `.ts`/`.tsx` files.

## Architecture

**Stack**: React 19, TypeScript, Vite, Redux Toolkit, React Router v7, Emotion (CSS-in-JS), React Hook Form + Zod, Axios, Sonner (toasts), FontAwesome icons, react-select.

**Backend**: `https://dual-cookbook-server.onrender.com` — all requests use `withCredentials: true` (cookie-based sessions). The axios instance is at `src/api/apiRequest.ts`. API interceptors (`useApiInterceptors`) redirect to `/` on 401/403 and to `/not-found` on 404 — these are wired inside `ProtectedRoute`, not globally.

**Auth flow**: Google OAuth opens in a popup (`window.open`). The server sends the authenticated user back via `postMessage`. `AuthEventListener` (rendered in `Header` when logged out) catches the `GOOGLE_AUTH_SUCCESS` message and dispatches `setUserData` to the Redux store. `ProtectedRoute` reads auth state and redirects unauthenticated users away from protected pages.

**Redux store** (`src/store/`): three slices — `auth`, `categories`, `recipes`. Use `useAppDispatch` / `useAppSelector` from `src/store/hooks/hooks.ts` (not the raw react-redux hooks). The `useThunk` hook at `src/store/hooks/useThunk.ts` wraps thunk dispatching with local loading/error state.

**Styling**: Emotion `css` prop (configured via `jsxImportSource: '@emotion/react'` in vite.config.ts). The global design system lives in `src/styles/theme.ts` (colors, typography, breakpoints, spacing, shadows). Access it in components via `useAppTheme()` from `src/styles/hooks.ts`, not via `useTheme()` directly.

**Component structure**:
- `src/components/atoms/` — primitive UI components (Button, Typography, TextInput, Select, Modal, Pagination, etc.)
- `src/components/` — composed feature components (Header, RecipeCard, Form, ProtectedRoute, etc.)
- `src/pages/` — one directory per route; each page may have a `modals/` subdirectory for page-specific modals

Each component lives in its own directory following the pattern: `ComponentName.tsx`, `index.ts` (re-export), and optionally `styles.ts`, `hooks.ts`, `types.ts`, `constants.ts`.

## ESLint / code conventions

- **Imports**: external packages first, then internal paths (`import/first: absolute-first`). A blank line is required after imports.
- **TypeScript naming**: type parameters prefixed with `T` (e.g. `TData`); all type/interface names PascalCase; interface members ordered alphabetically.
- **No `console.log`** — only `console.warn/error/info/debug` are allowed.
- **No `++`/`--`** operators (`no-plusplus`).
- **No underscore-prefixed names** except the `_` ignore pattern for unused variables/args.
- **Arrow body style**: omit braces when the body is a single expression.
- **`no-param-reassign`** is enforced — don't mutate function parameters (except inside Redux Toolkit reducers using Immer).
- Prettier config: single quotes, trailing commas, 120-char print width, LF line endings.

## UI language

The app UI is in Ukrainian.