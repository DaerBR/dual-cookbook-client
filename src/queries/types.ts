export interface ImageDataModel {
	publicId: string;
	secureUrl: string;
}

export interface PaginationModel {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}
