import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Category } from '../../../store/slices/categoriesSlice.ts';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../../../components/atoms/Typography';
import { categoryImageSectionStyles } from '../styles.ts';
import { useAppSelector } from '../../../store/hooks/hooks.ts';
import { Icon } from '../../../components/atoms/Icon';

interface CategoryCardProps {
	category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const { id, name, categoryImage } = category;
	const theme = useAppTheme();
	const linkStyles = {
		position: 'relative' as const,
		borderRadius: '4px',
		width: '100%',
		display: 'flex',
		textDecoration: 'none',
		border: `1px solid ${theme.colors.primary.borderDefault}`,
		boxShadow: theme.boxShadows.sm,
		'&:hover': {
			boxShadow: theme.boxShadows.md,
		},
		'&:hover button': {
			display: 'block',
		},
	};
	const editButtonStyles = {
		display: 'none',
		padding: '8px',
		boxSizing: 'border-box' as const,
		border: 'none',
		backgroundColor: 'transparent',
		position: 'absolute' as const,
		right: '16px',
		top: '16px',
		cursor: 'pointer',
		zIndex: 3,
		borderRadius: '50%',
		opacity: 0.6,
		'&:hover': {
			border: '1px solid',
			opacity: 1,
			borderColor: categoryImage ? '#fff' : theme.colors.primary.main,
		},
		'&:hover svg': {
			boxShadow: theme.boxShadows.lg,
			color: categoryImage ? '#fff' : theme.colors.primary.surfaceDarker,
		},
	};

	const titleStyles = {
		fontSize: '36px',
		color: categoryImage ? '#fff' : theme.colors.primary.main,
		boxShadow: theme.boxShadows.xs,
		zIndex: 2,
	};

	return (
		<Link to={`/category/${id}`} css={linkStyles} key={id}>
			{isLoggedIn && (
				<button css={editButtonStyles}>
					<Icon
						icon={faPencilAlt}
						color="primary"
						customStyles={{ color: categoryImage ? '#fff' : theme.colors.primary.main }}
					/>
				</button>
			)}
			<div
				css={{
					...categoryImageSectionStyles,
					backgroundImage: categoryImage?.secureUrl ? `url(${categoryImage?.secureUrl})` : 'none',
				}}
			>
				{!categoryImage && (
					<img
						src="/logo-images/bear-cooks.png"
						alt={name}
						css={{ height: '80%', position: 'absolute', opacity: 0.2 }}
					/>
				)}
				<Typography variant="paragraphL" weight={700} customStyles={titleStyles}>
					{name}
				</Typography>
			</div>
		</Link>
	);
};
