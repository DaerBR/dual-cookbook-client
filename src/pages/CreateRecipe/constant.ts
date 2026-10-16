import { AddRecipeFormValues } from './validations.ts';

export const DEFAULT_RECIPE_FORM_VALUES: AddRecipeFormValues = {
	recipeTitle: '',
	categories: [],
	description: '',
	ingredients: [{ text: '' }],
	steps: [{ stepDescription: '' }],
	recipeImage: null,
	sourceUrl: '',
};
