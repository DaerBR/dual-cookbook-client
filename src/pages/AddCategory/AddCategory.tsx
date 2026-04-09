import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Typography } from '../../components/atoms/Typography';
import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { AddCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';
import { ImageInput } from '../../components/atoms/ImageInput';
import { addCategoryValidationSchema } from './validations';

export const AddCategory = () => {
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

	const handleFormSubmit = handleSubmit((formValues) => {
		console.info(formValues);
	});

	return (
		<div>
			<Typography variant="h5" weight={700} customStyles={{ marginBottom: '20px' }} component="div">
				Створити нову категорію
			</Typography>
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
						<Button type="submit" variant="primary" isDisabled={!isValid}>
							Створити
						</Button>
						<Button variant="outlined">Скасувати</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
