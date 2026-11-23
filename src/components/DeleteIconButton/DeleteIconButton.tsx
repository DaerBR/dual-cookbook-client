import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../atoms/Icon';
import { defineStyles } from '../../styles/defineStyles.ts';
import type { ThemeStyles } from '../../styles/themeStyles.ts';
import { themeColor } from '../../styles/colorTokens.ts';

interface DeleteIconButtonProps {
	customStyles?: ThemeStyles;
	iconFontSize?: number;
	onClick?: () => void;
}

export const DeleteIconButton = ({ onClick, iconFontSize, customStyles = {} }: DeleteIconButtonProps) => (
	<button
		type="button"
		css={defineStyles({
			padding: 3,
			border: 'none',
			background: 'transparent',
			cursor: 'pointer',
			'&:hover svg': {
				color: `${themeColor('error.main')}!important`,
			},
			...customStyles,
		})}
		onClick={onClick}
	>
		<Icon
			icon={faXmarkCircle}
			fontSize={iconFontSize ?? 14}
			customStyles={{ color: themeColor('error.surfaceLighter') }}
		/>
	</button>
);
