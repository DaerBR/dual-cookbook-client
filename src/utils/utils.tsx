import { Typography } from '../components/atoms/Typography';

interface FieldError {
	message: string;
}

export const processFieldValidationErrors: any = (errors: undefined | FieldError | Record<string, FieldError>) => {
	if (!errors) {
		return undefined;
	}

	if (errors.message) {
		return <span className="custom-error">{errors.message as string}</span>;
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
