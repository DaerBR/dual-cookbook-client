import { useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button';
import { Icon } from '../Icon';

interface PaginationProps {
	currentPage: number;
	fetchDataMethod: any;
	fetchParams: Record<string, any>;
	totalPages: number;
}

export const Pagination = ({ currentPage, totalPages, fetchDataMethod, fetchParams }: PaginationProps) => {
	const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

	const handleFetchPageData = () => {
		fetchDataMethod({ ...fetchParams, page: currentPageNumber });
	};

	const pageButtons = Array.from({ length: totalPages }, (_, index) => (
		<Button
			variant="outlined-neutral"
			key={index}
			isDisabled={currentPageNumber === index + 1}
			onClick={() => {
				setCurrentPageNumber(index + 1);
				handleFetchPageData();
			}}
		>
			{index + 1}
		</Button>
	));

	return (
		<div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
			<Button
				variant="outlined-neutral"
				onClick={() => {
					if (currentPage > 1) {
						setCurrentPageNumber(currentPage - 1);
						handleFetchPageData();
					}
				}}
			>
				<Icon icon={faArrowLeft} fontSize={14} customStyles={{ color: 'inherit' }} />
			</Button>
			<div css={{ display: 'flex', gap: '12px' }}>{pageButtons}</div>
			<Button
				variant="outlined-neutral"
				onClick={() => {
					if (currentPage < totalPages) {
						setCurrentPageNumber(currentPage + 1);
						handleFetchPageData();
					}
				}}
			>
				<Icon icon={faArrowRight} fontSize={14} customStyles={{ color: 'inherit' }} />
			</Button>
		</div>
	);
};
