import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { noImageContainerStyles } from './styles.ts';
import { Icon } from '../atoms/Icon';
import { themeColor } from '../../styles/colorTokens.ts';

export const NoImage = () => (
	<div css={noImageContainerStyles}>
		<Icon icon={faPizzaSlice} fontSize={48} customStyles={{ color: themeColor('primary.borderDarker') }} />
	</div>
);
