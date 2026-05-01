import * as z from 'zod';

export const searchValidationSchema = z.object({
	category: z.string(),
	recipeAuthor: z.string(),
	searchInput: z.string().min(3, 'Введіть як мінімум три символи'),
});
export type SearchFormValues = z.infer<typeof searchValidationSchema>;
