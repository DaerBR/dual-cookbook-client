import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../Typography';
import { TypographyVariant } from '../Typography/types.ts';
import { chipHeight, chipPadding } from './constants.ts';

interface ChipProps {
	color?: 'primary' | 'neutral' | 'success' | 'error';
	isOutlined?: boolean;
	onClick?: () => void;
	size?: 'lg' | 'md' | 'sm' | 'xs';
	text: string;
}

export const Chip = ({ onClick, color = 'primary', size = 'md', isOutlined, text }: ChipProps) => {
	const theme = useAppTheme();
	const typographySize: Record<string, TypographyVariant> = {
		lg: 'paragraphS',
		md: 'paragraphS',
		sm: 'paragraphXs',
		xs: 'paragraphXs',
	};
	const chipStyles = {
		color: isOutlined ? theme.colors[color].main : '#fff',
		backgroundColor: isOutlined ? '#fff' : theme.colors[color].surfaceDefault,
		border: isOutlined ? `1px solid ${theme.colors[color].borderDarker}` : 'none',
		cursor: onClick ? 'pointer' : 'default',
		height: chipHeight[size],
		padding: `0 ${chipPadding[size]}`,
		borderRadius: '16px',
		textDecoration: 'none',
		maxWidth: 'fit-content',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: onClick ? theme.colors[color].surfaceLighter : theme.colors[color].surfaceDefault,
		},
	};

	const typographyContent = (
		<Typography weight={600} variant={typographySize[size]} customStyles={chipStyles}>
			{text}
		</Typography>
	);

	return onClick ? (
		<button type="button" onClick={onClick} css={{ border: 'none', backgroundColor: 'transparent' }}>
			{typographyContent}
		</button>
	) : (
		typographyContent
	);
};
