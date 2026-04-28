import { useEffect } from 'react';

import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipes } from '../../store/thunks/recipes.ts';
import { Typography } from '../../components/atoms/Typography';
import { RecipeCard } from '../../components/RecipeCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const Homepage = () => {
	const recipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const isFetchingRecipes = useAppSelector((state) => state.recipes.isLoading);
	const [dispatchFetchRecipes] = useThunk(fetchRecipes);

	useEffect(() => {
		dispatchFetchRecipes({
			limit: 10,
			page: 1,
		});
	}, [dispatchFetchRecipes]);

	return (
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
	);
};
