import { useAppTheme } from '../../../styles/hooks.ts';
import { defineStyles } from '../../../styles/defineStyles.ts';
import { Colors } from './types.ts';

interface UseCheckboxStylesProps {
	color: Colors;
	isDisabled?: boolean;
}

export const useCheckboxStyles = ({ color, isDisabled }: UseCheckboxStylesProps) => {
	const theme = useAppTheme();
	const palette = theme.colors[color];

	return {
		wrapperStyles: defineStyles({
			position: 'relative',
			display: 'inline-flex',
			alignItems: 'flex-start',
			gap: '8px',
			cursor: isDisabled ? 'default' : 'pointer',
			userSelect: 'none',
		}),
		inputStyles: defineStyles({
			position: 'absolute',
			opacity: 0,
			width: 0,
			height: 0,
			margin: 0,
		}),
		checkmarkStyles: defineStyles({
			position: 'relative',
			flexShrink: 0,
			width: '18px',
			height: '18px',
			marginTop: '1px',
			boxSizing: 'border-box',
			borderRadius: '4px',
			border: `1px solid ${isDisabled ? theme.colors.neutral.borderDefault : theme.colors.neutral.borderDarker}`,
			backgroundColor: isDisabled ? theme.colors.neutral.surfaceSubtle : '#fff',
			boxShadow: theme.boxShadows.xs,
			transition: 'background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
			'&::after': {
				content: '""',
				position: 'absolute',
				display: 'none',
				left: '5px',
				top: '1px',
				width: '4px',
				height: '9px',
				border: `solid ${theme.colors.text.contrast}`,
				borderWidth: '0 2px 2px 0',
				transform: 'rotate(45deg)',
			},
			'input:checked ~ &': {
				backgroundColor: isDisabled ? palette.disabled : palette.surfaceDefault,
				borderColor: isDisabled ? palette.disabled : palette.surfaceDefault,
			},
			'input:checked ~ &::after': {
				display: 'block',
			},
			'input:focus-visible ~ &': {
				boxShadow: `0 0 0 3px ${palette.surfaceSubtle}`,
			},
			...(!isDisabled && {
				'label:hover > input:not(:checked) ~ &': {
					borderColor: palette.borderDarker,
					backgroundColor: palette.surfaceSubtle,
				},
				'label:hover > input:checked ~ &': {
					backgroundColor: palette.surfaceMedium,
					borderColor: palette.surfaceMedium,
				},
			}),
		}),
	};
};
