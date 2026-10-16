import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import { BackIconButton } from '../BackIconButton/BackIconButton.tsx';
import { pageTitleWrapperStyles } from './styles.ts';

interface PageTitleProps {
	controlElements?: ReactNode[];
	returnUrl?: string;
	title: string;
	withReturnButton?: boolean;
}

export const PageTitle = ({ controlElements, title, returnUrl, withReturnButton }: PageTitleProps) => {
	const navigate = useNavigate();

	const titleStyles = { '@media (max-width: 768px)': { fontSize: '18px' } };

	return (
		<div css={pageTitleWrapperStyles}>
			<div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{withReturnButton && (
					<BackIconButton
						onClick={() => (returnUrl ? navigate(returnUrl) : navigate(-1))}
						customStyles={{ marginRight: '4px' }}
					/>
				)}
				<Typography variant="h5" weight={700} component="div" customStyles={titleStyles}>
					{title}
				</Typography>
			</div>
			{controlElements && <div css={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>{controlElements}</div>}
		</div>
	);
};
