import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from '@emotion/react';

import { AddCategory, AddRecipe, Categories, ErrorPage, Homepage, Search, SingleCategory, SingleRecipe } from './pages';
import { Header } from './components/Header/Header.tsx';
import { theme } from './styles/theme.ts';
import './index.css';
import { PageWrapper } from './components/PageWrapper';
import { MainWrapper } from './components/MainWrapper';

export const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Header />
			<MainWrapper>
				<PageWrapper>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/create-new-category" element={<AddCategory />} />
						<Route path="/create-new-recipe" element={<AddRecipe />} />
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
