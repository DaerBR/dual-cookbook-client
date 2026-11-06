import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './App.tsx';
import { store } from './store';
import { queryClient } from './queries/queryClient.ts';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

// Redux (auth, recipes) and TanStack Query (categories) live side by side.
// ReactQueryDevtools is a no-op in production builds.
root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools buttonPosition="bottom-left" />
		</QueryClientProvider>
	</Provider>,
);
