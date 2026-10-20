import * as z from 'zod';

export const addRecipeValidationSchema = z.object({
	description: z.string(),
	categories: z.array(z.object({ value: z.string(), label: z.string() })).min(1, 'Оберіть категорії'),
	ingredients: z.array(z.object({ text: z.string().min(3, 'Опис інгредієнту занадто короткий') })),
	recipeTitle: z.string().min(3, 'Введіть назву рецепту, принаймні 3 символи'),
	recipeImage: z.union([z.instanceof(File), z.null()]),
	sourceUrl: z.string(),
	steps: z
		.array(z.object({ stepDescription: z.string().min(3, 'Опис кроку занадто короткий') }))
		.nonempty('Додайте принаймні один крок'),
});

export type AddRecipeFormValues = z.infer<typeof addRecipeValidationSchema>;

const URL_SCHEME_REGEX = /^[a-z][a-z\d+.-]*:\/\//i;

const prependHttps = (value: string) => (value && !URL_SCHEME_REGEX.test(value) ? `https://${value}` : value);

export const importRecipeValidationSchema = z.object({
	sourceUrl: z
		.string()
		.trim()
		.transform(prependHttps)
		.pipe(
			z.url({
				protocol: /^https$/,
				hostname: z.regexes.domain,
				error: 'Введіть коректне посилання на допис',
			}),
		),
	useImportedTitle: z.boolean(),
});
