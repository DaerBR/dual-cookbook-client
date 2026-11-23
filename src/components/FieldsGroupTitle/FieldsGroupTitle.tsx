import { Typography } from '../atoms/Typography';
import type { ThemeStyles } from '../../styles/themeStyles.ts';
import { defineStyles } from '../../styles/defineStyles.ts';

interface FieldsGroupTitleProps {
	captionText?: string;
	customStyles?: ThemeStyles;
	isRequired?: boolean;
	title: string;
}

export const FieldsGroupTitle = ({ captionText, isRequired, title, customStyles }: FieldsGroupTitleProps) => (
	<>
		<Typography variant="paragraphM" color="textTitle" weight={600} customStyles={{ marginBottom: 2, ...customStyles }}>
			{title}
			{isRequired && <span css={defineStyles({ fontWeight: 600, marginLeft: 1, color: 'error.main' })}>*</span>}
		</Typography>
		{captionText && (
			<Typography variant="paragraphXs" color="textCaption">
				{captionText}
			</Typography>
		)}
	</>
);
