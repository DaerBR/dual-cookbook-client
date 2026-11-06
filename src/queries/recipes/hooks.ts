import { keepPreviousData, queryOptions, skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
	createRecipe,
	deleteRecipe,
	fetchRecipeDetails,
	fetchRecipes,
	importRecipeDraft,
	updateRecipe,
} from './api.ts';
import type { FetchRecipesParams } from './types.ts';
import { useAppMutation } from '../useAppMutation.ts';

export const recipeKeys = {
	all: ['recipes'] as const,
	lists: () => [...recipeKeys.all, 'list'] as const,
	// The params object is part of the key, so every page / filter combination is its own cache entry.
	// Keys are hashed by value (object key order and `undefined` fields don't matter).
	list: (params: FetchRecipesParams) => [...recipeKeys.lists(), params] as const,
	details: () => [...recipeKeys.all, 'detail'] as const,
	detail: (recipeId: string) => [...recipeKeys.details(), recipeId] as const,
};

export const recipesListQueryOptions = (params: FetchRecipesParams) =>
	queryOptions({
		queryKey: recipeKeys.list(params),
		queryFn: ({ signal }) => fetchRecipes(params, signal),
	});

export const recipeDetailsQueryOptions = (recipeId: string | undefined) =>
	queryOptions({
		queryKey: recipeKeys.detail(recipeId ?? ''),
		// `skipToken` = typed way to disable a query until its input exists (instead of `enabled: false` + `!`)
		queryFn: recipeId ? ({ signal }) => fetchRecipeDetails(recipeId, signal) : skipToken,
	});

// Paginated list. Pass `null` to keep the query idle (e.g. Search before the first submit).
// Pass a memoized `params` object: it's an effect dependency for prefetching.
export const useRecipesList = (params: FetchRecipesParams | null) => {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: params ? recipeKeys.list(params) : recipeKeys.lists(),
		queryFn: params ? ({ signal }) => fetchRecipes(params, signal) : skipToken,
		// While page N+1 loads, keep showing page N (`isPlaceholderData: true`) instead of an empty list + spinner.
		// Not when going idle (search reset): then the old results must disappear.
		placeholderData: params ? keepPreviousData : undefined,
	});

	const totalPages = query.data?.pagination?.totalPages ?? 0;

	// Prefetch the next page in the background, so clicking "next" is usually instant.
	// prefetchQuery is a no-op while that page is already cached and fresh.
	useEffect(() => {
		if (params && params.page < totalPages) {
			queryClient.prefetchQuery(recipesListQueryOptions({ ...params, page: params.page + 1 }));
		}
	}, [params, totalPages, queryClient]);

	return query;
};

export const useRecipe = (recipeId: string | undefined) => useQuery(recipeDetailsQueryOptions(recipeId));

// Lists are refetched with `refetchType: 'all'` — including cached pages that aren't on screen — so the page
// we redirect to never shows a stale list (e.g. a just-deleted recipe) for a moment.
const invalidateRecipeLists = (queryClient: QueryClient) =>
	queryClient.invalidateQueries({ queryKey: recipeKeys.lists(), refetchType: 'all' });

export const useCreateRecipe = () => useAppMutation({ mutationFn: createRecipe, onSuccess: invalidateRecipeLists });

export const useUpdateRecipe = () =>
	useAppMutation({
		mutationFn: updateRecipe,
		onSuccess: (queryClient, _data, { recipeId }) =>
			Promise.all([
				invalidateRecipeLists(queryClient),
				// The PUT reply is unpopulated (SavedRecipeModel), so we can't `setQueryData` the details — refetch them
				queryClient.invalidateQueries({ queryKey: recipeKeys.detail(recipeId) }),
			]),
	});

// The deleted recipe's details are deliberately NOT invalidated: the edit page is still mounted at that moment,
// so a refetch would hit 404 and the axios interceptor would redirect to /not-found. The orphaned cache entry
// is garbage-collected (gcTime, 5 min) once nothing uses it.
export const useDeleteRecipe = () => useAppMutation({ mutationFn: deleteRecipe, onSuccess: invalidateRecipeLists });

// A POST that just returns data (no server-side change to sync) — still a mutation: it runs on demand, isn't cached.
export const useImportRecipeDraft = () => useAppMutation({ mutationFn: importRecipeDraft, useGlobalLoader: false });
