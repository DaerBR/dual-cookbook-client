import { Toaster } from 'sonner';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon';
import { useAppTheme } from '../../../styles/hooks.ts';

export const StyledToaster = () => {
	const theme = useAppTheme();
	const toastOptions = {
		style: {
			boxShadow: theme.boxShadows.md,
		},
	};

	return (
		<Toaster
			toastOptions={toastOptions}
			icons={{
				success: <Icon icon={faCheckCircle} color="success" />,
				error: <Icon icon={faCircleXmark} color="error" />,
				info: <Icon icon={faInfoCircle} color="primary" />,
			}}
		/>
	);
};
