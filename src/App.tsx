import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages';
import { Header } from './components/Header/Header.tsx';

export const App = () => {
	const isLoggedIn = true;
	console.info(isLoggedIn);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};
