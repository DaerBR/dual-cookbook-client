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
