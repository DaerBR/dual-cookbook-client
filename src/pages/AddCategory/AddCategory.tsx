import { Controller, useForm } from 'react-hook-form';

import { Typography } from '../../components/atoms/Typography';
import { TextInput } from '../../components/atoms/TextInput';
import { Form } from '../../components/Form';
import { AddCategoryFormValues } from './types';
import { Button } from '../../components/atoms/Button';

export const AddCategory = () => {
	const form = useForm<AddCategoryFormValues>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			categoryName: '',
		},
	});

	const { handleSubmit, control } = form;

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
					<Controller
						render={({ field }) => (
							<TextInput
								isRequired
								id="categoryName"
								name="categoryName"
								label="Назва категорії"
								placeholder="Введіть назву категорії"
								value={field.value}
								onChange={field.onChange}
							/>
						)}
						name="categoryName"
						control={control}
					/>

					<Button type="submit" variant="primary" css={{ marginTop: '12px' }}>
						Створити
					</Button>
				</Form>
			</div>
		</div>
	);
};
