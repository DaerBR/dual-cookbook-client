import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import type { EditCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { editCategoryValidationSchema } from './validations';
import { useCategory, useUpdateCategory } from '../../queries/categories';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { DeleteCategoryModal } from '../SingleCategory/modals/DeleteCategoryModal.tsx';
import { Icon } from '../../components/atoms/Icon';
import {
	categoryFormActionsStyles,
	categoryFormRowStyles,
	categoryImageWrapperStyles,
	categoryNameInputStyles,
	categoryNameWrapperStyles,
} from '../CreateCategory/styles.ts';

export const EditCategory = () => {
	const { id: categoryId } = useParams();
	const [initialImageUrl, setInitialImageUrl] = useState<string | undefined>(undefined);
	const { data: selectedCategory } = useCategory(categoryId);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const { mutate: updateCategory, isPending: isUpdatingCategory } = useUpdateCategory();

	const navigate = useNavigate();
	const form = useForm<EditCategoryFormValues>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			categoryImage: null,
			categoryName: '',
		},
		resolver: zodResolver(editCategoryValidationSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isValid },
		reset,
	} = form;

	const categoryTitleValue = useWatch({ control, name: 'categoryName' });

	const handleFormSubmit = handleSubmit(async (formValues) => {
		if (!categoryId) {
			return;
		}
		const { categoryImage, categoryName } = formValues;

		const payload = {
			categoryId,
			name: categoryName,
			categoryImage: categoryImage
				? { base64Content: await getBase64OfFile(categoryImage), nameWithExtension: categoryImage.name }
				: null,
		};

		updateCategory(payload, {
			onSuccess: () => {
				toast.success('Категорію успішно оновлено!');
				navigate(`/category/${categoryId}`);
			},
		});
	});

	useEffect(() => {
		if (!categoryId || !selectedCategory) {
			return;
		}
		const { name, categoryImage } = selectedCategory;

		reset({
			categoryImage: null,
			categoryName: name,
		});

		if (categoryImage?.secureUrl) {
			setInitialImageUrl(categoryImage?.secureUrl);
		}
	}, [categoryId, reset, selectedCategory]);

	return (
		<div>
			<PageTitle
				title={categoryTitleValue}
				controlElements={[
					<Button
						onClick={() => setIsDeleteModalOpen(true)}
						startIcon={<Icon icon={faTrash} />}
						key="delete-category-button"
						variant="primary"
						color="error"
					>
						Видалити
					</Button>,
				]}
			/>
			<div>
				<Form form={form} onSubmit={handleFormSubmit}>
					<div css={categoryFormRowStyles}>
						<div css={categoryImageWrapperStyles}>
							<ImageInput name="categoryImage" isEdit initialImageUrl={initialImageUrl} />
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
							isDisabled={!isValid || isUpdatingCategory}
							isBusy={isUpdatingCategory}
						>
							Зберегти
						</Button>
						<Button variant="outlined-neutral" onClick={() => navigate('/categories')}>
							Скасувати
						</Button>
					</div>
				</Form>
				<DeleteCategoryModal
					categoryId={categoryId ?? ''}
					categoryName={selectedCategory?.name ?? ''}
					closeModalHandler={setIsDeleteModalOpen}
					isModalOpen={isDeleteModalOpen}
				/>
			</div>
		</div>
	);
};
