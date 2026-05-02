import * as z from 'zod';

export const searchValidationSchema = z
	.object({
		category: z.string(),
		recipeAuthor: z.string(),
		searchInput: z.string(),
	})
	.refine((data) => data.searchInput !== '' || data.category !== '' || data.recipeAuthor !== '', {
		message: 'Використайте будь-який параметр для пошуку',
		path: ['searchInput'],
	});
export type SearchFormValues = z.infer<typeof searchValidationSchema>;
