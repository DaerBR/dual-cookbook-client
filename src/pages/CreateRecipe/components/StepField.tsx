import { Controller, type FieldArrayWithId, useFormContext } from 'react-hook-form';

import { TextInput } from '../../../components/atoms/TextInput';
import { DeleteIconButton } from '../../../components/DeleteIconButton';
import { AddRecipeFormValues } from '../validations.ts';
import { stepDeleteButtonStyles, stepWrapperStyles } from '../styles.ts';

interface StepFieldProps {
	index: number;
	removeStep: (index: number) => void;
	stepField: FieldArrayWithId<AddRecipeFormValues, 'steps'>;
	stepsCount: number;
}

export const StepField = ({ index, stepField, stepsCount, removeStep }: StepFieldProps) => {
	const { control } = useFormContext<AddRecipeFormValues>();

	return (
		<div key={stepField.id} css={stepWrapperStyles}>
			<Controller
				control={control}
				name={`steps.${index}.stepDescription`}
				css={{ width: '100%', display: 'flex' }}
				render={({ field }) => (
					<TextInput
						rows={6}
						isFullWidth
						isRequired={index === 0}
						multiline
						name={`steps.${index}.stepDescription`}
						label={`Крок ${index + 1}`}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>
			{stepsCount > 1 && <DeleteIconButton onClick={() => removeStep(index)} customStyles={stepDeleteButtonStyles} />}
		</div>
	);
};
