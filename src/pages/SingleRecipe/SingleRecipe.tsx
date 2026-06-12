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
import { Chip } from '../../components/atoms/Chip';
import { editRecipeButtonStyles, mobileEditRecipeButtonStyles } from './styles.ts';

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
					customStyles={editRecipeButtonStyles}
				>
					Редагувати
				</Button>,
				<Button
					key="edit-recipe-mobile"
					variant="outlined-primary"
					color="primary"
					onClick={() => navigate(`/edit-recipe/${recipeId}`)}
					customStyles={mobileEditRecipeButtonStyles}
				>
					<Icon icon={faPencilAlt} color="primary" />
				</Button>,
			]
		: [];

	const { categories, createdAt, recipeImage, ingredients, steps, description, createdBy, sourceUrl } =
		recipeDetails ?? {};

	return (
		<div>
			<PageTitle title={`${recipeDetails?.name ?? ''}`} controlElements={recipeControlButtons} withReturnButton />
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{isFetchingRecipeDetails ? (
					<LoadingIndicator />
				) : (
					<>
						<div css={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
										borderRadius: '12px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										borderColor: theme.colors.primary.borderDarker,
									}}
								>
									<Icon icon={faPizzaSlice} fontSize={48} customStyles={{ color: theme.colors.primary.borderDarker }} />
								</div>
							)}
						</div>
						{categories && (
							<div css={{ margin: '12px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
								<Typography variant="paragraphM" weight={600}>
									Категорії:{' '}
								</Typography>
								{categories.map((category) => (
									<Chip key={category.id} color="primary" size="md" text={category?.name ?? ''} />
								))}
							</div>
						)}
						<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
							<FieldsGroupTitle title="Опис" />
							<div>{description}</div>
						</div>
						{ingredients && (
							<div css={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
								<FieldsGroupTitle title="Інгредієнти" />
								<ul css={{ listStyleType: 'circle', paddingLeft: '12px' }}>
									{ingredients.map((ingredient) => (
										<li css={{ marginBottom: '12px' }} key={ingredient.id}>
											{ingredient.text}
										</li>
									))}
								</ul>
							</div>
						)}
						{steps && (
							<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
								<FieldsGroupTitle title="Інструкція" />
								<ol css={{ paddingLeft: '12px' }}>
									{recipeDetails?.steps.map((step) => (
										<li css={{ marginBottom: '12px' }} key={step.id}>
											{step.stepDescription}
										</li>
									))}
								</ol>
							</div>
						)}
						{sourceUrl && (
							<div css={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
								<Typography variant="paragraphS" weight={600}>
									Посилання:
									<span css={{ marginLeft: '4px' }} />
									<a
										href={sourceUrl}
										css={{ textDecoration: 'none', color: theme.colors.primary.main }}
										target="_blank"
										rel="noopener noreferrer"
									>
										{sourceUrl}
									</a>
								</Typography>
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
