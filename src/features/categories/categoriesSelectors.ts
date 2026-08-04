import { createSelector } from '@reduxjs/toolkit';

import { categoriesApi } from './categoriesApi.ts';

const selectFetchAllCategoriesResult = categoriesApi.endpoints.fetchAllCategories.select();

export const selectAllCategories = createSelector(selectFetchAllCategoriesResult, (result) => result.data ?? []);

export const selectCategoryOptions = createSelector(selectAllCategories, (categories) =>
	categories.map((category) => ({ value: category.id, label: category.name })),
);

export const makeSelectCategoryById = (categoryId: string | undefined) =>
	createSelector(selectAllCategories, (categories) => categories.find((category) => category.id === categoryId));
