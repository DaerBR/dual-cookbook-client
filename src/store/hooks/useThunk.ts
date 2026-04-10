import { useNavigate } from 'react-router';
import { useCallback, useContext, useState } from 'react';
import { toast } from 'sonner';

import { ThunkAppDispatch, useAppDispatch } from './hooks';
import { RootState } from '../index';
import { GlobalLoadingIndicatorContext } from '../../contexts/GlobalLoadingIndicator.tsx';

interface ServerErrorResponse {
	data: {
		messages?: string[];
	};
}

interface ServerError {
	error?: string;
	message?: string;
	status?: string;
	statusText?: string;
}

interface UseThunkOptions {
	successMessage?: string;
	successRedirectRoute?: string;
	useGlobalLoader?: boolean;
}

const getErrorText = (error: ServerError) => {
	if (typeof error !== 'object') {
		return 'Unknown error occurred.';
	}
	if (error.message) return error.message;

	if ('status' in error && error.status && error.statusText) {
		return `Server rejected with error status ${error.status} - ${error.statusText}`;
	}

	if ('message' in error && error.message === 'Rejected') {
		return 'Unauthorized access - request was rejected';
	}

	return 'Unknown error occurred.';
};

export const useThunk = <TThunkArgs>(
	thunk: (args: TThunkArgs) => (dispatch: ThunkAppDispatch, getState: () => RootState, extra: unknown) => any,
	options: UseThunkOptions | undefined = undefined,
): [(args?: TThunkArgs) => Promise<void>, ServerErrorResponse | ServerError | null] => {
	const [error, setError] = useState<ServerError | ServerErrorResponse | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { useGlobalLoader } = options ?? {};
	const { handleShowLoadingIndicator } = useContext(GlobalLoadingIndicatorContext);

	const dispatchThunk = useCallback(
		async (args?: TThunkArgs) => {
			if (useGlobalLoader) {
				handleShowLoadingIndicator(true);
			}
			dispatch(thunk(args as TThunkArgs))
				.unwrap()
				.then(() => {
					if (options) {
						const { successMessage, successRedirectRoute } = options;
						console.info(successMessage);

						if (successMessage) {
							toast.success(successMessage);
						}

						if (useGlobalLoader) {
							handleShowLoadingIndicator(false);
						}

						if (successRedirectRoute) {
							navigate(successRedirectRoute);
						}
					}
				})
				.catch((e: ServerError) => {
					const errorText = getErrorText(e);

					if (useGlobalLoader) {
						handleShowLoadingIndicator(false);
					}

					toast.error(errorText);

					return setError(e);
				});
		},
		[dispatch, thunk, options, useGlobalLoader, handleShowLoadingIndicator, navigate],
	);

	return [dispatchThunk, error];
};
