import { createSlice } from '@reduxjs/toolkit';
import { logIn } from '../thunks/auth';

interface UserData {
	id: string;
	name: string;
	email: string;
}
interface AuthState {
	authorizationError: any;
	isLoading: boolean;
	userInfo: UserData | null;
}

const initialState: AuthState = {
	authorizationError: null,
	isLoading: false,
	userInfo: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// Log In
		builder.addCase(logIn.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(logIn.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(logIn.rejected, (state, action) => {
			state.isLoading = false;
			state.authorizationError = action.error;
		});
	},
});

export const authReducer = authSlice.reducer;
