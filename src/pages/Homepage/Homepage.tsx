import { useNavigate } from 'react-router';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';

export const Homepage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>
				Головна сторінка
			</Typography>
			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
				<Button variant="secondary" onClick={() => navigate('/categories')}>
					Категорії
				</Button>
			</div>
		</div>
	);
};
