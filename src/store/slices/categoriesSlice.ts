import { createSlice } from '@reduxjs/toolkit';
import { createCategory, fetchCategories } from '../thunks/categories.ts';

export interface CategoryImage {
	publicId: string;
	secureUrl: string;
}
export interface Category {
	_id: string;
	categoryImage?: CategoryImage;
	createdAt: Date;
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
	pagination: Pagination | null;
}

const initialState: CategoriesState = {
	areCategoriesFetched: false,
	categories: [],
	isCreating: false,
	isLoading: false,
	pagination: null,
};
const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categories = action.payload.data;
			state.pagination = action.payload.pagination;
			state.areCategoriesFetched = Boolean(action.payload);
		});
		builder.addCase(fetchCategories.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(createCategory.pending, (state) => {
			state.isCreating = true;
		});
		builder.addCase(createCategory.fulfilled, (state) => {
			state.isCreating = false;
		});
		builder.addCase(createCategory.rejected, (state) => {
			state.isCreating = false;
		});
	},
});

export const categoriesReducer = categoriesSlice.reducer;
