import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import { Typography } from '../../components/atoms/Typography';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipeDetails } from '../../store/thunks/recipes.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';

export const SingleRecipe = () => {
	const { id: recipeId } = useParams();
	const recipeDetails = useAppSelector((state) => state.recipes.recipeDetails.recipeData);
	const navigate = useNavigate();
	// TODO - global loader fix in useThunk
	const [dispatchFetchRecipeDetails] = useThunk(fetchRecipeDetails);

	useEffect(() => {
		if (recipeId) {
			dispatchFetchRecipeDetails({ recipeId });
		}
	}, [dispatchFetchRecipeDetails, recipeId]);

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>{`${recipeDetails?.name ?? ''}`}</Typography>
			<Button variant="primary" color="primary" onClick={() => navigate(`/edit-recipe/${recipeId}`)}>
				Редагувати
			</Button>
		</div>
	);
};
