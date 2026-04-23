import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipeDetails } from '../../store/thunks/recipes.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const SingleRecipe = () => {
	const { id: recipeId } = useParams();
	const recipeDetails = useAppSelector((state) => state.recipes.recipeDetails.recipeData);
	const userData = useAppSelector((state) => state.auth.userData);
	const isFetchingRecipeDetails = useAppSelector((state) => state.recipes.recipeDetails.isLoading);
	const navigate = useNavigate();
	const [dispatchFetchRecipeDetails] = useThunk(fetchRecipeDetails);

	useEffect(() => {
		if (recipeId) {
			dispatchFetchRecipeDetails({ recipeId });
		}
	}, [dispatchFetchRecipeDetails, recipeId]);

	const recipeControlButtons = userData
		? [
				<Button
					key="edit-recipe"
					variant="primary"
					color="primary"
					onClick={() => navigate(`/edit-recipe/${recipeId}`)}
				>
					Редагувати
				</Button>,
			]
		: [];

	return (
		<div>
			<PageTitle title={`${recipeDetails?.name ?? ''}`} controlElements={recipeControlButtons} />
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{isFetchingRecipeDetails ? <LoadingIndicator /> : <div>{recipeDetails?.name}</div>}
			</div>
		</div>
	);
};
