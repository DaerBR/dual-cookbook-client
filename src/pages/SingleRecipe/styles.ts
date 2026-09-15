import { defineStyles } from '../../styles/defineStyles.ts';

export const editRecipeButtonStyles = defineStyles({
	'@media (max-width: 768px)': {
		display: 'none',
	},
});
export const mobileEditRecipeButtonStyles = defineStyles({
	display: 'none',
	border: 'none',
	boxShadow: 'none',
	minWidth: '40px',
	padding: '4px',
	'@media (max-width: 768px)': {
		display: 'block',
	},
});

export const recipeImageStyles = defineStyles({
	width: '100%',
	height: 'auto',
	borderRadius: '12px',
	marginBottom: '12px',
	maxWidth: '500px',
});

export const recipeNoImageContainerStyles = defineStyles({
	height: '200px',
	width: '420px',
	border: '1px solid',
	borderRadius: '12px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const sourceContainerStyles = defineStyles({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
});
