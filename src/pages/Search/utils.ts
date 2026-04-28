import { RecipeTableModel } from '../../store/types.ts';
import { RecipeOption } from './types.ts';

export const createDebouncedRecipeSearch = (
	load: (query: string) => Promise<RecipeTableModel[]>,
	debounceTime: number,
	minLength: number,
) => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	let cancelPrevious: (() => void) | null = null;

	return (inputValue: string): Promise<RecipeOption[]> =>
		new Promise((resolve) => {
			if (cancelPrevious) {
				cancelPrevious();
				cancelPrevious = null;
			}

			if (timer) {
				clearTimeout(timer);
				timer = null;
			}

			let settled = false;

			cancelPrevious = () => {
				if (!settled) {
					settled = true;
					resolve([]);
				}
			};

			const queryString = inputValue.trim();

			if (queryString.length < minLength) {
				settled = true;
				resolve([]);

				return;
			}

			timer = setTimeout(() => {
				timer = null;

				load(queryString)
					.then((recipes) => {
						if (!settled) {
							settled = true;
							resolve(
								recipes.map((recipe) => ({
									value: recipe.id,
									label: recipe.name,
								})),
							);
						}
					})
					.catch(() => {
						if (!settled) {
							settled = true;
							resolve([]);
						}
					});
			}, debounceTime);
		});
};
