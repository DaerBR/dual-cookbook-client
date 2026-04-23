import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import { Button } from '../../components/atoms/Button';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipes } from '../../store/thunks/recipes.ts';
import { Typography } from '../../components/atoms/Typography';
import { RecipeCard } from '../../components/RecipeCard';

export const Homepage = () => {
	const navigate = useNavigate();
	const recipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const [dispatchFetchRecipes] = useThunk(fetchRecipes);

	useEffect(() => {
		dispatchFetchRecipes({
			limit: 10,
			page: 1,
		});
	}, [dispatchFetchRecipes]);

	return (
		<div>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
				<Button variant="secondary" onClick={() => navigate('/categories')}>
					Перейти до категорій
				</Button>
			</div>
			<Typography
				variant="paragraphL"
				weight={500}
				color="textSubtitle"
				customStyles={{ marginTop: '24px' }}
				component="div"
			>
				Нещодавні рецепти:
			</Typography>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};
