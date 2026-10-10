import { SearchQuery } from '../../store/slices/recipesSlice.ts';
import { pluck } from '../../utils/utils.tsx';

export const toSearchRequestParams = ({ categories, searchInput, recipeAuthor }: SearchQuery) => {
	const categoriesIds = pluck('value', categories);

	return {
		search: searchInput,
		categories: categoriesIds ? categoriesIds.join() : undefined,
		recipeAuthor: recipeAuthor || undefined,
	};
};
