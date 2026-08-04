import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { AddCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { addCategoryValidationSchema } from './validations';
import { useCreateCategoryMutation } from '../../features/categories';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { useGlobalLoadingIndicator } from '../../hooks/useGlobalLoadingIndicator.ts';

export const AddCategory = () => {
	const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();

	useGlobalLoadingIndicator(isCreatingCategory);

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

		const payload = {
			name: categoryName,
			categoryImage: categoryImage
				? { base64Content: await getBase64OfFile(categoryImage), nameWithExtension: categoryImage.name }
				: null,
			successMessage: 'Нову категорію успішно створено!',
			successRedirectRoute: '/categories',
		};

		createCategory(payload);
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
						<Button variant="outlined-neutral" onClick={() => navigate('/categories')}>
							Скасувати
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
