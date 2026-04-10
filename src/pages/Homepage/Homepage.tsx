import { useNavigate } from 'react-router';
import { Button } from '../../components/atoms/Button';
import { PageTitle } from '../../components/PageTitle/PageTitle.tsx';

export const Homepage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<PageTitle title="Головна сторінка" />
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
				<Button variant="secondary" onClick={() => navigate('/categories')}>
					Категорії
				</Button>
			</div>
		</div>
	);
};
