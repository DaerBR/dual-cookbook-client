import { Typography } from '../atoms/Typography';
import type { ThemeStyles } from '../../styles/themeStyles.ts';
import { fieldGroupAsteriskStyles } from './styles.ts';

interface FieldsGroupTitleProps {
	captionText?: string;
	customStyles?: ThemeStyles;
	isRequired?: boolean;
	title: string;
}

export const FieldsGroupTitle = ({ captionText, isRequired, title, customStyles }: FieldsGroupTitleProps) => (
	<>
		<Typography
			variant="paragraphM"
			color="textTitle"
			weight={600}
			customStyles={{ position: 'relative', marginBottom: 2, ...customStyles }}
		>
			{title}
			{isRequired && <span css={fieldGroupAsteriskStyles}>*</span>}
		</Typography>
		{captionText && (
			<Typography variant="paragraphXs" color="textCaption">
				{captionText}
			</Typography>
		)}
	</>
);
