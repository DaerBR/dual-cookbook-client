import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react-vite';

import { theme } from '../src/styles/theme.ts';
import '../src/index.css';

const preview: Preview = {
	// Atoms read the theme via useAppTheme(), so every story needs the same provider as App.tsx
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		// Props named on* (onClick, onChange, …) are logged in the Actions panel
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
