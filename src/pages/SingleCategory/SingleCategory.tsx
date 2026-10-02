import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
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
import { categoryImageStyles } from './styles.ts';
import { Typography } from '../../components/atoms/Typography';
import { Select } from '../../components/atoms/Select';
import { Chip } from '../../components/atoms/Chip';
import { recipeAuthorOptions } from '../../constants/recipeAuthors.ts';

export const SingleCategory = () => {
	const { id: categoryId } = useParams();
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const categoriesData = useAppSelector((state) => state.categories.categories);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const categoryRecipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const navigate = useNavigate();
	const isFetchingRecipes = useAppSelector((state) => state.recipes.isLoading);
	const categoryRecipesPagination = useAppSelector((state) => state.recipes.paginatedRecipes.pagination);

	const [recipeAuthorFilterValue, setRecipeAuthorFilterValue] = useState('');

	const [dispatchFetchCategories] = useThunk(fetchAllCategories);
	const [dispatchFetchRecipes] = useThunk(fetchRecipes);

	useEffect(() => {
		if (categoryId) {
			dispatchFetchRecipes({
				categories: categoryId,
				limit: 10,
				page: 1,
				recipeAuthor: recipeAuthorFilterValue || undefined,
			});
		}
	}, [categoryId, recipeAuthorFilterValue, dispatchFetchRecipes]);

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
				title={`Рецепти категорії "${selectedCategoryData?.name ?? ''}"`}
				controlElements={categoryButtons}
				withReturnButton
				returnUrl={'/categories' as const}
			/>
			{selectedCategoryData?.categoryImage && (
				<>
					<div css={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
						<img
							src={selectedCategoryData?.categoryImage?.secureUrl ?? ''}
							alt={selectedCategoryData?.name ?? ''}
							css={categoryImageStyles}
						/>
					</div>
					<Typography
						variant="paragraphS"
						weight={500}
						color="textSubtitle"
						component="div"
						customStyles={{ textAlign: 'center', marginTop: '4px', marginBottom: '12px' }}
					>{`Всього рецептів в категорії: ${categoryRecipesPagination?.total ?? 0}`}</Typography>
				</>
			)}
			<div css={{ paddingTop: '12px', paddingBottom: '12px' }}>
				<Typography variant="paragraphS" weight={500}>
					Фільтрувати по:
				</Typography>
				<div css={{ display: 'flex', width: '100%', paddingTop: '12px', alignItems: 'center' }}>
					<Select
						placeholder="Автор рецепту"
						name="recipeAuthor"
						onChange={(e) => {
							setRecipeAuthorFilterValue(e.target.value);
						}}
						options={recipeAuthorOptions}
						value={recipeAuthorFilterValue}
					/>
					{recipeAuthorFilterValue ? (
						<Chip
							color="neutral"
							text="Скинути"
							onClick={() => setRecipeAuthorFilterValue('')}
							customStyles={{ marginLeft: '12px' }}
							isOutlined
						/>
					) : null}
				</div>
			</div>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{isFetchingRecipes ? (
					<LoadingIndicator />
				) : categoryRecipes.length > 0 ? (
					categoryRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
				) : categoryRecipesPagination ? (
					<div css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant="paragraphL" color="primary" weight={500}>
							Нічого не знайдено...
						</Typography>
					</div>
				) : null}
			</div>
			{categoryRecipesPagination && (
				<Pagination
					currentPage={categoryRecipesPagination.page}
					fetchDataMethod={dispatchFetchRecipes}
					fetchParams={{ limit: 10, categories: categoryId, recipeAuthor: recipeAuthorFilterValue || undefined }}
					totalPages={categoryRecipesPagination.totalPages}
				/>
			)}
		</div>
	);
};
