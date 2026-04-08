import { jsx } from '@emotion/react';
import { useAppTheme } from '../../../styles/hooks.ts';
import { TypographyProps } from './types.ts';

export const Typography = ({
	color = 'textMain',
	children,
	css,
	variant = 'paragraphM',
	weight = 400,
	component = 'span',
}: TypographyProps) => {
	const theme = useAppTheme();
	const fontStyles = theme.typography[variant];

	const typographyColors = {
		primary: theme.colors.primary.main,
		success: theme.colors.success.main,
		error: theme.colors.error.main,
		neutral: theme.colors.neutral.main,
		textMain: theme.colors.text.main,
		textTitle: theme.colors.text.title,
		textSubtitle: theme.colors.text.subtitle,
		textDisabled: theme.colors.text.disabled,
		textCaption: theme.colors.text.caption,
		textContrast: theme.colors.text.contrast,
	};

	const typographyStyles = { ...fontStyles, color: typographyColors[color], fontWeight: weight };

	return jsx(component, {
		css: { ...typographyStyles, ...css },
		children,
	});
};
