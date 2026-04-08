import { useEffect } from 'react';
import { API_URL } from '../../api/constants.ts';
import { useAppDispatch } from '../../store/hooks/hooks.ts';
import { setUserData } from '../../store/slices/authSlice.ts';

export const AuthEventListener = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const API_ORIGIN = new URL(API_URL).origin;

		const handleMessage = (event: MessageEvent) => {
			if (event.origin !== API_ORIGIN) {
				console.warn('Ignored message from:', event.origin);

				return;
			}

			if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
				console.info('Authentication data received:', event.data.payload);
				dispatch(setUserData(event.data.payload));
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [dispatch]);

	return null;
};
