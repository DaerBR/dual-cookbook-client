import { Typography } from '../../components/atoms/Typography';

interface ErrorPageProps {
	code?: number;
}

export const ErrorPage = ({ code }: ErrorPageProps) => (
	<div>
		<Typography variant="h1" color="error" weight={900}>
			Помилка {code ?? ''}
		</Typography>
	</div>
);
