import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { EditCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { editCategoryValidationSchema } from './validations';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchAllCategories, updateCategory } from '../../store/thunks/categories.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { getBase64OfFile } from '../../utils/utils.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';

export const EditCategory = () => {
	const { id: categoryId } = useParams();
	const [initialImageUrl, setInitialImageUrl] = useState<string | undefined>(undefined);
	const categoriesData = useAppSelector((state) => state.categories.categories);
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);
	const selectedCategory = categoriesData.find((category) => category.id === categoryId);
	const [dispatchFetchCategories] = useThunk(fetchAllCategories);

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories();
		}
	}, [areCategoriesFetched, dispatchFetchCategories]);

	const [dispatchUpdateCategory] = useThunk(updateCategory, {
		useGlobalLoader: true,
		successMessage: 'Категорію успішно оновлено!',
		successRedirectRoute: `/category/${categoryId}`,
	});

	const isUpdatingCategory = useAppSelector((state) => state.categories.isUpdating);

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
		const imageBase64Data = categoryImage ? await getBase64OfFile(categoryImage) : null;

		const payload = {
			categoryId,
			name: categoryName,
			categoryImage: categoryImage
				? { base64Content: imageBase64Data as string, nameWithExtension: categoryImage.name }
				: null,
		};

		await dispatchUpdateCategory(payload);
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
			<PageTitle title="Редагувати категорію" />
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
						<Button variant="outlined" onClick={() => navigate('/categories')}>
							Скасувати
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
