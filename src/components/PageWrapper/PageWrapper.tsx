import { ReactNode } from 'react';

import { defineStyles } from '../../styles/defineStyles.ts';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
	const styles = defineStyles({
		maxWidth: '1200px',
		margin: '90px auto 0',
		padding: '24px 36px',
		minHeight: '100vh',
		backgroundColor: '#fff',
		borderRadius: '4px',
		boxSizing: 'border-box',
		position: 'relative',
		'@media (max-width: 768px)': {
			padding: '8px 12px',
			marginTop: '118px',
		},
	});

	return (
		<div css={styles} className="page-wrapper">
			{children}
		</div>
	);
};
