import { useRecipesList } from '../../queries/recipes';
import type { FetchRecipesParams } from '../../queries/recipes';
import { Typography } from '../../components/atoms/Typography';
import { RecipeCard } from '../../components/RecipeCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';

// Module-level constant = stable reference for the hook's prefetch effect
const RECENT_RECIPES_PARAMS: FetchRecipesParams = { limit: 10, page: 1 };

export const Homepage = () => {
	const { data, isPending: isFetchingRecipes } = useRecipesList(RECENT_RECIPES_PARAMS);
	const recipes = data?.data ?? [];
	const totalRecipesNumber = data?.pagination?.total;

	return (
		<>
			<div css={{ marginBottom: '12px' }}>
				{totalRecipesNumber && (
					<Typography
						variant="paragraphL"
						weight={500}
						color="primary"
					>{`Всього рецептів: ${totalRecipesNumber}`}</Typography>
				)}
			</div>
			<div>
				<Typography variant="paragraphL" weight={500} color="textSubtitle" component="div">
					Нещодавні рецепти:
				</Typography>
				{isFetchingRecipes ? (
					<LoadingIndicator />
				) : (
					<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
						{recipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				)}
			</div>
		</>
	);
};
