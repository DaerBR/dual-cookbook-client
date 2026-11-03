import { toApiError } from '../../api/apiError.ts';
import { apiRequest } from '../../api/apiRequest';
import { resetUserData } from '../slices/authSlice.ts';
import type { UserData } from '../slices/authSlice.ts';
import { createAppAsyncThunk } from '../createAppAsyncThunk.ts';

export const signOut = createAppAsyncThunk<void, void>('auth/signOut', async (_, { rejectWithValue, dispatch }) => {
	try {
		await apiRequest.request({
			url: `/api/logout`,
			method: 'get',
		});

		dispatch(resetUserData());

		return undefined;
	} catch (error: unknown) {
		return rejectWithValue(toApiError(error));
	}
});

export const fetchUser = createAppAsyncThunk<UserData, void>('api/fetchUser', async (_, { rejectWithValue }) => {
	try {
		const response = await apiRequest.request<UserData>({
			url: `/api/current_user`,
			method: 'get',
		});

		return response.data;
	} catch (error: unknown) {
		return rejectWithValue(toApiError(error));
	}
});
