import { useEffect } from 'react';
import { faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useMatch, useNavigate } from 'react-router';

import {
	buttonsContainerStyles,
	createRecipeButtonStyles,
	headerStyles,
	homepageLinkStyles,
	linkStyles,
	navigationContainerStyles,
	searchWrapperStyles,
	signOutButtonStyles,
} from './styles.ts';
import { Button } from '../atoms/Button';
import { API_URL } from '../../api/constants.ts';
import { AuthEventListener } from '../AuthEventListener';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { fetchUser, signOut } from '../../store/thunks/auth.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks.ts';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';
import { CircularProgress } from '../atoms/CircularProgress';
import { SearchSuggestionsInputField } from '../atoms/SearchSuggestionsInputField';
import { resetSearch } from '../../store/slices/recipesSlice.ts';
import { useAppTheme } from '../../styles/hooks.ts';

export const Header = () => {
	const userData = useAppSelector((state) => state.auth.userData);
	const areUserDataFetched = useAppSelector((state) => state.auth.areUserDataFetched);
	const isFetchingUserData = useAppSelector((state) => state.auth.isLoading);
	const location = useLocation();
	const categoryMatch = useMatch('/category/:id');
	const theme = useAppTheme();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

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

	const handleNavigateToCreateRecipeClick = () =>
		navigate(categoryMatch ? `/create-new-recipe?categoryId=${categoryMatch.params.id}` : '/create-new-recipe');

	return (
		<div css={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 5 }}>
			<div css={headerStyles}>
				<div css={logoContainerStyles} className="logo-container">
					<Link to="/" aria-label="До головної сторінки">
						<div css={{ ...homepageLinkStyles, boxShadow: theme.boxShadows.sm }} />
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
						<div css={searchWrapperStyles}>
							<SearchSuggestionsInputField />
						</div>
					)}
				</div>
				<div css={buttonsContainerStyles}>
					{userData ? (
						<>
							<Button
								onClick={handleNavigateToCreateRecipeClick}
								startIcon={<Icon icon={faPlus} />}
								variant="primary"
								customStyles={createRecipeButtonStyles}
							>
								Створити рецепт
							</Button>
							<Button variant="outlined-neutral" onClick={handleLogoutClick} css={signOutButtonStyles}>
								<Icon icon={faSignOut} color="primary" />
							</Button>
						</>
					) : isFetchingUserData ? (
						<>
							<Typography variant="paragraphM" color="primary" weight={600}>
								Зачекай - воно прокидається...
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
					...navigationContainerStyles,
					borderTop: `1px solid ${theme.colors.primary.borderDefault}`,
					borderBottom: `1px solid ${theme.colors.primary.borderDefault}`,
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
					onClick={() => dispatch(resetSearch())}
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
