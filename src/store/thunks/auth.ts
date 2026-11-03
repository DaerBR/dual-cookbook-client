import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import { apiRequest } from '../../api/apiRequest';
import { UserData, resetUserData } from '../slices/authSlice.ts';

export const signOut = createAsyncThunk<void, void>('auth/signOut', async (_, { rejectWithValue, dispatch }) => {
	try {
		await apiRequest.request({
			url: `/api/logout`,
			method: 'get',
		});

		dispatch(resetUserData());

		return undefined;
	} catch (error: unknown) {
		return rejectWithValue((error as AxiosError).response?.data);
	}
});

export const fetchUser = createAsyncThunk<UserData, void>('api/fetchUser', async (_, { rejectWithValue }) => {
	try {
		const response = await apiRequest.request<UserData>({
			url: `/api/current_user`,
			method: 'get',
		});

		return response.data;
	} catch (error: unknown) {
		return rejectWithValue((error as AxiosError).response?.data);
	}
});
