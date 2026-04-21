import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ModalControls } from '../../../components/atoms/Modal/types.ts';
import { Modal } from '../../../components/atoms/Modal/Modal.tsx';
import { Button } from '../../../components/atoms/Button';

interface DeleteCategoryModalProps extends ModalControls {
	categoryId: string;
	categoryName: string;
}

export const DeleteCategoryModal = ({
	categoryId,
	categoryName,
	isModalOpen,
	closeModalHandler,
}: DeleteCategoryModalProps) => {
	const handleCloseModal = () => closeModalHandler(false);

	const handleDeleteCategory = () => {
		console.info('Delete category clicked', categoryId);
		closeModalHandler(false);
	};

	const buttons = [
		<Button onClick={handleDeleteCategory} variant="primary" color="error" key="confirm" fullWidth>
			Видалити
		</Button>,
		<Button onClick={handleCloseModal} variant="outlined" key="cancel" fullWidth>
			Скасувати
		</Button>,
	];

	const modalContent = <div>Ця дія неможлива, якщо існують рецепти, в яких використовується ця категорія.</div>;

	return (
		<Modal
			title={`Видалити категорію "${categoryName}"?`}
			titleIcon={faTrash}
			titleIconColor="error"
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			buttons={buttons}
			content={modalContent}
		/>
	);
};
