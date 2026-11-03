import { createAsyncThunk } from '@reduxjs/toolkit';

import { toApiError } from '../../api/apiError.ts';
import type { ApiError } from '../../api/apiError.ts';
import { apiRequest } from '../../api/apiRequest.ts';
import type { CategoryModel, CategoryPaginationModel } from '../slices/categoriesSlice.ts';

interface FetchCategoriesParams {
	limit: number;
	page: number;
	search?: string;
}

export const fetchCategories = createAsyncThunk<CategoryPaginationModel, FetchCategoriesParams>(
	'categories/fetchCategories',
	async (params, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<CategoryPaginationModel>({
				url: `/api/categories`,
				method: 'get',
				params,
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

export const fetchAllCategories = createAsyncThunk<CategoryModel[]>(
	'categories/fetchAllCategories',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiRequest.request<CategoryModel[]>({
				url: `/api/categories/all`,
				method: 'get',
			});

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
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

export const createCategory = createAsyncThunk<CategoryModel, CreateCategoryParams>(
	'categories/createCategory',
	async (params, { rejectWithValue, dispatch }) => {
		try {
			const response = await apiRequest.request<CategoryModel>({
				url: `/api/categories`,
				method: 'post',
				data: params,
			});

			dispatch(fetchAllCategories());

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
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

export const updateCategory = createAsyncThunk<CategoryModel, UpdateCategoryParams>(
	'categories/updateCategory',
	async (params, { rejectWithValue, dispatch }) => {
		const { categoryId } = params;

		try {
			const response = await apiRequest.request<CategoryModel>({
				url: `/api/categories/${categoryId}`,
				method: 'put',
				data: params,
			});

			dispatch(fetchAllCategories());

			return response.data;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);

interface DeleteCategoryParams {
	categoryId: string;
}

export const deleteCategory = createAsyncThunk<void, DeleteCategoryParams, { rejectValue: ApiError }>(
	'categories/deleteCategory',
	async (params, { rejectWithValue, dispatch }) => {
		const { categoryId } = params;

		try {
			await apiRequest.request({
				url: `/api/categories/${categoryId}`,
				method: 'delete',
			});

			dispatch(fetchAllCategories());

			return undefined;
		} catch (error: unknown) {
			return rejectWithValue(toApiError(error));
		}
	},
);
