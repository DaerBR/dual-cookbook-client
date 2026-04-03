import axios from 'axios';
import { useNavigate } from 'react-router';
import { API_URL } from './constants';

export const apiRequest = axios.create({
	baseURL: API_URL,
});

export const useApiInterceptors = () => {
	const navigate = useNavigate();

	apiRequest.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401) {
				navigate('/');
				console.info('Unauthorized access, redirecting to sign-in page');
			}

			if (error.response.status === 403) {
				navigate('/');
				console.info('Unauthorized access, redirecting to sign-in page');
			}

			if (error.response.status === 404) {
				navigate('/not-found');
			}

			return Promise.reject(error);
		},
	);
};

export interface ApiResponseData<TResponsePayloadData> {
	meta: {
		requestStatus: string;
	};
	payload: TResponsePayloadData;
}
