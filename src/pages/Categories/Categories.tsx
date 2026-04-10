import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Typography } from '../../components/atoms/Typography';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchCategories } from '../../store/thunks/categories.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';

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
			<Typography variant="paragraphL" weight={700}>
				Всі категорії
			</Typography>
			{isLoggedIn && (
				<div css={{ display: 'flex', marginTop: '12px', marginBottom: '12px' }}>
					<Button
						onClick={() => navigate('/create-new-category')}
						variant="secondary"
						startIcon={<Icon icon={faPlus} />}
					>
						Створити категорію
					</Button>
				</div>
			)}
			<div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{categoriesList.map((category) => (
					<Typography variant="paragraphM" key={category._id}>
						{category.name}
					</Typography>
				))}
			</div>
		</div>
	);
};
