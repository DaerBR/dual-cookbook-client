import { Toaster } from 'sonner';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon';
import { themeShadow } from '../../../styles/shadowTokens.ts';

const toastOptions = {
	style: {
		boxShadow: themeShadow('md'),
	},
};

export const StyledToaster = () => (
	<Toaster
		toastOptions={toastOptions}
		icons={{
			success: <Icon icon={faCheckCircle} color="success" />,
			error: <Icon icon={faCircleXmark} color="error" />,
			info: <Icon icon={faInfoCircle} color="primary" />,
		}}
	/>
);
