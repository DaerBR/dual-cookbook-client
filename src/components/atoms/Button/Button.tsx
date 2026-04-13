import type { CSSObject } from '@emotion/react';
import { ReactNode, SyntheticEvent } from 'react';

import { Colors, Variants } from './types';
import { useAppTheme } from '../../../styles/hooks.ts';
import { useButtonColors } from './hooks.ts';
import { buttonStyles } from './styles.ts';
import { CircularProgress } from '../CircularProgress';

interface ButtonProps {
	children: string | ReactNode;
	color?: Colors;
	customStyles?: CSSObject;
	endIcon?: ReactNode;
	id?: string;
	isBusy?: boolean;
	isDisabled?: boolean;
	onClick?: (arg: SyntheticEvent) => void;
	startIcon?: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	variant?: Variants;
}

export const Button = ({
	children,
	customStyles,
	color = 'primary',
	id,
	isBusy,
	isDisabled,
	onClick,
	type = 'button',
	variant = 'primary',
	startIcon,
	endIcon,
	...otherProps
}: ButtonProps) => {
	const theme = useAppTheme();
	const buttonColors = useButtonColors({ variant: variant ?? 'primary', color: color ?? 'primary' });
	const configurableButtonStyles: CSSObject = {
		fontSize: theme.typography.paragraphS.fontSize,
		lineHeight: theme.typography.paragraphS.lineHeight,
		padding: '10px 28px',
		height: '40px',
		backgroundColor: buttonColors.backgroundColor,
		color: buttonColors.textColor,
		'& .start-icon-container svg, & .end-icon-container svg, ': { color: buttonColors.textColor },
		'&:hover': {
			backgroundColor: buttonColors.hoverBackgroundColor,
			color: buttonColors.hoverTextColor,
			'& .start-icon-container svg, & .end-icon-container svg': { color: buttonColors.hoverTextColor },
		},
		'&:active': {
			backgroundColor: buttonColors.activeBackgroundColor,
			color: buttonColors.activeTextColor,
			borderColor: variant === 'outlined' ? theme.colors.neutral.borderDarker : 'none',
			'& .start-icon-container svg, & .end-icon-container svg': { color: buttonColors.activeTextColor },
		},
		border: variant === 'outlined' ? `1px solid ${theme.colors.neutral.borderDefault}` : 'none',
		boxShadow: variant === 'outlined' ? theme.boxShadows.xs : 'none',
		'&:disabled': {
			pointerEvents: 'none',
			boxShadow: variant === 'outlined' ? theme.boxShadows.xs : 'none',
			color: buttonColors.disabledTextColor,
			backgroundColor: buttonColors.disabledBackgroundColor,
			cursor: 'default',
			'& .start-icon-container svg, & .end-icon-container svg': { color: buttonColors.disabledTextColor },
		},
	};

	return (
		<button
			css={{ ...buttonStyles, ...configurableButtonStyles, boxSizing: 'border-box', ...customStyles }}
			id={id}
			onClick={onClick}
			disabled={isDisabled}
			type={type}
			{...otherProps}
		>
			{startIcon && !isBusy && <span className="start-icon-container">{startIcon}</span>}
			{isBusy ? (
				<CircularProgress
					sizePx={16}
					color={variant === 'outlined' ? 'neutral' : variant === 'primary' ? 'white' : color}
				/>
			) : (
				children
			)}
			{endIcon && !isBusy && <span className="end-icon-container">{endIcon}</span>}
		</button>
	);
};
