import { Typography } from '../components/atoms/Typography';

interface FieldError {
	message: string;
}

export const processFieldValidationErrors: any = (errors: undefined | FieldError | Record<string, FieldError>) => {
	if (!errors) {
		return undefined;
	}

	if (errors.message) {
		return (
			<Typography variant="paragraphXs" customStyles={{ color: '#ea3b28', marginTop: '4px' }} component="div">
				{errors.message as string}
			</Typography>
		);
	}

	if (Object.keys(errors).length && !errors.message) {
		return (
			<span css={{ display: 'flex', flexDirection: 'column' }}>
				{Object.values(errors).map((error, index) => {
					if (error.message) {
						return (
							<Typography
								variant="paragraphXs"
								customStyles={{ color: '#ea3b28', marginTop: '4px' }}
								component="div"
								key={`error-${index}`}
							>
								{error.message}
							</Typography>
						);
					}

					return Object.values(error).map((fieldError: any, deepIndex) => (
						<Typography
							variant="paragraphXs"
							customStyles={{ color: '#ea3b28', marginTop: '4px' }}
							component="div"
							key={`error-${deepIndex}`}
						>
							{fieldError.message}
						</Typography>
					));
				})}
			</span>
		);
	}

	return undefined;
};

export const getBase64OfFile = (file: File) =>
	new Promise((resolve, reject) => {
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

export const pluck = (parameter: string, valuesArray: Record<string, any>) => {
	if (!parameter || !valuesArray) {
		return [];
	}

	return valuesArray
		.map((item: Record<string, any>) => item[parameter])
		.filter((value: any) => value !== undefined && value !== null);
};
