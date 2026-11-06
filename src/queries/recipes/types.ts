import type { ImageDataModel, PaginationModel } from '../types.ts';

export interface RecipeTableModel {
	categories: Array<{ id: string; name: string }>;
	createdAt: Date;
	description?: string;
	id: string;
	recipeImage?: ImageDataModel;
	recipeTitle: string;
	updatedAt: Date;
}

export interface RecipeStep {
	id?: string;
	stepDescription: string;
}
export interface RecipeIngredient {
	id?: string;
	text: string;
}

export interface RecipeDetailModel extends RecipeTableModel {
	createdBy: { displayName: string; id: string };
	ingredients: RecipeIngredient[];
	sourceUrl?: string;
	steps: RecipeStep[];
}

// POST /api/recipes and PUT /api/recipes/:id reply with the saved document unpopulated (only GET /:id populates),
// so its references are plain id strings instead of objects.
export interface SavedRecipeModel extends Omit<RecipeDetailModel, 'categories' | 'createdBy'> {
	categories: string[];
	createdBy: string;
}

export interface RecipesPaginationModel {
	data: RecipeTableModel[];
	pagination: PaginationModel | null;
}

export interface ImportedRecipeDraft {
	description?: string;
	imageUrl?: string;
	ingredients?: string[];
	recipeTitle?: string;
	sourceUrl: string;
	steps?: string[];
}

export interface FetchRecipesParams {
	categories?: string;
	limit: number;
	order?: 'asc' | 'desc';
	page: number;
	recipeAuthor?: string;
	search?: string;
}

export interface CreateRecipeParams {
	categories: string[];
	description: string | null;
	ingredients: RecipeIngredient[];
	recipeImage?: {
		base64Content: string;
		nameWithExtension: string;
	} | null;
	recipeTitle: string;
	sourceUrl?: string;
	steps: RecipeStep[];
}

export interface UpdateRecipeParams extends CreateRecipeParams {
	recipeId: string;
}

export interface DeleteRecipeParams {
	recipeId: string;
}

export interface ImportRecipeDraftParams {
	url: string;
}
