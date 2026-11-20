import { defineStyles } from '../../styles/defineStyles.ts';

export const categoryImageStyles = defineStyles({
	width: '450px',
	height: 'auto',
	borderRadius: '12px',
	marginBottom: 3,
	'@media (max-width: 768px)': {
		width: '100%',
	},
});

export const filterRowStyles = defineStyles({
	display: 'flex',
	width: '100%',
	paddingTop: 3,
	alignItems: 'center',
});

export const recipesListStyles = defineStyles({
	display: 'flex',
	justifyContent: 'center',
	marginTop: 3,
	flexDirection: 'column',
});

export const emptyStateStyles = defineStyles({
	padding: 5,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
