import { Link } from 'react-router-dom';
import { Typography } from '../atoms/Typography';
import { RecipeTableModel } from '../../store/types.ts';

interface RecipeCardProps {
	recipe: RecipeTableModel;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const { id } = recipe;

	return (
		<Link to={`/recipe/${id}`} css={{ textDecoration: 'none', color: 'inherit', marginBottom: '20px' }}>
			<div css={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex' }}>
				<div
					css={{
						display: 'flex',
						justifyContent: 'center',
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
		</Link>
	);
};
