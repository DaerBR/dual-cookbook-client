import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiRequest.ts';
import { Category, CategoryPaginationModel } from '../slices/categoriesSlice.ts';

interface FetchCategoriesParams {
	limit: number;
	page: number;
	search?: string;
}

export const fetchCategories = createAsyncThunk<CategoryPaginationModel, FetchCategoriesParams>(
	'categories/fetchCategories',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/categories`,
				method: 'get',
				params,
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const fetchAllCategories = createAsyncThunk<Category[]>(
	'categories/fetchAllCategories',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/categories/all`,
				method: 'get',
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

interface CreateCategoryParams {
	categoryImage?: {
		base64Content: string;
		nameWithExtension: string;
	} | null;
	name: string;
}

// TODO type response
export const createCategory = createAsyncThunk<any, CreateCategoryParams>(
	'categories/createCategory',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/categories`,
				method: 'post',
				data: params,
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

interface UpdateCategoryParams {
	categoryId: string;
	categoryImage?: {
		base64Content: string;
		nameWithExtension: string;
	} | null;
	name: string;
}

export const updateCategory = createAsyncThunk<any, UpdateCategoryParams>(
	'categories/updateCategory',
	async (params, { rejectWithValue, dispatch }) => {
		const { categoryId } = params;

		try {
			const response = await apiRequest.request({
				url: `/api/categories/${categoryId}`,
				method: 'put',
				data: params,
			});

			dispatch(fetchAllCategories());

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const deleteCategory = createAsyncThunk<any, any>(
	'categories/deleteCategory',
	async (id, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request({
				url: `/api/categories/${id}`,
				method: 'delete',
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);
