export interface ImageDataModel {
	publicId: string;
	secureUrl: string;
}

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

export interface PaginationModel {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
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
