import { createSlice } from '@reduxjs/toolkit';
import { createCategory, fetchAllCategories, fetchCategories } from '../thunks/categories.ts';

export interface CategoryImage {
	publicId: string;
	secureUrl: string;
}
export interface Category {
	categoryImage?: CategoryImage;
	createdAt: Date;
	id: string;
	name: string;
}
interface Pagination {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export interface CategoryPaginationModel {
	data: Category[];
	pagination: Pagination;
}

interface CategoriesState {
	areCategoriesFetched: boolean;
	categories: Category[];
	isCreating: boolean;
	isLoading: boolean;
	paginatedCategories: {
		categoriesList: Category[];
		pagination: Pagination | null;
	};
}

const initialState: CategoriesState = {
	areCategoriesFetched: false,
	categories: [],
	isCreating: false,
	isLoading: false,
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
			state.areCategoriesFetched = Boolean(action.payload);
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
		// Delete Category
	},
});

export const categoriesReducer = categoriesSlice.reducer;
