import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { noImageContainerStyles } from './styles.ts';
import { Icon } from '../atoms/Icon';
import { useAppTheme } from '../../styles/hooks.ts';

export const NoImage = () => {
	const theme = useAppTheme();

	return (
		<div
			css={{
				...noImageContainerStyles,
				borderColor: theme.colors.primary.borderDarker,
			}}
		>
			<Icon icon={faPizzaSlice} fontSize={48} customStyles={{ color: theme.colors.primary.borderDarker }} />
		</div>
	);
};
