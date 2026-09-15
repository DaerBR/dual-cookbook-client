import { useAppTheme } from '../../../styles/hooks.ts';
import { defineStyles } from '../../../styles/defineStyles.ts';

interface UseCommonFieldStylesProps {
	isFullWidth?: boolean;
}

export const useCommonFieldStyles = ({ isFullWidth }: UseCommonFieldStylesProps) => {
	const theme = useAppTheme();

	return {
		fieldStyles: defineStyles({
			minHeight: '38px',
			backgroundColor: '#fff',
			boxShadow: theme.boxShadows.xs,
			border: `1px solid ${theme.colors.neutral.borderDefault}`,
			borderRadius: '4px',
			padding: '8px 16px',
			fontSize: theme.typography.paragraphS.fontSize,
			lineHeight: theme.typography.paragraphS.lineHeight,
			color: theme.colors.text.main,
			boxSizing: 'border-box',
			width: isFullWidth ? '100%' : '300px',
			maxWidth: isFullWidth ? '100%' : '300px',
			'&:focus': {
				outline: 'none',
				borderColor: theme.colors.primary.borderLighter,
				boxShadow: '0 0 0 3px rgba(254, 186, 152, 0.20)',
			},
			'&:disabled': {
				borderColor: theme.colors.neutral.borderLighter,
				backgroundColor: theme.colors.neutral.surfaceSubtle,
				color: theme.colors.text.disabled,
			},
		}),
		errorStyles: defineStyles({
			borderColor: theme.colors.error.borderDarker,
			boxShadow: '0 0 0 3px rgba(236, 95, 81, 0.20)',
		}),
	};
};
