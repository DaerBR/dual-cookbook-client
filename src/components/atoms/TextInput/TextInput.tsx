import { CSSProperties, ChangeEvent, RefObject } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../Typography';
import { processFieldValidationErrors } from '../../../utils/utils.tsx';

interface TextInputProps {
	customStyles?: CSSProperties;
	helperText?: string;
	id: string;
	inputRef?: RefObject<HTMLInputElement | null>;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isReadOnly?: boolean;
	isRequired?: boolean;
	label?: string;
	name: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	value?: string;
}

export const TextInput = ({
	customStyles,
	id,
	inputRef,
	label,
	value,
	helperText,
	isDisabled,
	isRequired,
	isReadOnly,
	isFullWidth,
	name,
	placeholder,
	onChange,
}: TextInputProps) => {
	const theme = useAppTheme();
	const { formState } = useFormContext() ?? {};
	const { errors } = formState ?? [];

	const fieldErrors = errors ? errors[name] : undefined;

	const textInputStyles = {
		backgroundColor: '#fff',
		boxShadow: theme.boxShadows.xs,
		border: `1px solid ${theme.colors.neutral.borderDefault}`,
		borderRadius: '4px',
		padding: '10px 20px',
		fontSize: theme.typography.paragraphS.fontSize,
		lineHeight: theme.typography.paragraphS.lineHeight,
		color: theme.colors.text.main,
		width: '100%',
		boxSizing: 'border-box' as const,
		maxWidth: isFullWidth ? '100%' : '300px',
		'&:focus': {
			outline: 'none',
			borderColor: theme.colors.primary.borderLighter,
			boxShadow: '0 0 0 3px rgba(254, 186, 152, 0.20)',
		},
		'&:disabled': {
			borderColor: theme.colors.neutral.borderLighter,
			backgroundColor: theme.colors.neutral.surfaceSubtle,
			color: theme.colors.text.disabled,
		},
	};

	const errorStyles = {
		borderColor: theme.colors.error.borderDarker,
		boxShadow: '0 0 0 3px rgba(236, 95, 81, 0.20)',
	};

	const labelStyles = {
		fontSize: theme.typography.paragraphXs.fontSize,
		lineHeight: theme.typography.paragraphXs.lineHeight,
		color: theme.colors.text.main,
		fontWeight: 600,
		marginBottom: '4px',
		display: 'block',
	};

	const helperTextStyles = {
		color: theme.colors.text.caption,
		marginTop: '4px',
	};

	return (
		<div>
			{label && (
				<label css={labelStyles} htmlFor={id}>
					{label}
					{isRequired && <span style={{ color: theme.colors.error.main }}> *</span>}
				</label>
			)}
			<input
				ref={inputRef}
				disabled={isDisabled}
				css={{ ...textInputStyles, ...(fieldErrors ? errorStyles : {}), ...customStyles } as const}
				type="text"
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				readOnly={isReadOnly}
				onChange={onChange}
			/>
			{(fieldErrors || helperText) && (
				<legend>
					{fieldErrors ? (
						processFieldValidationErrors(fieldErrors)
					) : (
						<Typography variant="paragraphXs" customStyles={helperTextStyles} component="div">
							{helperText}
						</Typography>
					)}
				</legend>
			)}
		</div>
	);
};
