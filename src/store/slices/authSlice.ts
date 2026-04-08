import { createAction, createSlice } from '@reduxjs/toolkit';
import { fetchUser, signOut } from '../thunks/auth';

export interface UserData {
	displayName: string;
	email: string;
	id: string;
}
interface AuthState {
	authorizationError: any;
	isLoading: boolean;
	isLoggedIn: boolean;
	userInfo: UserData | null;
	wereUserDataFetched: boolean;
}

const initialState: AuthState = {
	authorizationError: null,
	isLoading: false,
	isLoggedIn: false,
	userInfo: null,
	wereUserDataFetched: false,
};

export const setUserData = createAction('auth/setUserData');
export const resetUserData = createAction('auth/resetUserData');

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData(state, payload) {
			state.userInfo = payload.payload;
		},
		resetUserData(state) {
			state.userInfo = null;
			state.isLoggedIn = false;
			state.wereUserDataFetched = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.userInfo = action.payload;
			state.wereUserDataFetched = Boolean(action.payload);
			state.isLoggedIn = Boolean(action.payload);
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
			state.userInfo = null;
			state.wereUserDataFetched = false;
		});
		builder.addCase(signOut.rejected, (state, action) => {
			state.isLoading = false;
			state.authorizationError = action.error;
		});
	},
});

export const authReducer = authSlice.reducer;
