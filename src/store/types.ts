export interface ImageDataModel {
	publicId: string;
	secureUrl: string;
}

export interface RecipeTableModel {
	categories: [{ id: string; name: string }];
	createdAt: Date;
	description: string | null;
	id: string;
	name: string;
	recipeImage?: ImageDataModel;
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
	description: string;
	ingredients: RecipeIngredient[];
	recipeImage: ImageDataModel;
	sourceUrl?: string;
	steps: RecipeStep[];
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
