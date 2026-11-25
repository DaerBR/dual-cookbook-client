// Error pages the API response interceptor redirects to on 401/403/404.
// Shared so the interceptor, the route config and the unsaved-form blocker can't drift apart.
export const FORBIDDEN_ROUTE = '/forbidden';
export const NOT_FOUND_ROUTE = '/not-found';
