import * as z from 'zod';

export const editRecipeValidationSchema = z.object({
	description: z.string(),
	categories: z.array(z.object({ value: z.string(), label: z.string() })).min(1, 'Оберіть категорії'),
	ingredients: z.array(z.object({ text: z.string().min(3, 'Занадто короткий текст') })),
	name: z.string().min(3, 'Введіть назву рецепту, принаймні 3 символи'),
	recipeImage: z.union([z.instanceof(File), z.null()]),
	sourceUrl: z.string(),
	steps: z
		.array(z.object({ stepDescription: z.string().min(3, 'Занадто короткий текст') }))
		.nonempty('Додайте принаймні один крок'),
});

export type EditRecipeFormValues = z.infer<typeof editRecipeValidationSchema>;
