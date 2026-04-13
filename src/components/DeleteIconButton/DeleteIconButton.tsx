import { CSSProperties } from 'react';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../atoms/Icon';
import { useAppTheme } from '../../styles/hooks.ts';

interface DeleteIconButtonProps {
	customStyles?: CSSProperties;
	iconFontSize?: number;
	onClick?: () => void;
}

export const DeleteIconButton = ({ onClick, iconFontSize, customStyles = {} }: DeleteIconButtonProps) => {
	const theme = useAppTheme();

	return (
		<button
			css={{
				padding: '12px',
				border: 'none',
				background: 'transparent',
				cursor: 'pointer',
				'&:hover svg': {
					color: `${theme.colors.error.main}!important`,
				},
				...customStyles,
			}}
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
