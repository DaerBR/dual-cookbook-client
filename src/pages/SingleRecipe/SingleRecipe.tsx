import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { faPencilAlt, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipeDetails } from '../../store/thunks/recipes.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Icon } from '../../components/atoms/Icon';
import { FieldsGroupTitle } from '../../components/FieldsGroupTitle';
import { useAppTheme } from '../../styles/hooks.ts';
import { Typography } from '../../components/atoms/Typography';

export const SingleRecipe = () => {
	const { id: recipeId } = useParams();
	const recipeDetails = useAppSelector((state) => state.recipes.recipeDetails.recipeData);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const isFetchingRecipeDetails = useAppSelector((state) => state.recipes.recipeDetails.isLoading);

	const navigate = useNavigate();
	const theme = useAppTheme();

	const [dispatchFetchRecipeDetails] = useThunk(fetchRecipeDetails);

	useEffect(() => {
		if (recipeId) {
			dispatchFetchRecipeDetails({ recipeId });
		}
	}, [dispatchFetchRecipeDetails, recipeId]);

	const recipeControlButtons = isLoggedIn
		? [
				<Button
					key="edit-recipe"
					variant="primary"
					color="primary"
					onClick={() => navigate(`/edit-recipe/${recipeId}`)}
					startIcon={<Icon icon={faPencilAlt} />}
				>
					Редагувати
				</Button>,
			]
		: [];

	const { category, createdAt, recipeImage, ingredients, steps, description, createdBy, sourceUrl } =
		recipeDetails ?? {};

	return (
		<div>
			<PageTitle title={`${recipeDetails?.name ?? ''}`} controlElements={recipeControlButtons} withReturnButton />
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{isFetchingRecipeDetails ? (
					<LoadingIndicator />
				) : (
					<>
						<div css={{ textAlign: 'center' }}>
							{recipeImage?.secureUrl ? (
								<img
									src={recipeImage?.secureUrl ?? ''}
									alt={recipeDetails?.name ?? ''}
									css={{
										width: '100%',
										height: 'auto',
										borderRadius: '12px',
										marginBottom: '12px',
										maxWidth: '500px',
									}}
								/>
							) : (
								<div
									css={{
										height: '200px',
										width: '420px',
										border: '1px solid',
										borderColor: theme.colors.primary.borderDarker,
										borderRadius: '12px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Icon icon={faPizzaSlice} fontSize={48} customStyles={{ color: theme.colors.primary.borderDarker }} />
								</div>
							)}
						</div>
						<div css={{ margin: '12px 0' }}>
							{category && (
								<Typography
									color="primary"
									weight={500}
									variant="paragraphXs"
								>{`Категорія: ${category.name}`}</Typography>
							)}
						</div>
						<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
							<FieldsGroupTitle title="Опис" />
							<div>{description}</div>
						</div>
						{ingredients && (
							<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
								<FieldsGroupTitle title="Інгрідієнти" />
								{ingredients.map((ingredient) => (
									<div key={ingredient.id}>{ingredient.text}</div>
								))}
							</div>
						)}
						{steps && (
							<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
								<FieldsGroupTitle title="Інструкція" />
								{recipeDetails?.steps.map((step) => (
									<div key={step.id}>{step.stepDescription}</div>
								))}
							</div>
						)}
						{sourceUrl && (
							<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
								<FieldsGroupTitle title="Посилання на джерело" />
								<div>{sourceUrl}</div>
							</div>
						)}
						<div>
							<Typography variant="paragraphXs" color="textSubtitle">
								{createdAt && createdBy
									? `${new Date(createdAt).toLocaleDateString()} -  ${createdBy.displayName}`
									: ''}
							</Typography>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
