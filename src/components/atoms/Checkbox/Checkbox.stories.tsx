import type { ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Checkbox } from './Checkbox.tsx';
import type { Colors } from './types.ts';

const COLORS: Colors[] = ['primary', 'success', 'error'];

const meta = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	args: {
		name: 'isVegetarian',
		label: 'Вегетаріанська страва',
		color: 'primary',
		isChecked: false,
		onChange: fn(),
	},
	// Controlled checkbox: clicking writes isChecked back into args
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			args.onChange?.(event);
			updateArgs({ isChecked: event.target.checked });
		};

		return <Checkbox {...args} onChange={handleChange} />;
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
	args: { isChecked: true },
};

export const Disabled: Story = {
	args: { isDisabled: true },
};

export const DisabledChecked: Story = {
	args: { isDisabled: true, isChecked: true },
};

// Static showcase — clicking here only logs to Actions, the boxes don't toggle
export const AllColors: Story = {
	render: (args) => (
		<div css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{COLORS.map((color) => (
				<Checkbox key={color} {...args} name={color} color={color} label={color} isChecked />
			))}
		</div>
	),
};
