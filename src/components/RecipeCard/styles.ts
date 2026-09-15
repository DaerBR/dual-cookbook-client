import { useAppTheme } from '../../styles/hooks.ts';
import { defineStyles } from '../../styles/defineStyles.ts';

export const useRecipeCardStyles = () => {
	const theme = useAppTheme();

	return {
		editButtonStyles: defineStyles({
			padding: '6px',
			boxSizing: 'border-box',
			borderColor: 'transparent',
			backgroundColor: 'transparent',
			position: 'absolute',
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
			'@media (max-width: 768px)': {
				display: 'none',
			},
		}),
		wrapperStyles: defineStyles({
			border: '1px solid',
			borderColor: theme.colors.neutral.borderLighter,
			borderRadius: '8px',
			display: 'flex',
			position: 'relative',
			boxShadow: theme.boxShadows.xs,
			overflow: 'hidden',
			alignItems: 'center',
			'&:hover': {
				boxShadow: theme.boxShadows.md,
			},
		}),
		imageWrapperStyles: defineStyles({
			display: 'flex',
			justifyContent: 'center',
			backgroundSize: 'contain',
			height: '150px',
			backgroundPosition: 'center',
			position: 'relative',
			backgroundRepeat: 'no-repeat',
			minWidth: '200px',
			padding: '4px',
			borderRadius: '4px',
			'@media (max-width: 768px)': {
				minWidth: '33%',
			},
		}),
		descriptionWrapperStyles: defineStyles({
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			display: '-webkit-box',
			WebkitLineClamp: '2',
			WebkitBoxOrient: 'vertical',
			minHeight: '40px',
		}),
	};
};
