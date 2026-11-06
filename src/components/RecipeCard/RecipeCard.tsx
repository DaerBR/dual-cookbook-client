import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import type { RecipeTableModel } from '../../queries/recipes';
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

	const {
		chipsWrapperStyles,
		descriptionWrapperStyles,
		editButtonStyles,
		imageWrapperStyles,
		placeholderImageStyles,
		titleCustomStyles,
		wrapperStyles,
		infoSectionStyles,
	} = useRecipeCardStyles();

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
									minWidth: '100%',
									boxShadow: theme.boxShadows.xs,
								}}
							/>
						) : (
							<div role="img" aria-label={recipe.recipeTitle} css={placeholderImageStyles} />
						)}
					</div>
					<div css={infoSectionStyles}>
						<Typography variant="paragraphM" weight={700} customStyles={titleCustomStyles}>
							{recipe.recipeTitle}
						</Typography>
						<div css={chipsWrapperStyles}>
							{categories.map((category) => (
								<Chip truncateWidth={110} key={category.id} color="primary" size="sm" text={category?.name ?? ''} />
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
