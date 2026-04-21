import { createAction, createSlice } from '@reduxjs/toolkit';
import { fetchUser, signOut } from '../thunks/auth';

export interface UserData {
	displayName: string;
	email: string;
	id: string;
}
interface AuthState {
	areUserDataFetched: boolean;
	authorizationError: any;
	isLoading: boolean;
	isLoggedIn: boolean;
	userData: UserData | null;
}

const initialState: AuthState = {
	authorizationError: null,
	isLoading: false,
	isLoggedIn: false,
	userData: null,
	areUserDataFetched: false,
};

export const setUserData = createAction('auth/setUserData');
export const resetUserData = createAction('auth/resetUserData');

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData(state, payload) {
			state.userData = payload.payload;
		},
		resetUserData(state) {
			state.userData = null;
			state.isLoggedIn = false;
			state.areUserDataFetched = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
			state.areUserDataFetched = true;
			state.isLoggedIn = true;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.isLoading = false;
			state.authorizationError = action.error;
		});
		builder.addCase(signOut.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(signOut.fulfilled, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
			state.userData = null;
			state.areUserDataFetched = false;
		});
		builder.addCase(signOut.rejected, (state, action) => {
			state.isLoading = false;
			state.authorizationError = action.error;
		});
	},
});

export const authReducer = authSlice.reducer;
