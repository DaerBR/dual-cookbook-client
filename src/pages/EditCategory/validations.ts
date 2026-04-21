import * as z from 'zod';

export const editCategoryValidationSchema = z.object({
	categoryName: z.string().min(3, 'Введіть назву категорії, принаймні 3 символи'),
	categoryImage: z.union([z.instanceof(File), z.null()]),
});

export type EditCategoryFormValues = z.infer<typeof editCategoryValidationSchema>;
