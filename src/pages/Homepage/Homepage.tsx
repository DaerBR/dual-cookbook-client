import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import { Button } from '../../components/atoms/Button';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchRecipes } from '../../store/thunks/recipes.ts';
import { Typography } from '../../components/atoms/Typography';

export const Homepage = () => {
	const navigate = useNavigate();
	const recipes = useAppSelector((state) => state.recipes.paginatedRecipes.recipesList);
	const [dispatchFetchRecipes] = useThunk(fetchRecipes);

	useEffect(() => {
		dispatchFetchRecipes();
	}, [dispatchFetchRecipes]);

	return (
		<div>
			<PageTitle title="Головна сторінка" />
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
				Останні рецепти:
			</Typography>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				{recipes.map((recipe) => (
					<div
						key={recipe.id}
						css={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex' }}
					>
						<div
							css={{
								display: 'flex',
								justifyContent: 'center',
								marginBottom: '12px',
								backgroundImage: `url(${recipe.recipeImage?.secureUrl ?? ''})`,
								backgroundSize: 'contain',
								width: '300px',
								height: '200px',
								borderRadius: '8px',
								backgroundPosition: 'center',
							}}
						/>
						<div css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<Typography variant="paragraphM" weight={700}>
								{recipe.name}
							</Typography>
							<Typography variant="paragraphXs" weight={500} color="primary">
								{recipe.category?.name ?? ''}
							</Typography>
							<Typography variant="paragraphS" weight={400} color="textSubtitle">
								{recipe.description ?? ''}
							</Typography>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
