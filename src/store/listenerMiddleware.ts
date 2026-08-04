import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import { AxiosBaseQueryError } from '../api/axiosBaseQuery.ts';
import { categoriesApi } from '../features/categories/categoriesApi.ts';
import { navigateTo } from '../utils/navigation.ts';

export const listenerMiddleware = createListenerMiddleware();

const isSuccessfulCategoryMutation = isAnyOf(
	categoriesApi.endpoints.createCategory.matchFulfilled,
	categoriesApi.endpoints.updateCategory.matchFulfilled,
	categoriesApi.endpoints.deleteCategory.matchFulfilled,
);

const isFailedCategoryMutation = isAnyOf(
	categoriesApi.endpoints.createCategory.matchRejected,
	categoriesApi.endpoints.updateCategory.matchRejected,
	categoriesApi.endpoints.deleteCategory.matchRejected,
);

const getMutationErrorMessage = (payload: unknown) => {
	const error = payload as AxiosBaseQueryError | undefined;
	const data = error?.data as { message?: string; messages?: string[] } | string | undefined;

	if (typeof data === 'string') return data;
	if (data?.messages?.length) return data.messages[0];
	if (data?.message) return data.message;

	return 'Unknown error occurred.';
};

listenerMiddleware.startListening({
	matcher: isSuccessfulCategoryMutation,
	effect: (action) => {
		const { successMessage, successRedirectRoute } = action.meta.arg.originalArgs;

		if (successMessage) {
			toast.success(successMessage);
		}

		if (successRedirectRoute) {
			navigateTo(successRedirectRoute);
		}
	},
});

listenerMiddleware.startListening({
	matcher: isFailedCategoryMutation,
	effect: (action) => {
		toast.error(getMutationErrorMessage(action.payload));
	},
});
