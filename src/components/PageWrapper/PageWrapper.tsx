import { ReactNode } from 'react';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
	const styles = {
		maxWidth: '1200px',
		margin: '90px auto 0',
		padding: '24px 36px',
		minHeight: '100vh',
		backgroundColor: '#fff',
		borderRadius: '4px',
		boxSizing: 'border-box' as const,
		position: 'relative' as const,
		'@media (max-width: 768px)': {
			padding: '8px 12px',
		},
	};

	return (
		<div css={styles} className="page-wrapper">
			{children}
		</div>
	);
};
