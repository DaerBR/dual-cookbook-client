import { useNavigate, useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { makeSelectCategoryById, useFetchAllCategoriesQuery } from '../../features/categories';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { fetchRecipes } from '../../store/thunks/recipes.ts';
import { RecipeCard } from '../../components/RecipeCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Pagination } from '../../components/atoms/Pagination/Pagination.tsx';

export const SingleCategory = () => {
	const { id: categoryId } = useParams();
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const categoryRecipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const navigate = useNavigate();
	const isFetchingRecipes = useAppSelector((state) => state.recipes.isLoading);
	const categoryRecipesPagination = useAppSelector((state) => state.recipes.paginatedRecipes.pagination);

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

	useFetchAllCategoriesQuery();
	const selectCategoryById = useMemo(() => makeSelectCategoryById(categoryId), [categoryId]);
	const selectedCategoryData = useAppSelector(selectCategoryById);

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
			{selectedCategoryData?.categoryImage && (
				<div css={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
					<img
						src={selectedCategoryData?.categoryImage?.secureUrl ?? ''}
						alt={selectedCategoryData?.name ?? ''}
						css={{
							width: '450px',
							height: 'auto',
							borderRadius: '12px',
							marginBottom: '12px',
							'@media (max-width: 768px)': {
								width: '100%',
							},
						}}
					/>
				</div>
			)}
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
					fetchParams={{ limit: 10, categories: categoryId }}
					totalPages={categoryRecipesPagination.totalPages}
				/>
			)}
		</div>
	);
};
