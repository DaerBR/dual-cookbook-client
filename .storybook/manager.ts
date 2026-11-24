import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

import { theme } from '../src/styles/theme.ts';

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: 'Dual Cookbook UI',
		brandImage: '/logo-images/bear-cooks.png',
		colorPrimary: theme.colors.primary.main,
		colorSecondary: theme.colors.primary.main,
		fontBase: '"Roboto", sans-serif',
	}),
	panelPosition: 'bottom',
});
