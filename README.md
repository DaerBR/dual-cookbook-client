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

**Redux store** (`src/store/`): three slices — `auth`, `categories`, `recipes` — plus async thunks per domain (`src/store/thunks/`). Use `useAppDispatch` / `useAppSelector` from `src/store/hooks/hooks.ts` (not the raw `react-redux` hooks).

**Async thunks and API errors**:
- **`createAppAsyncThunk`** (`src/store/createAppAsyncThunk.ts`) — `createAsyncThunk.withTypes<AppThunkConfig>()`, with `state`, `dispatch` and `rejectValue: ApiError` set once. Use it instead of `createAsyncThunk`; thunks only declare `<Returned, Arg>` (use `void` for "no argument" / "no payload").
- **Typed responses** — pass the response type to Axios (`apiRequest.request<CategoryModel>(…)`); without it `response.data` is `any` and the thunk's `Returned` type is never checked. `POST`/`PUT /api/recipes` reply unpopulated, so they're typed `SavedRecipeModel`, not `RecipeDetailModel`.
- **`ApiError` / `toApiError`** (`src/api/apiError.ts`) — the server sends every error as `{ message, ...extras }`. `toApiError(error: unknown)` normalises anything (server error body, network error, `Error`, RTK `SerializedError`) to `{ message }`. Every thunk's `catch` is `return rejectWithValue(toApiError(error));`.
- **`useThunk`** (`src/store/hooks/useThunk.ts`) — dispatches a thunk, shows an error toast with the `ApiError` message, and optionally a success toast, a redirect and the global loader (`successMessage`, `successRedirectRoute`, `useGlobalLoader`). Argument and result types are inferred from the thunk, and a required argument can't be omitted. The dispatcher resolves to a `ThunkResult` — a discriminated union you narrow with `ok`, so there's no `try/catch` or `.unwrap()` at call sites:

```ts
const [dispatchImportRecipeDraft] = useThunk(importRecipeDraft, { successMessage: 'Імпортовано!' });

const result = await dispatchImportRecipeDraft({ url });
if (result.ok) {
	fillForm(result.data); // ImportedRecipeDraft
} // on failure the hook has already shown the error toast; result.error is the ApiError
```

**Styling**: Emotion's `css` prop (via `jsxImportSource: '@emotion/react'` in `vite.config.ts`). The design system (colors, typography, breakpoints, spacing, shadows) lives in `src/styles/theme.ts`; access it via `useAppTheme()` from `src/styles/hooks.ts`, not `useTheme()` directly.

**`defineStyles`** (`src/styles/defineStyles.ts`): an identity helper that standalone style objects are wrapped in. A bare object literal gets its string values widened to `string`, so TypeScript rejects it for enum-like CSS properties (`position: 'absolute'`, `boxSizing: 'border-box'`, `flexDirection: 'column'`, …) when it reaches the `css` prop. `defineStyles` checks the object against Emotion's `CSSObject` and keeps the narrow literal types — no `as const` or `: CSSObject` annotation needed. No runtime cost. It's used in four shapes across the codebase:

```ts
// 1. Static styles in a component's styles.ts (Modal, Pagination, PageTitle, Button, AllCategories, ...)
export const modalWrapperStyles = defineStyles({ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' });

// 2. Theme-dependent styles in a use*Styles hook (RecipeCard/styles.ts, TextInput/hooks.ts, Checkbox/hooks.ts, Header/hooks.ts)
export const useRecipeCardStyles = () => {
	const theme = useAppTheme();
	return {
		wrapperStyles: defineStyles({ position: 'relative', boxShadow: theme.boxShadows.xs }),
	};
};

// 3. Inline in a component when styles depend on props/state (Button, Select, CircularProgress, PageWrapper)
const getOptionStyles = (isHighlighted: boolean) =>
	defineStyles({ cursor: 'pointer', backgroundColor: isHighlighted ? theme.colors.neutral.surfaceSubtle : '#fff' });

// 4. Merging several style objects (Select's mergedTriggerStyles)
const mergedTriggerStyles = defineStyles({ ...selectInputStyles, ...(fieldErrors ? errorStyles : {}), ...customStyles });
```

Use it for new style objects instead of annotating them as `CSSObject`/`CSSProperties` — an annotation widens the type and loses the specific keys, while `defineStyles` keeps them. (A few older plain objects, e.g. in `Header/styles.ts`, predate it and work only because they contain no enum-like properties.)

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
- **Type imports**: `verbatimModuleSyntax` is on, so type-only imports must be marked — as a separate `import type { … }` statement, never inline `import { type … }` (enforced and auto-fixed by `consistent-type-imports` + `import/consistent-type-specifier-style`).
- **TypeScript naming**: type parameters prefixed with `T` (e.g. `TData`); all type/interface names PascalCase; interface members ordered alphabetically.
- **No `console.log`** — only `console.warn/error/info/debug` are allowed.
- **No `++`/`--`** operators (`no-plusplus`).
- **No underscore-prefixed names** except the `_` ignore pattern for unused variables/args.
- **Arrow body style**: omit braces when the body is a single expression.
- **`no-param-reassign`** is enforced — don't mutate function parameters (except inside Redux Toolkit reducers using Immer).
- Prettier config: single quotes, trailing commas, 120-char print width, LF line endings.

Created by Gennadii Guliakov (https://github.com/DaerBR), 2026.
