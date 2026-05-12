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
import { buttonsContainerStyles, homepageLinkStyles, linkStyles } from './styles.ts';
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

	return (
		<div css={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 5 }}>
			<div css={headerStyles}>
				<div css={logoContainerStyles} className="logo-container">
					<Link to="/" aria-label="До головної сторінки">
						<div css={homepageLinkStyles} />
					</Link>
					<Link
						to="/categories"
						css={{
							...linkStyles,
							color: theme.colors.primary.main,
							fontSize: theme.typography.paragraphM.fontSize,
							'@media (max-width: 768px)': { display: 'none' },
						}}
					>
						Всі категорії
					</Link>
					{location?.pathname !== '/search' && (
						<div
							css={{
								width: '300px',
								'@media (max-width: 1024px)': {
									width: '230px',
								},
								'@media (max-width: 768px)': {
									display: 'none',
								},
							}}
						>
							<SearchSuggestionsInputField />
						</div>
					)}
				</div>
				<div css={buttonsContainerStyles}>
					{userData ? (
						<>
							<Button
								onClick={() => navigate('/create-new-recipe')}
								startIcon={<Icon icon={faPlus} />}
								variant="primary"
								customStyles={{
									'@media (max-width: 768px)': { maxWidth: '170px', '& .start-icon-container': { display: 'none' } },
								}}
							>
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
			<div
				css={{
					backgroundColor: '#fff',
					display: 'none',
					position: 'fixed',
					top: '95px',
					left: '0',
					transform: 'translateY(-50%)',
					width: '100%',
					justifyContent: 'space-around',
					padding: '8px 0',
					zIndex: 3,
					'@media (max-width: 768px)': { display: 'flex' },
				}}
			>
				<Link
					to="/categories"
					css={{ ...linkStyles, color: theme.colors.primary.main, fontSize: theme.typography.paragraphM.fontSize }}
				>
					Всі категорії
				</Link>
				<Link
					to="/search"
					css={{
						...linkStyles,
						color: theme.colors.primary.main,
						fontSize: theme.typography.paragraphM.fontSize,
					}}
				>
					Пошук
				</Link>
			</div>
		</div>
	);
};
