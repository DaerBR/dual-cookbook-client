import type { ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { TextInput } from './TextInput';
import { withForm } from '../../../../.storybook/decorators.tsx';

const meta = {
	title: 'Atoms/TextInput',
	component: TextInput,
	decorators: [withForm],
	args: {
		name: 'recipeTitle',
		label: 'Назва рецепта',
		placeholder: 'Введіть назву страви',
		value: '',
		onChange: fn(),
	},
	argTypes: {
		inputRef: { control: false },
	},
	// Controlled input: typing writes the value back into args, so the Controls panel stays in sync
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			args.onChange?.(event);
			updateArgs({ value: event.target.value });
		};

		return <TextInput {...args} onChange={handleChange} />;
	},
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHelperText: Story = {
	args: { helperText: 'Коротка назва, до 60 символів' },
};

export const Required: Story = {
	args: { isRequired: true },
};

export const WithError: Story = {
	args: { isRequired: true },
	parameters: { formError: 'Назва рецепта обовʼязкова' },
};

export const Disabled: Story = {
	args: { isDisabled: true, value: 'Ведмедь запечений' },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true, value: 'Ведмедь запечений' },
};

export const Multiline: Story = {
	args: {
		name: 'recipeDescription',
		label: 'Опис',
		placeholder: 'Опишіть страву',
		multiline: true,
		rows: 4,
	},
};

export const FullWidth: Story = {
	args: { isFullWidth: true },
};
