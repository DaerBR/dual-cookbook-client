import { useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { AddRecipeFormValues, addRecipeValidationSchema } from './validations.ts';
import { Form } from '../../components/Form';
import { ImageInput } from '../../components/atoms/ImageInput';
import { TextInput } from '../../components/atoms/TextInput';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchAllCategories } from '../../store/thunks/categories.ts';
import { Button } from '../../components/atoms/Button';
import { FieldsGroupTitle } from '../../components/FieldsGroupTitle';
import { Icon } from '../../components/atoms/Icon';
import { DeleteIconButton } from '../../components/DeleteIconButton';
import { getBase64OfFile, pluck } from '../../utils/utils.tsx';
import { createRecipe } from '../../store/thunks/recipes.ts';
import { MultiSelect } from '../../components/atoms/MultiSelect';
import { fieldBlockStyles, fieldsWrapperStyles, leftColumnWrapperStyles, mainWrapperStyles } from './styles.ts';

export const AddRecipe = () => {
	const categoriesList = useAppSelector((state) => state.categories.categories);
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const isCreatingRecipe = useAppSelector((state) => state.recipes.isCreating);

	const categoriesOptions = categoriesList.map((category) => ({ value: category.id, label: category.name }));

	const [dispatchFetchCategories] = useThunk(fetchAllCategories);

	const navigate = useNavigate();

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories();
		}
	}, [dispatchFetchCategories, areCategoriesFetched]);

	const form = useForm<AddRecipeFormValues>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			name: '',
			categories: [],
			description: '',
			ingredients: [{ text: '' }],
			steps: [{ stepDescription: '' }],
			recipeImage: null,
			sourceUrl: '',
		},
		resolver: zodResolver(addRecipeValidationSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = form;

	const selectedCategories = useWatch({ control, name: 'categories' });

	const [dispatchCreateRecipe] = useThunk(createRecipe, {
		useGlobalLoader: true,
		successMessage: 'Рецепт успішно додано!',
		successRedirectRoute: selectedCategories.length > 0 ? `/category/${selectedCategories[0].value}` : '/',
	});

	const handleFormSubmit = handleSubmit(async (formValues) => {
		const { recipeImage, name, description, steps, categories, ingredients, sourceUrl } = formValues;
		const categoriesIds = pluck('value', categories);

		const payload = {
			name,
			categories: categoriesIds,
			ingredients,
			steps,
			recipeImage: recipeImage
				? { base64Content: await getBase64OfFile(recipeImage), nameWithExtension: recipeImage.name }
				: null,
			description: description && description.length > 0 ? description : null,
			sourceUrl,
		};
		dispatchCreateRecipe({ ...payload });
	});

	const {
		fields: stepsFields,
		append: addStep,
		remove: removeStep,
	} = useFieldArray({
		control,
		name: 'steps',
	});

	const {
		fields: ingredientsFields,
		append: addIngredient,
		remove: removeIngredient,
	} = useFieldArray({
		control,
		name: 'ingredients',
	});

	return (
		<div>
			<PageTitle title="Створити новий рецепт" withReturnButton />
			<div>
				<Form form={form} onSubmit={handleFormSubmit}>
					<div css={mainWrapperStyles}>
						<div css={leftColumnWrapperStyles}>
							<ImageInput name="recipeImage" customHeight={350} customWidth={450} />
							<div css={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
								<FieldsGroupTitle title="Інгредієнти" />
								<div>
									{ingredientsFields.map((ingredientField, index) => (
										<div key={ingredientField.id} css={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
														customStyles={{ marginBottom: '20px' }}
														placeholder='Опис (напр. "300 гр пшеничного борошна")'
													/>
												)}
											/>
											{index !== 0 && (
												<DeleteIconButton
													onClick={() => removeIngredient(index)}
													customStyles={{ position: 'absolute', right: '-20px', top: '-20px' }}
												/>
											)}
										</div>
									))}
								</div>
								<Button
									startIcon={<Icon icon={faPlus} />}
									variant="secondary"
									onClick={() => addIngredient({ text: '' })}
									customStyles={{ maxWidth: '120px' }}
								>
									Додати
								</Button>
							</div>
							<div css={{ marginTop: '24px', marginBottom: '36px' }}>
								<Controller
									control={control}
									name="sourceUrl"
									css={{ width: '100%' }}
									render={({ field }) => (
										<TextInput
											isFullWidth
											id="sourceUrl"
											name="sourceUrl"
											label="Посилання"
											placeholder="Вставте посилання на джерело (відео, пост і т.д.)"
											value={field.value}
											onChange={field.onChange}
											customStyles={{ minWidth: '400px' }}
										/>
									)}
								/>
							</div>
						</div>
						<div css={fieldsWrapperStyles}>
							<div css={fieldBlockStyles}>
								<Controller
									control={control}
									name="name"
									css={{ width: '100%' }}
									render={({ field }) => (
										<TextInput
											isFullWidth
											isRequired
											id="name"
											name="name"
											label="Назва рецепту"
											placeholder="Введіть назву рецепту"
											value={field.value}
											onChange={field.onChange}
											customStyles={{ minWidth: '400px' }}
										/>
									)}
								/>
							</div>
							<div css={fieldBlockStyles}>
								<Controller
									name="categories"
									control={control}
									render={({ field }) => (
										<MultiSelect
											isRequired
											label="Категорії"
											placeholder="Оберіть категорії"
											name="categories"
											onChange={(newValue) => field.onChange([...newValue])}
											options={categoriesOptions}
											value={field.value}
										/>
									)}
								/>
							</div>
							<div css={fieldBlockStyles}>
								<Controller
									control={control}
									name="description"
									css={{ width: '100%' }}
									render={({ field }) => (
										<TextInput
											isFullWidth
											multiline
											name="description"
											label="Опис"
											placeholder="Введіть короткий опис рецепту"
											value={field.value}
											onChange={field.onChange}
											customStyles={{ minWidth: '400px' }}
										/>
									)}
								/>
							</div>
							<div css={fieldBlockStyles}>
								<FieldsGroupTitle title="Покрокова інструкія" />
								{stepsFields.map((_, index) => (
									<div key={index} css={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
													customStyles={{ marginBottom: '20px' }}
												/>
											)}
										/>
										{index !== 0 && (
											<DeleteIconButton
												onClick={() => removeStep(index)}
												customStyles={{ position: 'absolute', right: '-20px', top: '0' }}
											/>
										)}
									</div>
								))}
								<Button
									startIcon={<Icon icon={faPlus} />}
									variant="secondary"
									onClick={() => addStep({ stepDescription: '' })}
									customStyles={{ maxWidth: '250px' }}
								>
									Додати наступний крок
								</Button>
							</div>
						</div>
					</div>
					<div css={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '12px' }}>
						<Button
							type="submit"
							variant="primary"
							isDisabled={!isValid || categoriesList?.length === 0 || isCreatingRecipe}
							isBusy={isCreatingRecipe}
						>
							Створити
						</Button>
						<Button variant="outlined-neutral" onClick={() => navigate(-1)}>
							Скасувати
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
