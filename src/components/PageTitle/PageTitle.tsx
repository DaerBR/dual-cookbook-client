import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import { BackIconButton } from '../BackIconButton/BackIconButton.tsx';

interface PageTitleProps {
	controlElements?: ReactNode[];
	returnUrl?: string;
	title: string;
	withReturnButton?: boolean;
}

export const PageTitle = ({ controlElements, title, returnUrl, withReturnButton }: PageTitleProps) => {
	const navigate = useNavigate();

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '36px', alignItems: 'center' }}>
			<div css={{ display: 'flex', alignItems: 'center', gap: '4x' }}>
				{withReturnButton && (
					<BackIconButton
						onClick={() => (returnUrl ? navigate(returnUrl) : navigate(-1))}
						customStyles={{ marginRight: '4px' }}
					/>
				)}
				<Typography variant="h5" weight={700} component="div">
					{title}
				</Typography>
			</div>
			{controlElements && <div css={{ display: 'flex', gap: '12px' }}>{controlElements}</div>}
		</div>
	);
};
