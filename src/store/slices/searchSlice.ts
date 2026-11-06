import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// After moving recipes to TanStack Query, only *client* state is left here: what the user searched for and
// which results page they're on (kept so "return to search page" restores it). The results themselves are
// server state and live in the query cache, keyed by these values.

export interface SearchQuery {
	categories: Array<{ label: string; value: string }>;
	recipeAuthor: string;
	searchInput: string;
}

interface SearchState {
	page: number;
	query: SearchQuery | null;
}

const initialState: SearchState = {
	page: 1,
	query: null,
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		// Reset search (with a prefilled search input, or clean)
		resetSearch(state, action: PayloadAction<string | undefined>) {
			state.page = 1;
			state.query = action.payload ? { searchInput: action.payload, categories: [], recipeAuthor: '' } : null;
		},
		setSearchPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		// A new query always starts from the first page
		setSearchQuery(state, action: PayloadAction<SearchQuery>) {
			state.page = 1;
			state.query = action.payload;
		},
	},
});

export const searchReducer = searchSlice.reducer;
export const { resetSearch, setSearchPage, setSearchQuery } = searchSlice.actions;
