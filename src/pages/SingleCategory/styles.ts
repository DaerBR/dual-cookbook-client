import { defineStyles } from '../../styles/defineStyles.ts';

export const categoryImageStyles = defineStyles({
	width: '450px',
	height: 'auto',
	borderRadius: '12px',
	marginBottom: '12px',
	'@media (max-width: 768px)': {
		width: '100%',
	},
});

export const filterRowStyles = defineStyles({
	display: 'flex',
	width: '100%',
	paddingTop: '12px',
	alignItems: 'center',
});

export const recipesListStyles = defineStyles({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '12px',
	flexDirection: 'column',
});

export const emptyStateStyles = defineStyles({
	padding: '20px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
