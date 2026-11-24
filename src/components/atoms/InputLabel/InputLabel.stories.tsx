import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputLabel } from './InputLabel';

const meta = {
	title: 'Atoms/InputLabel',
	component: InputLabel,
	args: {
		id: 'recipeTitle',
		label: 'Назва рецепта',
	},
} satisfies Meta<typeof InputLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Required: Story = {
	args: { isRequired: true },
};
