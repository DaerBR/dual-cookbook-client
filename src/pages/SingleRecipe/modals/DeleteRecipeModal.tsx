import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ModalControls } from '../../../components/atoms/Modal/types.ts';
import { Modal } from '../../../components/atoms/Modal/Modal.tsx';
import { Button } from '../../../components/atoms/Button';
import { useThunk } from '../../../store/hooks/useThunk.ts';
import { deleteRecipe } from '../../../store/thunks/recipes.ts';

interface DeleteRecipeModalProps extends ModalControls {
	categoryId: string;
	recipeId: string;
}

export const DeleteRecipeModal = ({ categoryId, recipeId, isModalOpen, closeModalHandler }: DeleteRecipeModalProps) => {
	const [dispatchDeleteRecipe] = useThunk(deleteRecipe, {
		useGlobalLoader: true,
		successRedirectRoute: `/category/${categoryId}`,
		successMessage: `Рецепт видалено`,
	});

	const handleCloseModal = () => closeModalHandler(false);

	const handleDeleteRecipe = () => {
		dispatchDeleteRecipe({
			recipeId,
		});
		closeModalHandler(false);
	};

	const buttons = [
		<Button onClick={handleDeleteRecipe} variant="primary" color="error" key="confirm" fullWidth>
			Видалити
		</Button>,
		<Button onClick={handleCloseModal} variant="outlined" key="cancel" fullWidth>
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
