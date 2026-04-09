import { useAppTheme } from '../../../styles/hooks.ts';

interface InputLabelProps {
	id: string;
	isRequired?: boolean;
	label: string;
}

export const InputLabel = ({ isRequired, label, id }: InputLabelProps) => {
	const theme = useAppTheme();

	const labelStyles = {
		fontSize: theme.typography.paragraphXs.fontSize,
		lineHeight: theme.typography.paragraphXs.lineHeight,
		color: theme.colors.text.main,
		fontWeight: 600,
		marginBottom: '4px',
		display: 'block',
	};

	return (
		<label css={labelStyles} htmlFor={id}>
			{label}
			{isRequired && <span style={{ color: theme.colors.error.main }}> *</span>}
		</label>
	);
};
