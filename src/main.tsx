import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import { App } from './App.tsx';
import { store } from './store';

setupListeners(store.dispatch);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);
