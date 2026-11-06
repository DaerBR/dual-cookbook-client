import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { GlobalLoadingIndicatorContext } from '../contexts/GlobalLoadingIndicator.tsx';

interface UseAppMutationOptions<TData, TVariables> {
	mutationFn: (variables: TVariables) => Promise<TData>;
	// Cache updates after success (usually invalidateQueries). Returning the promise keeps the mutation `isPending`
	// (and the global loader visible) until it settles, so a redirect done in the call-site `onSuccess`
	// lands on a page that already has fresh data. Hook-level callbacks always run before call-site ones.
	onSuccess?: (queryClient: QueryClient, data: TData, variables: TVariables) => Promise<unknown> | undefined;
	useGlobalLoader?: boolean;
}

// The TanStack counterpart of `useThunk`: global loader + post-success cache work. Error toasts are global
// (MutationCache in queryClient.ts); success toasts / redirects are per call site via `mutate(vars, { onSuccess })`.
export const useAppMutation = <TData, TVariables>({
	mutationFn,
	onSuccess,
	useGlobalLoader = true,
}: UseAppMutationOptions<TData, TVariables>) => {
	const queryClient = useQueryClient();
	const { handleShowLoadingIndicator } = useContext(GlobalLoadingIndicatorContext);

	return useMutation({
		mutationFn,
		onMutate: () => {
			if (useGlobalLoader) {
				handleShowLoadingIndicator(true);
			}
		},
		onSuccess: (data, variables) => onSuccess?.(queryClient, data, variables),
		onSettled: () => {
			if (useGlobalLoader) {
				handleShowLoadingIndicator(false);
			}
		},
	});
};
