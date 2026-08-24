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
import { categoriesContainerStyles } from './styles.ts';

export const AllCategories = () => {
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
									Додати категорію
								</Button>,
							]
						: undefined
				}
			/>
			<div css={categoriesContainerStyles}>
				{isFetchingCategories ? (
					<LoadingIndicator />
				) : (
					categoriesList.map((category) => <CategoryCard category={category} key={category.id} />)
				)}
			</div>
		</div>
	);
};
