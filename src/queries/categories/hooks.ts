import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from './api.ts';
import type { CategoryModel, CategoryOption } from './types.ts';
import { GlobalLoadingIndicatorContext } from '../../contexts/GlobalLoadingIndicator.tsx';

// Query keys are the cache identity. Hierarchical keys let one call invalidate everything under ['categories'].
export const categoryKeys = {
	all: ['categories'] as const,
	list: () => [...categoryKeys.all, 'list'] as const,
};

// Shared definition, reusable in hooks and imperatively (queryClient.fetchQuery / prefetchQuery / getQueryData).
export const allCategoriesQueryOptions = queryOptions({
	queryKey: categoryKeys.list(),
	queryFn: fetchAllCategories,
});

// Replaces `state.categories.categories` + `isLoading` + `areCategoriesFetched` + the "fetch if not fetched" effect.
// Any number of components can call it: they share one cache entry and at most one in-flight request.
export const useAllCategories = () => useQuery(allCategoriesQueryOptions);

// `select` derives data from the same cached list — no extra request. The component re-renders only when
// the selected result changes (structural sharing), not on every change of the whole list.
const toCategoryOptions = (categories: CategoryModel[]): CategoryOption[] =>
	categories.map((category) => ({ value: category.id, label: category.name }));

export const useCategoryOptions = () => useQuery({ ...allCategoriesQueryOptions, select: toCategoryOptions });

export const useCategory = (categoryId: string | undefined) =>
	useQuery({
		...allCategoriesQueryOptions,
		select: (categories) => categories.find((category) => category.id === categoryId),
	});

// Shared mutation setup: global loader (= `useThunk`'s `useGlobalLoader: true`) and cache invalidation
// (= `dispatch(fetchAllCategories())` inside each thunk). Error toasts come from the MutationCache in queryClient.ts.
const useCategoryMutation = <TData, TVariables>(mutationFn: (variables: TVariables) => Promise<TData>) => {
	const queryClient = useQueryClient();
	const { handleShowLoadingIndicator } = useContext(GlobalLoadingIndicatorContext);

	return useMutation({
		mutationFn,
		onMutate: () => handleShowLoadingIndicator(true),
		// Returning the promise keeps the mutation `isPending` until the list is refetched, so a redirect done
		// in the call-site `onSuccess` lands on a page that already has fresh data.
		onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
		onSettled: () => handleShowLoadingIndicator(false),
	});
};

export const useCreateCategory = () => useCategoryMutation(createCategory);

export const useUpdateCategory = () => useCategoryMutation(updateCategory);

export const useDeleteCategory = () => useCategoryMutation(deleteCategory);
