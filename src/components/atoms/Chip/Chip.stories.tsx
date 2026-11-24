import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Chip } from './Chip';

const COLORS = ['primary', 'neutral', 'success', 'error'] as const;

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

const meta = {
	title: 'Atoms/Chip',
	component: Chip,
	args: {
		text: 'Супи',
		color: 'primary',
		size: 'md',
	},
	argTypes: {
		endIcon: { control: false },
	},
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ColorsAndOutlined: Story = {
	render: (args) => (
		<div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<div css={{ display: 'flex', gap: '8px' }}>
				{COLORS.map((color) => (
					<Chip key={color} {...args} color={color} text={color} />
				))}
			</div>
			<div css={{ display: 'flex', gap: '8px' }}>
				{COLORS.map((color) => (
					<Chip key={color} {...args} color={color} text={color} isOutlined />
				))}
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			{SIZES.map((size) => (
				<Chip key={size} {...args} size={size} text={size} />
			))}
		</div>
	),
};

export const Removable: Story = {
	args: { endIcon: faXmark, onClick: fn() },
};

export const Truncated: Story = {
	args: { text: 'Дуже довга назва категорії, яка не вміщується', truncateWidth: 130 },
};
