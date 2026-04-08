import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from '@emotion/react';

import { Homepage } from './pages';
import { Header } from './components/Header/Header.tsx';
import { theme } from './styles/theme.ts';
import './index.css';
import { PageWrapper } from './components/PageWrapper';

export const App = () => {
	const isLoggedIn = true;
	console.info(isLoggedIn);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Header />
				<PageWrapper>
					<Routes>
						<Route path="/" element={<Homepage />} />
					</Routes>
				</PageWrapper>
			</ThemeProvider>
		</BrowserRouter>
	);
};
