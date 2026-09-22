import { ChangeEvent, RefObject } from 'react';
import { useFormContext } from 'react-hook-form';
import type { CSSObject } from '@emotion/react';

import { getFieldError, processFieldValidationErrors } from '../../../utils/utils.tsx';
import { InputLabel } from '../InputLabel';
import { useCommonFieldStyles } from './hooks.ts';
import { HelperText } from '../HelperText';

interface TextInputProps {
	customStyles?: CSSObject;
	helperText?: string;
	id?: string;
	inputRef?: RefObject<HTMLInputElement | null>;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isReadOnly?: boolean;
	isRequired?: boolean;
	label?: string;
	multiline?: boolean;
	name: string;
	onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	rows?: number;
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
	multiline,
	rows = 4,
}: TextInputProps) => {
	const { formState } = useFormContext() ?? {};
	const { errors } = formState ?? [];
	const fieldErrors = getFieldError(errors, name);
	const { fieldStyles, errorStyles } = useCommonFieldStyles({ isFullWidth });

	// Merges the error border/shadow into the focus state too, so it stays visible while the field is focused
	// instead of being overridden by fieldStyles' own `&:focus` rule.
	const errorAwareFieldStyles = fieldErrors
		? {
				...fieldStyles,
				...errorStyles,
				'&:focus': {
					...fieldStyles['&:focus'],
					...errorStyles,
				},
			}
		: fieldStyles;

	return (
		<div css={{ width: isFullWidth ? '100%' : 'auto' }}>
			{label && <InputLabel id={id ?? name} label={label} isRequired={isRequired} />}
			{multiline ? (
				<textarea
					disabled={isDisabled}
					css={{ ...errorAwareFieldStyles, resize: 'none', ...customStyles }}
					id={id ?? name}
					name={name}
					placeholder={placeholder}
					value={value}
					readOnly={isReadOnly}
					rows={rows}
					onChange={onChange}
				/>
			) : (
				<input
					ref={inputRef}
					disabled={isDisabled}
					css={{ ...errorAwareFieldStyles, ...customStyles }}
					type="text"
					id={id ?? name}
					name={name}
					placeholder={placeholder}
					value={value}
					readOnly={isReadOnly}
					onChange={onChange}
				/>
			)}
			{(fieldErrors || helperText) && (
				<legend>{fieldErrors ? processFieldValidationErrors(fieldErrors) : <HelperText text={helperText} />}</legend>
			)}
		</div>
	);
};
