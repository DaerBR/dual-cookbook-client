import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	// Atoms only for now — widen the glob when composed components get stories
	stories: ['../src/components/atoms/**/*.stories.tsx'],
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
	// Reuses vite.config.ts, so the Emotion jsxImportSource setting applies to stories too
	framework: '@storybook/react-vite',
	staticDirs: ['../public'],
};

export default config;
