import { defineStyles } from '../../../styles/defineStyles.ts';

export const getModalBodyStyles = ({ width }: { width: number }) =>
	defineStyles({
		backgroundColor: '#fff',
		width: `${width}px`,
		display: 'flex',
		alignItems: 'center',
		padding: [8, 0],
		position: 'relative',
		borderRadius: '4px',
	});

export const closeButtonStyles = defineStyles({
	border: 'none',
	cursor: 'pointer',
	position: 'absolute',
	top: '16px',
	right: '16px',
	backgroundColor: 'transparent',
});

export const modalWrapperStyles = defineStyles({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	width: '100%',
});

export const iconWrapperStyles = defineStyles({
	borderRadius: '50%',
	width: '48px',
	height: '48px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const contentWrapperStyles = defineStyles({ padding: [8, 8, 0] });

export const buttonsContainerStyles = defineStyles({
	paddingTop: 5,
	paddingLeft: 8,
	paddingRight: 8,
	display: 'flex',
	justifyContent: 'center',
	gap: 5,
});
