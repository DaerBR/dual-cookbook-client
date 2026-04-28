import { Link } from 'react-router-dom';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

import { Typography } from '../atoms/Typography';
import { RecipeTableModel } from '../../store/types.ts';
import { Chip } from '../atoms/Chip';
import { Icon } from '../atoms/Icon';
import { useAppTheme } from '../../styles/hooks.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';

interface RecipeCardProps {
	recipe: RecipeTableModel;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const { id } = recipe;
	const theme = useAppTheme();

	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	const editButtonStyles = {
		padding: '6px',
		boxSizing: 'border-box' as const,
		borderColor: 'transparent',
		backgroundColor: 'transparent',
		position: 'absolute' as const,
		right: '12px',
		top: '12px',
		cursor: 'pointer',
		zIndex: 3,
		borderRadius: '50%',
		opacity: 0.6,
		'&:hover': {
			border: '1px solid',
			opacity: 1,
			borderColor: theme.colors.primary.main,
		},
		'&:hover svg': {
			boxShadow: theme.boxShadows.lg,
			color: theme.colors.primary.surfaceDarker,
		},
	};

	const navigate = useNavigate();

	return (
		<span css={{ position: 'relative', marginBottom: '16px' }}>
			<Link to={`/recipe/${id}`} css={{ textDecoration: 'none', color: 'inherit' }}>
				<div
					css={{
						border: '1px solid',
						borderColor: theme.colors.neutral.borderLighter,
						borderRadius: '8px',
						display: 'flex',
						position: 'relative',
					}}
				>
					<div
						css={{
							display: 'flex',
							justifyContent: 'center',
							backgroundSize: 'contain',
							height: '150px',
							backgroundPosition: 'center',
							position: 'relative',
							backgroundRepeat: 'no-repeat',
							minWidth: '200px',
							padding: '4px',
						}}
					>
						{recipe.recipeImage?.secureUrl ? (
							<img src={recipe.recipeImage?.secureUrl} alt={recipe.name} css={{ height: '100%' }} />
						) : (
							<img src="/logo-images/bear-cooks.png" alt={recipe.name} css={{ height: '100%', opacity: 0.2 }} />
						)}
					</div>
					<div css={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', position: 'relative' }}>
						<Typography variant="paragraphM" weight={700}>
							{recipe.name}
						</Typography>
						<Link to={`/category/${recipe.category.id}`} css={{ textDecoration: 'none' }}>
							<Chip color="primary" size="sm" text={recipe.category?.name ?? ''} withHover />
						</Link>
						<Typography
							variant="paragraphS"
							weight={400}
							color="textSubtitle"
							customStyles={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '2',
								WebkitBoxOrient: 'vertical',
								minHeight: '40px',
							}}
						>
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
