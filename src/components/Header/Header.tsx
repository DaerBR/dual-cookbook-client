import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
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
import { theme } from '../../styles/theme.ts';
import { SearchSuggestionsInputField } from '../atoms/SearchSuggestionsInputField';

export const Header = () => {
	const userData = useAppSelector((state) => state.auth.userData);
	const areUserDataFetched = useAppSelector((state) => state.auth.areUserDataFetched);
	const isFetchingUserData = useAppSelector((state) => state.auth.isLoading);
	const location = useLocation();

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

	const linkStyles = {
		color: theme.colors.primary.main,
		fontWeight: 700,
		marginRight: '24px',
		textDecoration: 'none',
		fontSize: theme.typography.paragraphM.fontSize,
		'&:hover': {
			textDecoration: 'underline',
		},
	};

	return (
		<div css={headerStyles}>
			<div css={logoContainerStyles} className="logo-container">
				<Link to="/" aria-label="До головної сторінки">
					<div
						css={{
							backgroundImage: 'url("/logo-images/squirrel.png")',
							height: '64px',
							width: '64px',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							borderRadius: '50%',
							border: '2px solid #fda477',
							marginRight: '16px',
						}}
					/>
				</Link>
				<Link to="/categories" css={linkStyles}>
					Всі категорії
				</Link>
				{location?.pathname !== '/search' && (
					<div css={{ width: '300px' }}>
						<SearchSuggestionsInputField />
					</div>
				)}
			</div>
			<div css={buttonsContainerStyles}>
				{userData ? (
					<>
						<Button onClick={() => navigate('/create-new-recipe')} startIcon={<Icon icon={faPlus} />} variant="primary">
							Створити рецепт
						</Button>
						<Button
							variant="outlined-neutral"
							onClick={handleLogoutClick}
							css={{ border: 'none', boxShadow: 'none', minWidth: 0, padding: '10px 16px' }}
						>
							<Icon icon={faSignOut} color="primary" />
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
