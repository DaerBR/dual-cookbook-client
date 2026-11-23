import { defineStyles } from '../../styles/defineStyles.ts';

export const categoryFormRowStyles = defineStyles({
	display: 'flex',
	gap: 3,
	flexBasis: '100%',
	flexWrap: 'nowrap',
	'@media (max-width: 768px)': { flexDirection: 'column' },
});

export const categoryImageWrapperStyles = defineStyles({ display: 'flex', flexBasis: '300px' });

export const categoryNameWrapperStyles = defineStyles({
	display: 'flex',
	marginLeft: 9,
	'@media (max-width: 768px)': { marginLeft: 0 },
});

export const categoryNameInputStyles = defineStyles({
	minWidth: '350px',
	'@media (max-width: 768px)': { minWidth: '100%' },
});

export const categoryFormActionsStyles = defineStyles({
	display: 'flex',
	gap: 6,
	justifyContent: 'center',
	marginTop: 3,
});
