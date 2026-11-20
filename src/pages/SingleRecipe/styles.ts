import { defineStyles } from '../../styles/defineStyles.ts';

export const mobileEditRecipeButtonStyles = defineStyles({
	display: 'none',
	border: 'none',
	boxShadow: 'none',
	minWidth: '40px',
	padding: 1,
	'@media (max-width: 768px)': {
		display: 'block',
	},
});

export const recipeImageStyles = defineStyles({
	width: '100%',
	height: 'auto',
	borderRadius: '12px',
	marginBottom: 3,
	maxWidth: '500px',
});

export const sourceContainerStyles = defineStyles({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
});

export const stepItemStyles = defineStyles({
	marginBottom: 3,
	textAlign: 'justify',
	transition: 'color 0.2s ease',
	'@media (max-width: 768px)': {
		cursor: 'pointer',
		userSelect: 'none',
		WebkitTapHighlightColor: 'transparent',
	},
});
