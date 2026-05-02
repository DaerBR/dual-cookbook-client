import { Typography } from '../Typography';
import { useAppTheme } from '../../../styles/hooks.ts';

interface HelperTextProps {
	text?: string;
}

export const HelperText = ({ text }: HelperTextProps) => {
	const theme = useAppTheme();
	const helperTextStyles = {
		color: theme.colors.text.caption,
		marginTop: '4px',
	};

	if (!text) return null;

	return (
		<Typography variant="paragraphXs" customStyles={helperTextStyles} component="div">
			{text}
		</Typography>
	);
};
