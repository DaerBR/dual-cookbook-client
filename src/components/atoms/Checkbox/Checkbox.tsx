import { ChangeEvent } from 'react';
import type { CSSObject } from '@emotion/react';

import { Typography } from '../Typography';
import { Colors } from './types.ts';
import { useCheckboxStyles } from './hooks.ts';

interface CheckboxProps {
	color?: Colors;
	customLabelStyles?: CSSObject;
	customWrapperStyles?: CSSObject;
	id?: string;
	isChecked?: boolean;
	isDisabled?: boolean;
	label: string;
	name: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
	color = 'primary',
	customLabelStyles,
	customWrapperStyles,
	id,
	isChecked,
	isDisabled,
	label,
	name,
	onChange,
}: CheckboxProps) => {
	const { wrapperStyles, inputStyles, checkmarkStyles } = useCheckboxStyles({ color, isDisabled });

	return (
		<label htmlFor={id ?? name} css={{ ...wrapperStyles, ...customWrapperStyles }}>
			<input
				type="checkbox"
				id={id ?? name}
				name={name}
				checked={isChecked}
				disabled={isDisabled}
				onChange={onChange}
				css={inputStyles}
			/>
			<span className="checkmark" css={checkmarkStyles} />
			<Typography
				variant="paragraphS"
				color={isDisabled ? 'textDisabled' : 'textMain'}
				customStyles={customLabelStyles}
			>
				{label}
			</Typography>
		</label>
	);
};
