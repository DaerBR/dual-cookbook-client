import { defineStyles } from '../../styles/defineStyles.ts';

export const errorPageContainerStyles = defineStyles({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	minHeight: '70vh',
});
export const pageImageStyles = defineStyles({
	width: '100%',
	height: 'auto',
	maxWidth: '270px',
	opacity: 0.7,
});
