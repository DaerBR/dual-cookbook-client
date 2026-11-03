# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server on port 5174
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm preview    # preview production build
```

There are no tests. The husky pre-commit hook runs a full `tsc -b` type-check, then lint-staged (ESLint `--fix` + Prettier) on staged `.ts`/`.tsx` files.

## Architecture

**Stack**: React 19, TypeScript, Vite, Redux Toolkit, React Router v8, Emotion (CSS-in-JS), React Hook Form + Zod, Axios, Sonner (toasts), FontAwesome icons, react-select.

**Backend**: `https://dual-cookbook-server.onrender.com` — all requests use `withCredentials: true` (cookie-based sessions). The axios instance is at `src/api/apiRequest.ts`. Its response interceptor is registered at module scope and redirects to `/forbidden` on 401/403 and to `/not-found` on 404; it navigates via `useApiNavigate()`, called once in `AppRoutes` (`src/App.tsx`) inside the router. The server's API source lives in `../dual-cookbook-server` — check it for real response/error shapes before typing a request.

**Auth flow**: Google OAuth opens in a popup (`window.open` from the Header's sign-in button). The server sends the authenticated user back via `postMessage`. `AuthEventListener` (rendered in `Header` when logged out) catches the `GOOGLE_AUTH_SUCCESS` message and dispatches `setUserData` to the Redux store. `ProtectedRoute` reads auth state and redirects unauthenticated users away from protected pages.

**Redux store** (`src/store/`): three slices — `auth`, `categories`, `recipes`. Use `useAppDispatch` / `useAppSelector` from `src/store/hooks/hooks.ts` (not the raw react-redux hooks).

**Thunks and errors**:
- Create thunks with `createAppAsyncThunk` (`src/store/createAppAsyncThunk.ts`, `createAsyncThunk.withTypes<AppThunkConfig>()` — `state`, `dispatch`, `rejectValue: ApiError` preset), never raw `createAsyncThunk`. Declare only `<Returned, Arg>`; use `void` for no argument / no payload (a `void` thunk ends its `try` with `return undefined;` for `consistent-return`).
- Always type the response: `apiRequest.request<T>(…)` (otherwise `response.data` is `any` and `Returned` goes unchecked). Match the server's real shape — e.g. `POST`/`PUT /api/recipes` reply unpopulated, typed `SavedRecipeModel`, not `RecipeDetailModel`.
- Every `catch` is `return rejectWithValue(toApiError(error));` — `ApiError` / `toApiError` live in `src/api/apiError.ts` (server errors are `{ message, ...extras }`).
- In components, dispatch via `useThunk(thunk, { successMessage?, successRedirectRoute?, useGlobalLoader? })` (`src/store/hooks/useThunk.ts`). It shows the error toast itself, infers arg/result types from the thunk, and resolves to `ThunkResult<TReturned>` — narrow with `if (result.ok)` to use `result.data`; no `try/catch` / `.unwrap()` at call sites.

**Styling**: Emotion `css` prop (configured via `jsxImportSource: '@emotion/react'` in vite.config.ts). The global design system lives in `src/styles/theme.ts` (colors, typography, breakpoints, spacing, shadows). Access it in components via `useAppTheme()` from `src/styles/hooks.ts`, not via `useTheme()` directly. Wrap standalone style objects in `defineStyles()` (`src/styles/defineStyles.ts`) instead of `as const` / `: CSSObject` — see README for the patterns.

**Component structure**:
- `src/components/atoms/` — primitive UI components (Button, Typography, TextInput, Select, Modal, Pagination, etc.)
- `src/components/` — composed feature components (Header, RecipeCard, Form, ProtectedRoute, etc.)
- `src/pages/` — one directory per route; each page may have a `modals/` subdirectory for page-specific modals

Each component lives in its own directory following the pattern: `ComponentName.tsx`, `index.ts` (re-export), and optionally `styles.ts`, `hooks.ts`, `types.ts`, `constants.ts`.

## ESLint / code conventions

- **Imports**: external packages first, then internal paths (`import/first: absolute-first`). A blank line is required after imports.
- **Type imports**: `verbatimModuleSyntax` is on — type-only imports go in a separate `import type { … }` statement, never inline `import { type … }` (enforced/auto-fixed by `consistent-type-imports` + `import/consistent-type-specifier-style`).
- **TypeScript naming**: type parameters prefixed with `T` (e.g. `TData`); all type/interface names PascalCase; interface members ordered alphabetically.
- **No `console.log`** — only `console.warn/error/info/debug` are allowed.
- **No `++`/`--`** operators (`no-plusplus`).
- **No underscore-prefixed names** except the `_` ignore pattern for unused variables/args.
- **Arrow body style**: omit braces when the body is a single expression.
- **`no-param-reassign`** is enforced — don't mutate function parameters (except inside Redux Toolkit reducers using Immer).
- Prettier config: single quotes, trailing commas, 120-char print width, LF line endings.

## UI language

The app UI is in Ukrainian.