import { defineStyles } from '../../styles/defineStyles.ts';

export const mobileSearchButtonStyles = defineStyles({
	display: 'none',
	minWidth: 0,
	padding: '10px 12px',
	border: 'none',
	boxShadow: 'none',
	marginLeft: 2,
	maxHeight: '38px',
	'@media (max-width: 768px)': {
		display: 'flex',
	},
});
