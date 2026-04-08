import type { CSSObject } from '@emotion/react';

export const buttonStyles: CSSObject = {
	cursor: 'pointer',
	textTransform: 'none',
	padding: '6px 24px',
	fontWeight: 500,
	minWidth: '64px',
	borderRadius: '4px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition:
		'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
	'&:disabled': { cursor: 'default' },
	'& .start-icon-container': {
		marginRight: '8px',
		marginLeft: '-4px',
		svg: {},
	},
};
