import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { ModalControls } from '../../../components/atoms/Modal/types.ts';
import { Modal } from '../../../components/atoms/Modal/Modal.tsx';
import { Button } from '../../../components/atoms/Button';
import { useDeleteCategory } from '../../../queries/categories';

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
	const { mutate: deleteCategory } = useDeleteCategory();
	const navigate = useNavigate();

	const handleCloseModal = () => closeModalHandler(false);

	const handleDeleteCategory = () => {
		// Per-call callbacks run after the hook-level ones (i.e. after the categories list is invalidated/refetched)
		deleteCategory(
			{ categoryId },
			{
				onSuccess: () => {
					toast.success('Категорія видалена');
					navigate('/categories');
				},
			},
		);
		closeModalHandler(false);
	};

	const buttons = [
		<Button onClick={handleDeleteCategory} variant="primary" color="error" key="confirm" fullWidth>
			Видалити
		</Button>,
		<Button onClick={handleCloseModal} variant="outlined-neutral" key="cancel" fullWidth>
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
