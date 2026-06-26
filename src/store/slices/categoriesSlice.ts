import { createSlice } from '@reduxjs/toolkit';
import { createCategory, fetchAllCategories, fetchCategories, updateCategory } from '../thunks/categories.ts';
import { ImageDataModel, PaginationModel } from '../types.ts';

export interface CategoryModel {
	categoryImage?: ImageDataModel;
	createdAt: Date;
	id: string;
	name: string;
}

export interface CategoryPaginationModel {
	data: CategoryModel[];
	pagination: PaginationModel;
}

interface CategoriesState {
	areCategoriesFetched: boolean;
	categories: CategoryModel[];
	isCreating: boolean;
	isLoading: boolean;
	isUpdating: boolean;
	paginatedCategories: {
		categoriesList: CategoryModel[];
		pagination: PaginationModel | null;
	};
}

const initialState: CategoriesState = {
	areCategoriesFetched: false,
	categories: [],
	isCreating: false,
	isLoading: false,
	isUpdating: false,
	paginatedCategories: {
		categoriesList: [],
		pagination: null,
	},
};
const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// Fetch paginated Categories
		builder.addCase(fetchCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			state.paginatedCategories.categoriesList = action.payload.data;
			state.paginatedCategories.pagination = action.payload.pagination;
		});
		builder.addCase(fetchCategories.rejected, (state) => {
			state.isLoading = false;
		});
		// Fetch All categories
		builder.addCase(fetchAllCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categories = action.payload;
			state.areCategoriesFetched = true;
		});
		builder.addCase(fetchAllCategories.rejected, (state) => {
			state.isLoading = false;
		});
		// Create Category
		builder.addCase(createCategory.pending, (state) => {
			state.isCreating = true;
		});
		builder.addCase(createCategory.fulfilled, (state) => {
			state.isCreating = false;
		});
		builder.addCase(createCategory.rejected, (state) => {
			state.isCreating = false;
		});
		// Update Category
		builder.addCase(updateCategory.pending, (state) => {
			state.isUpdating = true;
		});
		builder.addCase(updateCategory.fulfilled, (state) => {
			state.isUpdating = false;
		});
		builder.addCase(updateCategory.rejected, (state) => {
			state.isUpdating = false;
		});
	},
});

export const categoriesReducer = categoriesSlice.reducer;
