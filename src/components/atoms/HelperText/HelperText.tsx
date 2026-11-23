import { Typography } from '../Typography';
import { defineStyles } from '../../../styles/defineStyles.ts';

interface HelperTextProps {
	text?: string;
}

export const HelperText = ({ text }: HelperTextProps) => {
	const helperTextStyles = defineStyles({
		color: 'text.caption',
		marginTop: 1,
	});

	if (!text) return null;

	return (
		<Typography variant="paragraphXs" customStyles={helperTextStyles} component="div">
			{text}
		</Typography>
	);
};
