import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useAllCategories } from '../../queries/categories';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { CategoryCard } from './copmponents/CategoryCard.tsx';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { categoriesContainerStyles } from './styles.ts';
import { UNTESTED_RECIPES_CAT_ID } from '../../constants/categories.ts';

export const AllCategories = () => {
	// `isPending` = no data yet (first load). A background refetch of stale data keeps showing the list
	// (that's `isFetching`), so the spinner doesn't flash on every revisit.
	const { data: categoriesList = [], isPending: isFetchingCategories } = useAllCategories();
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
			<div css={categoriesContainerStyles}>
				{isFetchingCategories ? (
					<LoadingIndicator />
				) : (
					categoriesList
						.filter((category) => category.id !== UNTESTED_RECIPES_CAT_ID)
						.map((category) => <CategoryCard category={category} key={category.id} />)
				)}
			</div>
		</div>
	);
};
