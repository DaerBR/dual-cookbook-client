import { defineStyles } from '../../../styles/defineStyles.ts';

export const modalBodyStyles = defineStyles({
	backgroundColor: '#fff',
	width: '450px',
	display: 'flex',
	alignItems: 'center',
	padding: '32px 0',
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
});

export const iconWrapperStyles = defineStyles({
	borderRadius: '50%',
	width: '48px',
	height: '48px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const contentWrapperStyles = defineStyles({ padding: '32px 32px 0' });

export const buttonsContainerStyles = defineStyles({
	paddingTop: '20px',
	paddingLeft: '32px',
	paddingRight: '32px',
	display: 'flex',
	justifyContent: 'center',
	'& :not(:last-child)': {
		marginRight: '20px',
	},
});
