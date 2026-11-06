import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useMemo, useState } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { RecipeCard } from '../../components/RecipeCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Pagination } from '../../components/atoms/Pagination/Pagination.tsx';
import { categoryImageStyles, emptyStateStyles, filterRowStyles, recipesListStyles } from './styles.ts';
import { Typography } from '../../components/atoms/Typography';
import { Select } from '../../components/atoms/Select';
import { Chip } from '../../components/atoms/Chip';
import { recipeAuthorOptions } from '../../constants/recipeAuthors.ts';
import { NoImage } from '../../components/NoImage';
import { useAppTheme } from '../../styles/hooks.ts';
import { useCategory } from '../../queries/categories';
import { useRecipesList } from '../../queries/recipes';

export const SingleCategory = () => {
	const { id: categoryId } = useParams();
	const { data: selectedCategoryData } = useCategory(categoryId);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const navigate = useNavigate();

	const [recipeAuthorFilterValue, setRecipeAuthorFilterValue] = useState('');

	// The page lives in the URL (?page=2): back/forward and reloads keep it, and opening another category drops it.
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;
	const handlePageChange = (newPage: number) => setSearchParams(newPage > 1 ? { page: String(newPage) } : {});

	// Everything the request depends on goes into the params (= the query key). Changing any of them is the
	// "refetch" — there's no effect calling a fetch method.
	const recipesParams = useMemo(
		() =>
			categoryId
				? { categories: categoryId, limit: 10, page, recipeAuthor: recipeAuthorFilterValue || undefined }
				: null,
		[categoryId, page, recipeAuthorFilterValue],
	);

	const { data: recipesData, isPending: isFetchingRecipes, isPlaceholderData } = useRecipesList(recipesParams);
	const categoryRecipes = recipesData?.data ?? [];
	const categoryRecipesPagination = recipesData?.pagination;

	const handleAuthorFilterChange = (value: string) => {
		setRecipeAuthorFilterValue(value);
		handlePageChange(1);
	};

	const theme = useAppTheme();

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
			<div css={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
				{selectedCategoryData?.categoryImage ? (
					<img
						src={selectedCategoryData?.categoryImage?.secureUrl ?? ''}
						alt={selectedCategoryData?.name ?? ''}
						css={{
							...categoryImageStyles,
							boxShadow: theme.boxShadows.md,
							border: `1px solid ${theme.colors.neutral.borderDefault}`,
						}}
					/>
				) : (
					<NoImage />
				)}
			</div>
			<Typography
				variant="paragraphS"
				weight={500}
				color="textSubtitle"
				component="div"
				customStyles={{ textAlign: 'center', marginTop: '4px', marginBottom: '12px' }}
			>{`Всього рецептів в категорії: ${categoryRecipesPagination?.total ?? 0}`}</Typography>
			<div css={{ paddingTop: '12px', paddingBottom: '12px' }}>
				<Typography variant="paragraphS" weight={500}>
					Фільтрувати по:
				</Typography>
				<div css={filterRowStyles}>
					<Select
						placeholder="Автор рецепту"
						name="recipeAuthor"
						onChange={(e) => handleAuthorFilterChange(e.target.value)}
						options={recipeAuthorOptions}
						value={recipeAuthorFilterValue}
						customStyles={{
							'@media (max-width: 768px)': {
								width: '200px',
								minWidth: '200px',
							},
						}}
					/>
					{recipeAuthorFilterValue ? (
						<Chip
							color="neutral"
							text="Скинути"
							onClick={() => handleAuthorFilterChange('')}
							customStyles={{ marginLeft: '12px' }}
							isOutlined
						/>
					) : null}
				</div>
			</div>
			{/* Previous page stays visible (dimmed) while the next one loads */}
			<div css={[recipesListStyles, { opacity: isPlaceholderData ? 0.5 : 1, transition: 'opacity 0.2s' }]}>
				{isFetchingRecipes ? (
					<LoadingIndicator />
				) : categoryRecipes.length > 0 ? (
					categoryRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
				) : categoryRecipesPagination ? (
					<div css={emptyStateStyles}>
						<Typography variant="paragraphL" color="primary" weight={500}>
							Нічого не знайдено...
						</Typography>
					</div>
				) : null}
			</div>
			{categoryRecipesPagination && (
				<Pagination
					currentPage={page}
					onPageChange={handlePageChange}
					totalPages={categoryRecipesPagination.totalPages}
				/>
			)}
		</div>
	);
};
