import { CSSProperties } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon';

interface BackIconButtonProps {
	color?: 'primary' | 'success' | 'error' | 'white' | 'neutral';
	customStyles?: CSSProperties;
	iconFontSize?: number;
	onClick?: () => void;
}

export const BackIconButton = ({
	onClick,
	color = 'neutral',
	iconFontSize,
	customStyles = {},
}: BackIconButtonProps) => (
	<button
		css={{ padding: '12px', border: 'none', background: 'transparent', cursor: 'pointer', ...customStyles }}
		onClick={onClick}
	>
		<Icon icon={faArrowLeft} fontSize={iconFontSize ?? 18} color={color} />
	</button>
);
