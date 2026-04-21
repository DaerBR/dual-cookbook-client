import { useNavigate } from 'react-router';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

import { useApiInterceptors } from '../../api/apiRequest.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { LoadingIndicator } from '../LoadingIndicator';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	useApiInterceptors();
	const authState = useAppSelector((state) => state.auth);
	const { isLoading: isFetchingUserData, areUserDataFetched, userData } = authState;

	const navigate = useNavigate();

	useEffect(() => {
		if (!isFetchingUserData && !userData && areUserDataFetched) {
			toast.error('You need to be logged in to access this page');
			navigate('/');
		}
	}, [isFetchingUserData, navigate, areUserDataFetched, userData]);

	return userData ? children : <LoadingIndicator />;
};
