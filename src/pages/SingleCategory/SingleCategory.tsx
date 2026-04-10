import { useParams } from 'react-router';
import { useEffect } from 'react';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchCategories } from '../../store/thunks/categories.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';

export const SingleCategory = () => {
	const { id: categoryId } = useParams();
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const categoriesData = useAppSelector((state) => state.categories.categories);
	const [dispatchFetchCategories] = useThunk(fetchCategories, {
		useGlobalLoader: true,
	});

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories({
				page: 1,
				limit: 99,
			});
		}
	}, [areCategoriesFetched, dispatchFetchCategories]);

	const selectedCategoryData = categoriesData.find((category) => category.id === categoryId);

	const categoryButtons = [
		<Button startIcon={<Icon icon={faPencilAlt} />} key="edit-button" variant="primary">
			Редагувати категорію
		</Button>,
		<Button startIcon={<Icon icon={faPlus} />} key="edit-button" variant="primary" color="primary">
			Додати рецепт в категорію
		</Button>,
		<Button startIcon={<Icon icon={faTrash} />} key="delete-button" variant="primary" color="error">
			Видалити
		</Button>,
	];

	if (!categoryId) return null;

	return (
		<div>
			<PageTitle
				title={selectedCategoryData?.name ?? ''}
				controlElements={categoryButtons}
				withReturnButton
				returnUrl={'/categories' as const}
			/>
		</div>
	);
};
