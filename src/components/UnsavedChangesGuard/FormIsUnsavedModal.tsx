import { faWarning } from '@fortawesome/free-solid-svg-icons';

import { Modal } from '../atoms/Modal/Modal.tsx';
import { Button } from '../atoms/Button';

interface FormIsUnsavedModalProps {
	isModalOpen: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

export const FormIsUnsavedModal = ({ isModalOpen, onCancel, onConfirm }: FormIsUnsavedModalProps) => {
	const buttons = [
		<Button key="confirm" onClick={onConfirm} color="error" fullWidth>
			Підтвердити
		</Button>,
		<Button key="cancel" variant="outlined-neutral" onClick={onCancel} fullWidth>
			Скасувати
		</Button>,
	];

	const modalContent = 'Зміни не були збережені! Ви впевнені, що хочете залишити сторінку?';

	return (
		<Modal
			title="Увага!"
			titleIcon={faWarning}
			titleIconColor="error"
			buttons={buttons}
			content={modalContent}
			isOpen={isModalOpen}
			onClose={onCancel}
		/>
	);
};
