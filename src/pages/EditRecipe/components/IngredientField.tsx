import { useRef, useState } from 'react';
import { Controller, type FieldArrayWithId, useFormContext } from 'react-hook-form';
import { faGridVertical } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/react/sortable';

import { Button } from '../../../components/atoms/Button';
import { Icon } from '../../../components/atoms/Icon';
import { TextInput } from '../../../components/atoms/TextInput';
import { DeleteIconButton } from '../../../components/DeleteIconButton';
import { EditRecipeFormValues } from '../validations.ts';
import { fieldDragButtonStyles, ingredientDeleteButtonStyles, ingredientsFieldStyles } from '../../CreateRecipe/styles.ts';

interface IngredientFieldProps {
	index: number;
	ingredientField: FieldArrayWithId<EditRecipeFormValues, 'ingredients'>;
	ingredientsCount: number;
	removeIngredient: (index: number) => void;
}

export const IngredientField = ({
	index,
	ingredientField,
	ingredientsCount,
	removeIngredient,
}: IngredientFieldProps) => {
	const { control } = useFormContext<EditRecipeFormValues>();
	const [element, setElement] = useState<Element | null>(null);
	const handleRef = useRef<HTMLDivElement | null>(null);
	const { id } = ingredientField;
	useSortable({ id, index, element, handle: handleRef });

	return (
		<div key={id} ref={setElement} css={ingredientsFieldStyles}>
			{ingredientsCount > 1 && (
				<div ref={handleRef}>
					<Button variant="outlined-neutral" customStyles={fieldDragButtonStyles}>
						<Icon icon={faGridVertical} fontSize={10} />
					</Button>
				</div>
			)}
			<Controller
				control={control}
				name={`ingredients.${index}.text`}
				css={{ width: '100%', display: 'flex' }}
				render={({ field }) => (
					<TextInput
						isFullWidth
						name={`ingredients.${index}.text`}
						value={field.value}
						onChange={field.onChange}
						placeholder='Опис (напр. "300 гр пшеничного борошна")'
					/>
				)}
			/>
			{ingredientsCount > 1 && (
				<DeleteIconButton
					onClick={() => removeIngredient(index)}
					customStyles={ingredientDeleteButtonStyles}
				/>
			)}
		</div>
	);
};
