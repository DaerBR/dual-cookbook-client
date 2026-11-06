import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { toApiError } from '../api/apiError.ts';

// Equivalent of the error branch of `useThunk`: one place shows the toast for every failed query/mutation.
// QueryCache.onError fires once per failed query (not once per component using it), after retries are exhausted.
const showErrorToast = (error: unknown) => toast.error(toApiError(error).message);

// 4xx won't succeed on retry (and 401/403/404 are already redirected by the axios interceptor);
// network errors and 5xx (e.g. Render cold start) get up to 2 retries.
const shouldRetry = (failureCount: number, error: unknown) => {
	const status = isAxiosError(error) ? error.response?.status : undefined;

	if (status !== undefined && status < 500) {
		return false;
	}

	return failureCount < 2;
};

export const queryClient = new QueryClient({
	queryCache: new QueryCache({ onError: showErrorToast }),
	mutationCache: new MutationCache({ onError: showErrorToast }),
	defaultOptions: {
		queries: {
			// Data is "fresh" for 5 min: mounting another component with the same key reuses the cache without a request.
			// After that it's "stale": still shown instantly, but refetched in the background on mount / window focus.
			staleTime: 5 * 60 * 1000,
			retry: shouldRetry,
		},
	},
});
