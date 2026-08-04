import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { EditCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { editCategoryValidationSchema } from './validations';
import {
	makeSelectCategoryById,
	useFetchAllCategoriesQuery,
	useUpdateCategoryMutation,
} from '../../features/categories';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { DeleteCategoryModal } from '../SingleCategory/modals/DeleteCategoryModal.tsx';
import { Icon } from '../../components/atoms/Icon';
import { useGlobalLoadingIndicator } from '../../hooks/useGlobalLoadingIndicator.ts';

export const EditCategory = () => {
	const { id: categoryId } = useParams();
	const [initialImageUrl, setInitialImageUrl] = useState<string | undefined>(undefined);

	useFetchAllCategoriesQuery();
	const selectCategoryById = useMemo(() => makeSelectCategoryById(categoryId), [categoryId]);
	const selectedCategory = useAppSelector(selectCategoryById);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const [updateCategory, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation();

	useGlobalLoadingIndicator(isUpdatingCategory);

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
			successMessage: 'Категорію успішно оновлено!',
			successRedirectRoute: `/category/${categoryId}`,
		};

		updateCategory(payload);
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
				title="Редагувати категорію"
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
					<div css={{ display: 'flex', gap: '12px', flexBasis: '100%', wrap: 'nowrap' }}>
						<div css={{ display: 'flex', flexBasis: '300px' }}>
							<ImageInput name="categoryImage" isEdit initialImageUrl={initialImageUrl} />
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
