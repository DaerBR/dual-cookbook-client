import * as z from 'zod';

export const searchValidationSchema = z
	.object({
		categories: z.array(z.object({ value: z.string(), label: z.string() })),
		recipeAuthor: z.string(),
		searchInput: z.string(),
	})
	.refine((data) => data.searchInput !== '' || data.categories.length !== 0 || data.recipeAuthor !== '', {
		message: 'Використайте будь-який параметр для пошуку',
		path: ['searchInput'],
	});
export type SearchFormValues = z.infer<typeof searchValidationSchema>;
