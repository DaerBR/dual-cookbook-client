import { Typography } from '../../components/atoms/Typography';
import { errorPageContainerStyles, pageImageStyles } from './styles.ts';
import { ERROR_TEXT } from './constants.ts';

interface ErrorPageProps {
	code: 404 | 403;
}

export const ErrorPage = ({ code }: ErrorPageProps) => (
	<div css={errorPageContainerStyles}>
		<Typography variant="h4" color="error" weight={800} customStyles={{ marginBottom: '16px', marginTop: '16px' }}>
			Виникла помилка!
		</Typography>
		{code && ERROR_TEXT[code] && (
			<Typography
				variant="paragraphL"
				color="error"
				customStyles={{ marginBottom: '24px', textAlign: 'center' }}
				weight={700}
			>
				{ERROR_TEXT[code]}
			</Typography>
		)}
		<img src="/bear-bowl.png" alt="Error" css={pageImageStyles} />
	</div>
);
