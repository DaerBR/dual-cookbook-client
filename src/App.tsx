import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '@emotion/react';

import {
	AllCategories,
	CreateCategory,
	CreateRecipe,
	EditCategory,
	EditRecipe,
	ErrorPage,
	Homepage,
	Search,
	SingleCategory,
	SingleRecipe,
} from './pages';
import { Header } from './components/Header/Header.tsx';
import { theme } from './styles/theme.ts';
import './index.css';
import { PageWrapper } from './components/PageWrapper';
import { MainWrapper } from './components/MainWrapper';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StyledToaster } from './components/atoms/StyledToaster';
import { useApiNavigate } from './api/apiRequest.ts';
import { FORBIDDEN_ROUTE, NOT_FOUND_ROUTE } from './constants/routes.ts';

const RootLayout = () => {
	useApiNavigate();

	return (
		<>
			<Header />
			<MainWrapper>
				<StyledToaster />
				<PageWrapper>
					<Outlet />
				</PageWrapper>
			</MainWrapper>
		</>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			<Route path="/" element={<Homepage />} />
			<Route
				path="/create-new-category"
				element={
					<ProtectedRoute>
						<CreateCategory />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/edit-category/:id"
				element={
					<ProtectedRoute>
						<EditCategory />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/create-new-recipe"
				element={
					<ProtectedRoute>
						<CreateRecipe />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/edit-recipe/:id"
				element={
					<ProtectedRoute>
						<EditRecipe />
					</ProtectedRoute>
				}
			/>
			<Route path="/categories" element={<AllCategories />} />
			<Route path="/search" element={<Search />} />
			<Route path="/category/:id" element={<SingleCategory />} />
			<Route path="/recipe/:id" element={<SingleRecipe />} />
			<Route path={NOT_FOUND_ROUTE} element={<ErrorPage code={404} />} />
			<Route path={FORBIDDEN_ROUTE} element={<ErrorPage code={403} />} />
			<Route path="*" element={<ErrorPage code={404} />} />
		</Route>,
	),
);

export const App = () => (
	<ThemeProvider theme={theme}>
		<RouterProvider router={router} />
	</ThemeProvider>
);
