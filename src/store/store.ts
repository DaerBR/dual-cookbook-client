import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { recipesReducer } from './slices/recipesSlice.ts';
import { listenerMiddleware } from './listenerMiddleware.ts';
import { categoriesApi } from '../features/categories/categoriesApi.ts';

const rootReducer = combineReducers({
	auth: authReducer,
	recipes: recipesReducer,
	[categoriesApi.reducerPath]: categoriesApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(categoriesApi.middleware),
	});
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		recipes: recipesReducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(categoriesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
