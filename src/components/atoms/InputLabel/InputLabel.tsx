import { useAppTheme } from '../../../styles/hooks.ts';
import { defineStyles } from '../../../styles/defineStyles.ts';

interface InputLabelProps {
	id: string;
	isRequired?: boolean;
	label: string;
}

export const InputLabel = ({ isRequired, label, id }: InputLabelProps) => {
	const theme = useAppTheme();

	const labelStyles = defineStyles({
		fontSize: theme.typography.paragraphXs.fontSize,
		lineHeight: theme.typography.paragraphXs.lineHeight,
		color: theme.colors.text.main,
		fontWeight: 600,
		marginBottom: 1,
		display: 'block',
	});

	return (
		<label css={labelStyles} htmlFor={id}>
			{label}
			{isRequired && <span style={{ color: theme.colors.error.main }}> *</span>}
		</label>
	);
};
