export const mainWrapperStyles = {
	display: 'flex',
	gap: '12px',
	flexBasis: '100%',
	wrap: 'nowrap',
	'@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'center' },
} as const;

export const fieldsWrapperStyles = {
	display: 'flex',
	flexDirection: 'column',
	marginLeft: '36px',
	width: '100%',
	'@media (max-width: 768px)': { marginLeft: 0, order: 1 },
} as const;

export const fieldBlockStyles = {
	marginBottom: '24px',
	display: 'flex',
	flexDirection: 'column' as const,
};

export const leftColumnWrapperStyles = {
	display: 'flex',
	flexBasis: '300px',
	flexDirection: 'column',
	'@media (max-width: 768px)': { width: '100%', order: 2 },
} as const;

export const ingredientsFieldStyles = {
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	marginBottom: '20px',
	borderRadius: '8px',
} as const;

export const fieldDragButtonStyles = {
	marginRight: '4px',
	maxHeight: '38px',
	padding: '10px 12px',
	minWidth: '38px',
	cursor: 'grab',
	boxShadow: 'none',
	border: 'none',
};
