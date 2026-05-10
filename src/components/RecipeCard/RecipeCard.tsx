import { Link } from 'react-router-dom';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import { RecipeTableModel } from '../../store/types.ts';
import { Chip } from '../atoms/Chip';
import { Icon } from '../atoms/Icon';
import { useAppTheme } from '../../styles/hooks.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useRecipeCardStyles } from './styles.ts';

interface RecipeCardProps {
	recipe: RecipeTableModel;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const { id } = recipe;
	const theme = useAppTheme();

	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	const { descriptionWrapperStyles, editButtonStyles, imageWrapperStyles, wrapperStyles } = useRecipeCardStyles();

	const navigate = useNavigate();

	const { categories } = recipe;

	return (
		<span css={{ position: 'relative', marginBottom: '16px' }}>
			<Link to={`/recipe/${id}`} css={{ textDecoration: 'none', color: 'inherit' }}>
				<div css={wrapperStyles}>
					<div css={imageWrapperStyles}>
						{recipe.recipeImage?.secureUrl ? (
							<div
								css={{
									backgroundImage: `url(${recipe.recipeImage?.secureUrl})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									height: '100%',
									width: '100%',
									borderRadius: '8px',
								}}
							/>
						) : (
							// <img src={recipe.recipeImage?.secureUrl} alt={recipe.name} css={{ height: '100%' }} />
							<img src="/logo-images/bear-cooks.png" alt={recipe.name} css={{ height: '100%', opacity: 0.2 }} />
						)}
					</div>
					<div css={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', position: 'relative' }}>
						<Typography variant="paragraphM" weight={700}>
							{recipe.name}
						</Typography>
						<div css={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
							{categories.map((category) => (
								<Chip key={category.id} color="primary" size="sm" text={category?.name ?? ''} />
							))}
						</div>
						<Typography variant="paragraphS" weight={400} color="textSubtitle" customStyles={descriptionWrapperStyles}>
							{recipe.description ?? ''}
						</Typography>
						<Typography variant="paragraphXs" weight={400} color="textCaption">
							<Typography variant="paragraphXs" color="textSubtitle">
								{recipe.createdAt ? `Додано ${new Date(recipe.createdAt).toLocaleDateString()}` : ''}
							</Typography>
						</Typography>
					</div>
				</div>
			</Link>
			{isLoggedIn && (
				<button
					type="button"
					css={editButtonStyles}
					onClick={() => {
						navigate(`/edit-recipe/${id}`);
					}}
				>
					<Icon icon={faPencilAlt} color="primary" customStyles={{ color: theme.colors.primary.main }} fontSize={12} />
				</button>
			)}
		</span>
	);
};
