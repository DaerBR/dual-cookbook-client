import { CSSObject } from '@emotion/react';

export const editRecipeButtonStyles = {
	'@media (max-width: 768px)': {
		display: 'none',
	},
};
export const mobileEditRecipeButtonStyles = {
	display: 'none',
	border: 'none',
	boxShadow: 'none',
	minWidth: '40px',
	padding: '4px',
	'@media (max-width: 768px)': {
		display: 'block',
	},
};

export const recipeImageStyles = {
	width: '100%',
	height: 'auto',
	borderRadius: '12px',
	marginBottom: '12px',
	maxWidth: '500px',
};

export const recipeNoImageContainerStyles = {
	height: '200px',
	width: '420px',
	border: '1px solid',
	borderRadius: '12px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

export const sourceContainerStyles = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
} as CSSObject;
