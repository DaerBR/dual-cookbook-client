import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiRequest';

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
