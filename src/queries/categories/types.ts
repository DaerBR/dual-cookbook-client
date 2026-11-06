import type { ImageDataModel } from '../../store/types.ts';

export interface CategoryModel {
	categoryImage?: ImageDataModel;
	createdAt: Date;
	id: string;
	name: string;
}

export interface CategoryOption {
	label: string;
	value: string;
}

export interface CategoryImagePayload {
	base64Content: string;
	nameWithExtension: string;
}

export interface CreateCategoryParams {
	categoryImage?: CategoryImagePayload | null;
	name: string;
}

export interface UpdateCategoryParams extends CreateCategoryParams {
	categoryId: string;
}

export interface DeleteCategoryParams {
	categoryId: string;
}
