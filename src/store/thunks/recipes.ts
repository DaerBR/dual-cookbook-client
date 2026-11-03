import { createAppAsyncThunk } from '../createAppAsyncThunk.ts';
import { toApiError } from '../../api/apiError.ts';
import { apiRequest } from '../../api/apiRequest.ts';
import type {
	ImportedRecipeDraft,
	RecipeDetailModel,
	RecipeIngredient,
	RecipeStep,
	RecipesPaginationModel,
} from '../types.ts';

interface FetchRecipesParams {
	categories?: string;
	limit: number;
	order?: 'asc' | 'desc';
	page: number;
	recipeAuthor?: string;
	search?: string;
}

export const fetchRecipes = createAppAsyncThunk<RecipesPaginationModel, FetchRecipesParams>(
	'recipes/fetchRecipes',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<RecipesPaginationModel>({
				url: `/api/recipes`,
				method: 'get',
				params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface SearchRecipesParams extends FetchRecipesParams {
	asSuggestions?: boolean;
}

export const searchRecipes = createAppAsyncThunk<RecipesPaginationModel, SearchRecipesParams>(
	'recipes/searchRecipes',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<RecipesPaginationModel>({
				url: `/api/recipes`,
				method: 'get',
				params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

export interface CreateRecipeParams {
	categories: string[];
	description: string | null;
	ingredients: RecipeIngredient[];
	recipeImage?: {
		base64Content: string;
		nameWithExtension: string;
	} | null;
	recipeTitle: string;
	sourceUrl?: string;
	steps: RecipeStep[];
}

export const createRecipe = createAppAsyncThunk<RecipeDetailModel, CreateRecipeParams>(
	'recipes/createRecipe',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<RecipeDetailModel>({
				url: `/api/recipes`,
				method: 'post',
				data: params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface FetchRecipeDetailsParams {
	recipeId: string;
}

export const fetchRecipeDetails = createAppAsyncThunk<RecipeDetailModel, FetchRecipeDetailsParams>(
	'recipes/fetchRecipeDetails',
	async (params, { rejectWithValue }) => {
		const { recipeId } = params;

		try {
			const response = await apiRequest.request<RecipeDetailModel>({
				url: `/api/recipes/${recipeId}`,
				method: 'get',
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface UpdateRecipeParams extends CreateRecipeParams {
	recipeId: string;
}

export const updateRecipe = createAppAsyncThunk<RecipeDetailModel, UpdateRecipeParams>(
	'recipes/updateRecipe',
	async (params, { rejectWithValue }) => {
		const { recipeId } = params;

		try {
			const response = await apiRequest.request<RecipeDetailModel>({
				url: `/api/recipes/${recipeId}`,
				method: 'put',
				data: params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface DeleteRecipeParams {
	recipeId: string;
}

export const deleteRecipe = createAppAsyncThunk<void, DeleteRecipeParams>(
	'recipes/deleteRecipe',
	async (params, { rejectWithValue }) => {
		const { recipeId } = params;

		try {
			await apiRequest.request({
				url: `/api/recipes/${recipeId}`,
				method: 'delete',
			});

			return undefined;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface ImportRecipeDraftParams {
	url: string;
}

export const importRecipeDraft = createAppAsyncThunk<ImportedRecipeDraft, ImportRecipeDraftParams>(
	'recipes/importRecipeDraft',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<ImportedRecipeDraft>({
				url: `/api/recipes/import`,
				method: 'post',
				data: params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);
