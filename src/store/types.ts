export interface RecipeImage {
	publicId: string;
	secureUrl: string;
}
export interface RecipeTableModel {
	category: { id: string; name: string };
	createdAt: Date;
	description: string | null;
	id: string;
	name: string;
	recipeImage?: RecipeImage;
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
	description: 'string';
	ingredients: RecipeIngredient[];
	recipeImage: RecipeImage;
	steps: RecipeStep[];
}

export interface Pagination {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export interface RecipesPaginationModel {
	data: RecipeTableModel[];
	pagination: Pagination | null;
}
