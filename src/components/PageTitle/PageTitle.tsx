import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import { BackIconButton } from '../BackIconButton/BackIconButton.tsx';
import { space } from '../../styles/spacing.ts';
import { controlElementsContainerStyles, pageTitleWrapperStyles } from './styles.ts';

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
			<div css={{ display: 'flex', alignItems: 'center', gap: space(1) }}>
				{withReturnButton && (
					<BackIconButton
						onClick={() => (returnUrl ? navigate(returnUrl) : navigate(-1))}
						customStyles={{ marginRight: 1 }}
					/>
				)}
				<Typography variant="h5" weight={700} component="div" customStyles={titleStyles}>
					{title}
				</Typography>
			</div>
			{controlElements && <div css={controlElementsContainerStyles}>{controlElements}</div>}
		</div>
	);
};
