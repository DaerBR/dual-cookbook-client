import * as z from 'zod';

export const addRecipeValidationSchema = z.object({
	description: z.string(),
	category: z.string(),
	ingredients: z.array(z.object({ text: z.string() })),
	name: z.string().min(3, 'Введіть назву категорії, принаймні 3 символи'),
	recipeImage: z.union([z.instanceof(File), z.null()]),
	sourceUrl: z.string(),
	steps: z.array(z.object({ stepDescription: z.string().min(3) })).nonempty('Додайте принаймні один крок'),
});

export type AddRecipeFormValues = z.infer<typeof addRecipeValidationSchema>;
