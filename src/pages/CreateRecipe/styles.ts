import { defineStyles } from '../../styles/defineStyles.ts';

export const mainWrapperStyles = defineStyles({
	display: 'flex',
	gap: 3,
	flexBasis: '100%',
	'@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'center', marginBottom: '64px' },
});

export const fieldsWrapperStyles = defineStyles({
	display: 'flex',
	flexDirection: 'column',
	marginLeft: 9,
	width: '100%',
	'@media (max-width: 768px)': { marginLeft: 0, order: 1 },
});

export const fieldBlockStyles = defineStyles({
	marginBottom: 6,
	display: 'flex',
	flexDirection: 'column',
});

export const leftColumnWrapperStyles = defineStyles({
	display: 'flex',
	flexBasis: '300px',
	flexDirection: 'column',
	'@media (max-width: 768px)': { width: '100%', order: 2 },
});

export const ingredientsFieldStyles = defineStyles({
	display: 'flex',
	alignItems: 'self-start',
	position: 'relative',
	marginBottom: 5,
	borderRadius: '8px',
});

export const fieldDragButtonStyles = defineStyles({
	marginRight: 1,
	maxHeight: '38px',
	padding: '10px 12px',
	minWidth: '38px',
	cursor: 'grab',
	boxShadow: 'none',
	border: 'none',
});

export const recipeTitleFieldStyles = defineStyles({
	minWidth: '400px',
	'@media (max-width: 768px)': {
		minWidth: 'auto',
	},
});

export const sourceUrlFieldStyles = defineStyles({
	minWidth: '400px',
	'@media (max-width: 768px)': {
		minWidth: 'auto',
	},
});

export const descriptionFieldStyles = defineStyles({
	minWidth: '400px',
	'@media (max-width: 768px)': {
		minWidth: 'auto',
	},
});

export const ingredientDeleteButtonStyles = defineStyles({
	position: 'absolute',
	right: '-20px',
	top: '-20px',
	'@media (max-width: 768px)': {
		right: '-8px',
		paddingRight: 0,
	},
});

export const stepDeleteButtonStyles = defineStyles({
	position: 'absolute',
	right: '-20px',
	top: '0',
	'@media (max-width: 768px)': {
		right: '-8px',
		paddingRight: 0,
	},
});

export const stepWrapperStyles = defineStyles({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	marginBottom: 3,
});

export const addStepButtonStyles = defineStyles({ maxWidth: '250px', marginTop: 4 });

export const formActionButtonsContainerStyles = defineStyles({
	display: 'flex',
	gap: 6,
	justifyContent: 'center',
	marginTop: 3,
	'@media (max-width: 768px)': {
		width: '100%',
		backgroundColor: '#fff',
		padding: [3, 0],
		position: 'fixed',
		bottom: 0,
		left: 0,
		zIndex: 3,
		borderTop: '1px solid',
		borderColor: 'neutral.borderDefault',
	},
});
