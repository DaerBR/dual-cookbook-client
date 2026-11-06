import { apiRequest } from '../../api/apiRequest.ts';
import type { CategoryModel, CreateCategoryParams, DeleteCategoryParams, UpdateCategoryParams } from './types.ts';

// Plain async functions — no Redux, no rejectWithValue. A thrown error (AxiosError) is what TanStack stores as `error`.

export const fetchAllCategories = async () => {
	const response = await apiRequest.request<CategoryModel[]>({
		url: '/api/categories/all',
		method: 'get',
	});

	return response.data;
};

export const createCategory = async (params: CreateCategoryParams) => {
	const response = await apiRequest.request<CategoryModel>({
		url: '/api/categories',
		method: 'post',
		data: params,
	});

	return response.data;
};

export const updateCategory = async ({ categoryId, ...data }: UpdateCategoryParams) => {
	const response = await apiRequest.request<CategoryModel>({
		url: `/api/categories/${categoryId}`,
		method: 'put',
		data,
	});

	return response.data;
};

export const deleteCategory = async ({ categoryId }: DeleteCategoryParams) => {
	await apiRequest.request({
		url: `/api/categories/${categoryId}`,
		method: 'delete',
	});
};
