import Select, { ActionMeta, MultiValue } from 'react-select';
import { useFormContext } from 'react-hook-form';
import type { CSSObject } from '@emotion/react';

import { SelectOption } from '../Select/types.ts';
import { InputLabel } from '../InputLabel';
import { processFieldValidationErrors } from '../../../utils/utils.tsx';
import { HelperText } from '../HelperText';
import { useMultiSelectComponents, useMultiSelectStyles } from './hooks.tsx';

export type MultiSelectOption = SelectOption;

export interface MultiSelectProps {
	customStyles?: CSSObject;
	helperText?: string;
	id?: string;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isRequired?: boolean;
	label?: string;
	name: string;
	onBlur?: () => void;
	onChange: (newValue: MultiValue<MultiSelectOption>, actionMeta: ActionMeta<MultiSelectOption>) => void;
	options: readonly MultiSelectOption[];
	placeholder?: string;
	value: MultiValue<MultiSelectOption>;
}

export const MultiSelect = ({
	options,
	name,
	label,
	onChange,
	value,
	id,
	customStyles,
	placeholder,
	isDisabled,
	isRequired,
	isFullWidth,
	helperText,
}: MultiSelectProps) => {
	const { formState } = useFormContext() ?? {};
	const { errors } = formState ?? {};
	const fieldErrors = errors ? errors[name] : undefined;
	const baseSelectStyles = useMultiSelectStyles();
	const selectComponents = useMultiSelectComponents();

	return (
		<div css={{ width: isFullWidth ? '100%' : 'auto' }}>
			{label && <InputLabel id={id ?? name} label={label} isRequired={isRequired} />}
			<Select<MultiSelectOption, true>
				components={selectComponents}
				styles={baseSelectStyles}
				css={customStyles}
				name={name}
				isDisabled={isDisabled}
				placeholder={placeholder}
				inputId={id}
				value={value}
				onChange={onChange}
				closeMenuOnSelect={false}
				isMulti
				options={options}
			/>
			{(fieldErrors || helperText) && (
				<legend>{fieldErrors ? processFieldValidationErrors(fieldErrors) : <HelperText text={helperText} />}</legend>
			)}
		</div>
	);
};
