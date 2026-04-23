import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

import { useHeaderStyles } from './hooks.ts';
import { Button } from '../atoms/Button';
import { API_URL } from '../../api/constants.ts';
import { AuthEventListener } from '../AuthEventListener';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchUser, signOut } from '../../store/thunks/auth.ts';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { Icon } from '../atoms/Icon';
import { buttonsContainerStyles } from './styles.ts';
import { Typography } from '../atoms/Typography';
import { CircularProgress } from '../atoms/CircularProgress';

export const Header = () => {
	const userData = useAppSelector((state) => state.auth.userData);
	const areUserDataFetched = useAppSelector((state) => state.auth.areUserDataFetched);
	const isFetchingUserData = useAppSelector((state) => state.auth.isLoading);

	const navigate = useNavigate();
	const headerStyles = useHeaderStyles();

	const logoContainerStyles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		'& img': { height: '72px' },
	};
	const [dispatchFetchUser] = useThunk(fetchUser);
	const [dispatchLogout] = useThunk(signOut);

	useEffect(() => {
		if (!areUserDataFetched) {
			dispatchFetchUser();
		}
	}, [dispatchFetchUser, areUserDataFetched]);

	const handleLoginClick = () => {
		const width = 500;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;

		window.open(`${API_URL}/auth/google`, 'google-auth', `width=${width},height=${height},left=${left},top=${top}`);
	};

	const handleLogoutClick = async () => {
		await dispatchLogout();
		navigate('/');
	};

	return (
		<div css={headerStyles}>
			<div css={logoContainerStyles} className="logo-container">
				<Link to="/" aria-label="До головної сторінки">
					<img src="/logo-images/book-of-recipes.png" alt="До головної сторінки" />
				</Link>
			</div>
			<div css={buttonsContainerStyles}>
				{userData && (
					<Typography variant="paragraphM" weight={700}>
						{userData ? `Шо, ${userData.displayName} - знайшов щось цікаве?` : 'Шо - шукаєш що б йо зжерти?'}
					</Typography>
				)}
				{userData ? (
					<>
						<Button onClick={() => navigate('/create-new-recipe')} startIcon={<Icon icon={faPlus} />} variant="primary">
							Створити рецепт
						</Button>
						<Button variant="secondary" onClick={handleLogoutClick}>
							Вийти
						</Button>
					</>
				) : isFetchingUserData ? (
					<>
						<Typography variant="paragraphM" color="primary">
							Зачекай-но...
						</Typography>
						<CircularProgress color="primary" sizePx={24} />
					</>
				) : (
					<Button variant="secondary" onClick={handleLoginClick}>
						Вхід
					</Button>
				)}
			</div>
			{!userData && <AuthEventListener />}
		</div>
	);
};
