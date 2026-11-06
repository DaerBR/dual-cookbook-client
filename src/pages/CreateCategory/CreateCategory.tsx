import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import type { AddCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { addCategoryValidationSchema } from './validations';
import { useCreateCategory } from '../../queries/categories';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import {
	categoryFormActionsStyles,
	categoryFormRowStyles,
	categoryImageWrapperStyles,
	categoryNameInputStyles,
	categoryNameWrapperStyles,
} from './styles.ts';

export const CreateCategory = () => {
	// `isPending` replaces the `isCreating` flag + pending/fulfilled/rejected reducers in the slice
	const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

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

	const categoryTitleValue = useWatch({ control, name: 'categoryName' });

	const handleFormSubmit = handleSubmit(async (formValues) => {
		const { categoryImage, categoryName } = formValues;

		const payload = {
			name: categoryName,
			categoryImage: categoryImage
				? { base64Content: await getBase64OfFile(categoryImage), nameWithExtension: categoryImage.name }
				: null,
		};

		createCategory(payload, {
			onSuccess: () => {
				toast.success('Нову категорію успішно створено!');
				navigate('/categories');
			},
		});
	});

	return (
		<div>
			<PageTitle title={categoryTitleValue || 'Створити нову категорію'} />
			<div>
				<Form form={form} onSubmit={handleFormSubmit}>
					<div css={categoryFormRowStyles}>
						<div css={categoryImageWrapperStyles}>
							<ImageInput name="categoryImage" />
						</div>
						<div css={categoryNameWrapperStyles}>
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
										customStyles={categoryNameInputStyles}
									/>
								)}
								name="categoryName"
								control={control}
								css={{ width: '100%' }}
							/>
						</div>
					</div>
					<div css={categoryFormActionsStyles}>
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
