import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { AddCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { addCategoryValidationSchema } from './validations';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { createCategory } from '../../store/thunks/categories.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';

export const AddCategory = () => {
	const [dispatchCreateCategory] = useThunk(createCategory, {
		useGlobalLoader: true,
		successMessage: 'Category created successfully',
		successRedirectRoute: '/categories',
	});
	const isCreatingCategory = useAppSelector((state) => state.categories.isCreating);

	const navigate = useNavigate();
	const form = useForm<AddCategoryFormValues>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			categoryImage: null,
			categoryName: '',
		},
		resolver: zodResolver(addCategoryValidationSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = form;

	const handleFormSubmit = handleSubmit(async (formValues) => {
		const { categoryImage, categoryName } = formValues;
		const imageBase64Data = categoryImage ? await getBase64OfFile(categoryImage) : null;

		const payload = {
			name: categoryName,
			categoryImage: categoryImage
				? { base64Content: imageBase64Data as string, nameWithExtension: categoryImage.name }
				: null,
		};

		await dispatchCreateCategory(payload);
	});

	return (
		<div>
			<PageTitle title="Створити нову категорію" />
			<div>
				<Form form={form} onSubmit={handleFormSubmit}>
					<div css={{ display: 'flex', gap: '12px', flexBasis: '100%', wrap: 'nowrap' }}>
						<div css={{ display: 'flex', flexBasis: '300px' }}>
							<ImageInput name="categoryImage" />
						</div>
						<div css={{ display: 'flex', marginLeft: '36px' }}>
							<Controller
								render={({ field }) => (
									<TextInput
										isFullWidth
										isRequired
										id="categoryName"
										name="categoryName"
										label="Назва категорії"
										placeholder="Введіть назву категорії"
										value={field.value}
										onChange={field.onChange}
										customStyles={{ minWidth: '350px' }}
									/>
								)}
								name="categoryName"
								control={control}
								css={{ width: '100%' }}
							/>
						</div>
					</div>
					<div css={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '12px' }}>
						<Button
							type="submit"
							variant="primary"
							isDisabled={!isValid || isCreatingCategory}
							isBusy={isCreatingCategory}
						>
							Створити
						</Button>
						<Button variant="outlined" onClick={() => navigate('/categories')}>
							Скасувати
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
