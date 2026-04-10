import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 5174,
	},
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
		}),
		checker({
			// e.g. use TypeScript check
			typescript: true,
		}),
	],
});
