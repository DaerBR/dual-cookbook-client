export const modalBodyStyles = {
	backgroundColor: '#fff',
	width: '450px',
	display: 'flex',
	alignItems: 'center',
	padding: '32px 0',
	position: 'relative' as const,
	borderRadius: '4px',
};

export const closeButtonStyles = {
	border: 'none',
	cursor: 'pointer',
	position: 'absolute' as const,
	top: '16px',
	right: '16px',
	backgroundColor: 'transparent',
};

export const modalWrapperStyles = {
	display: 'flex',
	flexDirection: 'column' as const,
};

export const iconWrapperStyles = {
	borderRadius: '50%',
	width: '48px',
	height: '48px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

export const contentWrapperStyles = { padding: '32px 32px 0' };

export const buttonsContainerStyles = {
	paddingTop: '20px',
	paddingLeft: '32px',
	paddingRight: '32px',
	display: 'flex',
	justifyContent: 'center',
	'& :not(:last-child)': {
		marginRight: '20px',
	},
};
