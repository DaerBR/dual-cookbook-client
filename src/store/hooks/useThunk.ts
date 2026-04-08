import { useNavigate } from 'react-router';
import { useCallback, useState } from 'react';
import { ThunkAppDispatch, useAppDispatch } from './hooks';
import { RootState } from '../index';

interface ServerErrorResponse {
	data: {
		messages?: string[];
	};
}

interface ServerError {
	message?: string;
	status?: string;
	statusText?: string;
}

interface FormSubmitError {
	messages: string[];
}

interface UseThunkOptions {
	successMessage?: string;
	successRedirectRoute?: string;
	useGlobalLoader?: boolean;
}

const getErrorText = (error: ServerError | ServerErrorResponse | FormSubmitError) => {
	if (typeof error !== 'object') {
		return 'Unknown error occurred.';
	}

	if ('messages' in error && error.messages?.length) {
		return error.messages[0];
	}

	if ('data' in error && error.data?.messages?.length) {
		return error.data.messages[0];
	}

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
): [(args?: TThunkArgs) => Promise<void>, ServerErrorResponse | ServerError | FormSubmitError | null] => {
	const [error, setError] = useState<ServerError | ServerErrorResponse | FormSubmitError | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// const { useGlobalLoader } = options ?? {};
	// const { handleGlobalLoadingScreenState } = useContext(DrawerContext);

	const dispatchThunk = useCallback(
		async (args?: TThunkArgs) => {
			// if (useGlobalLoader) {
			// 	handleGlobalLoadingScreenState(true);
			// }
			dispatch(thunk(args as TThunkArgs))
				.unwrap()
				.then(() => {
					if (options) {
						const { successMessage, successRedirectRoute } = options;
						console.info(successMessage);
						// if (successMessage) {
						// 	pushToastMessage({
						// 		toastVariant: 'success',
						// 		message: successMessage,
						// 		title: 'Success!',
						// 	});
						// }
						//
						// if (useGlobalLoader) {
						// 	handleGlobalLoadingScreenState(false);
						// }

						if (successRedirectRoute) {
							navigate(successRedirectRoute);
						}
					}
				})
				.catch((e: ServerError | ServerErrorResponse | FormSubmitError) => {
					const errorText = getErrorText(e);
					console.log(errorText);
					// if (useGlobalLoader) {
					// 	handleGlobalLoadingScreenState(false);
					// }
					//
					// pushToastMessage({
					// 	toastVariant: 'error',
					// 	message: errorText,
					// 	title: 'Error occurred!',
					// });

					return setError(e);
				});
		},
		[dispatch, thunk, options, navigate],
	);

	return [dispatchThunk, error];
};
