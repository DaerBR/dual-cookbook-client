import { defineStyles } from '../../styles/defineStyles.ts';

export const mainWrapperStyles = defineStyles({
	display: 'flex',
	gap: '12px',
	flexBasis: '100%',
	wrap: 'nowrap',
	'@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'center' },
});

export const fieldsWrapperStyles = defineStyles({
	display: 'flex',
	flexDirection: 'column',
	marginLeft: '36px',
	width: '100%',
	'@media (max-width: 768px)': { marginLeft: 0, order: 1 },
});

export const fieldBlockStyles = defineStyles({
	marginBottom: '24px',
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
	marginBottom: '20px',
	borderRadius: '8px',
});

export const fieldDragButtonStyles = defineStyles({
	marginRight: '4px',
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
	marginBottom: '16px',
});

export const addStepButtonStyles = { maxWidth: '250px', marginTop: '16px' };
export const formActionButtonsContainerStyles = defineStyles({
	display: 'flex',
	gap: '24px',
	justifyContent: 'center',
	marginTop: '12px',
});
