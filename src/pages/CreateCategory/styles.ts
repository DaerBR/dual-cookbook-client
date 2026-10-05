import { defineStyles } from '../../styles/defineStyles.ts';

export const categoryFormRowStyles = defineStyles({
	display: 'flex',
	gap: '12px',
	flexBasis: '100%',
	flexWrap: 'nowrap',
	'@media (max-width: 768px)': { flexDirection: 'column' },
});

export const categoryImageWrapperStyles = defineStyles({ display: 'flex', flexBasis: '300px' });

export const categoryNameWrapperStyles = defineStyles({
	display: 'flex',
	marginLeft: '36px',
	'@media (max-width: 768px)': { marginLeft: 0 },
});

export const categoryNameInputStyles = defineStyles({
	minWidth: '350px',
	'@media (max-width: 768px)': { minWidth: '100%' },
});

export const categoryFormActionsStyles = defineStyles({
	display: 'flex',
	gap: '24px',
	justifyContent: 'center',
	marginTop: '12px',
});
