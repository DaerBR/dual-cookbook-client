import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { getPageItems } from './utils.ts';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../Typography';
import { ellipsisStyles, paginationButtonStyles, paginationContainerStyles } from './styles.ts';

interface PaginationProps {
	currentPage: number;
	fetchDataMethod: any;
	fetchParams: Record<string, any>;
	totalPages: number;
}

export const Pagination = ({ currentPage, totalPages, fetchDataMethod, fetchParams }: PaginationProps) => {
	const theme = useAppTheme();

	const handleChangePage = (page: number) => {
		fetchDataMethod({ ...fetchParams, page });
	};
	const pageItems = getPageItems(currentPage, totalPages);

	if (!totalPages || totalPages <= 0) return null;

	return (
		<div css={paginationContainerStyles}>
			<Button
				customStyles={paginationButtonStyles}
				variant="outlined-neutral"
				isDisabled={currentPage <= 1}
				onClick={() => {
					if (currentPage > 1) {
						handleChangePage(currentPage - 1);
					}
				}}
			>
				<Icon icon={faArrowLeft} fontSize={10} customStyles={{ color: 'inherit' }} />
			</Button>
			<div
				css={{
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					'@media (max-width: 768px)': {
						display: 'none',
					},
				}}
			>
				{pageItems.map((item, index) =>
					item === 'ellipsis' ? (
						<span
							key={`ellipsis-${index}`}
							css={{
								...paginationButtonStyles,
								...ellipsisStyles,
							}}
						>
							<Typography variant="paragraphS">…</Typography>
						</span>
					) : (
						<Button
							customStyles={{
								...paginationButtonStyles,
								borderColor:
									currentPage === item ? theme.colors.neutral.borderDarker : theme.colors.neutral.borderDefault,
								boxShadow: currentPage === item ? theme.boxShadows.sm : theme.boxShadows.xs,
								color: currentPage === item ? theme.colors.text.title : `${theme.colors.text.caption}!important`,
								fontWeight: currentPage === item ? 600 : 400,
							}}
							variant="outlined-neutral"
							key={item}
							onClick={() => handleChangePage(item)}
						>
							{item}
						</Button>
					),
				)}
			</div>
			<Button
				customStyles={paginationButtonStyles}
				variant="outlined-neutral"
				isDisabled={currentPage >= totalPages}
				onClick={() => {
					if (currentPage < totalPages) {
						handleChangePage(currentPage + 1);
					}
				}}
			>
				<Icon icon={faArrowRight} fontSize={10} customStyles={{ color: 'inherit' }} />
			</Button>
		</div>
	);
};
