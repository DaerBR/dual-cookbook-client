import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useFetchAllCategoriesQuery } from '../../features/categories';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { CategoryCard } from './copmponents/CategoryCard.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const Categories = () => {
	const { data: categoriesList = [], isLoading: isFetchingCategories } = useFetchAllCategoriesQuery();
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	const navigate = useNavigate();

	return (
		<div>
			<PageTitle
				title="Всі категорії"
				controlElements={
					isLoggedIn
						? [
								<Button
									key="create-cat-button"
									onClick={() => navigate('/create-new-category')}
									variant="secondary"
									startIcon={<Icon icon={faPlus} />}
								>
									Додати категорію
								</Button>,
							]
						: undefined
				}
			/>
			<div
				css={{
					display: 'grid',
					gridTemplateRows: '1fr',
					gridTemplateColumns: 'repeat(2, 1fr)',
					gap: '24px',
					'@media (max-width: 768px)': {
						gridTemplateColumns: 'repeat(1, 1fr)',
						gap: '12px',
					},
				}}
			>
				{isFetchingCategories ? (
					<LoadingIndicator />
				) : (
					categoriesList.map((category) => <CategoryCard category={category} key={category.id} />)
				)}
			</div>
		</div>
	);
};
