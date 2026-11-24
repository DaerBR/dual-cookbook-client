import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ActionMeta, MultiValue } from 'react-select';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { MultiSelect } from './MultiSelect';
import type { MultiSelectOption } from './MultiSelect';
import { withForm } from '../../../../.storybook/decorators.tsx';

const CATEGORY_OPTIONS: MultiSelectOption[] = [
	{ label: 'Супи', value: 'soups' },
	{ label: 'Десерти', value: 'desserts' },
	{ label: 'Випічка', value: 'pastry' },
	{ label: 'Салати', value: 'salads' },
	{ label: 'Їжа на грилі', value: 'grill' },
];

const meta = {
	title: 'Atoms/MultiSelect',
	component: MultiSelect,
	decorators: [withForm],
	args: {
		name: 'categories',
		label: 'Категорії',
		placeholder: 'Оберіть категорії',
		options: CATEGORY_OPTIONS,
		value: [],
		onChange: fn(),
	},
	// Controlled select: picking or removing options writes the value back into args
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleChange = (newValue: MultiValue<MultiSelectOption>, actionMeta: ActionMeta<MultiSelectOption>) => {
			args.onChange(newValue, actionMeta);
			updateArgs({ value: newValue });
		};

		return <MultiSelect {...args} onChange={handleChange} />;
	},
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithValue: Story = {
	args: { value: [CATEGORY_OPTIONS[1], CATEGORY_OPTIONS[2]] },
};

export const WithHelperText: Story = {
	args: { helperText: 'Рецепт зʼявиться в кожній обраній категорії' },
};

export const WithError: Story = {
	args: { isRequired: true },
	parameters: { formError: 'Оберіть хоча б одну категорію' },
};

export const Disabled: Story = {
	args: { isDisabled: true, value: [CATEGORY_OPTIONS[0]] },
};

export const FullWidth: Story = {
	args: { isFullWidth: true },
};
