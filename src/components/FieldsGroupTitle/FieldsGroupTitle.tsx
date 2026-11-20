import { Typography } from '../atoms/Typography';
import type { SpacingStyles } from '../../styles/spacing.ts';
import { defineStyles } from '../../styles/defineStyles.ts';
import { useAppTheme } from '../../styles/hooks.ts';

interface FieldsGroupTitleProps {
	captionText?: string;
	customStyles?: SpacingStyles;
	isRequired?: boolean;
	title: string;
}

export const FieldsGroupTitle = ({ captionText, isRequired, title, customStyles }: FieldsGroupTitleProps) => {
	const theme = useAppTheme();

	return (
		<>
			<Typography
				variant="paragraphM"
				color="textTitle"
				weight={600}
				customStyles={{ marginBottom: '8px', ...customStyles }}
			>
				{title}
				{isRequired && (
					<span css={defineStyles({ fontWeight: 600, marginLeft: 1, color: theme.colors.error.main })}>*</span>
				)}
			</Typography>
			{captionText && (
				<Typography variant="paragraphXs" color="textCaption">
					{captionText}
				</Typography>
			)}
		</>
	);
};
