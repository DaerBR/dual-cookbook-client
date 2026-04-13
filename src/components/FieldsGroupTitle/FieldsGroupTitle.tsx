import { CSSProperties } from 'react';
import { Typography } from '../atoms/Typography';

interface FieldsGroupTitleProps {
	captionText?: string;
	customStyles?: CSSProperties;
	isRequired?: boolean;
	title: string;
}

export const FieldsGroupTitle = ({ captionText, isRequired, title, customStyles }: FieldsGroupTitleProps) => (
	<>
		<Typography
			variant="paragraphM"
			color="textTitle"
			weight={600}
			customStyles={{ marginBottom: '8px', ...customStyles }}
		>
			{title}
			{isRequired && <span css={{ fontWeight: 600, color: 'error.main', ml: 1 }}>*</span>}
		</Typography>
		{captionText && (
			<Typography variant="paragraphXs" color="textCaption">
				{captionText}
			</Typography>
		)}
	</>
);
