import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchCategories } from '../../store/thunks/categories.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { CategoryCard } from './copmponents/CategoryCard.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';

export const Categories = () => {
	const categoriesList = useAppSelector((state) => state.categories.categories);
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const navigate = useNavigate();

	const [dispatchFetchCategories] = useThunk(fetchCategories);

	useEffect(() => {
		dispatchFetchCategories({
			page: 1,
			limit: 99,
		});
	}, [dispatchFetchCategories]);

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
									Створити категорію
								</Button>,
							]
						: undefined
				}
			/>
			<div css={{ display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
				{categoriesList.map((category) => (
					<CategoryCard category={category} key={category.id} />
				))}
			</div>
		</div>
	);
};
