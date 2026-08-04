import { Link } from 'react-router-dom';

import { CategoryModel } from '../../../features/categories';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../../../components/atoms/Typography';
import { categoryImageSectionStyles } from '../styles.ts';

interface CategoryCardProps {
	category: CategoryModel;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
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

	const titleStyles = {
		fontSize: '36px',
		color: categoryImage ? '#fff' : theme.colors.primary.main,
		zIndex: 2,
		textShadow: categoryImage ? '1px 1px 4px #df8150' : 'none',
	};

	return (
		<Link to={`/category/${id}`} css={linkStyles} key={id}>
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
