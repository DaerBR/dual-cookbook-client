import { useAppTheme } from '../../../styles/hooks.ts';
import { Colors, Variants } from './types.ts';

interface UseButtonColorsProps {
	color: Colors;
	variant: Variants;
}

type OutlinedSemanticKey = 'primary' | 'success' | 'error';

const outlinedSemanticVariant = (variant: Variants): OutlinedSemanticKey | null => {
	switch (variant) {
		case 'outlined-primary':
			return 'primary';
		case 'outlined-success':
			return 'success';
		case 'outlined-error':
			return 'error';
		default:
			return null;
	}
};

export const useButtonColors = ({ color, variant }: UseButtonColorsProps) => {
	const theme = useAppTheme();
	const semanticOutlined = outlinedSemanticVariant(variant);

	if (variant === 'outlined-neutral' || semanticOutlined) {
		const semantic = semanticOutlined ? theme.colors[semanticOutlined] : null;

		return {
			backgroundColor: '#fff',
			hoverBackgroundColor: semantic ? semantic.surfaceSubtle : '#fff',
			activeBackgroundColor: '#fff',
			textColor: semantic ? semantic.main : theme.colors.text.title,
			hoverTextColor: semantic ? semantic.main : theme.colors.text.subtitle,
			activeTextColor: semantic ? semantic.dark : theme.colors.text.title,
			disabledTextColor: semantic ? semantic.disabled : theme.colors.text.disabled,
			disabledBackgroundColor: '#fff',
		};
	}

	return {
		backgroundColor: variant === 'secondary' ? theme.colors[color].surfaceSubtle : theme.colors[color].surfaceDefault,

		hoverBackgroundColor:
			variant === 'secondary' ? theme.colors[color].surfaceLighter : theme.colors[color].surfaceMedium,
		activeBackgroundColor:
			variant === 'secondary' ? theme.colors[color].surfaceSubtle : theme.colors[color].surfaceDarker,
		textColor: variant === 'secondary' ? theme.colors[color].main : '#fff',
		hoverTextColor: variant === 'secondary' ? theme.colors[color].main : '#fff',

		activeTextColor: variant === 'secondary' ? theme.colors[color].dark : theme.colors.text.title,
		disabledTextColor: variant === 'secondary' ? theme.colors[color].disabled : '#fff',
		disabledBackgroundColor:
			variant === 'secondary' ? theme.colors[color].surfaceSubtle : theme.colors.neutral.surfaceSubtle,
	};
};
