import { defineStyles } from '../../styles/defineStyles.ts';

export const pageTitleWrapperStyles = defineStyles({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '36px',
	alignItems: 'center',
	'@media (max-width: 768px)': {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: '12px',
		marginBottom: '16px',
	},
});

export const controlElementsContainerStyles = defineStyles({
	display: 'flex',
	gap: '12px',
	flexWrap: 'wrap',
	'@media (max-width: 768px)': { justifyContent: 'flex-end', width: '100%' },
});
