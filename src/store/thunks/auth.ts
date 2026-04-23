import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiRequest';
import { resetUserData, UserData } from '../slices/authSlice.ts';

export const logIn = createAsyncThunk<any, any>('auth/logIn', async (_, { rejectWithValue }) => {
	try {
		const response = await apiRequest.request({
			url: `/auth/google`,
			method: 'get',
		});

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});

export const signOut = createAsyncThunk<any, any>('auth/signOut', async (_, { rejectWithValue, dispatch }) => {
	try {
		const response = await apiRequest.request({
			url: `/api/logout`,
			method: 'get',
		});


		dispatch(resetUserData());

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});

export const fetchUser = createAsyncThunk<UserData, any>('api/fetchUser', async (_, { rejectWithValue }) => {
	try {
		const response = await apiRequest.request({
			url: `/api/current_user`,
			method: 'get',
		});

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
