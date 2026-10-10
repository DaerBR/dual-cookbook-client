import { defineStyles } from '../../styles/defineStyles.ts';

export const buttonsContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
};

export const homepageLinkStyles = {
	backgroundImage: 'url("/logo-images/squirrel.png")',
	height: '64px',
	width: '64px',
	backgroundSize: 'contain',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	borderRadius: '50%',
	border: '2px solid #fda477',
	marginRight: '16px',
	'@media (max-width: 768px)': {
		height: '48px',
		width: '48px',
	},
};

export const linkStyles = {
	fontWeight: 700,
	marginRight: '24px',
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	},
};

export const searchWrapperStyles = {
	width: '300px',
	'@media (max-width: 1024px)': {
		width: '230px',
	},
	'@media (max-width: 768px)': {
		display: 'none',
	},
};

export const signOutButtonStyles = { border: 'none', boxShadow: 'none', minWidth: 0, padding: '10px 16px' };

export const createRecipeButtonStyles = {
	'@media (max-width: 768px)': { maxWidth: '170px', '& .start-icon-container': { display: 'none' } },
};

export const navigationContainerStyles = defineStyles({
	backgroundColor: '#fff',
	display: 'none',
	position: 'fixed',
	top: '95px',
	left: '0',
	transform: 'translateY(-50%)',
	width: '100%',
	justifyContent: 'space-around',
	padding: '8px 0',
	zIndex: 3,
	'@media (max-width: 768px)': { display: 'flex' },
});
