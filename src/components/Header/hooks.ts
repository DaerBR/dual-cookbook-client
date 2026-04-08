import type { CSSObject } from '@emotion/react';

export const useHeaderStyles = (): CSSObject => ({
	boxSizing: 'border-box',
	padding: '12px 20px',
	height: '80px',
	position: 'fixed',
	left: '50%',
	transform: 'translateX(-50%)',
	top: '4px',
	width: '100%',
	maxWidth: '1200px',
	margin: '0 auto',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: '#fff',
	borderRadius: '4px',
	zIndex: 3,
});
