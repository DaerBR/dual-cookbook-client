import { createSlice } from '@reduxjs/toolkit';
import { createRecipe, fetchRecipes } from '../thunks/recipes.ts';

export interface RecipeImage {
	publicId: string;
	secureUrl: string;
}
export interface RecipeTableModel {
	category: { id: string; name: string };
	createdAt: Date;
	description: string | null;
	id: string;
	name: string;
	recipeImage?: RecipeImage;
	updatedAt: Date;
}

export interface RecipeStep {
	id?: string;
	stepDescription: string;
}
export interface RecipeIngredient {
	id?: string;
	text: string;
}

export interface RecipeModel extends RecipeTableModel {
	description: 'string';
	ingredients: RecipeIngredient[];
	recipeImage: RecipeImage;
	steps: RecipeStep[];
}

interface Pagination {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export interface RecipesPaginationModel {
	data: RecipeTableModel[];
	pagination: Pagination | null;
}

interface RecipesState {
	isCreating: boolean;
	isLoading: boolean;
	paginatedRecipes: {
		pagination: Pagination | null;
		recipesList: RecipeTableModel[];
	};
	recipeDetails: {
		isLoading: boolean;
		recipeData: RecipeModel | null;
	};
}

const initialState: RecipesState = {
	isCreating: false,
	isLoading: false,
	paginatedRecipes: {
		recipesList: [],
		pagination: null,
	},
	recipeDetails: {
		isLoading: false,
		recipeData: null,
	},
};

const recipesSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// Fetch paginated Recipes
		builder.addCase(fetchRecipes.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchRecipes.fulfilled, (state, action) => {
			state.isLoading = false;
			state.paginatedRecipes.recipesList = action.payload.data;
			state.paginatedRecipes.pagination = action.payload.pagination;
		});
		builder.addCase(fetchRecipes.rejected, (state) => {
			state.isLoading = false;
		});
		// Create a Recipe
		builder.addCase(createRecipe.pending, (state) => {
			state.isCreating = true;
		});
		builder.addCase(createRecipe.fulfilled, (state) => {
			state.isCreating = false;
		});
		builder.addCase(createRecipe.rejected, (state) => {
			state.isCreating = false;
		});
	},
});

export const recipesReducer = recipesSlice.reducer;
