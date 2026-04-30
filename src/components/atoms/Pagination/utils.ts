import { EDGE_SIZE } from './constants.ts';
import { PageItem } from './types.ts';

export const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
	if (totalPages <= 0) return [];
	if (totalPages === 1) return [1];

	const last = totalPages;
	const edge = Math.min(EDGE_SIZE, totalPages);

	if (totalPages <= edge + 2) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const endZoneStart = totalPages - EDGE_SIZE + 1;

	if (currentPage < EDGE_SIZE) {
		const leading = Array.from({ length: edge }, (_, i) => i + 1);

		return [...leading, 'ellipsis', last];
	}

	if (currentPage > endZoneStart) {
		const trailing = Array.from({ length: edge }, (_, i) => last - edge + 1 + i);

		return [1, 'ellipsis', ...trailing];
	}

	return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', last];
};
