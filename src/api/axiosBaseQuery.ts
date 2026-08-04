import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { apiRequest } from './apiRequest.ts';

export interface AxiosBaseQueryArgs {
	data?: AxiosRequestConfig['data'];
	method: AxiosRequestConfig['method'];
	params?: AxiosRequestConfig['params'];
	url: string;
}

export interface AxiosBaseQueryError {
	data: unknown;
	status: number | undefined;
}

export const axiosBaseQuery =
	(): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await apiRequest.request({ url, method, data, params });

			return { data: result.data };
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			return {
				error: {
					data: axiosError.response?.data ?? axiosError.message,
					status: axiosError.response?.status,
				},
			};
		}
	};
