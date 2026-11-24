import type { Meta, StoryObj } from '@storybook/react-vite';

import { HelperText } from './HelperText';

const meta = {
	title: 'Atoms/HelperText',
	component: HelperText,
	args: {
		text: 'Коротка назва, до 60 символів',
	},
} satisfies Meta<typeof HelperText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LongText: Story = {
	args: {
		text: 'Додайте фото готової страви. Тільки нормальне. З гарним освітленням. Підтримуються формати JPG, PNG та наскельні малюнки',
	},
};
