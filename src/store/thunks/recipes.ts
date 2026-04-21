import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiRequest.ts';
import { RecipeIngredient, RecipeStep, RecipesPaginationModel } from '../slices/recipesSlice.ts';

interface FetchRecipesParams {
	category?: string;
	limit: number;
	page: number;
	search?: string;
}

export const fetchRecipes = createAsyncThunk<RecipesPaginationModel, FetchRecipesParams>(
	'recipes/fetchRecipes',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/recipes`,
				method: 'get',
				params,
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

interface CreateRecipesParams {
	category: string;
	description: string | null;
	ingredients: RecipeIngredient[];
	name: string;
	recipeImage?: {
		base64Content: string;
		nameWithExtension: string;
	} | null;
	steps: RecipeStep[];
}

// TODO type response
export const createRecipe = createAsyncThunk<any, CreateRecipesParams>(
	'recipes/createRecipe',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/recipes`,
				method: 'post',
				data: params,
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);
