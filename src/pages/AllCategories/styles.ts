import { defineStyles } from '../../styles/defineStyles.ts';

export const categoryImageSectionStyles = defineStyles({
	height: '200px',
	width: '100%',
	position: 'relative',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'&:hover': {
		opacity: 0.6,
	},
});

export const categoriesContainerStyles = defineStyles({
	display: 'grid',
	gridTemplateRows: '1fr',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '24px',
	'@media (max-width: 768px)': {
		gridTemplateColumns: 'repeat(1, 1fr)',
		gap: '12px',
	},
});
