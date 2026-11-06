import { apiRequest } from '../../api/apiRequest.ts';
import type {
	CreateRecipeParams,
	DeleteRecipeParams,
	FetchRecipesParams,
	ImportRecipeDraftParams,
	ImportedRecipeDraft,
	RecipeDetailModel,
	RecipesPaginationModel,
	SavedRecipeModel,
	UpdateRecipeParams,
} from './types.ts';

// `signal` comes from TanStack: when the query key changes (e.g. fast page clicks) or the component unmounts,
// the outdated request is aborted instead of racing the new one.
export const fetchRecipes = async (params: FetchRecipesParams, signal?: AbortSignal) => {
	const response = await apiRequest.request<RecipesPaginationModel>({
		url: '/api/recipes',
		method: 'get',
		params,
		signal,
	});

	return response.data;
};

export const fetchRecipeDetails = async (recipeId: string, signal?: AbortSignal) => {
	const response = await apiRequest.request<RecipeDetailModel>({
		url: `/api/recipes/${recipeId}`,
		method: 'get',
		signal,
	});

	return response.data;
};

export const createRecipe = async (params: CreateRecipeParams) => {
	const response = await apiRequest.request<SavedRecipeModel>({
		url: '/api/recipes',
		method: 'post',
		data: params,
	});

	return response.data;
};

export const updateRecipe = async ({ recipeId, ...data }: UpdateRecipeParams) => {
	const response = await apiRequest.request<SavedRecipeModel>({
		url: `/api/recipes/${recipeId}`,
		method: 'put',
		data,
	});

	return response.data;
};

export const deleteRecipe = async ({ recipeId }: DeleteRecipeParams) => {
	await apiRequest.request({
		url: `/api/recipes/${recipeId}`,
		method: 'delete',
	});
};

export const importRecipeDraft = async (params: ImportRecipeDraftParams) => {
	const response = await apiRequest.request<ImportedRecipeDraft>({
		url: '/api/recipes/import',
		method: 'post',
		data: params,
	});

	return response.data;
};
