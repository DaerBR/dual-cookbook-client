import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from '@emotion/react';

import {
	AddCategory,
	AddRecipe,
	Categories,
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

export const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Header />
			<MainWrapper>
				<StyledToaster />
				<PageWrapper>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route
							path="/create-new-category"
							element={
								<ProtectedRoute>
									<AddCategory />
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
									<AddRecipe />
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
						<Route path="/categories" element={<Categories />} />
						<Route path="/search" element={<Search />} />
						<Route path="/category/:id" element={<SingleCategory />} />
						<Route path="/recipe/:id" element={<SingleRecipe />} />
						<Route path="*" element={<ErrorPage code={404} />} />
					</Routes>
				</PageWrapper>
			</MainWrapper>
		</ThemeProvider>
	</BrowserRouter>
);
