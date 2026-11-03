import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './store.ts';
import type { ApiError } from '../api/apiError.ts';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	dispatch: AppDispatch;
	rejectValue: ApiError;
	state: RootState;
}>();
