import { useEffect } from 'react';
import { useRouteError } from 'react-router';

import { Typography } from '../../components/atoms/Typography';
import { errorPageContainerStyles, pageImageStyles } from './styles.ts';
import { ERROR_TEXT } from './constants.ts';

interface ErrorPageProps {
	code?: 404 | 403;
}

export const ErrorPage = ({ code }: ErrorPageProps) => {
	const routeError = useRouteError();

	useEffect(() => {
		if (routeError !== undefined) {
			console.error('Route error:', routeError);
		}
	}, [routeError]);

	return (
		<div css={errorPageContainerStyles}>
			<Typography variant="h4" color="error" weight={800} customStyles={{ marginBottom: 4, marginTop: 4 }}>
				Виникла помилка!
			</Typography>
			<Typography
				variant="paragraphL"
				color="error"
				customStyles={{ marginBottom: 6, textAlign: 'center' }}
				weight={700}
			>
				{code && ERROR_TEXT[code]
					? ERROR_TEXT[code]
					: 'Щось пішло не так. Спробуй оновити сторінку або перейти на іншу'}
			</Typography>
			<img src="/bear-bowl.png" alt="Error" css={pageImageStyles} />
		</div>
	);
};
