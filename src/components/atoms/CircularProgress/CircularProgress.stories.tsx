import type { Meta, StoryObj } from '@storybook/react-vite';

import { CircularProgress } from './CircularProgress';
import type { CircularProgressColor } from './CircularProgress';

const COLORS: CircularProgressColor[] = ['primary', 'error', 'success', 'neutral', 'white'];

const meta = {
	title: 'Atoms/CircularProgress',
	component: CircularProgress,
	args: {
		color: 'primary',
		sizePx: 24,
	},
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllColors: Story = {
	render: (args) => (
		<div css={{ display: 'flex', gap: '16px', padding: '12px', backgroundColor: '#ddd' }}>
			{COLORS.map((color) => (
				<CircularProgress key={color} {...args} color={color} />
			))}
		</div>
	),
};

export const Large: Story = {
	args: { sizePx: 64 },
};
