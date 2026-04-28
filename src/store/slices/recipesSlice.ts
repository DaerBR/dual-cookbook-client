import { createSlice } from '@reduxjs/toolkit';
import { createRecipe, fetchRecipeDetails, fetchRecipes, searchRecipes, updateRecipe } from '../thunks/recipes.ts';
import { Pagination, RecipeDetailModel, RecipeTableModel } from '../types.ts';

interface RecipesState {
	isCreating: boolean;
	isLoading: boolean;
	isUpdating: boolean;
	paginatedRecipes: {
		pagination: Pagination | null;
		recipesList: RecipeTableModel[];
	};
	recipeDetails: {
		isLoading: boolean;
		recipeData: RecipeDetailModel | null;
	};
	search: {
		isSearching: boolean;
		pagination: Pagination | null;
		recipesList: RecipeTableModel[];
	};
}

const initialState: RecipesState = {
	isCreating: false,
	isLoading: false,
	isUpdating: false,
	paginatedRecipes: {
		recipesList: [],
		pagination: null,
	},
	recipeDetails: {
		isLoading: false,
		recipeData: null,
	},
	search: {
		isSearching: false,
		recipesList: [],
		pagination: null,
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
		// Search Recipes
		builder.addCase(searchRecipes.pending, (state) => {
			state.search.isSearching = true;
		});
		builder.addCase(searchRecipes.fulfilled, (state, action) => {
			state.search.isSearching = false;

			if (!action.meta.arg.asSuggestions) {
				state.search.recipesList = action.payload.data;
				state.search.pagination = action.payload.pagination;
			}
		});
		builder.addCase(searchRecipes.rejected, (state) => {
			state.search.isSearching = false;
		});
		// Fetch Recipe details
		builder.addCase(fetchRecipeDetails.pending, (state) => {
			state.recipeDetails.isLoading = true;
		});
		builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
			state.recipeDetails.isLoading = false;
			state.recipeDetails.recipeData = action.payload;
		});
		builder.addCase(fetchRecipeDetails.rejected, (state) => {
			state.recipeDetails.isLoading = false;
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
		// Update a Recipe
		builder.addCase(updateRecipe.pending, (state) => {
			state.isUpdating = true;
		});
		builder.addCase(updateRecipe.fulfilled, (state) => {
			state.isUpdating = false;
		});
		builder.addCase(updateRecipe.rejected, (state) => {
			state.isUpdating = false;
		});
	},
});

export const recipesReducer = recipesSlice.reducer;
