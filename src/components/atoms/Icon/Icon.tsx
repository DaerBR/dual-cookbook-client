import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { CSSProperties } from 'react';
import { useAppTheme } from '../../../styles/hooks.ts';
import { IconColor } from './types.ts';

interface IconProps {
	color?: IconColor;
	customStyles?: CSSProperties;
	fontSize?: number;
	icon: IconDefinition;
}

export const Icon = ({ customStyles = {}, icon, color = 'neutral', fontSize = 14 }: IconProps) => {
	const theme = useAppTheme();

	return (
		<FontAwesomeIcon
			icon={icon}
			color={color === 'white' ? '#fff' : color === 'neutral' ? theme.colors.text.main : theme.colors[color].main}
			fontSize={fontSize}
			style={{ ...customStyles }}
		/>
	);
};
