import { useAppTheme } from '../../../styles/hooks.ts';
import { Colors, Variants } from './types.ts';

interface UseButtonColorsProps {
	color: Colors;
	variant: Variants;
}

export const useButtonColors = ({ color, variant }: UseButtonColorsProps) => {
	const theme = useAppTheme();

	return {
		backgroundColor:
			variant === 'outlined'
				? '#fff'
				: variant === 'secondary'
					? theme.colors[color].surfaceSubtle
					: theme.colors[color].surfaceDefault,

		hoverBackgroundColor:
			variant === 'outlined'
				? '#fff'
				: variant === 'secondary'
					? theme.colors[color].surfaceLighter
					: theme.colors[color].surfaceMedium,
		activeBackgroundColor:
			variant === 'outlined'
				? '#fff'
				: variant === 'secondary'
					? theme.colors[color].surfaceSubtle
					: theme.colors[color].surfaceDarker,
		textColor:
			variant === 'outlined' ? theme.colors.text.title : variant === 'secondary' ? theme.colors[color].main : '#fff',
		hoverTextColor:
			variant === 'outlined' ? theme.colors.text.subtitle : variant === 'secondary' ? theme.colors[color].main : '#fff',

		activeTextColor:
			variant === 'outlined'
				? theme.colors.text.title
				: variant === 'secondary'
					? theme.colors[color].dark
					: theme.colors.text.title,
		disabledTextColor:
			variant === 'outlined'
				? theme.colors.text.disabled
				: variant === 'secondary'
					? theme.colors[color].disabled
					: '#fff',
		disabledBackgroundColor:
			variant === 'outlined'
				? '#fff'
				: variant === 'secondary'
					? theme.colors[color].surfaceSubtle
					: theme.colors.neutral.surfaceSubtle,
	};
};
