import { Controller, UseFormReset, useForm } from 'react-hook-form';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Modal } from '../../../components/atoms/Modal/Modal.tsx';
import { Button } from '../../../components/atoms/Button';
import { ModalControls } from '../../../components/atoms/Modal/types.ts';
import { TextInput } from '../../../components/atoms/TextInput';
import { Form } from '../../../components/Form';
import { Typography } from '../../../components/atoms/Typography';
import { AddRecipeFormValues, importRecipeValidationSchema } from '../validations.ts';
import { ServerError, getErrorText } from '../../../store/hooks/useThunk.ts';
import { importRecipeDraft } from '../../../store/thunks/recipes.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks.ts';
import { DEFAULT_RECIPE_FORM_VALUES } from '../constant.ts';
import { Checkbox } from '../../../components/atoms/Checkbox';

interface ImportRecipeModalProps extends ModalControls {
	recipeFormReset: UseFormReset<AddRecipeFormValues>;
}

interface ImportRecipeFormValues {
	sourceUrl: string;
	useImportedTitle: boolean;
}

export const ImportRecipeModal = ({ isModalOpen, closeModalHandler, recipeFormReset }: ImportRecipeModalProps) => {
	const isImportingRecipe = useAppSelector((state) => state.recipes.isFetchingDraft);
	const dispatch = useAppDispatch();

	const form = useForm<ImportRecipeFormValues>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			sourceUrl: '',
			useImportedTitle: false,
		},
		resolver: zodResolver(importRecipeValidationSchema),
	});
	const {
		control,
		handleSubmit,
		formState: { isValid },
		reset,
	} = form;

	const handleCloseModal = () => {
		reset();
		closeModalHandler(false);
	};

	const handleParseUrl = handleSubmit(async (formValues) => {
		try {
			const draft = await dispatch(importRecipeDraft({ url: formValues.sourceUrl })).unwrap();

			recipeFormReset({
				...DEFAULT_RECIPE_FORM_VALUES,
				sourceUrl: draft.sourceUrl,
				recipeTitle: draft.recipeTitle ?? '',
				description: draft.description ?? '',
				ingredients: draft.ingredients?.map((text) => ({ text })) ?? DEFAULT_RECIPE_FORM_VALUES.ingredients,
				steps: draft.steps?.map((step) => ({ stepDescription: step })) ?? [],
			});
			toast.success('Дані за посиланням успішно імпортовано для створення рецепту!');
			handleCloseModal();
		} catch (error) {
			toast.error(getErrorText(error as ServerError));
		}
	});

	const modalContent = (
		<div>
			<Typography variant="paragraphS" customStyles={{ marginBottom: '8px' }} component="div">
				Наразі як джерело підтримуються: Instagram, Telegraph.
			</Typography>
			<Typography color="error" variant="paragraphS" customStyles={{ marginBottom: '12px' }} component="div">
				Увага - імпортування рецепту з іншого ресурсу призведе до скидання поточного стану форми
			</Typography>

			<Form form={form} onSubmit={handleParseUrl}>
				<Controller
					control={control}
					name="sourceUrl"
					render={({ field }) => (
						<TextInput
							isFullWidth
							id="sourceUrl"
							name="sourceUrl"
							label=""
							placeholder="Вставте посилання на джерело (відео, пост і т.д.)"
							value={field.value}
							onChange={field.onChange}
							isRequired
						/>
					)}
				/>
				<Controller
					control={control}
					name="useImportedTitle"
					render={({ field }) => (
						<Checkbox
							customWrapperStyles={{ marginTop: '12px' }}
							color="primary"
							label="Використати імпортоване зображення"
							name="useImportedTitle"
							isChecked={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Form>
		</div>
	);

	const buttons = [
		<Button
			variant="primary"
			color="primary"
			key="confirm"
			fullWidth
			isDisabled={!isValid}
			type="submit"
			onClick={handleParseUrl}
		>
			Аналізувати
		</Button>,
		<Button onClick={handleCloseModal} variant="outlined-neutral" key="cancel" fullWidth>
			Скасувати
		</Button>,
	];

	return (
		<Modal
			isLoading={isImportingRecipe}
			title="Імпортувати рецепт за посиланням"
			titleIcon={faMagicWandSparkles}
			titleIconColor="primary"
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			buttons={buttons}
			content={modalContent}
		/>
	);
};
