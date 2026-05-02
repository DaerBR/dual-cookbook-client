import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchAllCategories } from '../../store/thunks/categories.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { fetchRecipes } from '../../store/thunks/recipes.ts';
import { RecipeCard } from '../../components/RecipeCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Pagination } from '../../components/atoms/Pagination/Pagination.tsx';

export const SingleCategory = () => {
	const { id: categoryId } = useParams();
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const categoriesData = useAppSelector((state) => state.categories.categories);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const categoryRecipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const navigate = useNavigate();
	const isFetchingRecipes = useAppSelector((state) => state.recipes.isLoading);
	const categoryRecipesPagination = useAppSelector((state) => state.recipes.paginatedRecipes.pagination);

	const [dispatchFetchCategories] = useThunk(fetchAllCategories);
	const [dispatchFetchRecipes] = useThunk(fetchRecipes);

	useEffect(() => {
		if (categoryId) {
			dispatchFetchRecipes({
				categories: categoryId,
				limit: 10,
				page: 1,
			});
		}
	}, [categoryId, dispatchFetchRecipes]);

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories();
		}
	}, [areCategoriesFetched, dispatchFetchCategories]);

	const selectedCategoryData = categoriesData.find((category) => category.id === categoryId);

	const categoryButtons = isLoggedIn
		? [
				<Button
					startIcon={<Icon icon={faPencilAlt} />}
					key="edit-category-button"
					variant="outlined-primary"
					isDisabled={!categoryId}
					onClick={() => navigate(`/edit-category/${categoryId}`)}
				>
					Змінити
				</Button>,
			]
		: [];

	if (!categoryId) return null;

	return (
		<div>
			<PageTitle
				title={`Рецепти категорії ${selectedCategoryData?.name ?? ''}`}
				controlElements={categoryButtons}
				withReturnButton
				returnUrl={'/categories' as const}
			/>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{isFetchingRecipes ? (
					<LoadingIndicator />
				) : (
					categoryRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
				)}
			</div>
			{categoryRecipesPagination && (
				<Pagination
					currentPage={categoryRecipesPagination.page}
					fetchDataMethod={dispatchFetchRecipes}
					fetchParams={{ limit: 10, category: categoryId }}
					totalPages={categoryRecipesPagination.totalPages}
				/>
			)}
		</div>
	);
};
