import type { AddRecipeFormValues } from './validations.ts';

export const DEFAULT_RECIPE_FORM_VALUES: AddRecipeFormValues = {
	recipeTitle: '',
	categories: [],
	description: '',
	ingredients: [{ text: '' }],
	steps: [{ stepDescription: '' }],
	recipeImage: null,
	sourceUrl: '',
};

export const MODAL_DESCRIPTION_TEXT =
	'Підтримуються посилання з Instagram, YouTube та Telegraph, а також посилання на типові сайти з рецептами (напр. cookpad.com)';
export const MODAL_WARNING_TEXT =
	'Увага! Імпортування рецепту з іншого ресурсу призведе до скидання заповнених полів форми (окрім вже обраних категорій)';
