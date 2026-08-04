import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../api/axiosBaseQuery.ts';
import { ImageDataModel, PaginationModel } from '../../store/types.ts';

export interface CategoryModel {
	categoryImage?: ImageDataModel;
	createdAt: string;
	id: string;
	name: string;
}

export interface CategoryPaginationModel {
	data: CategoryModel[];
	pagination: PaginationModel;
}

interface CategoryImagePayload {
	base64Content: string;
	nameWithExtension: string;
}

interface FetchCategoriesParams {
	limit: number;
	page: number;
	search?: string;
}

interface CreateCategoryArgs {
	categoryImage?: CategoryImagePayload | null;
	name: string;
	successMessage?: string;
	successRedirectRoute?: string;
}

interface UpdateCategoryArgs extends CreateCategoryArgs {
	categoryId: string;
}

interface DeleteCategoryArgs {
	categoryId: string;
	successMessage?: string;
	successRedirectRoute?: string;
}

const categoryListTag = { type: 'Category' as const, id: 'LIST' };

export const categoriesApi = createApi({
	reducerPath: 'categoriesApi',
	baseQuery: axiosBaseQuery(),
	tagTypes: ['Category'],
	endpoints: (builder) => ({
		fetchAllCategories: builder.query<CategoryModel[], void>({
			query: () => ({ url: '/api/categories/all', method: 'get' }),
			providesTags: (result) =>
				result ? [...result.map(({ id }) => ({ type: 'Category' as const, id })), categoryListTag] : [categoryListTag],
		}),
		fetchCategories: builder.query<CategoryPaginationModel, FetchCategoriesParams>({
			query: (params) => ({ url: '/api/categories', method: 'get', params }),
			providesTags: (result) =>
				result
					? [...result.data.map(({ id }) => ({ type: 'Category' as const, id })), categoryListTag]
					: [categoryListTag],
		}),
		createCategory: builder.mutation<CategoryModel, CreateCategoryArgs>({
			query: ({ successMessage: _successMessage, successRedirectRoute: _successRedirectRoute, ...body }) => ({
				url: '/api/categories',
				method: 'post',
				data: body,
			}),
			invalidatesTags: [categoryListTag],
		}),
		updateCategory: builder.mutation<CategoryModel, UpdateCategoryArgs>({
			query: ({
				categoryId,
				successMessage: _successMessage,
				successRedirectRoute: _successRedirectRoute,
				...body
			}) => ({
				url: `/api/categories/${categoryId}`,
				method: 'put',
				data: body,
			}),
			invalidatesTags: (_result, _error, { categoryId }) => [{ type: 'Category', id: categoryId }, categoryListTag],
		}),
		deleteCategory: builder.mutation<void, DeleteCategoryArgs>({
			query: ({ categoryId }) => ({ url: `/api/categories/${categoryId}`, method: 'delete' }),
			invalidatesTags: (_result, _error, { categoryId }) => [{ type: 'Category', id: categoryId }, categoryListTag],
		}),
	}),
});

export const {
	useFetchAllCategoriesQuery,
	useFetchCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoriesApi;
