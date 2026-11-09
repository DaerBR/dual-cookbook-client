import { queryOptions, useQuery } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';

import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from './api.ts';
import type { CategoryModel, CategoryOption } from './types.ts';
import { useAppMutation } from '../useAppMutation.ts';

// Query keys are the cache identity. Hierarchical keys let one call invalidate everything under ['categories'].
export const categoryKeys = {
	all: ['categories'] as const,
	list: () => [...categoryKeys.all, 'list'] as const,
};

// Shared definition, reusable in hooks and imperatively (queryClient.query / getQueryData).
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

// `invalidateQueries` replaces `dispatch(fetchAllCategories())` inside each old thunk: every mounted query under
// ['categories'] refetches, unmounted ones are just marked stale and refetch on next use.
const invalidateCategories = (queryClient: QueryClient) =>
	queryClient.invalidateQueries({ queryKey: categoryKeys.all });

export const useCreateCategory = () => useAppMutation({ mutationFn: createCategory, onSuccess: invalidateCategories });

export const useUpdateCategory = () => useAppMutation({ mutationFn: updateCategory, onSuccess: invalidateCategories });

export const useDeleteCategory = () => useAppMutation({ mutationFn: deleteCategory, onSuccess: invalidateCategories });
