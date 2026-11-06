import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { ModalControls } from '../../../components/atoms/Modal/types.ts';
import { Modal } from '../../../components/atoms/Modal/Modal.tsx';
import { Button } from '../../../components/atoms/Button';
import { useDeleteRecipe } from '../../../queries/recipes';

interface DeleteRecipeModalProps extends ModalControls {
	categoryId: string;
	recipeId: string;
}

export const DeleteRecipeModal = ({ categoryId, recipeId, isModalOpen, closeModalHandler }: DeleteRecipeModalProps) => {
	const { mutate: deleteRecipe } = useDeleteRecipe();
	const navigate = useNavigate();

	const handleCloseModal = () => closeModalHandler(false);

	const handleDeleteRecipe = () => {
		deleteRecipe(
			{ recipeId },
			{
				onSuccess: () => {
					toast.success('Рецепт видалено');
					navigate(`/category/${categoryId}`);
				},
			},
		);
		closeModalHandler(false);
	};

	const buttons = [
		<Button onClick={handleDeleteRecipe} variant="primary" color="error" key="confirm" fullWidth>
			Видалити
		</Button>,
		<Button onClick={handleCloseModal} variant="outlined-neutral" key="cancel" fullWidth>
			Скасувати
		</Button>,
	];

	const modalContent = <div>Цей рецепт буде видалений безповоротно. Ви впевнені, що хочете продовжити?</div>;

	return (
		<Modal
			title="Видалити рецепт?"
			titleIcon={faTrash}
			titleIconColor="error"
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			buttons={buttons}
			content={modalContent}
		/>
	);
};
