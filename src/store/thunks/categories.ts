import { toApiError } from '../../api/apiError.ts';
import { apiRequest } from '../../api/apiRequest.ts';
import type { CategoryModel, CategoryPaginationModel } from '../slices/categoriesSlice.ts';
import { createAppAsyncThunk } from '../createAppAsyncThunk.ts';

interface FetchCategoriesParams {
	limit: number;
	page: number;
	search?: string;
}

export const fetchCategories = createAppAsyncThunk<CategoryPaginationModel, FetchCategoriesParams>(
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

export const fetchAllCategories = createAppAsyncThunk<CategoryModel[]>(
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

export const createCategory = createAppAsyncThunk<CategoryModel, CreateCategoryParams>(
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

export const updateCategory = createAppAsyncThunk<CategoryModel, UpdateCategoryParams>(
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

export const deleteCategory = createAppAsyncThunk<void, DeleteCategoryParams>(
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
