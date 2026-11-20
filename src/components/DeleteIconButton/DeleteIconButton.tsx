import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../atoms/Icon';
import { useAppTheme } from '../../styles/hooks.ts';
import { defineStyles } from '../../styles/defineStyles.ts';
import type { SpacingStyles } from '../../styles/spacing.ts';

interface DeleteIconButtonProps {
	customStyles?: SpacingStyles;
	iconFontSize?: number;
	onClick?: () => void;
}

export const DeleteIconButton = ({ onClick, iconFontSize, customStyles = {} }: DeleteIconButtonProps) => {
	const theme = useAppTheme();

	return (
		<button
			type="button"
			css={defineStyles({
				padding: 3,
				border: 'none',
				background: 'transparent',
				cursor: 'pointer',
				'&:hover svg': {
					color: `${theme.colors.error.main}!important`,
				},
				...customStyles,
			})}
			onClick={onClick}
		>
			<Icon
				icon={faXmarkCircle}
				fontSize={iconFontSize ?? 14}
				customStyles={{ color: theme.colors.error.surfaceLighter }}
			/>
		</button>
	);
};
