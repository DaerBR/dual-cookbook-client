import { defineStyles } from '../../styles/defineStyles.ts';

export const deleteRecipeButtonStyles = defineStyles({
	'@media (max-width: 768px)': {
		display: 'none',
	},
});

export const mobileDeleteRecipeButtonStyles = defineStyles({
	display: 'none',
	border: 'none',
	boxShadow: 'none',
	minWidth: '40px',
	padding: '4px',
	backgroundColor: 'transparent',
	'@media (max-width: 768px)': {
		display: 'block',
	},
});
