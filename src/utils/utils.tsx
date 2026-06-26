import { type ReactElement } from 'react';

import { Typography } from '../components/atoms/Typography';

interface ValidationError {
	[key: string]: unknown;
	message?: string;
}

export const processFieldValidationErrors = (errors: ValidationError | undefined): ReactElement | undefined => {
	if (!errors) {
		return undefined;
	}

	if (errors.message) {
		return (
			<Typography variant="paragraphXs" customStyles={{ color: '#ea3b28', marginTop: '4px' }} component="div">
				{errors.message}
			</Typography>
		);
	}

	if (Object.keys(errors).length && !errors.message) {
		return (
			<span css={{ display: 'flex', flexDirection: 'column' }}>
				{Object.values(errors).map((error, index) => {
					const validationError = error as ValidationError;

					if (validationError.message) {
						return (
							<Typography
								variant="paragraphXs"
								customStyles={{ color: '#ea3b28', marginTop: '4px' }}
								component="div"
								key={`error-${index}`}
							>
								{validationError.message}
							</Typography>
						);
					}

					return Object.values(validationError).map((fieldError, deepIndex) => (
						<Typography
							variant="paragraphXs"
							customStyles={{ color: '#ea3b28', marginTop: '4px' }}
							component="div"
							key={`error-${deepIndex}`}
						>
							{(fieldError as ValidationError).message}
						</Typography>
					));
				})}
			</span>
		);
	}

	return undefined;
};

export const getBase64OfFile = (file: File): Promise<string> =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve((reader.result as string).split('base64,')[1]);
		reader.onerror = (error) => reject(error);
	});

export const getQueryParameter = (parameterName: string) => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	return urlParams.get(parameterName);
};

export const pluck = <TObj, TKey extends keyof TObj>(key: TKey, arr: TObj[]): Array<NonNullable<TObj[TKey]>> =>
	arr
		.map((item) => item[key])
		.filter((value): value is NonNullable<TObj[TKey]> => value !== undefined && value !== null);
