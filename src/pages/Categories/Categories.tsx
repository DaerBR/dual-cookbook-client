import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchAllCategories } from '../../store/thunks/categories.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { CategoryCard } from './copmponents/CategoryCard.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const Categories = () => {
	const categoriesList = useAppSelector((state) => state.categories.categories);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const isFetchingCategories = useAppSelector((state) => state.categories.isLoading);

	const navigate = useNavigate();

	const [dispatchFetchCategories] = useThunk(fetchAllCategories);

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories();
		}
	}, [dispatchFetchCategories, areCategoriesFetched]);

	return (
		<div>
			<PageTitle
				title="Всі категорії"
				controlElements={
					isLoggedIn
						? [
								<Button
									key="create-cat-button"
									onClick={() => navigate('/create-new-category')}
									variant="secondary"
									startIcon={<Icon icon={faPlus} />}
								>
									Створити категорію
								</Button>,
							]
						: undefined
				}
			/>
			<div css={{ display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
				{isFetchingCategories ? (
					<LoadingIndicator />
				) : (
					categoriesList.map((category) => <CategoryCard category={category} key={category.id} />)
				)}
			</div>
		</div>
	);
};
