import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { searchReducer } from './slices/searchSlice.ts';

const rootReducer = combineReducers({
	auth: authReducer,
	search: searchReducer,
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
		search: searchReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
