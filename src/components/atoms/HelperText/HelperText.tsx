import { Typography } from '../Typography';
import { useAppTheme } from '../../../styles/hooks.ts';
import { defineStyles } from '../../../styles/defineStyles.ts';

interface HelperTextProps {
	text?: string;
}

export const HelperText = ({ text }: HelperTextProps) => {
	const theme = useAppTheme();
	const helperTextStyles = defineStyles({
		color: theme.colors.text.caption,
		marginTop: 1,
	});

	if (!text) return null;

	return (
		<Typography variant="paragraphXs" customStyles={helperTextStyles} component="div">
			{text}
		</Typography>
	);
};
