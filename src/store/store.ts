import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { categoriesReducer } from './slices/categoriesSlice.ts';
import { recipesReducer } from './slices/recipesSlice.ts';

const rootReducer = combineReducers({
	auth: authReducer,
	categories: categoriesReducer,
	recipes: recipesReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		categories: categoriesReducer,
		recipes: recipesReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
