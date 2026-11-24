import type { ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Select } from './Select';
import type { SelectOption } from './types.ts';
import { withForm } from '../../../../.storybook/decorators.tsx';

const CATEGORY_OPTIONS: SelectOption[] = [
	{ label: 'Супи', value: 'soups' },
	{ label: 'Десерти', value: 'desserts' },
	{ label: 'Випічка', value: 'pastry' },
	{ label: 'Салати', value: 'salads' },
	{ label: 'Їжа на грилі', value: 'grill' },
];

const meta = {
	title: 'Atoms/Select',
	component: Select,
	decorators: [withForm],
	args: {
		name: 'category',
		label: 'Категорія',
		options: CATEGORY_OPTIONS,
		value: '',
		onChange: fn(),
		onBlur: fn(),
	},
	// Controlled select: picking an option writes the value back into args
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
			args.onChange(event);
			updateArgs({ value: event.target.value });
		};

		return <Select {...args} onChange={handleChange} />;
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithPlaceholder: Story = {
	args: { placeholder: 'Оберіть категорію' },
};

export const WithValue: Story = {
	args: { value: 'desserts' },
};

export const WithHelperText: Story = {
	args: { helperText: 'Рецепт зʼявиться в цій категорії' },
};

export const WithError: Story = {
	args: { isRequired: true, placeholder: 'Оберіть категорію' },
	parameters: { formError: 'Оберіть категорію' },
};

export const Disabled: Story = {
	args: { isDisabled: true, value: 'soups' },
};

export const FullWidth: Story = {
	args: { isFullWidth: true },
};
