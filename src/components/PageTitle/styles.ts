import { defineStyles } from '../../styles/defineStyles.ts';

export const pageTitleWrapperStyles = defineStyles({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 9,
	alignItems: 'center',
	'@media (max-width: 768px)': {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 3,
		marginBottom: 4,
	},
});

export const controlElementsContainerStyles = defineStyles({
	display: 'flex',
	gap: 3,
	flexWrap: 'wrap',
	'@media (max-width: 768px)': { justifyContent: 'flex-end', width: '100%' },
});
