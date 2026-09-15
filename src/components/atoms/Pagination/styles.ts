import { defineStyles } from '../../../styles/defineStyles.ts';

export const paginationButtonStyles = defineStyles({
	minWidth: '40px',
	height: '40px',
	width: '40px',
	padding: '4px',
	fontWeight: 400,
});

export const ellipsisStyles = defineStyles({
	userSelect: 'none',
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	boxSizing: 'border-box',
	padding: 0,
	width: '30px',
	minWidth: '30px',
});

export const paginationContainerStyles = defineStyles({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8px',
});
